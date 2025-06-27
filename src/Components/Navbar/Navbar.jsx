import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./../../assets/images/freshcart-logo.svg";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import UserProfileDropdown from "./UserProfileDropdown";
import ToggleMode from "./ToggleMode";
import SearchInput from "../common/SearchInput";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

export default function Navbar({ numOfCartItems = 0, wishlistCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Update token and close menu on route change
  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
    setIsMenuOpen(false);
  }, [location]);

  // Show/hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 100) setShowNavbar(true);
      else if (currentY > lastScrollY && currentY > 300) setShowNavbar(true);
      else if (currentY > 100 && currentY < 300) setShowNavbar(false);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white dark:bg-gray-900 shadow-md"
          >
            <div
              className={`max-w-screen-xl flex items-center justify-between mx-auto p-4 relative bg-white dark:bg-gray-900 lg:bg-transparent`}
            >
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <img src={logo} className="h-8" alt="Logo" />
              </Link>

              {/* Menu Button - Hamburger / Cross - SHOWS ONLY ON SMALL SCREENS */}
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="Search products..."
              />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                type="button"
                className="inline-flex items-center p-2 text-gray-700 dark:text-gray-300 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-green-600 z-50"
              >
                {isMenuOpen ? (
                  // Cross icon
                  <RxCross1 />
                ) : (
                  <CiMenuBurger />
                )}
              </button>

              {/* Desktop navigation */}
              <div className="hidden lg:flex lg:w-auto">
                {!token && (
                  <ul className="flex items-center gap-4">
                    {["/", "/products", "/categories", "/brands"].map(
                      (path, idx) => (
                        <li key={idx}>
                          <NavLink to={path} className="nav-link capitalize">
                            {path === "/" ? "Home" : path.slice(1)}
                          </NavLink>
                        </li>
                      )
                    )}
                    <li>
                      <NavLink to="/cart" className="nav-link relative">
                        <LuShoppingCart className="text-green-600 text-2xl" />
                        {/* Badge for cart items */}
                        {numOfCartItems > 0 && (
                          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {numOfCartItems}
                          </span>
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/wishlist" className="nav-link relative">
                        <FaRegHeart className="text-red-600 text-2xl" />
                        {/* Badge for wishlist */}
                        {wishlistCount > 0 && (
                          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  </ul>
                )}

                <ul className="flex items-center gap-4 ml-6">
                  {token ? (
                    <>
                      <li>
                        <NavLink to="/login" className="nav-link">
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/register" className="nav-link">
                          Register
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <UserProfileDropdown />
                  )}
                  <li>
                    <ToggleMode />
                  </li>
                </ul>
              </div>

              {/* Mobile nav overlay */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg z-40 lg:hidden"
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
                      className="absolute top-0 right-0 w-64 h-auto bg-black/30 backdrop-blur-sm text-white p-6 flex flex-col gap-6 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {token && (
                        <>
                          {["/", "/products", "/categories", "/brands"].map(
                            (path, idx) => (
                              <li key={idx}>
                                <NavLink
                                  to={path}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="nav-link capitalize"
                                >
                                  {path === "/" ? "Home" : path.slice(1)}
                                </NavLink>
                              </li>
                            )
                          )}
                          <li>
                            <NavLink
                              to="/cart"
                              onClick={() => setIsMenuOpen(false)}
                              className="nav-link relative"
                            >
                              <LuShoppingCart className="text-green-600 text-2xl" />
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/wishlist"
                              onClick={() => setIsMenuOpen(false)}
                              className="nav-link relative"
                            >
                              <FaRegHeart className="text-red-600 text-2xl" />
                            </NavLink>
                          </li>
                        </>
                      )}

                      {token ? (
                        <>
                          <li>
                            <NavLink
                              to="/login"
                              onClick={() => setIsMenuOpen(false)}
                              className="nav-link"
                            >
                              Login
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/register"
                              onClick={() => setIsMenuOpen(false)}
                              className="nav-link"
                            >
                              Register
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <li>
                          <UserProfileDropdown
                            closeMenu={() => setIsMenuOpen(false)}
                          />
                        </li>
                      )}
                      <li className="mt-auto">
                        <ToggleMode />
                      </li>
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
