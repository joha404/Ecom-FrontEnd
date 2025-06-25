import { Link, NavLink } from "react-router-dom";
import logo from "./../../assets/images/freshcart-logo.svg";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, setToken } = useContext(userContext);
  const { numOfCartItems } = useContext(CartContext);
  const { count } = useContext(WishlistContext);

  const [isSticky, setIsSticky] = useState(false);

  // Listen to scroll and update isSticky state
  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSignOut() {
    setToken(null);
  }

  return (
    <>
      {/* Animated sticky navbar */}
      <AnimatePresence>
        {(isSticky || true) && ( // Show navbar always, but animate sticky style
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-shadow duration-300 ${
              isSticky
                ? "bg-white shadow-lg dark:bg-gray-900"
                : "bg-transparent shadow-none"
            }`}
          >
            <div className="max-w-screen-xl flex gap-5 flex-wrap items-center mx-auto p-4">
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={logo} className="h-8" alt="E-commerce Logo" />
              </Link>
              <button
                onClick={toggleMenu}
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center ms-auto p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                className={`${
                  isMenuOpen ? "block" : "hidden"
                } w-full lg:w-auto grow lg:flex justify-between`}
                id="navbar-default"
              >
                {!token && (
                  <>
                    <ul className="font-medium text-center flex items-center flex-col p-4 lg:p-0 mt-4 border   lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0   ">
                      <li>
                        <NavLink
                          to="/"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="products"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="categories"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          Categories
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="brands"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          Brands
                        </NavLink>
                      </li>
                      <li className="flex gap-2 lg:gap-5 items-center mt-2 lg:mt-0">
                        <NavLink
                          to="cart"
                          className="relative block cursor-pointer py-3 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          <FaShoppingCart className="text-green-600 text-2xl" />
                          <span className="bg-red-400 w-5 h-5 rounded-full flex justify-center items-center text-white absolute top-[-7px] right-[-2px] lg:top-[-18px] lg:right-[-12px]">
                            {numOfCartItems}
                          </span>
                        </NavLink>
                        <NavLink
                          to="wishlist"
                          className="relative block cursor-pointer py-3 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          <FaHeart className="text-red-600 text-2xl" />
                          <span className="bg-red-400 w-5 h-5 rounded-full flex justify-center items-center text-white absolute top-[-7px] right-[-2px] lg:top-[-18px] lg:right-[-12px]">
                            {count}
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </>
                )}
                <ul className="ms-auto font-medium flex items-center flex-col p-4 lg:p-0 mt-4 border   lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
                  {!token && (
                    <>
                      <li>
                        <NavLink
                          to="login"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="register"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          Register
                        </NavLink>
                      </li>
                    </>
                  )}

                  {token && (
                    <>
                      <li>
                        <span
                          onClick={handleSignOut}
                          className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          SignOut
                        </span>
                      </li>
                    </>
                  )}

                  <li>
                    <ToggleMode />
                  </li>
                </ul>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

// Dark mode toggle button (unchanged)
function ToggleMode() {
  const ref = useRef(document.querySelector("html"));
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    ref.current.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      id="theme-toggle"
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
      {isDarkMode ? (
        <svg
          id="theme-toggle-dark-icon"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg
          id="theme-toggle-light-icon"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
