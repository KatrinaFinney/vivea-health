"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function SplashPage({ onLoginClick, onCreateAccountClick }) {
  const router = useRouter();
  const containerRef = useRef(null);      // Ref for inner splash container
  const backgroundRef = useRef(null);     // Ref for the animated background

  // Fallback navigation functions if no props provided
  const navigateToLogin = onLoginClick || (() => router.push("/patient/login"));
  const navigateToCreate = onCreateAccountClick || (() => router.push("/patient/input"));

  useEffect(() => {
    // Animate the inner container with a fade and scale effect
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );

    // Animate the gradient background by updating CSS variables:
    // Starts at light teal (fallback) then transitions to darker teal tones.
    gsap.to(backgroundRef.current, {
      duration: 8,
      // Animate to darker teal values
      "--color1": "#006d6d", // Darker teal
      "--color2": "#005f5f", // Even deeper teal
      ease: "expo.inOut",
      repeat: -1,  // Loop the animation indefinitely
      yoyo: true,  // Reverse the animation on each cycle
    });
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="min-h-screen flex items-center justify-center"
      style={{
        fontFamily: "Lexend, serif",
        // Start with a lighter teal gradient for a gentle entry
        background: "linear-gradient(45deg, var(--color1, #b2f7ef), var(--color2, #89e0d9))"
      }}
    >
      <div
        ref={containerRef}
        className="border-4 border-gray-300 dark:border-gray-600 rounded-3xl p-6 w-[360px] min-h-[640px] flex flex-col justify-center mx-auto bg-white dark:bg-gray-900"
      >
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1
            className="text-6xl font-bold text-primary"
            style={{ fontSize: "5rem", marginBottom: "2.5rem" }}
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
