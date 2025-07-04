import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddressSkeleton from "./AddressSkeleton";
import AddressCard from "./AddressCard";
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "../../api/user/address";
import AddAddress from "./AddAddress";
import Modal from "../common/Modal";
import toast from "react-hot-toast";
import PrimaryButton from "../common/PrimaryButton";

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // ✅ State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  // Fetch addresses
  const fetchAddress = async () => {
    const userDetails = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const userProfileId = userDetails?.id;

    try {
      const res = await getAddress(userProfileId);
      setAddresses(res || []);
      setSelectedAddressId(res?.[0]?._id || null);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleEdit = (id) => {
    const addr = addresses.find((a) => a._id === id);
    if (addr) {
      setFormData(addr);
      setEditingId(id);
    }
  };

  const handleDeleteClick = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (!addressToDelete) return;

    try {
      setDeleteLoading(true);

      await deleteAddress(addressToDelete);
      await fetchAddress();
      toast.success("Address deleted successfully");
      setTimeout(() => {
        setAddressToDelete(null);
        setIsDeleteModalOpen(false);
      }, 300); // adjust if needed
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const userDetails = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const userId = userDetails?.id;

    if (!userId || !editingId) return;

    const payload = {
      user: userId,
      fullName: formData.fullName,
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      isDefault: true,
    };

    try {
      await updateAddress(payload, editingId);
      setAddresses((prev) =>
        prev.map((addr) =>
          addr._id === editingId ? { ...addr, ...payload } : addr
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  const handleCancel = () => setEditingId(null);
  const openAddModal = () => setIsAdding(true);
  const closeAddModal = () => setIsAdding(false);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 grid gap-8 grid-cols-1 lg:grid-cols-2">
        <AddressSkeleton />
        <AddressSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-0 lg:p-6 rounded mt-10">
      <div className="w-full flex justify-between items-center my-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Manage Addresses
        </h2>
        {addresses?.length < 2 ? (
          <PrimaryButton
            onClick={openAddModal}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add New
          </PrimaryButton>
        ) : (
          ""
        )}
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        {addresses.map((addr) => (
          <AddressCard
            key={addr._id}
            showingIcon={true}
            addr={addr}
            selectedAddressId={selectedAddressId}
            setSelectedAddressId={setSelectedAddressId}
            editingId={editingId}
            handleEdit={handleEdit}
            handleDelete={() => handleDeleteClick(addr._id)} // ✅ Pass delete trigger
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        ))}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAddModal}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeAddModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-4xl font-bold"
              >
                &times;
              </button>
              <AddAddress
                addressFetch={fetchAddress}
                onSuccess={() => {
                  closeAddModal();
                  fetchAddress();
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Confirm Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        title="Confirm Delete"
      >
        <p className="mb-4">Are you sure you want to delete this address?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <PrimaryButton
            isSubmitting={deleteLoading}
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
