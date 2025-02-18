// src/components/HabitDetailModal.js
export default function HabitDetailModal({ habit, onClose }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {habit.suggestion}
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-4">
            {habit.detail ||
              "This is a detailed explanation of this healthy habit. It provides tips and benefits for adopting this habit."}
          </p>
          <button
            onClick={onClose}
            className="w-full bg-teal-700 text-white py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  