// components/Address/AddressCard.jsx
import React from "react";
import EditIcon from "./EditIcon";
import TrashIcon from "./TrashIcon";

export default function AddressCard({
  addr,
  selectedAddressId,
  setSelectedAddressId,
  editingId,
  handleEdit,
  handleDelete,
  formData,
  setFormData,
  handleChange,
  handleSave,
  handleCancel,
  showingIcon,
}) {
  const isEditing = editingId === addr._id;

  return (
    <div
      className={`relative border rounded p-6 bg-gray-50 shadow-sm hover:shadow-md transition flex flex-col ${
        selectedAddressId === addr._id
          ? "ring-2 ring-blue-300 border-blue-500"
          : ""
      }`}
    >
      <div className="absolute top-3 left-3">
        <input
          type="radio"
          name="selectedAddress"
          checked={selectedAddressId === addr._id}
          onChange={() => setSelectedAddressId(addr._id)}
          className="form-radio h-5 w-5 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
        />
      </div>

      {showingIcon && (
        <div className="absolute top-3 right-3 flex space-x-2 text-gray-600">
          <button
            onClick={() => handleEdit(addr._id)}
            aria-label="Edit Address"
            className="p-1 rounded hover:text-blue-700 transition"
          >
            <EditIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDelete(addr._id)}
            aria-label="Delete Address"
            className="p-1 rounded hover:text-red-600 transition"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {isEditing ? (
        <div className="space-y-4 mt-6">
          {[
            { label: "FullName", name: "fullName" },
            { label: "Phone", name: "phone" },
            { label: "Street", name: "street" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "ZIP", name: "postalCode" },
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
                value={formData[name] || ""}
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
              { label: "FullName", value: addr.fullName },
              { label: "Phone", value: addr.phone },
              { label: "Street", value: addr.street },
              { label: "City", value: addr.city },
              { label: "State", value: addr.state },
              { label: "ZIP", value: addr.postalCode },
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
  );
}
