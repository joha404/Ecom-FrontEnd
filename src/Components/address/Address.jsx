import React, { useState, useEffect } from "react";

// Dummy data
const initialAddresses = [
  {
    id: 1,
    name: "Home",
    street: "123 Main St",
    city: "Kushtia",
    state: "Khulna",
    zip: "7000",
    country: "Bangladesh",
  },
  {
    id: 2,
    name: "Office",
    street: "456 Corporate Ave",
    city: "Dhaka",
    state: "Dhaka",
    zip: "1207",
    country: "Bangladesh",
  },
];

// Icons
const EditIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
    />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7L5 7M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
    />
  </svg>
);

// Skeleton loader
function SkeletonCard() {
  return (
    <div className="border rounded p-6 bg-gray-100 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex justify-between mb-2">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setAddresses(initialAddresses);
      setSelectedAddressId(initialAddresses[0]?.id || null);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (id) => {
    const addr = addresses.find((a) => a.id === id);
    setFormData(addr);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === editingId ? formData : addr))
    );
    setEditingId(null);
  };

  const handleCancel = () => setEditingId(null);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 grid gap-8 grid-cols-1 lg:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-0 lg:p-6 rounded mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Addresses
      </h2>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`relative border rounded p-6 bg-gray-50 shadow-sm hover:shadow-md transition flex flex-col ${
              selectedAddressId === addr.id
                ? "ring-2 ring-blue-300 border-blue-500"
                : ""
            }`}
          >
            {/* Radio button top-left */}
            <div className="absolute top-3 left-3">
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedAddressId === addr.id}
                onChange={() => setSelectedAddressId(addr.id)}
                className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>

            {/* Icons top-right */}
            <div className="absolute top-3 right-3 flex space-x-2 text-gray-600">
              <button
                onClick={() => handleEdit(addr.id)}
                aria-label="Edit Address"
                className="p-1 rounded hover:text-blue-700 transition"
              >
                <EditIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(addr.id)}
                aria-label="Delete Address"
                className="p-1 rounded hover:text-red-600  transition"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            {editingId === addr.id ? (
              <div className="space-y-4 mt-6">
                {[
                  { label: "Name", name: "name" },
                  { label: "Street", name: "street" },
                  { label: "City", name: "city" },
                  { label: "State", name: "state" },
                  { label: "ZIP", name: "zip" },
                  { label: "Country", name: "country" },
                ].map(({ label, name }, i, arr) => (
                  <div
                    key={name}
                    className={`pb-3 ${
                      i < arr.length - 1 ? "border-b border-gray-300" : ""
                    }`}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

                <div className="flex space-x-4 pt-2">
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="mt-6 mb-4 font-semibold text-xl text-gray-900">
                  {addr.name}
                </h3>
                <div className="flex flex-col">
                  {[
                    { label: "Street", value: addr.street },
                    { label: "City", value: addr.city },
                    { label: "State", value: addr.state },
                    { label: "ZIP", value: addr.zip },
                    { label: "Country", value: addr.country },
                  ].map(({ label, value }, i, arr) => (
                    <div
                      key={label}
                      className={`flex justify-between py-2 ${
                        i < arr.length - 1 ? "border-b border-gray-300" : ""
                      }`}
                    >
                      <span className="font-semibold">{label}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
