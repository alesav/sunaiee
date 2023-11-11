"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "./../../navigation";
import { Button } from "flowbite-react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Navbar from "./Navbar";
Chart.register(...registerables);

function Page() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [result, setResult] = useState("");
  const [successRate, setSuccessRate] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const t = useTranslations("Index");

  useEffect(() => {
    console.log("Component mounted");
    generateRandomNumber();
    createDB();
    getResults();
    calculateSuccessRate();
  }, []);

  const createDB = () => {
    let db;
    let request = window.indexedDB.open("ResultsDB", 1);

    request.onerror = function (event) {
      console.log("error: ");
    };

    request.onsuccess = function (event) {
      db = request.result;
      console.log("success: " + JSON.stringify(db));
    };

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      let objectStore = db.createObjectStore("results", {
        keyPath: "id",
        autoIncrement: true,
      });
    };
  };

  const addResult = (result) => {
    let request = window.indexedDB.open("ResultsDB", 1);

    request.onsuccess = function (event) {
      let db = event.target.result;
      let tx = db.transaction(["results"], "readwrite");
      let store = tx.objectStore("results");
      let data = {
        result: result,
        timestamp: new Date().getTime(),
      };

      store.add(data);
    };
  };

  const getResults = () => {
    let request = window.indexedDB.open("ResultsDB", 1);

    request.onsuccess = function (event) {
      let db = event.target.result;
      let objectStore = db.transaction("results").objectStore("results");
      let request = objectStore.getAll();

      request.onsuccess = function (event) {
        setResults(request.result.slice(-100).reverse());
      };
    };
  };

  const flushTodayResults = () => {
    let request = window.indexedDB.open("ResultsDB", 1);

    request.onsuccess = function (event) {
      let db = event.target.result;
      let objectStore = db
        .transaction("results", "readwrite")
        .objectStore("results");
      let getRequest = objectStore.getAll();

      getRequest.onsuccess = function (event) {
        let results = getRequest.result;
        let today = new Date().toLocaleDateString();
        let todayResults = results.filter(
          (result) => new Date(result.timestamp).toLocaleDateString() === today
        );

        todayResults.forEach((result) => {
          let deleteRequest = objectStore.delete(result.id);

          deleteRequest.onsuccess = function (event) {
            console.log(`Deleted result with id ${result.id}`);
          };

          deleteRequest.onerror = function (event) {
            console.log(`Failed to delete result with id ${result.id}`);
          };
        });

        getResults();
      };
    };
  };

  const calculateSuccessRate = () => {
    let request = window.indexedDB.open("ResultsDB", 1);
    console.log("Results357: " + JSON.stringify(request));

    request.onsuccess = function (event) {
      let db = event.target.result;
      let objectStore = db.transaction("results").objectStore("results");
      let request = objectStore.getAll();
      console.log("Results 678: " + JSON.stringify(request));

      request.onsuccess = function (event) {
        let results = request.result;
        if (!Array.isArray(results)) {
          console.error("Results is not an array:", results);
          return;
        }

        let dates = [
          ...new Set(
            results.map((result) =>
              new Date(result.timestamp).toLocaleDateString()
            )
          ),
        ];
        if (!Array.isArray(dates)) {
          console.error("Dates is not an array:", dates);
          return;
        }

        let data = dates.map((date) => {
          let resultsForDate = results.filter(
            (result) => new Date(result.timestamp).toLocaleDateString() === date
          );
          let correctResults = resultsForDate.filter(
            (result) => result.result === "Correct"
          );
          let successRate = (
            (correctResults.length / resultsForDate.length) *
            100
          ).toFixed(2);
          setAttempts(correctResults.length);
          setSuccessRate(successRate);
          return successRate;
        });

        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Success Rate",
              data: data,
              fill: false,
              backgroundColor: "rgb(75, 192, 192)",
              borderColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        });
      };
    };
  };

  const generateRandomNumber = () => {
    let rndNumber = Math.round(Math.random());
    setRandomNumber(rndNumber);
    console.log(`Generated Random Number: ${rndNumber}`);
  };

  const handleClick = async (value) => {
    let res = value === randomNumber ? "Correct" : "Wrong";
    setResult(res);
    addResult(res);
    await getResults();
    generateRandomNumber();
    calculateSuccessRate();
  };

  return (
    <div>
      <Navbar />
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-grey-900 md:text-5xl lg:text-6xl dark:text-white">
            {t("heroTitle")}
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            {t("heroDescription")}
          </p>
          <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Button className="bg-green-500" onClick={() => handleClick(1)}>
              Price goes UP
            </Button>
            <Button className="bg-red-500" onClick={() => handleClick(0)}>
              Price goes DOWN
            </Button>
          </div>
          <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            {" "}
            <span class="font-semibold text-gray-400 uppercase">RESULT: </span>
            <span
              class={`font-semibold text-2xl uppercase ${
                result === "Correct" ? "text-green-500" : "text-red-500"
              }`}
            >
              {result}
            </span>
            <span class="font-semibold text-gray-400 uppercase">
              {" "}
              | Today's Success Rate:{" "}
            </span>
            <span class="font-semibold text-2xl uppercase">
              {successRate}%
            </span>{" "}
            <span class="font-semibold text-gray-400 uppercase">
              ({attempts} attempts today){" "}
            </span>
            <div class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
              <Line data={chartData} />
              <Button onClick={calculateSuccessRate}>
                Calculate Success Rate
              </Button>
              <Button onClick={flushTodayResults}>Flush today</Button>
            </div>
          </div>
        </div>
      </section>

      <>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {result.result} - {new Date(result.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </>
    </div>
  );
}

export default Page;
