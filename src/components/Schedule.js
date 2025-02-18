// src/components/Schedule.js
import { useState } from "react";
import AddScheduleCard from "./AddScheduleCard";
import ScheduleDetailModal from "./ScheduleDetailModal";

export default function Schedule() {
  const [scheduleItems, setScheduleItems] = useState([
    { id: 1, title: "Take Medicine", details: "Vitamin D - 1 tablet", time: "9:00 AM" },
    { id: 2, title: "Doctor Appointment", details: "Dr. Emily Watson", time: "2:30 PM" },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowScheduleModal(true);
  };

  const handleAddSchedule = () => {
    // Placeholder: Replace with form/modal logic later
    alert("Add schedule functionality coming soon!");
  };

  const handleModalClose = () => {
    setShowScheduleModal(false);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Today's Schedule
      </h2>
      <div className="space-y-4">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <i className="ri-capsule-line text-primary"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.details}
                </p>
              </div>
              <span className="text-sm text-primary">{item.time}</span>
            </div>
          </div>
        ))}
        {/* New Add Schedule Card */}
        <AddScheduleCard onClick={handleAddSchedule} />
      </div>

      {/* Schedule Detail Modal */}
      {showScheduleModal && selectedItem && (
        <ScheduleDetailModal item={selectedItem} onClose={handleModalClose} />
      )}
    </div>
  );
}
