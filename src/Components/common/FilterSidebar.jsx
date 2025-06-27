import React from "react";

export default function FilterSidebar({ priceRange, setPriceRange }) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
      <div className="flex flex-col gap-2">
        <label>
          Min Price:
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full mt-1 p-1 border rounded"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full mt-1 p-1 border rounded"
          />
        </label>
      </div>
    </div>
  );
}
