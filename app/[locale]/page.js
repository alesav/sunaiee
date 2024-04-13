"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  DarkThemeToggle,
  Flowbite,
  Button,
  Avatar,
  Spinner,
  Card,
} from "flowbite-react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Page() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [result, setResult] = useState("");
  const [successRate, setSuccessRate] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [botId, setBotId] = useState("d56edbff-6894-415e-973c-102d0e2c2257");
  const [response, setResponse] = useState(null);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Success Rate",
        data: [],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });
  const t = useTranslations("Home");

  // Speech Recognition Setup
  let recognition;
  if (typeof window !== "undefined") {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "ru";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript", transcript);
      document.getElementById("voice-search").value = transcript;
      handleSearch({ target: { elements: [{ value: transcript }] } });
    };
  }

  useEffect(() => {
    recognition.lang = t("voiceLanguage");
    setBotId(t("botId"));

    // Check if database exists
    const request = indexedDB.open(botId, 1);

    request.onsuccess = function (event) {
      setShowChatBubble(true);
      const db = event.target.result;
      const transaction = db.transaction("messages", "readonly");
      const objectStore = transaction.objectStore("messages");
      const messages = [];
      objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          messages.push(cursor.value);
          cursor.continue();
        } else {
          setMessages(messages);
        }
      };
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore("messages", {
        keyPath: "timestamp",
      });
      objectStore.createIndex("sender", "sender", { unique: false });
      objectStore.createIndex("text", "text", { unique: false });
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    const message = {
      timestamp: new Date().getTime(),
      sender: "user",
      text: e.target.elements[0].value,
    };
    setMessages([...messages, message]);
    setIsSending(true);
    // Scroll to the last message
    const messagesEnd = document.querySelector("#messages-end");
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    // Make POST request
    const response = await fetch(
      "https://sonicjs.smspm.workers.dev/o/sendmessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          (() => {
            // Check for existing client UUID in localStorage
            let clientUUID = localStorage.getItem(botId);
            if (!clientUUID) {
              // Generate a new UUID
              clientUUID = uuidv4();
              // Store the new UUID in localStorage
              localStorage.setItem(botId, clientUUID);
            }
            return {
              botId: botId,
              text: e.target.elements[0].value,
              clientId: clientUUID,
              history: [],
              sender: "user",
            };
          })()
        ),
      }
    );

    const data = await response.json();
    setIsSending(false);
    setResponse(data.result);
    setShowChatBubble(true);
    // Scroll to the last message again
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    // Clear the input field
    document.getElementById("voice-search").value = "";

    // Store message in IndexDB
    const dbName = botId;
    const db = indexedDB.open(dbName, 1);

    db.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction("messages", "readwrite");
      const objectStore = transaction.objectStore("messages");
      objectStore.add(message);
    };
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  useEffect(() => {
    if (response) {
      const dbName = botId;
      const db = indexedDB.open(dbName, 1);

      db.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("messages", "readwrite");
        const objectStore = transaction.objectStore("messages");
        const message = {
          timestamp: new Date().getTime(),
          sender: "assistant",
          text: response,
        };
        objectStore.add(message);
        setMessages([...messages, message]);
      };
    }
  }, [response]);

  return (
    <div>
      <Navbar />
      <section class="bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-screen-xl px-4 lg:px-12 py-8 lg:py-16 lg:grid-cols-12 justify-center items-center">
          <div class="mr-auto place-self-center lg:col-span-8">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {t("heroTitle")}
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {t("heroDescription")}
            </p>

            <iframe
              src={`https://a.sunai.ee/c?bot=${t("botId")}`}
              width="100%"
              height="400"
              allow="microphone *"
              style={{
                maxWidth: 640,
                width: "100%",
                overflow: "auto",
              }}
            ></iframe>
          </div>
          <div className="lg:mt-0 lg:col-span-4 lg:flex items-center justify-center">
            <iframe
              width="350"
              height="650"
              src={t("youtube_id")}
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-screen-xl px-4 lg:px-12 py-8 lg:py-16 justify-center items-center">
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
}

export default Page;
