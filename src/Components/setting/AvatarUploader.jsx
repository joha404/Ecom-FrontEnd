// components/settings/AvatarUploader.jsx
import { Image as ImageIcon } from "lucide-react";

export default function AvatarUploader({ isEditing, avatarUrl, onChange }) {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <label
        htmlFor="avatar-upload"
        className={`relative inline-block group cursor-pointer ${
          isEditing ? "" : "pointer-events-none opacity-70"
        }`}
      >
        <img
          className="h-28 sm:h-32 w-28 sm:w-32 rounded-full object-cover shadow-md ring-4 ring-primary/50 transition-transform duration-300 group-hover:scale-105"
          src={avatarUrl}
          alt="Avatar"
        />
        {isEditing && (
          <div className="absolute inset-0 bg-black bg-opacity-25 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ImageIcon className="h-10 sm:h-12 w-10 sm:w-12 text-white" />
          </div>
        )}
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
          disabled={!isEditing}
        />
      </label>
      <p className="text-xs text-gray-500 max-w-xs mt-2">
        For best results, upload an image at least <strong>512x512</strong>{" "}
        pixels in size.
      </p>
    </div>
  );
}
