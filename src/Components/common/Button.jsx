import React from "react";
import classNames from "classnames";

// components/settings/Button.jsx
export default function Button({
  children,
  type = "button",
  onClick,
  variant,
  className,
}) {
  const baseClass =
    "px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700";
  const neutralClass = "bg-gray-600 hover:bg-gray-700";
  const destructiveClass = "bg-red-600 hover:bg-red-700";

  let styleClass = baseClass;
  if (variant === "neutral-secondary") styleClass = neutralClass;
  if (variant === "destructive-secondary") styleClass = destructiveClass;

  return (
    <button
      /** ✅ this must apply your custom type properly */
      type={type}
      onClick={onClick}
      className={`${styleClass} ${className || ""}`}
    >
      {children}
    </button>
  );
}
