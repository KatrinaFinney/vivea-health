// pages/patient/dashboard.js
import { useRouter } from "next/router";
import { useState } from "react";
import HomePage from "../../src/components/HomePage";

// Example list of 50 healthy habits
const healthyHabitsList = [
  "Drink more water", "Take a 10-minute walk", "Eat more vegetables", "Get 7-8 hours of sleep",
  "Practice meditation", "Limit sugar intake", "Avoid processed foods", "Do stretching exercises",
  "Reduce screen time", "Eat more fruits", "Try a new healthy recipe", "Practice deep breathing",
  "Avoid caffeine in the afternoon", "Maintain a balanced diet", "Keep a food journal", "Incorporate lean protein",
  "Do strength training", "Go for a run", "Eat whole grains", "Practice yoga",
  "Monitor portion sizes", "Avoid late-night snacking", "Take regular breaks", "Stay socially active",
  "Practice gratitude", "Get a health check-up", "Maintain proper posture", "Reduce salt intake",
  "Limit alcohol consumption", "Incorporate omega-3 fats", "Practice mindfulness", "Prioritize mental health",
  "Use stairs instead of elevators", "Spend time outdoors", "Try a digital detox day", "Keep a regular meal schedule",
  "Avoid overeating", "Track your progress", "Stay consistent with exercise", "Cook at home more often",
  "Reduce stress with hobbies", "Listen to calming music", "Stay hydrated with herbal teas", "Engage in a creative activity",
  "Practice positive self-talk", "Schedule regular work breaks", "Keep a consistent sleep schedule", "Take time for self-care",
  "Practice intermittent fasting", "Set daily health goals"
];

// Convert to objects with suggestion and detail
const healthyHabitsObjects = healthyHabitsList.map(habit => ({
  suggestion: habit,
  detail: `This is a detailed explanation for "${habit}". It includes benefits, tips, and additional advice.`
}));

export default function Dashboard() {
  const router = useRouter();
  const { query } = router;

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
    bloodSugar: [90, 92, 94, 95, 93, 91, 94, 96, 92, 90, 93, 95, 94, 92],
    cholesterol: [170, 175, 180, 178, 182, 177, 180, 185, 179, 175, 180, 182, 178, 176],
    bodyTemperature: [98.6, 98.7, 98.5, 98.6, 98.8, 98.5, 98.6, 98.7, 98.6, 98.6, 98.5, 98.7, 98.6, 98.8]
  };

  const metricLabels = {
    heartRate: "Heart Rate (bpm)",
    bloodPressure: "Blood Pressure (mmHg)",
    sleepQuality: "Sleep Quality (hrs)",
    bloodSugar: "Blood Sugar (mg/dL)",
    cholesterol: "Cholesterol (mg/dL)",
    bodyTemperature: "Body Temperature (°F)"
  };

  // Dark mode state and toggle function
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  // Additional UI states for bottom navigation, chatbot, and records panel
  const [activeTab, setActiveTab] = useState("home");
  const switchTab = (tab) => setActiveTab(tab);
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <HomePage
      patientName={patientName}
      healthData={healthData}
      aiSuggestions={healthyHabitsObjects}  // Pass all 50 habit objects
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
