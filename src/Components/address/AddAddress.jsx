import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import { createAddress } from "../../api/user/address";
import toast from "react-hot-toast";

export default function AddAddress({ onSuccess, addressFetch }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Bangladesh",
    isDefault: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetails = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const userId = userDetails?.id;
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const payload = {
      ...formData,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      street: formData.street.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      postalCode: formData.postalCode.trim(),
      country: formData.country.trim(),
      user: userId,
    };

    try {
      setIsLoading(true);
      await createAddress(payload);
      await addressFetch();
      toast.success("Address Added Successfully");
      if (onSuccess) onSuccess();
      setIsLoading(false);
    } catch (error) {
      alert("Failed to create address. Please try again.");
      console.error("Error creating address:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl max-h-[90vh] overflow-y-auto mx-auto mt-0 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Address</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold mb-1 text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold mb-1 text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Street */}
        <div>
          <label
            htmlFor="street"
            className="block text-sm font-semibold mb-1 text-gray-700"
          >
            Street
          </label>
          <input
            id="street"
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              State
            </label>
            <input
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ZIP & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              ZIP Code
            </label>
            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Default checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="isDefault"
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label
            htmlFor="isDefault"
            className="text-sm font-semibold text-gray-700"
          >
            Set as default address
          </label>
        </div>

        <PrimaryButton isSubmitting={isLoading}>Add New Address</PrimaryButton>
      </form>
    </div>
  );
}
