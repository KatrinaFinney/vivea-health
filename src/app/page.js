"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function SplashPage({ onLoginClick, onCreateAccountClick }) {
  const router = useRouter();
  const containerRef = useRef(null);

  // Fallback navigation functions if no props provided
  const navigateToLogin = onLoginClick || (() => router.push("/patient/login"));
  const navigateToCreate = onCreateAccountClick || (() => router.push("/patient/input"));

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-teal-800 dark:bg-teal-800"
      style={{ fontFamily: "Bona Nova SC, serif" }}
    >
      <div
        ref={containerRef}
        className="border-4 border-gray-300 dark:border-gray-600 rounded-3xl p-6 w-[360px] min-h-[640px] flex flex-col justify-center mx-auto bg-white dark:bg-gray-900"
      >
        {/* Combined Header Section */}
        <div className="text-center mb-4">
          <h1
            className="text-6xl font-bold text-primary"
            style={{ fontSize: "4rem", marginBottom: "0.5rem" }}  // Reduced bottom margin
          >
            Vivea Health
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-300" style={{ marginTop: 0 }}>
            Your AI health guide
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={navigateToLogin}
            className="bg-primary hover:bg-teal-600 text-white py-3 px-6 rounded w-4/5 transition-colors"
          >
            Log In
          </button>
          <div className="text-center text-gray-800 dark:text-gray-300">or</div>
          <button
            onClick={navigateToCreate}
            className="bg-primary hover:bg-teal-600 text-white py-3 px-6 rounded w-4/5 transition-colors"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
