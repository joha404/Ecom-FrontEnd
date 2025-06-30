import React from "react";

export default function TextField({ label, helpText, children, className }) {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {children}
      {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}

// Now supports readOnly and both react-hook-form or controlled
TextField.Input = React.forwardRef(
  ({ placeholder, type = "text", readOnly = false, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-3 py-2 border rounded text-sm focus:outline-none ${
          readOnly
            ? "bg-gray-100 cursor-not-allowed"
            : "focus:ring-2 focus:ring-blue-500 bg-white"
        }`}
        {...rest}
      />
    );
  }
);
