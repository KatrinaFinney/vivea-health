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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  // State for managing active bottom navigation tab
  const [activeTab, setActiveTab] = useState("home");
  const switchTab = (tab) => setActiveTab(tab);

  // State for dark mode (default is false for light mode)
  const [darkMode, setDarkMode] = useState(false);
  // Light mode is default, so no default "dark" class is added initially.
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  // State for showing/hiding the Chatbot component
  const [showChatbot, setShowChatbot] = useState(false);

  // Mapping for dynamic chart label based on selected metric
  const metricLabels = {
    heartRate: "Heart Rate (bpm)",
    bloodPressure: "Blood Pressure (mmHg)",
    sleepQuality: "Sleep Quality (hrs)",
  };

  // State for the currently selected metric
  const [selectedMetric, setSelectedMetric] = useState("heartRate");

  // Dummy data for the metrics
  const dummyData = {
    heartRate: [72, 75, 73, 76, 74, 71, 75, 78, 74, 72, 77, 75, 73, 76],
    bloodPressure: [120, 122, 119, 121, 123, 120, 118, 121, 122, 120, 119, 121, 123, 120],
    sleepQuality: [7.5, 7.0, 7.8, 7.2, 7.6, 7.4, 7.5, 7.2, 7.6, 7.3, 7.8, 7.4, 7.6, 7.5],
  };

  // Reference for the ECharts chart container and instance
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Automatically fetch AI suggestions on mount
  useEffect(() => {
    getAISuggestions();
  }, []);

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
          // No in-chart yAxis name; we display it externally
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
  }, []);

  // Update chart when the selected metric changes
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption({
        series: [{
          data: dummyData[selectedMetric],
        }]
      });
    }
  }, [selectedMetric]);

  // Handle form input changes
  const handleChange = (e) => {
    setHealthData({ ...healthData, [e.target.name]: e.target.value });
  };

  // Function to "submit" the form data
  const handleSubmit = () => {
    setFormSubmitted(true);
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
      setAiSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen relative transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 z-50 border-b dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <div className="font-['Pacifico'] text-teal-700 dark:text-teal-300 text-xl">
              Vivea
            </div>
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="px-2 py-1 bg-gray-500 dark:bg-gray-700 text-white text-sm rounded"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          {/* Updated Profile Icon Background */}
          <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center">
            <i className="ri-user-3-line text-teal-700 dark:text-teal-300"></i>
          </div>
        </div>
      </nav>

      {/* Main Content with Montserrat font */}
      <main className="pt-16 pb-32 px-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
            Hello, Sarah
          </h1>
          <p className="text-gray-800 dark:text-gray-300 text-sm">
            Let's check your health status
          </p>
        </div>

        {/* Health Cards */}
        <div className="overflow-x-auto hide-scrollbar mb-6">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {/* Heart Rate Card */}
            <div
              onClick={() => setSelectedMetric("heartRate")}
              className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 cursor-pointer ${
                selectedMetric === "heartRate" ? "ring-2 ring-teal-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-800">Now</span>
              </div>
              <p className="text-sm text-gray-800">Heart Rate</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  75
                </span>
                <span className="text-sm text-gray-800 mb-1">bpm</span>
              </div>
            </div>

            {/* Blood Pressure Card */}
            <div
              onClick={() => setSelectedMetric("bloodPressure")}
              className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 cursor-pointer ${
                selectedMetric === "bloodPressure" ? "ring-2 ring-teal-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-drop-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-800">Today</span>
              </div>
              <p className="text-sm text-gray-800">Blood Pressure</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  120/80
                </span>
                <span className="text-sm text-gray-800 mb-1">mmHg</span>
              </div>
            </div>

            {/* Sleep Quality Card */}
            <div
              onClick={() => setSelectedMetric("sleepQuality")}
              className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 cursor-pointer ${
                selectedMetric === "sleepQuality" ? "ring-2 ring-teal-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="ri-moon-line text-teal-700 dark:text-teal-300"></i>
                </div>
                <span className="text-xs text-gray-800">Last night</span>
              </div>
              <p className="text-sm text-gray-800">Sleep Quality</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  7.5
                </span>
                <span className="text-sm text-gray-800 mb-1">hrs</span>
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
          {/* Dynamic label for yAxis */}
          <div className="mb-2 text-sm text-gray-800 dark:text-gray-400">
            {metricLabels[selectedMetric]}
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div id="healthChart" ref={chartRef} style={{ height: "300px" }}></div>
          </div>
        </div>

        {/* Health Info Form / MyChart Toggle */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Enter Your Health Info
          </h2>
          {!formSubmitted ? (
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={healthData.age}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <input
                type="text"
                name="height"
                placeholder={`Height (e.g., 5'9")`}
                value={healthData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight (lbs)"
                value={healthData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <textarea
                name="conditions"
                placeholder="Existing Diagnoses (e.g., Diabetes, Hypertension)"
                value={healthData.conditions}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              ></textarea>
              <div className="flex gap-4">
                {/* Swapped button order: Submit then Connect MyChart */}
                <button
                  onClick={handleSubmit}
                  className="bg-teal-700 dark:bg-teal-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={() => setUseMyChart(true)}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 py-2 px-4 rounded"
                >
                  Connect MyChart
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Your Health Info
              </h2>
              <p className="text-sm text-gray-800 dark:text-gray-400">
                Age: {healthData.age} | Height: {healthData.height} | Weight: {healthData.weight} | Conditions: {healthData.conditions}
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
                  className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 flex flex-col justify-between"
                >
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {suggestion}
                  </p>
                  <span className="text-xs text-gray-800 dark:text-gray-400 mt-2 block">
                    AI Suggestion
                  </span>
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
                  <p className="text-sm text-gray-800 dark:text-gray-400">
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
                  <p className="text-sm text-gray-800 dark:text-gray-400">
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
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "home" ? "text-teal-700 dark:text-teal-300" : "text-gray-700"
            }`}
          >
            <i className="ri-home-5-fill text-xl"></i>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => switchTab("ai")}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "ai" ? "text-teal-700 dark:text-teal-300" : "text-gray-700"
            }`}
          >
            <i className="ri-robot-line text-xl"></i>
            <span className="text-xs">AI Chat</span>
          </button>
          <button
            onClick={() => switchTab("records")}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "records" ? "text-teal-700 dark:text-teal-300" : "text-gray-700"
            }`}
          >
            <i className="ri-file-list-line text-xl"></i>
            <span className="text-xs">Records</span>
          </button>
          <button
            onClick={() => switchTab("settings")}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "settings" ? "text-teal-700 dark:text-teal-300" : "text-gray-700"
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
