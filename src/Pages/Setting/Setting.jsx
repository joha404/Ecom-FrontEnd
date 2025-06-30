// components/settings/Setting.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PasswordSection from "../../Components/setting/PasswordSection";
import ProfileForm from "../../Components/setting/ProfileForm";
import AvatarUploader from "../../Components/setting/AvatarUploader";
import Button from "../../Components/common/Button";

export default function Setting() {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar:
        "https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg",
      firstName: "Md",
      lastName: "Joha",
      email: "mdjoha@example.com",
      bio: "",
      location: "",
      website: "",
      social: { facebook: "", twitter: "", linkedin: "", github: "" },
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempAvatar(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log("Saved data:", data);
    setIsEditing(false);
  };

  const handleChangePassword = (data) => {
    alert("Password change requested!");
  };

  const handleCancel = () => {
    reset();
    setTempAvatar(null);
    setIsEditing(false);
  };

  const avatarUrl = tempAvatar || watch("avatar");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full min-h-screen bg-gray-50 mt-20 py-12 px-4 sm:px-6 md:px-8 flex justify-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white rounded-xl shadow p-6 sm:p-8 md:p-10 flex flex-col gap-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              Account Settings
            </h2>
            <p className="text-sm text-gray-500 max-w-xs">
              Update your profile and personal details here.
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            ) : (
              <>
                <Button type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </>
            )}
          </div>
        </div>

        <AvatarUploader
          isEditing={isEditing}
          avatarUrl={avatarUrl}
          onChange={handleAvatarChange}
        />
        <ProfileForm register={register} isEditing={isEditing} />
        <PasswordSection
          isEditing={isEditing}
          register={register}
          onChangePassword={handleSubmit(handleChangePassword)}
        />
      </form>
    </motion.div>
  );
}
