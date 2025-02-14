// pages/patient/dashboard.js
import { useState, useEffect, useRef } from "react";
import Chatbot from "../../src/components/Chatbot";
import * as echarts from "echarts";

export default function PatientDashboard() {
  const [useMyChart, setUseMyChart] = useState(false);
  const [healthData, setHealthData] = useState({
    age: "",
    height: "",
    weight: "",
    conditions: "",
  });
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const chartRef = useRef(null);

  // Initialize the ECharts chart
  useEffect(() => {
    if (chartRef.current) {
      const healthChart = echarts.init(chartRef.current);
      const option = {
        grid: { top: 20, right: 20, bottom: 20, left: 40 },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: { lineStyle: { color: "#eee" } },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#eee" } },
          splitLine: { lineStyle: { color: "#eee" } },
        },
        series: [
          {
            data: [72, 75, 73, 76, 74, 71, 75],
            type: "line",
            smooth: true,
            symbolSize: 8,
            lineStyle: { color: "#00B5B5" },
            itemStyle: { color: "#00B5B5" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(0, 181, 181, 0.2)" },
                { offset: 1, color: "rgba(0, 181, 181, 0)" },
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

  const handleChange = (e) => {
    setHealthData({ ...healthData, [e.target.name]: e.target.value });
  };

  const getAISuggestions = async () => {
    const res = await fetch("/api/ai-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientData: JSON.stringify(healthData) }),
    });
    const data = await res.json();
    setAiSuggestions(data.text);
  };

  return (
    <div className="bg-white min-h-screen relative">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white z-50 border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="font-['Pacifico'] text-primary text-xl">Vivea Health</div>
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <i className="ri-user-3-line text-primary"></i>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-20 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Hello, Patient</h1>
          <p className="text-gray-500 text-sm">Let's check your health status</p>
        </div>

        {/* Health Cards Section (you can extract these later into their own components) */}
        <div className="overflow-x-auto mb-6">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            <div className="bg-white shadow rounded-lg p-4 w-40">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-primary"></i>
                </div>
                <span className="text-xs text-gray-500">Now</span>
              </div>
              <p className="text-sm text-gray-500">Heart Rate</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold">75</span>
                <span className="text-sm text-gray-500 mb-1">bpm</span>
              </div>
            </div>
            {/* Add more cards for blood pressure, sleep quality, etc. */}
          </div>
        </div>

        {/* Health Trends Chart */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Health Trends</h2>
            <button className="text-primary text-sm">View All</button>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div ref={chartRef} className="h-48"></div>
          </div>
        </div>

        {/* Health Info Form / MyChart Toggle */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Enter Your Health Info</h2>
          {!useMyChart ? (
            <div className="space-y-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={healthData.age}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            <input
              type="text"
              name="height"
              placeholder={`Height (e.g., 5'9")`}
              value={healthData.height}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />

              <input
                type="number"
                name="weight"
                placeholder="Weight (lbs)"
                value={healthData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              <textarea
                name="conditions"
                placeholder="Existing Diagnoses (e.g., Diabetes, Hypertension)"
                value={healthData.conditions}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              <div className="flex gap-4">
                <button
                  onClick={getAISuggestions}
                  className="bg-primary text-white py-2 px-4 rounded"
                >
                  Get AI Health Suggestions
                </button>
                <button
                  onClick={() => setUseMyChart(true)}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                >
                  Connect MyChart
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">MyChart Connected ✅</h2>
              <p className="text-sm text-gray-500">
                Your health data is being synced automatically.
              </p>
            </div>
          )}
          {aiSuggestions && (
            <p className="mt-4">
              <strong>AI Suggestions:</strong> {aiSuggestions}
            </p>
          )}
        </div>

        {/* Daily Schedule */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <i className="ri-capsule-line text-primary"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Take Medicine</h3>
                  <p className="text-sm text-gray-500">Vitamin D - 1 tablet</p>
                </div>
                <span className="text-sm text-primary">9:00 AM</span>
              </div>
            </div>
            {/* Add more schedule entries as needed */}
          </div>
        </div>

        {/* Chatbot Integration */}
        <Chatbot />
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <button className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center">
          <i className="ri-message-3-fill text-white text-xl"></i>
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t z-50">
        <div className="grid grid-cols-4 h-16">
          <button className="flex flex-col items-center justify-center gap-1">
            <i className="ri-home-5-fill text-primary text-xl"></i>
            <span className="text-xs text-primary">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <i className="ri-robot-line text-gray-400 text-xl"></i>
            <span className="text-xs text-gray-400">AI Chat</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <i className="ri-file-list-line text-gray-400 text-xl"></i>
            <span className="text-xs text-gray-400">Records</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <i className="ri-settings-line text-gray-400 text-xl"></i>
            <span className="text-xs text-gray-400">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
