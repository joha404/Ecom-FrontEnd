import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/common/PrimaryButton";
export default function RightSide({ cartItems }) {
  const navigate = useNavigate();
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplied, setIsApplied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalItems = cartItems?.items?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const originalTotal = cartItems?.totalPrice || 0;
  const discountedTotal = (originalTotal - discount).toFixed(2);

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const code = voucherCode.trim().toUpperCase();

    if (code === "JOHA") {
      const discountAmount = originalTotal * 0.15;
      setDiscount(discountAmount);
      setIsApplied(true);
      setError("");
    } else {
      setDiscount(0);
      setIsApplied(false);
      setError("Invalid voucher code.");
    }
    setIsLoading(false);
  };

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
              {totalItems}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Total Price
            </span>
            <span className="font-medium text-gray-900 dark:text-white line-through">
              ${originalTotal.toFixed(2)}
            </span>
          </div>
          {isApplied && (
            <div className="flex justify-between">
              <span className="text-green-600 font-medium">Discount (15%)</span>
              <span className="text-green-600 font-medium">
                -${discount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900 dark:text-white">
              Final Total
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${discountedTotal}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full rounded-md bg-green-500 px-4 py-2 text-white font-medium hover:bg-green-600"
        >
          Proceed to Checkout
        </button>

        <div
          onClick={() => navigate("/")}
          className="text-center text-sm text-gray-500 dark:text-gray-400 cursor-pointer"
        >
          Continue Shopping
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 mt-4">
        <form className="space-y-4" onSubmit={handleApplyVoucher}>
          <label
            htmlFor="voucher"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            Do you have a voucher or gift card?
          </label>
          <input
            id="voucher"
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder="Enter code"
            className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {isApplied && (
            <p className="text-sm text-green-600">
              Coupon applied successfully!
            </p>
          )}
          <PrimaryButton
            isSubmitting={isLoading}
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600"
          >
            Apply Code
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
