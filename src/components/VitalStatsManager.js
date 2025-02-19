import React from "react";

const VitalStatsManager = () => {
  const vitals = [
    { name: "Heart Rate", value: "75 bpm", icon: "ri-heart-pulse-line", time: "Now" },
    { name: "Blood Pressure", value: "120/80 mmHg", icon: "ri-drop-line", time: "Today" },
    { name: "Sleep Quality", value: "7.5 hrs", icon: "ri-moon-line", time: "Last night" },
  ];

  return (
    <div className="overflow-x-auto hide-scrollbar mb-6">
      <div className="flex gap-4" style={{ width: "max-content" }}>
        {vitals.map((vital, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 w-40">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <i className={`${vital.icon} text-primary`}></i>
              </div>
              <span className="text-xs text-gray-500">{vital.time}</span>
            </div>
            <p className="text-sm text-gray-500">{vital.name}</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold">{vital.value.split(" ")[0]}</span>
              <span className="text-sm text-gray-500 mb-1">{vital.value.split(" ")[1]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VitalStatsManager;
