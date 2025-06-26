import { useContext, useEffect, useState } from "react";
import { FaSpinner, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProductItem({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addProductToCart, setNumOfCartItems } = useContext(CartContext);
  const { AddProductToWishlist, getLoggedUserWishlist, setCount } =
    useContext(WishlistContext);

  useEffect(() => {
    async function checkIfInWishlist() {
      const response = await getLoggedUserWishlist();
      if (response.data?.status === "success") {
        const wishlistIds = response.data.data.map((item) => item._id);
        if (wishlistIds.includes(product._id)) {
          setIsInWishlist(true);
        }
      }
    }
    checkIfInWishlist();
  }, []);

  async function handleAddProductToCart(pID) {
    setIsLoading(true);
    const response = await addProductToCart(pID);
    if (response.data?.status === "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      toast.success("Added to cart", { position: "bottom-right" });
    } else {
      toast.error("Failed to add to cart", { position: "bottom-right" });
    }
    setIsLoading(false);
  }

  async function handleAddtoWishlist(e, pID) {
    e.preventDefault();
    e.stopPropagation();
    const response = await AddProductToWishlist(pID);
    if (response.data?.status === "success") {
      const res = await getLoggedUserWishlist();
      setCount(res.data.count);
      setIsInWishlist(true);
      toast.success(response.data.message, { position: "bottom-right" });
    } else {
      toast.error("Error adding to wishlist", { position: "bottom-right" });
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="relative group overflow-hidden rounded-xl shadow-md bg-white dark:bg-gray-900"
      whileHover="visible"
      initial="hidden"
      animate="hidden"
      variants={{
        visible: {},
        hidden: {},
      }}
    >
      <Link to={`/productDetails/${product._id}/${product.category.name}`}>
        <motion.img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-56 object-cover rounded-t-xl my-6 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="p-4">
          <h2 className="text-green-600 text-sm font-medium">
            {product.category.name}
          </h2>
          <p className="font-semibold dark:text-white mt-1 truncate">
            {product.title}
          </p>
          <div className="flex justify-between items-center mt-3">
            <h5 className="text-gray-800 dark:text-white font-semibold text-sm">
              {product.priceAfterDiscount ? (
                <>
                  <span className="line-through text-red-500 me-2">
                    ${product.price}
                  </span>
                  ${product.priceAfterDiscount}
                </>
              ) : (
                <>${product.price}</>
              )}
            </h5>
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <FaStar />
              <span className="text-gray-600 dark:text-white">
                {product.ratingsAverage}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Animated Overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md px-4 py-3 flex justify-between items-center rounded-b-xl z-10 pointer-events-none group-hover:pointer-events-auto"
        variants={overlayVariants}
      >
        <motion.button
          className="text-white text-xl hover:text-red-400 transition pointer-events-auto"
          onClick={(e) => handleAddtoWishlist(e, product._id)}
          whileTap={{ scale: 0.9 }}
        >
          <i
            className={`${isInWishlist ? "fa-solid" : "fa-regular"} fa-heart`}
          ></i>
        </motion.button>

        <motion.button
          onClick={(e) => {
            e.preventDefault();
            handleAddProductToCart(product._id);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 pointer-events-auto"
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <FaSpinner className="fa-spin" />
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
