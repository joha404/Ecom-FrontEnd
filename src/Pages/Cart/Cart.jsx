import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import {
  clearAllCartItems,
  getAllCart,
  removeSingleCart,
} from "../../api/product/cart";
import { getSingleProduct } from "../../api/product/product";
import RightSide from "../../Components/Cart/RightSide";
import CartSkeleton from "../../Components/Cart/CartSkeleton";
import Button from "../../Components/common/Button";
import ConfirmModal from "../../Components/common/ConfirmModal";
import { useDispatch } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState({ items: [], totalPrice: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id || userInfo?.id;

  const fetchCart = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const res = await getAllCart(userId);
      if (!res || !res.items) {
        setCartItems({ items: [], totalPrice: 0 });
        return;
      }

      const cartWithFullProducts = await Promise.all(
        res.items.map(async (item) => {
          try {
            const resProduct = await getSingleProduct(item?.productId);

            // safely check if data and product exist
            const fullProduct = resProduct?.data?.product;
            if (!fullProduct) return null;

            return {
              ...item,
              productId: { ...item.productId, ...fullProduct },
            };
          } catch (err) {
            console.error(`Failed to fetch product ${item?.productId}:`, err);
            return null; // skip this product
          }
        })
      );

      const filteredItems = cartWithFullProducts.filter(Boolean); // remove nulls

      const totalPrice = filteredItems.reduce(
        (sum, item) => sum + item.quantity * Number(item.productId.price),
        0
      );

      setCartItems({ items: filteredItems, totalPrice });
    } catch (err) {
      console.error("Cart fetch error:", err);
      setCartItems({ items: [], totalPrice: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleUpdateCountOfProduct = (itemId, newQty) => {
    setCartItems((prev) => {
      const updatedItems = prev.items.map((item) =>
        item._id === itemId ? { ...item, quantity: Math.max(1, newQty) } : item
      );
      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.quantity * Number(item.productId.price),
        0
      );
      return { ...prev, items: updatedItems, totalPrice: updatedTotal };
    });
    toast.success("Quantity updated!");
  };

  const handleDeleteIconClick = (productId) => {
    setItemToDelete(productId);
    setShowDeleteItemModal(true);
  };

  const handleDeleteItemConfirm = async () => {
    if (!itemToDelete) return;
    try {
      setIsLoading(true);
      await removeSingleCart({ userId, productId: itemToDelete }, dispatch);
      await fetchCart();
      toast.success("Product removed from cart!");
    } catch (error) {
      toast.error("Failed to remove item");
      console.error(error);
    } finally {
      setIsLoading(false);
      setShowDeleteItemModal(false);
      setItemToDelete(null);
    }
  };

  const handleClearAllConfirm = async () => {
    try {
      setIsLoading(true);
      await clearAllCartItems({ userId }, dispatch);
      await fetchCart();
      toast.success("All cart items cleared!");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error(error);
    } finally {
      setIsLoading(false);
      setShowClearAllModal(false);
      setShowDeleteItemModal(false);
      setItemToDelete(null);
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-14">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>
          {cartItems?.items?.length > 1 && (
            <Button onClick={() => setShowClearAllModal(true)}>
              Clear All
            </Button>
          )}
        </div>

        <ConfirmModal
          isOpen={showClearAllModal}
          onClose={() => setShowClearAllModal(false)}
          onConfirm={handleClearAllConfirm}
          isLoading={isLoading}
          title="Are You Sure?"
          description="Are you sure you want to clear all cart items? This action cannot be undone."
          confirmText="Delete All"
          cancelText="Cancel"
        />

        <ConfirmModal
          isOpen={showDeleteItemModal}
          onClose={() => setShowDeleteItemModal(false)}
          onConfirm={handleDeleteItemConfirm}
          isLoading={isLoading}
          title="Delete Item?"
          description="Are you sure you want to remove this item from your cart?"
          confirmText="Delete"
          cancelText="Cancel"
        />

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {isLoading ? (
              <CartSkeleton />
            ) : cartItems?.items?.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No cart items added.
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.items.map((item) => (
                  <div
                    key={item._id}
                    className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="absolute top-1.5 right-2 flex gap-1">
                      <button className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <FaRegHeart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteIconClick(item.productId._id)
                        }
                        className="p-2 rounded-full text-red-500 hover:text-red-700"
                        aria-label="Delete item"
                      >
                        <FaRegTrashAlt className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <img
                        className="h-20 w-20 object-cover"
                        src={item.productId.images?.[0]}
                        alt={item.productId.name}
                      />
                      <div className="w-full space-y-2">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          {item.productId.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.productId.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                            <button
                              onClick={() =>
                                handleUpdateCountOfProduct(
                                  item._id,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                              <FaMinus />
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-12 h-8 text-center bg-white dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white"
                            />
                            <button
                              onClick={() =>
                                handleUpdateCountOfProduct(
                                  item._id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            ${item.productId.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <RightSide cartItems={cartItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
