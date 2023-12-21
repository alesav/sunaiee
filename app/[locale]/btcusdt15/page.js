"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar";
import { createChart, CandlestickSeries, LineSeries } from "lightweight-charts";
import axios from "axios";

const BtcUsdt15m = () => {
  const [closestTimestamp, setClosestTimestamp] = useState("");
  //const [binanceCandles, setBinanceCandles] = useState([]);

  let binanceCandles;
  const getServerData = async () => {
    const binanceData = await axios.get(
      "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=60"
    );
    binanceCandles = binanceData.data.map((item) => ({
      time: item[0] / 1000,
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
    }));

    const response = await axios.post(
      "https://btcusdt-hono.smspm.workers.dev/",
      {
        list: binanceData.data.reverse(),
      }
    );
    return response.data;
  };

  let chart;
  React.useEffect(() => {
    getServerData().then((resp) => {
      //resp = JSON.parse(resp);
      const data = resp.arrays;
      //console.log("Data1235: " + JSON.stringify(data));
      if (!chart) {
        if (binanceCandles.length > 0) {
          const chartContainer = document.getElementById("chart-container");
          const chart = createChart(chartContainer, {
            width: 700,
            height: 300,
          });
          const candlestickSeries = chart.addCandlestickSeries();
          candlestickSeries.setData(binanceCandles);

          const closeValuesLineSeries = chart.addLineSeries({
            overlay: true,
          });

          const closeValuesLineData = binanceCandles.map((item) => ({
            time: item.time,
            value: item.close,
          }));

          closeValuesLineSeries.setData(closeValuesLineData);
        }
      }

      if (data.length > 0) {
        const serverChartContainer = document.getElementById("server-chart");
        const serverChart = createChart(serverChartContainer, {
          width: 700,
          height: 300,
        });

        const fillChart = (data, ind, inputColour, nextColour) => {
          let dataObj = JSON.parse(data);

          setClosestTimestamp(dataObj[ind].timestamp);
          const values = dataObj[ind].array;

          const nextKlines = dataObj[ind].nextKlines;

          const lineCloseSeries = serverChart.addLineSeries({
            color: inputColour,
          });
          const lineNextSeries = serverChart.addLineSeries({
            color: nextColour,
          });

          let counter = 0;
          let lineCloseData = [];
          let lineNextData = [];
          values.forEach((value, index) => {
            counter++;
            lineCloseData.push({
              time: counter,
              value: parseFloat(value),
            });
          });
          lineCloseData.push({ time: ++counter, value: 0 });
          lineNextData.push({ time: counter, value: 0 });

          nextKlines.forEach((value, index) => {
            counter++;
            lineNextData.push({
              time: counter,
              value: parseFloat(value) * 100,
            });
          });
          lineCloseSeries.setData(lineCloseData);
          lineNextSeries.setData(lineNextData);
        };

        fillChart(data, 0, "#1e3a8a", "#831843");
        fillChart(data, 1, "#1e40af", "#9d174d");
        fillChart(data, 2, "#1d4ed8", "#be185d");
        fillChart(data, 3, "#2563eb", "#db2777");
        fillChart(data, 4, "#3b82f6", "#ec4899");
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Current BTC price</h1>
      <div
        id="chart-container"
        className="z-10 max-w-5xl w-full items-center  
            justify-between font-mono text-sm lg:flex"
        style={{ width: "700px", height: "300px", margin: "auto" }}
      ></div>

      <h1>BTCUSDT 15m</h1>
      <div
        id="server-chart"
        className="z-10 max-w-5xl w-full items-center                                
 justify-between font-mono text-sm lg:flex"
        style={{ width: "700px", height: "300px", margin: "auto" }}
      ></div>
    </div>
  );
};

export default BtcUsdt15m;
