"use client";
import React, { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Pricing = () => {
  const t = useTranslations("Pricing");
  const [responseText, setResponseText] = useState("");
  const [isRecordingLoading, setIsRecordingLoading] = useState(false);
  const metadata = useTranslations("PricingMetadata");
  const [recorderData, setRecorderData] = useState("");
  const [bugReport, setBugReport] = useState(null);
  const mediaRecorder = useRef(null);
  const recordedBlobs = useRef([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const startCaptureBtn = document.getElementById("startCapture");
    const stopCaptureBtn = document.getElementById("stopCapture");
    const videoElement = document.getElementById("capturedVideo");

    startCaptureBtn.addEventListener("click", async () => {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const combinedStream = new MediaStream([
          ...displayStream.getTracks(),
          ...audioStream.getTracks(),
        ]);

        mediaRecorder.current = new MediaRecorder(combinedStream);
        mediaRecorder.current.ondataavailable = handleDataAvailable;
        mediaRecorder.current.onstop = handleStop;

        mediaRecorder.current.start();

        startCaptureBtn.disabled = true;
        stopCaptureBtn.disabled = false;
        const superBuffer = new Blob(recordedBlobs.current, {
          type: "video/webm",
        });
        videoElement.src = window.URL.createObjectURL(superBuffer);
        videoElement.play();
        recordedBlobs.current = [];
      } catch (err) {
        console.error("Error: " + err);
      }
    });

    stopCaptureBtn.addEventListener("click", () => {
      mediaRecorder.current.stop();
      startCaptureBtn.disabled = false;
      stopCaptureBtn.disabled = true;
    });

    function handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        recordedBlobs.current.push(event.data);
      }
    }

    async function handleStop(event) {
      const audioBlob = new Blob(recordedBlobs.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob);

      setIsRecordingLoading(true);

      try {
        const response = await fetch(
          "https://sonicjs.smspm.workers.dev/o/whisper",
          {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setResponseText(data.response.text);
        const recorderResponse = await fetch(
          "https://sonicjs.smspm.workers.dev/o/recorder",
          {
            method: "POST",
            body: JSON.stringify({
              responseText: data.response.text,
              model: "llama3",
              type: "rewrite-qa",
              language: "English",
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const recorderDataReWrite = await recorderResponse.json();
        setResponseText(
          `Whisper: ${data.response.text}\nRecorder: ${recorderDataReWrite.result}`
        );
        setRecorderData(recorderDataReWrite.result);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsRecordingLoading(false);
      }
      const superBuffer = new Blob(recordedBlobs.current, {
        type: "video/webm",
      });
      videoElement.src = window.URL.createObjectURL(superBuffer);
      videoElement.play();
      recordedBlobs.current = [];
    }
  }, []);

  const handleCreateBug = async () => {
    const responseText = recorderData;
    setIsRecordingLoading(true);

    try {
      const response = await fetch(
        "https://sonicjs.smspm.workers.dev/o/recorder",
        {
          method: "POST",
          body: JSON.stringify({
            responseText,
            model: "llama3",
            type: "create-bug-description",
            language: "English",
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBugReport(data.result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsRecordingLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <h1
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-grey-900 md:text-4xl        
lg:text-5xl dark:text-white"
          >
            {t("Title")}
          </h1>
          <p>{t("Description")}</p>
        </div>
      </section>
      <div>
        <button id="startCapture">Start Capture</button>
        <button id="stopCapture" disabled>
          Stop Capture
        </button>
        <video id="capturedVideo" ref={videoRef} controls></video>
      </div>
      <div>
        {isRecordingLoading && <p>Loading...</p>}
        {responseText && (
          <div>
            <h2>Transcription:</h2>
            <p>{responseText}</p>
          </div>
        )}
        <textarea
          value={recorderData}
          onChange={(e) => setRecorderData(e.target.value)}
          rows="10"
          cols="50"
        />
        <button onClick={handleCreateBug}>Create bug</button>
        {bugReport}
        {bugReport && (
          <div>
            <h2>Bug Report:</h2>
            <p>
              <strong>Title:</strong> {JSON.parse(bugReport).title}
            </p>
            <p>
              <strong>Description:</strong> {JSON.parse(bugReport).description}
            </p>
            <p>
              <strong>Steps to Reproduce:</strong>{" "}
              {JSON.parse(bugReport).steps_to_reproduce}
            </p>
            {/* <ul>
              {bugReport.steps_to_reproduce.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul> */}
            <p>
              <strong>Expected Result:</strong>{" "}
              {JSON.parse(bugReport).expected_result}
            </p>
            <p>
              <strong>Actual Result:</strong>{" "}
              {JSON.parse(bugReport).actual_result}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
