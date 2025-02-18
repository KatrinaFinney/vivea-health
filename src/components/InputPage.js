// src/components/InputPage.js
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";

export default function InputPage() {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [healthData, setHealthData] = useState({
    age: "",
    height: "",
    weight: "",
    conditions: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: null }));
    if (name === "patientName") {
      setPatientName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setHealthData({ ...healthData, [name]: value });
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!patientName.trim()) newErrors.patientName = "Name is required.";
    if (!email.trim() || !email.includes("@"))
      newErrors.email = "Please enter a valid email.";
    if (!password) newErrors.password = "Password is required.";
    if (!healthData.age || isNaN(healthData.age) || Number(healthData.age) <= 0)
      newErrors.age = "Please enter a valid age.";
    if (!healthData.height.trim()) newErrors.height = "Height is required.";
    if (!healthData.weight || isNaN(healthData.weight) || Number(healthData.weight) <= 0)
      newErrors.weight = "Please enter a valid weight.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    // Simulate account creation delay then navigate to dashboard with query parameters
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: "/patient/dashboard",
        query: { patientName, email, ...healthData },
      });
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div
        ref={containerRef}
        className="border-4 border-gray-300 dark:border-gray-600 rounded-3xl p-4 w-[360px] min-h-[640px] flex flex-col justify-center mx-auto bg-white dark:bg-gray-900"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Create Your Account
          </h1>
        </div>
        <div className="max-w-md w-full space-y-4">
          {/* Patient Name */}
          <div>
            <input
              type="text"
              name="patientName"
              placeholder="Your Name"
              value={patientName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.patientName && (
              <p className="text-xs text-red-500 mt-1">{errors.patientName}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          {/* Age */}
          <div>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={healthData.age}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.age && (
              <p className="text-xs text-red-500 mt-1">{errors.age}</p>
            )}
          </div>
          {/* Height */}
          <div>
            <input
              type="text"
              name="height"
              placeholder="Height (e.g., 5'9)"
              value={healthData.height}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.height && (
              <p className="text-xs text-red-500 mt-1">{errors.height}</p>
            )}
          </div>
          {/* Weight */}
          <div>
            <input
              type="number"
              name="weight"
              placeholder="Weight (lbs)"
              value={healthData.weight}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.weight && (
              <p className="text-xs text-red-500 mt-1">{errors.weight}</p>
            )}
          </div>
          {/* Conditions */}
          <div>
            <textarea
              name="conditions"
              placeholder="Existing Diagnoses (e.g., Diabetes, Hypertension)"
              value={healthData.conditions}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-teal-600 text-white py-3 px-6 rounded shadow-lg transition-colors"
          >
            {isLoading ? "Creating your account..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
