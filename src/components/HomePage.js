// src/components/HomePage.js
"use client";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Chatbot from "../../src/components/Chatbot"; // adjust path as needed
import HealthStatCard from "./HealthStatCard";
import AddStatCard from "./AddStatCard";
import VitalStatsManager from "./VitalStatsManager";
import HabitDetailModal from "./HabitDetailModal";
import AccountMenu from "./AccountMenu";
import SettingsMenu from "./SettingsMenu";
import Schedule from "./Schedule";
import RecordsPanel from "./RecordsPanel";
import RecordDetailModal from "./RecordDetailModal";

export default function HomePage({
  patientName,
  healthData,
  aiSuggestions, // array of objects { suggestion, detail }
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
  // References for the chart and animations
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Local state for various modals/menus
  const [showVitalStatsManager, setShowVitalStatsManager] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showRecordsPanel, setShowRecordsPanel] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  // Sample health metrics for stat cards
  const healthMetrics = [
    { key: "heartRate", name: "Heart Rate", value: 75, unit: "bpm", icon: "ri-heart-pulse-line", tooltip: "Beats per minute" },
    { key: "bloodPressure", name: "Blood Pressure", value: "120/80", unit: "mmHg", icon: "ri-drop-line", tooltip: "Systolic/Diastolic" },
    { key: "sleepQuality", name: "Sleep Quality", value: 7.5, unit: "hrs", icon: "ri-moon-line", tooltip: "Hours of sleep" },
    { key: "bloodSugar", name: "Blood Sugar", value: 95, unit: "mg/dL", icon: "ri-water-flash-line", tooltip: "Glucose level" },
    { key: "cholesterol", name: "Cholesterol", value: 180, unit: "mg/dL", icon: "ri-apple-line", tooltip: "Cholesterol level" },
    { key: "bodyTemperature", name: "Body Temp", value: 98.6, unit: "°F", icon: "ri-temp-hot-line", tooltip: "Normal body temperature" },
  ];

  // Initialize ECharts
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
        series: [{
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
        }],
      };
      instance.setOption(option);
      const resizeChart = () => instance.resize();
      window.addEventListener("resize", resizeChart);
      return () => window.removeEventListener("resize", resizeChart);
    }
  }, [dummyData, selectedMetric]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption({
        series: [{
          data: dummyData[selectedMetric],
        }]
      });
    }
  }, [selectedMetric, dummyData]);

  // Handlers for modals
  const handleHabitClick = (habit) => {
    setSelectedHabit(habit);
    setShowHabitModal(true);
  };

  const handleRecordClick = (record) => {
    setShowRecordsPanel(false);
    setSelectedRecord(record);
    setShowRecordModal(true);
  };

  const handleRecordModalClose = () => {
    setShowRecordModal(false);
    setShowRecordsPanel(true);
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 z-50 border-b dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <div className="font-['Pacifico'] text-primary dark:text-teal-300 text-xl">
              Vivea
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-2 py-1 bg-gray-500 dark:bg-gray-700 text-white text-sm rounded"
            >
              {darkMode ? <i className="ri-sun-line" /> : <i className="ri-moon-line" />}
            </button>
          </div>
          <div className="relative">
            <button onClick={() => setShowAccountMenu(!showAccountMenu)}>
              <div className="w-8 h-8 rounded-full bg-gray-500 dark:bg-gray-600 flex items-center justify-center">
                <i className="ri-user-3-line text-primary dark:text-teal-300"></i>
              </div>
            </button>
            {showAccountMenu && (
              <AccountMenu
                patientName={patientName || "Sarah"}
                onClose={() => setShowAccountMenu(false)}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Chatbot Window */}
      {showChatbot && (
        <div className="fixed bottom-20 right-4 z-40 w-[400px] h-[500px]">
          <Chatbot />
        </div>
      )}

      {/* Habit Detail Modal */}
      {showHabitModal && selectedHabit && (
        <HabitDetailModal habit={selectedHabit} onClose={() => setShowHabitModal(false)} />
      )}

      {/* Settings Menu */}
      {showSettingsMenu && (
        <SettingsMenu onClose={() => setShowSettingsMenu(false)} />
      )}

      {/* Records Panel */}
      {showRecordsPanel && (
        <RecordsPanel onClose={() => setShowRecordsPanel(false)} onRecordClick={handleRecordClick} />
      )}

      {/* Record Detail Modal */}
      {showRecordModal && selectedRecord && (
        <RecordDetailModal record={selectedRecord} onClose={handleRecordModalClose} />
      )}

      {/* Vital Stats Manager Modal */}
      {showVitalStatsManager && (
        <VitalStatsManager onClose={() => setShowVitalStatsManager(false)} />
      )}

      {/* Main Content */}
      <main className="pt-16 pb-32 px-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
            Hello, {patientName || "Sarah"}
          </h1>
          <p className="text-gray-800 dark:text-gray-300 text-sm">
            Let's check your health status
          </p>
        </div>

        {/* Health Stat Cards – Mobile View */}
        <div className="md:hidden overflow-x-auto hide-scrollbar mb-6 pr-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mb-4">
            Health Stats
          </h2>
          <div className="flex gap-4 justify-center pl-4" style={{ minWidth: "100vw" }}>
            {healthMetrics.map((metric) => (
              <div key={metric.key} className="flex-shrink-0" style={{ width: "33.33vw" }}>
                <HealthStatCard
                  metricName={metric.name}
                  value={metric.value}
                  unit={metric.unit}
                  icon={metric.icon}
                  tooltip={metric.tooltip}
                  selected={selectedMetric === metric.key}
                  onClick={() => onMetricChange(metric.key)}
                />
              </div>
            ))}
            <div className="flex-shrink-0" style={{ width: "33.33vw" }}>
              <AddStatCard onClick={() => setShowVitalStatsManager(true)} />
            </div>
          </div>
        </div>

        {/* Health Stat Cards – Desktop View */}
        <div className="hidden md:block overflow-x-auto hide-scrollbar mb-6 pr-4">
          <div className="flex gap-4 justify-center pl-2" style={{ minWidth: "calc(6 * 10rem + 5 * 1rem)" }}>
            {healthMetrics.slice(0, 5).map((metric) => (
              <div key={metric.key} className="flex-shrink-0 w-40">
                <HealthStatCard
                  metricName={metric.name}
                  value={metric.value}
                  unit={metric.unit}
                  icon={metric.icon}
                  tooltip={metric.tooltip}
                  selected={selectedMetric === metric.key}
                  onClick={() => onMetricChange(metric.key)}
                />
              </div>
            ))}
            <div className="flex-shrink-0 w-40 flex items-center justify-center">
              <AddStatCard onClick={() => setShowVitalStatsManager(true)} />
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

        {/* Schedule Component */}
        <Schedule />

        {/* Healthy Habits Section */}
        {aiSuggestions && aiSuggestions.length > 0 && (
          <>
            {/* Desktop Healthy Habits */}
            <div className="hidden md:block mb-6 pr-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mb-4">
                Healthy Habits
              </h2>
              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex gap-4 justify-center pl-2" style={{ minWidth: "calc(8 * 10rem + 7 * 1rem)" }}>
                  {aiSuggestions.slice(0, 8).map((habit, index) => (
                    <div
                      key={index}
                      onClick={() => handleHabitClick(habit)}
                      className="cursor-pointer bg-white dark:bg-gray-800 shadow-xl border border-gray-300 dark:border-gray-600 rounded-lg p-4 w-40 flex flex-col justify-between"
                    >
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {habit.suggestion}
                      </p>
                      <span className="text-xs text-gray-800 dark:text-gray-400 mt-2 block">
                        AI Suggestion
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Mobile Healthy Habits */}
            <div className="md:hidden overflow-x-auto hide-scrollbar mb-6 pr-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mb-4">
                Healthy Habits
              </h2>
              <div className="flex gap-4 justify-start pl-4" style={{ minWidth: "100vw" }}>
                {aiSuggestions.slice(0, 8).map((habit, index) => (
                  <div key={index} className="flex-shrink-0" style={{ width: "33.33vw" }}>
                    <div
                      onClick={() => handleHabitClick(habit)}
                      className="cursor-pointer bg-white dark:bg-gray-800 shadow-xl border border-gray-300 dark:border-gray-600 rounded-lg p-4"
                      title="Click for more details"
                    >
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {habit.suggestion}
                      </p>
                      <span className="text-xs text-gray-800 dark:text-gray-400 mt-2 block">
                        AI Suggestion
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
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
            onClick={() => {
              switchTab("home");
              setShowChatbot(false);
            }}
            className={`flex flex-col items-center justify-center gap-1 ${activeTab === "home" ? "text-teal-700" : "text-gray-500"}`}
          >
            <i className="ri-home-5-fill text-xl"></i>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => {
              switchTab("ai");
              setShowChatbot(!showChatbot);
            }}
            className={`flex flex-col items-center justify-center gap-1 ${activeTab === "ai" ? "text-teal-700" : "text-gray-500"}`}
          >
            <i className="ri-robot-line text-xl"></i>
            <span className="text-xs">AI Chat</span>
          </button>
          <button
            onClick={() => {
              switchTab("records");
              setShowRecordsPanel(true);
            }}
            className={`flex flex-col items-center justify-center gap-1 ${activeTab === "records" ? "text-teal-700" : "text-gray-500"}`}
          >
            <i className="ri-file-list-line text-xl"></i>
            <span className="text-xs">Records</span>
          </button>
          <button
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            className={`flex flex-col items-center justify-center gap-1 ${activeTab === "settings" ? "text-teal-700" : "text-gray-500"}`}
          >
            <i className="ri-settings-line text-xl"></i>
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>

      {/* Settings Menu */}
      {showSettingsMenu && (
        <div className="fixed bottom-20 right-4 z-40">
          <SettingsMenu onClose={() => setShowSettingsMenu(false)} />
        </div>
      )}

      {/* Records Panel */}
      {showRecordsPanel && (
        <RecordsPanel onClose={() => setShowRecordsPanel(false)} onRecordClick={handleRecordClick} />
      )}

      {/* Record Detail Modal */}
      {showRecordModal && selectedRecord && (
        <RecordDetailModal record={selectedRecord} onClose={handleRecordModalClose} />
      )}

      {/* Vital Stats Manager Modal */}
      {showVitalStatsManager && (
        <VitalStatsManager onClose={() => setShowVitalStatsManager(false)} />
      )}
    </>
  );
}
