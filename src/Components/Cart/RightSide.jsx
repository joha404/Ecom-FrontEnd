import React from "react";

export default function RightSide({ cartItems }) {
  return (
    <div>
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
              {cartItems?.items?.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Total Price
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${cartItems?.totalPrice}
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
  );
}
