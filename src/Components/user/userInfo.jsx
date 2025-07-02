import { FaUserGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function UserInfo({ user, userInformation }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-3xl flex justify-between items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center gap-6">
          <img
            src={user?.profileImage}
            alt="User Profile"
            className="rounded-md w-24 h-24 outline outline-2 outline-offset-2 outline-blue-500"
          />

          <div>
            <h1 className="text-2xl font-serif text-gray-900 dark:text-white">
              {userInformation?.name || "No Name"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {userInformation?.email || "No Email"}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {userInformation?.number || "No Number"}
            </p>
          </div>
        </div>

        <div className=" flex justify-center items-center p-4 ">
          <FaUserGear
            size={36}
            onClick={() => navigate("/settings")}
            className="cursor-pointer hover:text-primary-500  "
          />
        </div>
      </div>
    </div>
  );
}
