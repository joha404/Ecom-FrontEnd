import React from "react";

export default function AddressSkeleton() {
  return (
    <div>
      <div className="border rounded p-6 bg-gray-100 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex justify-between mb-2">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
