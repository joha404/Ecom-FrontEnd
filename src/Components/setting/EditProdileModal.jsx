import React, { useState } from "react";

export default function EditProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({ ...profile });
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("social.")) {
      const socialKey = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        social: { ...prev.social, [socialKey]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setAvatarUrl(localUrl);
      setForm((prev) => ({ ...prev, avatar: localUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg relative">
        <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Avatar</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Preview"
                className="mt-2 w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>

          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="website"
            placeholder="Website"
            value={form.website}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {["facebook", "twitter", "linkedin", "github"].map((platform) => (
            <input
              key={platform}
              type="text"
              name={`social.${platform}`}
              placeholder={`Social - ${platform}`}
              value={form.social?.[platform] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ))}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
