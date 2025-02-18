// src/components/RecordsPanel.js
export default function RecordsPanel({ onClose, onRecordClick }) {
    // Placeholder records array
    const records = [
      { date: "2025-02-01", description: "Annual physical examination", result: "Normal" },
      { date: "2025-03-15", description: "Blood test", result: "Slightly elevated cholesterol" },
      { date: "2025-04-10", description: "Eye exam", result: "Normal" },
      { date: "2025-05-05", description: "Dental checkup", result: "No issues" },
    ];
  
    return (
      <div className="fixed top-16 right-0 z-50 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300">
        <div className="relative p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Patient Records</h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-2xl text-gray-600 dark:text-gray-300"
          >
            &times;
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          {records.map((record, index) => (
            <div
              key={index}
              onClick={() => onRecordClick && onRecordClick(record)}
              className="mb-4 border border-gray-300 dark:border-gray-700 p-3 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{record.date}</p>
              <p className="text-sm text-gray-800 dark:text-gray-300">{record.description}</p>
              <p className="text-sm text-gray-800 dark:text-gray-300">Result: {record.result}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  