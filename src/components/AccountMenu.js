// src/components/AccountMenu.js
import { useRouter } from "next/router";
import React from "react";

export default function AccountMenu({ patientName, onClose }) {
  const router = useRouter();

  const handleLogout = () => {
    // Remove auth token (dummy) and navigate to login page
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <p className="font-bold text-gray-900 dark:text-gray-100">{patientName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">user@example.com</p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
