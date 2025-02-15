// src/components/InputPage.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function InputPage() {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [healthData, setHealthData] = useState({
    age: "",
    height: "",
    weight: "",
    conditions: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "patientName") {
      setPatientName(value);
    } else {
      setHealthData({ ...healthData, [name]: value });
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate a delay and then navigate to the dashboard page with query parameters
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: "/patient/dashboard",
        query: { patientName, ...healthData },
      });
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="border-4 border-gray-300 rounded-3xl p-4 w-[360px] min-h-[640px] flex flex-col justify-center mx-auto bg-[#F7F3EC]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Tell Us About You
          </h1>
        </div>
        <div className="max-w-md w-full space-y-4">
          <input
            type="text"
            name="patientName"
            placeholder="Your Name"
            value={patientName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-white text-gray-900"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={healthData.age}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-white text-gray-900"
          />
          <input
            type="text"
            name="height"
            placeholder={`Height (e.g., 5'9")`}
            value={healthData.height}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-white text-gray-900"
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (lbs)"
            value={healthData.weight}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-white text-gray-900"
          />
          <textarea
            name="conditions"
            placeholder="Existing Diagnoses (e.g., Diabetes, Hypertension)"
            value={healthData.conditions}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-white text-gray-900"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-700 text-white py-3 px-6 rounded"
          >
            {isLoading ? "Creating your dashboard..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
