import { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCartThunk } from "../../api/product/cart";
import { useWishlist } from "../../utilits/useWishlist";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

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

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  return (
    <motion.div
      className="relative flex flex-col w-full max-w-xs overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <Link to={`/productDetails/${product._id}`}>
        {/* Image section */}
        <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl">
          <img
            className="object-cover w-full h-full"
            src={product.images?.[0]}
            alt={product.name}
          />
          {product.oldPrice && (
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-sm font-medium text-white">
              {Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
              )}
              % OFF
            </span>
          )}
        </div>

        {/* Product details */}
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-slate-900 truncate">
            {product.name}
          </h5>

          <div className="mt-2 mb-4 flex items-center justify-between">
            <p>
              {product.oldPrice ? (
                <>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  <span className="text-sm line-through text-slate-400 ml-2">
                    ${product.oldPrice}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price}
                </span>
              )}
            </p>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400 h-5 w-5" />
              <span className="text-sm text-slate-600 font-semibold">5.0</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <motion.button
              onClick={handleWishlistClick}
              className={`${
                isInWishlist(product._id) ? "text-red-600" : "text-gray-400"
              } hover:text-red-600 text-lg`}
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart />
            </motion.button>

            <motion.button
              onClick={handleAddToCart}
              disabled={isLoading}
              whileTap={{ scale: 0.95 }}
              className={`${
                isLoading
                  ? "cursor-not-allowed bg-green-400"
                  : "bg-green-600 hover:bg-green-700"
              } text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition duration-200`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
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
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
