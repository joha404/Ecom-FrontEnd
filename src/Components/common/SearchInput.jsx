import React, { useState, useEffect, useRef } from "react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  debounceTime = 300,
  showClear = true,
  className = "",
  suggestions = [],
  onSelectSuggestion,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [inputValue, debounceTime, onChange]);

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={wrapperRef}>
      <input
        type="search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-10 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        autoComplete="off"
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
          onClick={() => {
            setInputValue("");
            onChange("");
          }}
          className="absolute inset-y-0 right-7 flex items-center px-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          aria-label="Clear search"
          type="button"
          tabIndex={0}
        ></button>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-md bg-white border border-gray-300 shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="cursor-pointer px-4 py-2 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500"
              onClick={() => {
                onSelectSuggestion(item);
                setShowSuggestions(false);
                setInputValue(item.name);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
