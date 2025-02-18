// src/components/LoginPage.js
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";

export default function LoginPage({ onSubmit = () => {} }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("LoginPage: running GSAP animation");
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: null, general: null }));
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: null, general: null }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    // Simulate authentication API call delay (2 seconds)
    setTimeout(() => {
      // For demo: valid credentials are email: user@example.com, password: password
      if (email === "user@example.com" && password === "password") {
        // Store a dummy auth token in localStorage
        localStorage.setItem("authToken", "dummy-token");
        // Navigate to dashboard
        router.push("/patient/dashboard");
      } else {
        setErrors({ general: "Invalid email or password." });
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div
        ref={containerRef}
        className="border-4 border-gray-300 dark:border-gray-600 rounded-3xl p-6 w-[360px] min-h-[640px] flex flex-col justify-center mx-auto bg-white dark:bg-gray-900"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Log In</h1>
        </div>
        <div className="max-w-md w-full space-y-4">
          {errors.general && (
            <p className="text-xs text-red-500 text-center">{errors.general}</p>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChangeEmail}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChangePassword}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-teal-600 text-white py-3 px-6 rounded shadow-lg transition-colors"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}
