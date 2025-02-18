// src/components/HealthStatCard.js
export default function HealthStatCard({ metricName, value, unit, icon, selected, onClick, tooltip }) {
  return (
    <div
      onClick={onClick}
      title={tooltip}  // Tooltip text
      className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-40 cursor-pointer ${
        selected ? "ring-2 ring-teal-500" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <i className={`${icon} text-teal-700 dark:text-teal-300`}></i>
        </div>
        <span className="text-xs text-gray-800 dark:text-gray-300">Now</span>
      </div>
      <p className="text-sm text-gray-800 dark:text-gray-300">{metricName}</p>
      <div className="flex items-end gap-1">
        <span className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</span>
        <span className="text-sm text-gray-800 dark:text-gray-400 mb-1">{unit}</span>
      </div>
    </div>
  );
}
