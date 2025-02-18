// src/components/AddScheduleCard.js
import React from "react";

export default function AddScheduleCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600"
    >
      <div className="text-teal-700 text-3xl font-bold">+</div>
    </div>
  );
}
