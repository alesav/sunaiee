"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Navbar from "./Navbar";

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
  const t = useTranslations("Home");

  useEffect(() => {
    console.log("Component mounted");
  }, []);

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
        </div>
      </section>
    </div>
  );
}

export default Page;
