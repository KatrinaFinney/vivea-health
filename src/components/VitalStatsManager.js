import { useState } from "react";

const VitalStatsManager = () => {
  const [showModal, setShowModal] = useState(false);

  const vitals = [
    { id: 1, name: "Heart Rate", value: "75 bpm", icon: "ri-heart-pulse-line" },
    { id: 2, name: "Blood Pressure", value: "120/80 mmHg", icon: "ri-drop-line" },
    { id: 3, name: "Sleep Quality", value: "7.5 hrs", icon: "ri-moon-line" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Vital Stats</h2>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar">
        {vitals.map((vital) => (
          <div key={vital.id} className="bg-white shadow rounded-lg p-4 w-40">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <i className={`${vital.icon} text-primary`}></i>
              </div>
              <span className="text-xs text-gray-500">Now</span>
            </div>
            <p className="text-sm text-gray-500">{vital.name}</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold">{vital.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Stat Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md shadow-lg hover:opacity-90 transition"
      >
        Add a Stat
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Feature Coming Soon</h3>
            <p className="text-gray-500 text-sm">
              In future updates, you’ll be able to customize your vital stats. Stay tuned!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VitalStatsManager;
