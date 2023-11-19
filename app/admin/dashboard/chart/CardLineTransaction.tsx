"use client"
import React, { useEffect,useState } from "react";
//@ts-ignore
import Chart from "chart.js";
import { DashboardState } from "../Context";

export default function CardLineTransaction({
  state,
  setState
}:{
  state:DashboardState,
  setState:React.Dispatch<DashboardState>
}) {
  


  useEffect(() => {
    const LineChartConfig: Chart.ChartConfiguration = {
      type: "bar",
      data: {
          labels: [
              "มกราคม",
              "กุมภาพันธ์",
              "มีนาคม",
              "เมษายา",
              "ำฤษภาคม",
              "มิถุนายน",
              "กรกฎาคม",
              "สิงหาคม",
              "กันยายน",
              "ตุลาคม",
              "พฤศจิกายน",
              "ธันวาคม",
          ],
          datasets: [
              {
                  label: String(new Date().getFullYear()),
                  backgroundColor: "#4c51bf",
                  borderColor: "#4c51bf",
                  data: state.transactionYear,
                  fill: false,
              },
          ],
      },
      options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
              display: false,
              text: "Transaction",
              fontColor: "white",
          },
          legend: {
              labels: {
                  fontColor: "white",
              },
              align: "end",
              position: "bottom",
          },
          tooltips: {
              mode: "index",
              intersect: false,
          },
          hover: {
              mode: "nearest",
              intersect: true,
          },
          scales: {
              xAxes: [
                  {
                      ticks: {
                          fontColor: "rgba(255,255,255,.7)",
                      },
                      display: true,
                      scaleLabel: {
                          display: false,
                          labelString: "Month",
                          fontColor: "white",
                      },
                      gridLines: {
                          display: false,
                          borderDash: [2],
                          borderDashOffset: 2,
                          color: "rgba(33, 37, 41, 0.3)",
                          zeroLineColor: "rgba(0, 0, 0, 0)",
                          zeroLineBorderDash: [2],
                          zeroLineBorderDashOffset: 2,
                      },
                  },
              ],
              yAxes: [
                  {
                      ticks: {
                          fontColor: "rgba(255,255,255,.7)",
                          stepSize: 1000, 

                      },
                      display: true,
                      scaleLabel: {
                          display: false,
                          labelString: "Value",
                          fontColor: "white",
                      },
                      gridLines: {
                          borderDash: [3],
                          borderDashOffset: 3,
                          drawBorder: false,
                          color: "rgba(255, 255, 255, 0.15)",
                          zeroLineColor: "rgba(33, 37, 41, 0)",
                          zeroLineBorderDash: [2],
                          zeroLineBorderDashOffset: 2,
                      },
                  },
              ],
          },
      },

  };

    const canvas = document.getElementById("line-chart-transaction") as HTMLCanvasElement;
    const ctx =  canvas.getContext('2d');
    
    if (ctx) {
      const myLine = new Chart(ctx, LineChartConfig);
    }
  }, [state.transactionYear]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-white text-sm ">
                  การเงิน
              </h6>
              <h2 className="text-white text-xl ">12 เดือน</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart-transaction"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
