import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HomePage from "../../src/components/HomePage";

export default function Dashboard() {
  const router = useRouter();
  const { query } = router;

  // Check for auth token on mount; if not present, redirect to login
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/patient/login");
    }
  }, [router]);

  // Retrieve patient data from query parameters (or use defaults)
  const [patientName] = useState(query.patientName || "Sarah");
  const [healthData] = useState({
    age: query.age || "",
    height: query.height || "",
    weight: query.weight || "",
    conditions: query.conditions || "",
  });

  // Dashboard states for chart and labels
  const [selectedMetric, setSelectedMetric] = useState("heartRate");
  const dummyData = {
    heartRate: [72, 75, 73, 76, 74, 71, 75, 78, 74, 72, 77, 75, 73, 76],
    bloodPressure: [120, 122, 119, 121, 123, 120, 118, 121, 122, 120, 119, 121, 123, 120],
    sleepQuality: [7.5, 7.0, 7.8, 7.2, 7.6, 7.4, 7.5, 7.2, 7.6, 7.3, 7.8, 7.4, 7.6, 7.5],
  };
  const metricLabels = {
    heartRate: "Heart Rate (bpm)",
    bloodPressure: "Blood Pressure (mmHg)",
    sleepQuality: "Sleep Quality (hrs)",
  };

  // Dark mode state and toggle function
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  // Additional UI states for bottom navigation and chatbot
  const [activeTab, setActiveTab] = useState("home");
  const switchTab = (tab) => setActiveTab(tab);
  const [showChatbot, setShowChatbot] = useState(false);

  // For demo, add some dummy AI suggestions
  const dummySuggestions = [
    "Drink more water",
    "Take a 10-minute walk",
    "Add more greens to your diet",
    "Practice deep breathing",
  ];

  return (
    <HomePage
      patientName={patientName}
      healthData={healthData}
      aiSuggestions={dummySuggestions}
      selectedMetric={selectedMetric}
      dummyData={dummyData}
      metricLabels={metricLabels}
      onMetricChange={setSelectedMetric}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      activeTab={activeTab}
      switchTab={switchTab}
      showChatbot={showChatbot}
      setShowChatbot={setShowChatbot}
    />
  );
}
