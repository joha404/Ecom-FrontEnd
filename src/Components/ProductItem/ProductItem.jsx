import { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { addToCartThunk } from "../../api/product/cart";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const overlayVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id || userInfo?.id;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(
        addToCartThunk({
          userId,
          productId: product._id,
          quantity: 1,
        })
      );
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="relative group overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      whileHover="visible"
      initial="hidden"
      animate="hidden"
      variants={{ visible: {}, hidden: {} }}
    >
      <Link to={`/productDetails/${product._id}`}>
        <motion.img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-56 object-cover rounded-t-xl my-6 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="p-4">
          <h2 className="text-green-600 text-sm font-medium">
            {product?.name}
          </h2>
          <p className="font-semibold dark:text-white mt-1 truncate">
            {product?.description}
          </p>
          <div className="flex justify-between items-center mt-3">
            <h5 className="text-gray-800 dark:text-white font-semibold text-sm">
              {product.oldPrice ? (
                <>
                  <span className="line-through text-red-500 me-2">
                    ${product.oldPrice}
                  </span>
                  ${product.price}
                </>
              ) : (
                <>${product.price}</>
              )}
            </h5>
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <FaStar />
              <span className="text-gray-600 dark:text-white">5.0</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Hover Action Buttons */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md px-4 py-3 flex justify-between items-center rounded-b-xl z-10 pointer-events-none group-hover:pointer-events-auto"
        variants={overlayVariants}
      >
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Wishlist logic can go here
          }}
          className="text-white text-xl hover:text-red-400 transition pointer-events-auto"
          whileTap={{ scale: 0.9 }}
        >
          <FaHeart />
        </motion.button>

        <motion.button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`${
            isLoading
              ? "cursor-not-allowed bg-green-400"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 pointer-events-auto transition duration-200`}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <FiShoppingCart />
              Add to Cart
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
