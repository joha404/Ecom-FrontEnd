import React from "react";

export default function UserInfo({ user, userInformation }) {
  return (
    <div className="flex items-center gap-6 mb-10 p-2">
      <img
        src={user.profileImage}
        alt="User Profile"
        className="rounded-md w-24 h-24 outline outline-2 outline-offset-2 outline-blue-500 relative z-10"
      />

      <div>
        <h1 className="text-3xl font-serif text-gray-900 dark:text-white">
          {userInformation?.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {userInformation?.email}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          {userInformation?.number}
        </p>
      </div>
    </div>
  );
}
