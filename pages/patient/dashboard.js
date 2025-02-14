// pages/patient/dashboard.js
import { useState, useEffect, useRef } from "react";
import Chatbot from "../../src/components/Chatbot"; // Adjust the path as needed
import * as echarts from "echarts";

export default function PatientDashboard() {
  // State for toggling MyChart connection and managing health data
  const [useMyChart, setUseMyChart] = useState(false);
  const [healthData, setHealthData] = useState({
    age: "",
    height: "",
    weight: "",
    conditions: "",
  });
  const [aiSuggestions, setAiSuggestions] = useState(null);

  // State for managing active bottom navigation tab
  const [activeTab, setActiveTab] = useState("home");
  const switchTab = (tab) => setActiveTab(tab);

  // State for dark mode (default is true)
  const [darkMode, setDarkMode] = useState(true);
  // Enable dark mode by default on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  // New state for showing/hiding the Chatbot component
  const [showChatbot, setShowChatbot] = useState(false);

  // Reference for the ECharts chart container
  const chartRef = useRef(null);

  // Automatically fetch AI suggestions on mount
  useEffect(() => {
    getAISuggestions();
  }, []);

  // Initialize ECharts with dummy data for 14 days
  useEffect(() => {
    if (chartRef.current) {
      const healthChart = echarts.init(chartRef.current);
      const option = {
        grid: { top: 20, right: 20, bottom: 20, left: 40 },
        xAxis: {
          type: "category",
          data: Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`),
          axisLine: { lineStyle: { color: "#aaa" } },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#aaa" } },
          splitLine: { lineStyle: { color: "#ccc" } },
        },
        series: [
          {
            data: [72, 75, 73, 76, 74, 71, 75, 78, 74, 72, 77, 75, 73, 76],
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
      healthChart.setOption(option);
      const resizeChart = () => healthChart.resize();
      window.addEventListener("resize", resizeChart);
      return () => window.removeEventListener("resize", resizeChart);
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setHealthData({ ...healthData, [e.target.name]: e.target.value });
  };

  // Fetch AI suggestions from the dummy API endpoint
  const getAISuggestions = async () => {
    try {
      const res = await fetch("/api/ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientData: JSON.stringify(healthData) }),
      });
      const data = await res.json();
      // Expecting an array of suggestions now
      setAiSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen relative transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-gray-100 dark:bg-gray-800 z-50 border-b dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <div className="font-['Pacifico'] text-teal-700 dark:text-teal-300 text-xl">
              Vivea Health
            </div>
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-sm rounded"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <i className="ri-user-3-line text-teal-700 dark:text-teal-300"></i>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-20 px-4">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
            Hello, Sarah
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Let's check your health status
          </p>
        </div>

        {/* Health Cards */}
        <div className="overflow-x-auto hide-scrollbar mb-6">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {/* Heart Rate Card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-600">Now</span>
              </div>
              <p className="text-sm text-gray-600">Heart Rate</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  75
                </span>
                <span className="text-sm text-gray-600 mb-1">bpm</span>
              </div>
            </div>

            {/* Blood Pressure Card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-drop-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-600">Today</span>
              </div>
              <p className="text-sm text-gray-600">Blood Pressure</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  120/80
                </span>
                <span className="text-sm text-gray-600 mb-1">mmHg</span>
              </div>
            </div>

            {/* Sleep Quality Card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-moon-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-600">Last night</span>
              </div>
              <p className="text-sm text-gray-600">Sleep Quality</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  7.5
                </span>
                <span className="text-sm text-gray-600 mb-1">hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Trends Chart */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Health Trends
            </h2>
            <button className="text-teal-700 dark:text-teal-300 text-sm">
              View All
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div
              id="healthChart"
              ref={chartRef}
              style={{ height: "200px" }}
            ></div>
          </div>
        </div>

        {/* Health Info Form / MyChart Toggle */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Enter Your Health Info
          </h2>
          {!useMyChart ? (
            <div className="space-y-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={healthData.age}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <input
                type="text"
                name="height"
                placeholder={`Height (e.g., 5'9")`}
                value={healthData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight (lbs)"
                value={healthData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <textarea
                name="conditions"
                placeholder="Existing Diagnoses (e.g., Diabetes, Hypertension)"
                value={healthData.conditions}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              ></textarea>
              <div className="flex gap-4">
                <button
                  onClick={() => setUseMyChart(true)}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded"
                >
                  Connect MyChart
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                MyChart Connected ✅
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your health data is being synced automatically.
              </p>
            </div>
          )}
        </div>

        {/* Healthy Habits Section */}
        {aiSuggestions && aiSuggestions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Healthy Habits
            </h2>
            <div className="flex gap-4">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40"
                >
                  <span className="text-xs text-gray-600">AI Suggestion</span>
                  <p className="text-sm mt-2 text-gray-900 dark:text-gray-100">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's Schedule */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Today's Schedule
          </h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-capsule-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Take Medicine
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vitamin D - 1 tablet
                  </p>
                </div>
                <span className="text-sm text-teal-700 dark:text-teal-300">
                  9:00 AM
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-stethoscope-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Doctor Appointment
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dr. Emily Watson
                  </p>
                </div>
                <span className="text-sm text-teal-700 dark:text-teal-300">
                  2:30 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Section: Only show when toggled open */}
        {showChatbot && <Chatbot />}
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-14 h-14 bg-teal-700 dark:bg-teal-500 rounded-full shadow-lg flex items-center justify-center"
        >
          <i className="ri-message-3-fill text-white text-xl"></i>
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700 z-50 transition-colors">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => switchTab("home")}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "home"
                ? "text-teal-700 dark:text-teal-300"
                : "text-gray-600"
            }`}
          >
            <i className="ri-home-5-fill text-xl"></i>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => switchTab("ai")}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "ai"
                ? "text-teal-700 dark:text-teal-300"
                : "text-gray-600"
            }`}
          >
            <i className="ri-robot-line text-xl"></i>
            <span className="text-xs">AI Chat</span>
          </button>
          <button
            onClick={() => switchTab("records")}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "records"
                ? "text-teal-700 dark:text-teal-300"
                : "text-gray-600"
            }`}
          >
            <i className="ri-file-list-line text-xl"></i>
            <span className="text-xs">Records</span>
          </button>
          <button
            onClick={() => switchTab("settings")}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "settings"
                ? "text-teal-700 dark:text-teal-300"
                : "text-gray-600"
            }`}
          >
            <i className="ri-settings-line text-xl"></i>
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
