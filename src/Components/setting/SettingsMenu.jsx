import React from "react";

export default function SettingsMenu({ children, className }) {
  return (
    <aside className={`w-[240px] p-6 border-r border-gray-200 ${className}`}>
      {children}
    </aside>
  );
}

SettingsMenu.Item = function SettingsItem({ label, selected = false, icon }) {
  return (
    <button
      className={`w-full flex items-center gap-2 px-3 py-2 text-left rounded text-sm ${
        selected
          ? "bg-blue-100 text-blue-700 font-medium"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
