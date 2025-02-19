// src/components/RecordDetailModal.js
export default function RecordDetailModal({ record, onClose }) {
    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 lexend text-gray-900 dark:text-gray-100">Record Detail</h2>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
            <strong>Date:</strong> {record.date}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
            <strong>Description:</strong> {record.description}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
            <strong>Result:</strong> {record.result}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-300">
            Additional details: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet.
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
  