// src/components/RecordsModal.js
export default function RecordsModal({ onClose }) {
    // Placeholder records; you can customize these as needed.
    const records = [
      { date: "2025-02-01", description: "Annual physical examination", result: "Normal" },
      { date: "2025-03-15", description: "Blood test", result: "Slightly elevated cholesterol" },
      { date: "2025-04-10", description: "Eye exam", result: "Normal" },
      { date: "2025-05-05", description: "Dental checkup", result: "No issues" },
    ];
  
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl lexend font-bold mb-4 text-gray-900 dark:text-gray-100">Patient Records</h2>
        <ul className="space-y-3">
          {records.map((record, index) => (
            <li key={index} className="border border-gray-300 dark:border-gray-700 p-3 rounded">
              <p className=" lexend text-sm font-semibold text-gray-900 dark:text-gray-100">{record.date}</p>
              <p className=" lexend text-sm text-gray-800 dark:text-gray-300">{record.description}</p>
              <p className=" lexend text-sm text-gray-800 dark:text-gray-300">Result: {record.result}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-teal-700 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    );
  }
  