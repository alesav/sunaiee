"use client";
//import Navbar from "./../Navbar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, TextInput, Textarea, Spinner } from "flowbite-react";
import { HiOutlineClipboardDocumentCheck, HiMicrophone } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

// This metadata constant is removed because we will fetch metadata dynamically based on the page

const Birthday = () => {
  const t = useTranslations("Birthday");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [resultText, setResultText] = useState("");
  const chunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const [systemMessage, setSystemMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecordingLoading, setIsRecordingLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ContentMakerDB", 1);

      request.onerror = (event) => {
        console.error("IndexedDB error:", event.target.error);
        reject("Error opening DB.");
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("responses", {
          keyPath: "id",
          autoIncrement: true,
        });
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  async function storeResponseInDB(data) {
    const db = await initDB();
    const tx = db.transaction("responses", "readwrite");
    const store = tx.objectStore("responses");
    store.add(data);
  }

  async function getResponsesFromDB() {
    const db = await initDB();
    return new Promise((resolve) => {
      const tx = db.transaction("responses", "readonly");
      const store = tx.objectStore("responses");
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  function useStoredState(key, defaultValue) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    }, [key]);

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        chunksRef.current = []; // Clear the chunks after recording
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);

        // Send the audio data to the server
        const formData = new FormData();
        formData.append("audio", audioBlob);
        fetch("https://sonicjs.smspm.workers.dev/o/whisper", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setResponseText(data.response.text);
            setIsRecordingLoading(false);
          })
          .catch((error) => console.error("Error:", error));
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsRecordingLoading(true); // This is for the /v2/messages/recorder request
    }
  };

  const playRecording = () => {
    const audio = new Audio(audioURL);
    audio.play();
  };

  const sendMessage = async () => {
    setIsLoading(true);
    fetch("https://sonicjs.smspm.workers.dev/o/recorder", {
      method: "POST",
      body: JSON.stringify({
        responseText,
        model: t("model"),
        type: "birthday",
        language: t("language"),
      }),
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (jsonData) => {
        const data = await jsonData.json();
        console.log(console.log(data));
        console.log(data.result);
        setResultText(data.result);
        //setResponseText(parsedData.result);
        await storeResponseInDB({
          text: data.result,
          timestamp: new Date().toISOString(),
        });
        fetchAndDisplayResponses(); // This function will fetch data from IndexedDB and update the state to display cards
        setIsLoading(false); // Ensure loading state is updated after processing
      })
      .catch((error) => console.error("Error:", error));
  };

  async function fetchAndDisplayResponses() {
    const fetchedResponses = await getResponsesFromDB();
    fetchedResponses.reverse(); // Reverse the order to display the latest first
    setResponses(fetchedResponses);
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    fetchAndDisplayResponses();
  }, []);
  async function removeResponseFromDB(id) {
    const db = await initDB();
    const tx = db.transaction("responses", "readwrite");
    const store = tx.objectStore("responses");
    store.delete(id);
    await tx.complete;
    fetchAndDisplayResponses(); // Refresh the displayed responses
  }

  return (
    <div>
      <Navbar />
      <section class="bg-gray-100 dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-screen-xl px-4 lg:px-12 py-8 lg:py-10 lg:grid-cols-12 justify-center items-center">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-3xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {t("heroTitle")}
            </h1>
            <p class="max-w-3xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {t("heroDescription")}
            </p>

            <div className="flex items-center gap-2 py-2">
              <Button
                className="bg-[#FF9119] hover:bg-[#FF9119]/80"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? t("stop_recording") : t("start_recording")}
                <HiMicrophone className="mr-2 h-5 w-5" />
              </Button>
              {isRecordingLoading ? <Spinner /> : ""}
              {audioURL && (
                <div>
                  <audio controls src={audioURL} />
                </div>
              )}
            </div>

            <Textarea
              id="response-textarea"
              placeholder={t("placeholder")}
              value={responseText}
              rows={8}
              onChange={(e) => setResponseText(e.target.value)}
            />
            <div className="flex items-center justify-center pt-4">
              <Button
                size="xl"
                onClick={() => sendMessage()}
                disabled={isLoading}
                className="mx-auto bg-[#FF9119] hover:bg-[#FF9119]/80"
              >
                {t("create_ai_wish")}
              </Button>
              {isLoading && <Spinner />}
            </div>
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex items-center justify-center">
            <iframe
              type="text/html"
              width="640"
              height="360"
              src={t("youtube_id")}
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 gap-4 mx-auto max-w-screen-xl px-4 lg:px-12 py-8 lg:py-16 justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {responses.map((response, index) => (
              <Card key={index}>
                <div style={{ whiteSpace: "pre-wrap" }}>{response.text}</div>
                <div className="flex justify-end space-x-2">
                  <Button onClick={() => copyToClipboard(response.text)}>
                    <HiOutlineClipboardDocumentCheck className="h-6 w-6" />
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => removeResponseFromDB(response.id)}
                  >
                    <RxCross1 className="h-6 w-6" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="lg:mt-0 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t("card_title_1")}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {t("card_descr_1")}
              </p>
            </Card>
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t("card_title_2")}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {t("card_descr_2")}
              </p>
            </Card>
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t("card_title_3")}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {t("card_descr_3")}
              </p>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Birthday;
