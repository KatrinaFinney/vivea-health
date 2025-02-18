// src/components/ScheduleDetailModal.js
export default function ScheduleDetailModal({ item, onClose }) {
    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {item.title}
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
            <strong>Details:</strong> {item.details}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
            <strong>Time:</strong> {item.time}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-300">
            Additional placeholder details for this schedule item. You can include more information here about the event, reminders, or any instructions.
          </p>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-teal-700 text-white py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  