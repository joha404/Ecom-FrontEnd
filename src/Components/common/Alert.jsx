import React from "react";

export default function Alert({
  title,
  description,
  actions,
  variant = "info",
  icon = null,
}) {
  const colorClasses = {
    info: "border-blue-300 bg-blue-50 text-blue-800",
    error: "border-red-300 bg-red-50 text-red-800",
    success: "border-green-300 bg-green-50 text-green-800",
  };

  return (
    <div
      className={`w-full border rounded p-4 flex flex-col gap-2 ${colorClasses[variant]}`}
    >
      <div className="flex items-start gap-2">
        {icon && <div>{icon}</div>}
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      {actions && <div className="flex justify-end">{actions}</div>}
    </div>
  );
}
