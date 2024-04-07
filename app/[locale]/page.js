"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  DarkThemeToggle,
  Flowbite,
  Button,
  Avatar,
  Spinner,
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
      <section class="bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-screen-xl px-4 lg:px-12 py-8 lg:py-16 lg:grid-cols-12 justify-center items-center">
          <div class="mr-auto place-self-center lg:col-span-8">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {t("heroTitle")}
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {t("heroDescription")}
            </p>

            <form onSubmit={handleSearch}>
              <div class="flex mx-4 items-center  mx-auto max-w-2xl">
                <label for="voice-search" class="sr-only">
                  Ask
                </label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-6 h-6 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="voice-search"
                    class="pr-8 p-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`${t("input_placeholder")}`}
                    required
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 end-0 flex items-center pe-3"
                    onClick={() => {
                      recognition.lang = t("voice_lang");
                      recognition.start();
                    }}
                  >
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                      />
                    </svg>
                  </button>
                </div>
                <Button type="submit" size="lg" className="w-48 mx-4">
                  <svg
                    class="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  {t("ask_btn")}
                </Button>
              </div>
            </form>

            <div class="py-2 px-4 mx-auto max-w-screen-xl text-center">
              <div class="max-w-[950px] mx-auto pb-3">
                {messages.length === 0 && (
                  <div class="flex items-start gap-2 pt-3 justify-end">
                    <div class="flex flex-col w-full max-w-[800px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 text-left">
                      <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">
                          {t("assistant_name")}
                        </span>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {formatTimestamp(new Date().getTime())}
                        </span>
                      </div>
                      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        {t("hint")}
                      </p>
                    </div>
                    <Avatar
                      img={`${t("assistant_photo")}`}
                      rounded
                      status="online"
                    />
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    class={`flex items-start gap-2 pt-3 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "user" && <Avatar rounded />}
                    <div
                      class={`flex flex-col w-full max-w-[800px] leading-1.5 p-4 border-gray-200         
                      bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 ${
                        message.sender === "assistant"
                          ? "text-left"
                          : "text-right"
                      }`}
                    >
                      <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">
                          {message.sender === "user"
                            ? t("user_name")
                            : t("assistant_name")}
                        </span>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                      <>
                        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                          {message.sender === "assistant"
                            ? message.text.replace(/!\[.*?\]\((.*?)\)/g, "")
                            : message.text}
                        </p>
                        {message.sender === "assistant" &&
                          /(https?:\/\/\S+\.(jpg|jpeg|png|gif))/.test(
                            message.text
                          ) && (
                            <div class="group relative my-2.5">
                              <a
                                href={
                                  message.text.match(
                                    /(https?:\/\/\S+\.(jpg|jpeg|png|gif))/
                                  )[0]
                                }
                              >
                                <img
                                  src={
                                    message.text.match(
                                      /(https?:\/\/\S+\.(jpg|jpeg|png|gif))/
                                    )[0]
                                  }
                                  class="rounded-lg"
                                  width="250px"
                                />
                              </a>
                            </div>
                          )}
                      </>
                      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {message.deliveryStatus}
                      </span>
                    </div>
                    {message.sender === "assistant" && (
                      <Avatar
                        img={`${t("assistant_photo")}`}
                        rounded
                        status="online"
                      />
                    )}
                  </div>
                ))}
              </div>
              {isSending && (
                <div className="p-4">
                  <Spinner aria-label="Sending message" />
                </div>
              )}
              <div id="messages-end"></div>
            </div>
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
      <Footer />
    </div>
  );
}

export default Page;
