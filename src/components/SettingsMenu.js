// src/components/SettingsMenu.js
import React from "react";

export default function SettingsMenu({ onClose }) {
  // Dummy click handler for settings items.
  const handleClick = (item) => {
    alert(`You clicked ${item}`);
    // You can add navigation or further functionality here.
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 shadow-lg rounded border border-gray-200 dark:border-gray-700 p-4 max-w-sm w-full">
      <h3 className=" lexend font-bold text-gray-900 dark:text-gray-100 mb-2">Settings</h3>
      <ul className="space-y-2">
        <li
          onClick={() => handleClick("Account Preferences")}
          className="cursor-pointer lexend text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
        >
          Account Preferences
        </li>
        <li
          onClick={() => handleClick("Privacy")}
          className="cursor-pointer lexend text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
        >
          Privacy
        </li>
        <li
          onClick={() => handleClick("Notifications")}
          className="cursor-pointer lexend text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
        >
          Notifications
        </li>
      </ul>
      <button
        onClick={onClose}
        className="mt-4 w-full lexend bg-teal-700 text-white py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
