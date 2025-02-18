// src/components/AddStatCard.js
export default function AddStatCard({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 cursor-pointer flex flex-col items-center justify-center"
      >
        <span className="text-4xl font-bold text-teal-700">+</span>
        <p className="text-xs text-gray-500 mt-1">Add Stat</p>
      </div>
    );
  }
  