// src/app/page.js
"use client";
import SplashPage from "../components/SplashPage";

export default function Page() {
  const handleLoginClick = () => {
    // Navigation logic, e.g., router.push("/patient/login")
  };

  const handleCreateAccountClick = () => {
    // Navigation logic, e.g., router.push("/patient/input")
  };

  return (
    <SplashPage 
      onLoginClick={handleLoginClick}
      onCreateAccountClick={handleCreateAccountClick}
    />
  );
}
