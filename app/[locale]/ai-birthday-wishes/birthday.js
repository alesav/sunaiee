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
              width="100%"
              height="330"
              src={t("youtube_id")}
              frameborder="0"
              style={{ maxWidth: "600px" }} // add max width for phones
            ></iframe>
          </div>
        </div>
      </section>
      <section>
        <div className=" gap-4 mx-auto max-w-screen-xl px-4 lg:px-12 py-8 lg:py-16 justify-center items-center">
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
          <div className="flex items-center justify-center p-10">
            <div className="flex justify-center">
              <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
                  <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                    1
                  </span>
                  <span>
                    <h3 class="font-medium leading-tight">
                      {t("step_1_title")}
                    </h3>
                    <p class="text-sm">{t("step_1_descr")}</p>
                  </span>
                </li>
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
                  <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                    2
                  </span>
                  <span>
                    <h3 class="font-medium leading-tight">
                      {t("step_2_title")}
                    </h3>
                    <p class="text-sm">{t("step_1_descr")}</p>
                  </span>
                </li>
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
                  <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                    3
                  </span>
                  <span>
                    <h3 class="font-medium leading-tight">
                      {t("step_3_title")}
                    </h3>
                    <p class="text-sm">{t("step_1_descr")}</p>
                  </span>
                </li>
              </ol>
            </div>
          </div>
          <h2 class="text-4xl font-extrabold dark:text-white">
            {t("article_title")}
          </h2>
          <p className="mt-6">{t("article_block_1")}</p>
          <p className="mt-6">{t("article_block_2")}</p>
          <p className="mt-6">{t("article_block_3")}</p>
          <h3 className=" mt-6 text-3xl font-bold dark:text-white">
            {t("article_block_4")}
          </h3>
          <p className="mt-6">{t("article_block_5")}</p>
          <ol class=" space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
            <li className="mt-4">
              <span class="font-semibold text-gray-900 dark:text-white">
                {t("article_block_6")}
              </span>{" "}
              {t("article_block_7")}
            </li>
            <li className="mt-4">
              <span class="font-semibold text-gray-900 dark:text-white">
                {t("article_block_8")}
              </span>{" "}
              {t("article_block_9")}
            </li>
            <li className="mt-4">
              <span class="font-semibold text-gray-900 dark:text-white">
                {t("article_block_10")}
              </span>{" "}
              {t("article_block_11")}
            </li>
          </ol>
          <h3 className=" mt-6 text-3xl font-bold dark:text-white">
            {t("article_block_12")}
          </h3>
          <p className="mt-6">{t("article_block_13")}</p>
          <p className="mt-6">{t("article_block_14")}</p>
          <blockquote class="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
            <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
              {t("article_block_15")}
            </p>
          </blockquote>

          <p className="mt-6">{t("article_block_16")}</p>

          <h3 className=" mt-6 text-3xl font-bold dark:text-white">
            {t("article_block_17")}
          </h3>
          <p className="mt-6">{t("article_block_18")}</p>
          <p className="mt-6">
            {" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {t("article_block_19")}
            </span>{" "}
            {t("article_block_20")}
          </p>

          <p className="mt-6">
            {" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {t("article_block_21")}
            </span>{" "}
            {t("article_block_22")}
          </p>

          <p className="mt-6">
            {" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {t("article_block_23")}
            </span>{" "}
            {t("article_block_24")}
          </p>
          <h3 className=" mt-6 text-3xl font-bold dark:text-white">
            {t("article_block_25")}
          </h3>
          <p className="mt-6">{t("article_block_26")}</p>
          <p className="mt-6">{t("article_block_27")}</p>
          <h3 className=" mt-6 text-3xl font-bold dark:text-white">
            {t("article_block_28")}
          </h3>
          <p className="my-6">{t("article_block_29")}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Birthday;
