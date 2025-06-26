import React, { useState, useEffect } from "react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  debounceTime = 300,
  showClear = true,
  className = "",
}) {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [inputValue, debounceTime, onChange]);

  return (
    <div className={`relative inline-block ${className}`}>
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-10 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />

      {/* Search Icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Clear Button */}
      {showClear && inputValue && (
        <button
          onClick={() => setInputValue("")}
          className="absolute inset-y-0 right-7 flex items-center px-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          aria-label="Clear search"
          type="button"
          tabIndex={0}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
