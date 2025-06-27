import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import mockCartData from "./cartJson.json";

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  useEffect(() => {
    // Simulate fetching from backend
    setCartItems(mockCartData);
  }, []);

  function handleUpdateCountOfProduct(pID, count) {
    setCartItems((prev) => {
      const updatedProducts = prev.data.products.map((item) => {
        if (item._id === pID) {
          return { ...item, count: Math.max(1, count) };
        }
        return item;
      });

      return {
        ...prev,
        data: {
          ...prev.data,
          products: updatedProducts,
          totalCartPrice: updatedProducts.reduce(
            (total, item) => total + item.price * item.count,
            0
          ),
        },
        numOfCartItems: updatedProducts.reduce(
          (sum, item) => sum + item.count,
          0
        ),
      };
    });

    toast.success("Quantity updated!");
  }

  function handleDeleteItem(pID) {
    setCartItems((prev) => {
      const updatedProducts = prev.data.products.filter(
        (item) => item._id !== pID
      );
      return {
        ...prev,
        data: {
          ...prev.data,
          products: updatedProducts,
          totalCartPrice: updatedProducts.reduce(
            (total, item) => total + item.price * item.count,
            0
          ),
        },
        numOfCartItems: updatedProducts.reduce(
          (sum, item) => sum + item.count,
          0
        ),
      };
    });

    toast.success("Product removed from cart!");
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-14">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Left section - Product List */}
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems?.data?.products.map((product) => (
                <div
                  key={product._id}
                  className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="absolute top-1.5 right-2 flex gap-1">
                    <button className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                      <FaRegHeart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(product._id)}
                      className="p-2 rounded-full text-red-500 hover:text-red-700"
                    >
                      <FaRegTrashAlt className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <a href="#" className="shrink-0">
                      <img
                        className="h-20 w-20"
                        src={product.imageCover}
                        alt={product.title}
                      />
                    </a>

                    <div className="w-full space-y-2">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              handleUpdateCountOfProduct(
                                product._id,
                                product.count - 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            <FaMinus />
                          </button>
                          <input
                            type="text"
                            value={product.count}
                            readOnly
                            className="w-12 h-8 text-center bg-white dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white"
                          />
                          <button
                            onClick={() =>
                              handleUpdateCountOfProduct(
                                product._id,
                                product.count + 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right section - Summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Total Items
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {cartItems?.numOfCartItems}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Total Price
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${cartItems?.data?.totalCartPrice}
                  </span>
                </div>
              </div>

              <button className="w-full rounded-md bg-green-500 px-4 py-2 text-white font-medium hover:bg-green-600">
                Proceed to Checkout
              </button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Continue Shopping
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <label
                  htmlFor="voucher"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Do you have a voucher or gift card?
                </label>
                <input
                  id="voucher"
                  type="text"
                  placeholder="Enter code"
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600"
                >
                  Apply Code
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
