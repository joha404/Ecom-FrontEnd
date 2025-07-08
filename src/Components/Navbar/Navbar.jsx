import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./../../assets/images/freshcart-logo.svg";
import DesktopMenu from "../../shared/navbar/DesktopMenu.jsx";
import MobileMenu from "../../shared/navbar/MobileMenu.jsx";
import MenuToggleButton from "../../shared/navbar/MenuToggleButton.jsx";
import SearchInput from "../common/SearchInput";
import { useSelector } from "react-redux";
import axios from "axios";
import { SearchProduct } from "../../api/product/product.js";

export default function Navbar({ numOfCartItems = 0, wishlistCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const cartItems = useSelector((state) => state.cart.cartItem);
  const cartCount = cartItems.length;
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
    setIsMenuOpen(false);
  }, [window.location.pathname]);

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

  // Fetch suggestions when query changes
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        // If SearchProduct expects a query string param, pass it like this:
        const res = await SearchProduct(encodeURIComponent(query));

        // Or if it expects an object with a 'query' property:
        // const res = await SearchProduct({ query: encodeURIComponent(query) });
        console.log(res.data.data);

        if (res.data && res.data.data) {
          setSuggestions(res.data.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching product suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSelectSuggestion = (product) => {
    console.log(product._id);
    navigate(`/productDetails/${product._id}`);
  };

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
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative bg-white dark:bg-gray-900 lg:bg-transparent">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <img src={logo} className="h-8" alt="Logo" />
              </Link>

              {/* Search */}
              <div className="flex-grow mx-6 hidden md:block">
                <SearchInput
                  value={query}
                  onChange={setQuery}
                  placeholder="Search products..."
                  suggestions={suggestions}
                  onSelectSuggestion={handleSelectSuggestion}
                />
              </div>

              {/* Desktop Menu */}
              <DesktopMenu
                token={token}
                numOfCartItems={numOfCartItems}
                wishlistCount={wishlistCount}
              />

              {/* Mobile Menu Toggle */}
              <MenuToggleButton
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>

            {/* Mobile Menu Overlay */}
            <MobileMenu
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              token={token}
              numOfCartItems={numOfCartItems}
              wishlistCount={wishlistCount}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
