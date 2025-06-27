import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import avatar from "../../assets/images/avatar.jpg";
import { FaRegUser } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

export default function UserProfileDropdown() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        src={avatar}
        className="w-10 h-10 rounded-full border-2 border-green-500 cursor-pointer"
        alt="profile"
      />
      <AnimatePresence>
        {isProfileOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 shadow-xl rounded-xl z-50 overflow-hidden ring-1 ring-black/10 dark:ring-white/10"
          >
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaRegUser />
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaUserGear />
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-5 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
              >
                <CiLogout />
                Sign Out
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
