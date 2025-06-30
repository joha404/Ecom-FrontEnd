import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import UserProfileDropdown from "../../Components/Navbar/UserProfileDropdown";

export default function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  token,
  numOfCartItems,
  wishlistCount,
}) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.ul
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="absolute top-0 right-0 w-64 h-auto bg-[#fff] shadow-md text-black dark:bg-gray-900 dark:text-white p-6 flex flex-col gap-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {["/", "/products", "/categories"].map((path, idx) => (
              <li key={idx}>
                <NavLink
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-link capitalize block py-2 px-3 rounded ${
                      isActive
                        ? "text-green-700 dark:text-white font-semibold"
                        : " hover:text-green-700 dark:hover:text-white"
                    } transition`
                  }
                >
                  {path === "/" ? "Home" : path.slice(1)}
                </NavLink>
              </li>
            ))}

            <li>
              <NavLink
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `relative nav-link block py-2 px-3 rounded ${
                    isActive
                      ? "bg-green-100 dark:bg-green-700 text-green-700 dark:text-white font-semibold"
                      : "hover:bg-green-100 dark:hover:bg-green-700 hover:text-green-700 dark:hover:text-white"
                  } transition`
                }
              >
                <LuShoppingCart className="inline mr-2 text-2xl" />
                Cart
                {numOfCartItems > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {numOfCartItems}
                  </span>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `relative nav-link block py-2 px-3 rounded ${
                    isActive
                      ? "bg-red-100 dark:bg-red-700 text-red-700 dark:text-white font-semibold"
                      : "hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-700 dark:hover:text-white"
                  } transition`
                }
              >
                <FaRegHeart className="inline mr-2 text-2xl" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>
            </li>

            {/* Spacer */}
            <li className="mt-auto"></li>

            {/* Profile dropdown or login/register */}
            {token ? (
              <li>
                <UserProfileDropdown closeMenu={() => setIsMenuOpen(false)} />
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-link block py-2 px-3 rounded hover:bg-green-100 dark:hover:bg-green-700 hover:text-green-700 dark:hover:text-white transition"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-link block py-2 px-3 rounded hover:bg-green-100 dark:hover:bg-green-700 hover:text-green-700 dark:hover:text-white transition"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
