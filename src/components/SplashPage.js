"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  const navigateToLogin = () => {
    router.push("/patient/login");
  };

  const navigateToCreate = () => {
    router.push("/patient/input");
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
          <h1 className="text-6xl font-bold font-['Pacifico'] text-primary">
            Welcome
          </h1>
          <p className="mt-2 text-3xl font-normal text-gray-800 dark:text-gray-300">
            to Vivea Health
          </p>
          <p className="mt-4 text-sm text-gray-800 dark:text-gray-300">
            Your AI health guide
          </p>
        </div>
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
