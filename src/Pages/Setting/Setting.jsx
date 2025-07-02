import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PasswordSection from "../../Components/setting/PasswordSection";
import ProfileForm from "../../Components/setting/ProfileForm";
import Button from "../../Components/common/Button";
import { getProfile, updateProfile } from "../../api/auth/profile";
import toast from "react-hot-toast";

export default function Setting() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      bio: "",
      location: "",
      website: "",
      gender: "",
      dateOfBirth: "",
      social: { facebook: "", instagram: "" },
    },
  });

  const fetchProfile = async () => {
    setIsLoading(true);
    const res = await getProfile();
    setUserData(res);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.user?.name || "");
      setValue("email", userData.user?.email || "");
      setValue("phoneNumber", userData.phoneNumber || "");
      setValue("bio", userData.bio || "");
      setValue("location", userData.location || "");
      setValue("website", userData.website || "");
      setValue("gender", userData.gender || "");
      setValue("dateOfBirth", userData.dateOfBirth?.split("T")[0] || "");
      setValue("social.facebook", userData.socialLinks?.facebook || "");
      setValue("social.instagram", userData.socialLinks?.instagram || "");
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
      toast.success("Your Profile Updated Successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong!");
    }
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
                <Button
                  type="submit"
                  className="relative px-4 py-2 bg-blue-600 text-white rounded-md font-medium flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>

        <ProfileForm
          register={register}
          setValue={setValue}
          isEditing={isEditing}
        />

        <PasswordSection
          isEditing={isEditing}
          register={register}
          onChangePassword={handleSubmit(handleChangePassword)}
        />
      </form>
    </motion.div>
  );
}
