import React from "react";

export default function CartSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 animate-pulse"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="shrink-0 bg-gray-200 dark:bg-gray-700 h-20 w-20 rounded" />
            <div className="w-full space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
