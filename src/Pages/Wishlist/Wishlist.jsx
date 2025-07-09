import React, { useState } from "react";
import { FaSpinner, FaStar, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import img from "./../../assets/images/wishlist.jpg";
import { useWishlist } from "../../utilits/useWishlist";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [loadingId, setLoadingId] = useState(null);

  const handleRemove = (productId) => {
    setLoadingId(productId);
    removeFromWishlist(productId);
    toast.success("Removed from wishlist", {
      position: "bottom-right",
      duration: 1000,
    });
    setLoadingId(null);
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist</title>
      </Helmet>
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-green-600  mt-32 text-2xl font-bold py-5">
          My Wishlist
        </h2>

        {wishlist.length > 0 ? (
          <div className="grid gap-6 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
              >
                {/* Action buttons */}
                <div className="absolute top-1.5 right-2 flex gap-1">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-2 rounded-full text-red-500 hover:text-red-700"
                    aria-label="Delete item"
                  >
                    {loadingId === item._id ? (
                      <FaSpinner className="w-4 h-4 animate-spin" />
                    ) : (
                      <FaRegTrashAlt className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Product content */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <img
                    className="h-20 w-20 object-cover rounded-md"
                    src={item.images?.[0]}
                    alt={item.name}
                  />
                  <div className="w-full space-y-2">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${item.price}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400" />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-300">
                          {item.ratingsAverage || "5.0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <img
              src={img}
              alt="No products"
              className="w-80 h-80 mb-4 rounded-lg shadow-md"
            />
            <p className="text-center text-gray-700 text-2xl font-semibold dark:text-gray-300">
              No Products In Your Wishlist
            </p>
          </div>
        )}
      </div>
    </>
  );
}
