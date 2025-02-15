// src/components/HomePage.js
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import Chatbot from "../../src/components/Chatbot"; // Adjust the path if needed

export default function HomePage({
  patientName,
  healthData,
  aiSuggestions,
  selectedMetric,
  dummyData,
  metricLabels,
  onMetricChange,
  darkMode,
  toggleDarkMode,
  activeTab,
  switchTab,
  showChatbot,
  setShowChatbot,
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Initialize ECharts on mount
  useEffect(() => {
    if (chartRef.current) {
      const instance = echarts.init(chartRef.current);
      chartInstanceRef.current = instance;
      const option = {
        grid: { top: 20, right: 20, bottom: 20, left: 80 },
        xAxis: {
          type: "category",
          data: [
            "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
            "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
          ],
          axisLine: { lineStyle: { color: "#aaa" } },
          axisLabel: { color: "#aaa" },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#aaa" } },
          axisLabel: { formatter: "{value}", color: "#aaa" },
          splitLine: { lineStyle: { color: "#ccc" } },
        },
        series: [
          {
            data: dummyData[selectedMetric],
            type: "line",
            smooth: true,
            symbolSize: 8,
            lineStyle: { color: "#00B5B5" },
            itemStyle: { color: "#00B5B5" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(0, 181, 181, 0.3)" },
                { offset: 1, color: "rgba(0, 181, 181, 0.05)" },
              ]),
            },
          },
        ],
      };
      instance.setOption(option);
      const resizeChart = () => instance.resize();
      window.addEventListener("resize", resizeChart);
      return () => window.removeEventListener("resize", resizeChart);
    }
  }, [dummyData, selectedMetric]);

  // Update chart when the selected metric changes
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption({
        series: [{ data: dummyData[selectedMetric] }],
      });
    }
  }, [selectedMetric, dummyData]);

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 z-50 border-b dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <div className="font-['Pacifico'] text-teal-700 dark:text-teal-300 text-xl">
              Vivea
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-2 py-1 bg-gray-500 dark:bg-gray-700 text-white text-sm rounded"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center">
            <i className="ri-user-3-line text-teal-700 dark:text-teal-300"></i>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-32 px-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        {/* Greeting */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
            Hello, {patientName || "Sarah"}
          </h1>
          <p className="text-gray-800 dark:text-gray-300 text-sm">
            Let's check your health status
          </p>
        </div>

        {/* Health Cards */}
        <div className="overflow-x-auto hide-scrollbar mb-6">
          <div className="flex gap-4 justify-center" style={{ width: "100%" }}>
            {/* Heart Rate Card */}
            <div
              onClick={() => onMetricChange("heartRate")}
              className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 cursor-pointer ${
                selectedMetric === "heartRate" ? "ring-2 ring-teal-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-800 dark:text-gray-300">Now</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-300">Heart Rate</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  75
                </span>
                <span className="text-sm text-gray-800 dark:text-gray-400 mb-1">bpm</span>
              </div>
            </div>

            {/* Blood Pressure Card */}
            <div
              onClick={() => onMetricChange("bloodPressure")}
              className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 cursor-pointer ${
                selectedMetric === "bloodPressure" ? "ring-2 ring-teal-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-drop-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-800 dark:text-gray-300">Today</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-300">Blood Pressure</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  120/80
                </span>
                <span className="text-sm text-gray-800 dark:text-gray-400 mb-1">mmHg</span>
              </div>
            </div>

            {/* Sleep Quality Card */}
            <div
              onClick={() => onMetricChange("sleepQuality")}
              className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 cursor-pointer ${
                selectedMetric === "sleepQuality" ? "ring-2 ring-teal-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-moon-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-800 dark:text-gray-300">Last night</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-300">Sleep Quality</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  7.5
                </span>
                <span className="text-sm text-gray-800 dark:text-gray-400 mb-1">hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Trends Chart */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Health Trends
            </h2>
          </div>
          <div className="mb-2 text-sm text-gray-800 dark:text-gray-400">
            {metricLabels[selectedMetric]}
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div id="healthChart" ref={chartRef} style={{ height: "300px" }}></div>
          </div>
        </div>

        {/* Additional sections (e.g., Health Info Form, Healthy Habits, Today's Schedule, etc.) */}
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-12 h-12 bg-teal-700 dark:bg-teal-500 rounded-full shadow flex items-center justify-center"
        >
          <i className="ri-message-3-fill text-white text-lg"></i>
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 z-50 transition-colors">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => switchTab("home")}
            className={`flex flex-col items-center justify-center gap-1 ${activeTab === "home" ? "text-teal-700" : "text-gray-500"}`}
          >
            <i className="ri-home-5-fill text-xl"></i>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => switchTab("ai")}
            className={`flex flex-col items-center justify-center gap-1 ${activeTab === "ai" ? "text-teal-700" : "text-gray-500"}`}
          >
            <i className="ri-robot-line text-xl"></i>
            <span className="text-xs">AI Chat</span>
          </button>
          <button
            onClick={() => switchTab("records")}
            className={`flex flex-col items-center justify-center gap-1 ${activeTab === "records" ? "text-teal-700" : "text-gray-500"}`}
          >
            <i className="ri-file-list-line text-xl"></i>
            <span className="text-xs">Records</span>
          </button>
          <button
            onClick={() => switchTab("settings")}
            className={`flex flex-col items-center justify-center gap-1 ${activeTab === "settings" ? "text-teal-700" : "text-gray-500"}`}
          >
            <i className="ri-settings-line text-xl"></i>
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </>
  );
}
