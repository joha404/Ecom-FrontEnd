import React, { useState } from "react";
import { createPayment } from "../../api/payment/payment";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/common/PrimaryButton";
const OrderSummary = ({
  subtotal,
  discount,
  shipping,
  tax,
  address,
  onContinue,
  userInfo,
  cartDetails,
}) => {
  const total = subtotal - discount + shipping + tax;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(cartDetails);
  const handlePurchase = async () => {
    const cart = cartDetails.map((item) => {
      const productId =
        item?.product?._id ||
        item?.productId?._id ||
        item?.productId ||
        item?.product;

      return {
        product: productId,
        quantity: item.quantity,
        price: item?.price,
        total: item.quantity * item?.price,
      };
    });

    // Optional: filter out invalid cart items (no product ID)
    const validCart = cart.filter((item) => item.product);

    if (validCart.length === 0) {
      return toast.error("Cart has invalid items. Please try again.");
    }

    const payload = {
      user: {
        _id: userInfo?.id || userInfo?._id,
        role: userInfo?.role,
        name: userInfo?.name,
        email: userInfo?.email,
        number: userInfo?.number || "", // fallback to empty string if not present
      },
      addresses: [address],
      cart: validCart,
      totalAmount: total,
      paymentMethod: "SSLCommerz",
    };

    console.log("✅ Payload:", payload);

    try {
      setIsLoading(true);
      const res = await createPayment(payload);
      setIsLoading(false);

      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("No payment URL returned.");
      }
    } catch (err) {
      console.error("❌ Payment failed:", err);
      toast.error("Payment failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <h2 className="text-xl text-slate-900 font-semibold mb-6">
        Order Summary
      </h2>
      <ul className="text-slate-500 font-medium space-y-4">
        <li className="flex flex-wrap gap-4 text-sm">
          Subtotal{" "}
          <span className="ml-auto font-semibold text-slate-900">
            ${subtotal.toFixed(2)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-sm">
          Discount{" "}
          <span className="ml-auto font-semibold text-slate-900">
            ${discount.toFixed(2)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-sm">
          Shipping{" "}
          <span className="ml-auto font-semibold text-slate-900">
            ${shipping.toFixed(2)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-sm">
          Tax{" "}
          <span className="ml-auto font-semibold text-slate-900">
            ${tax.toFixed(2)}
          </span>
        </li>
        <hr className="border-slate-300 w-full my-2" />
        <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
          Total <span className="ml-auto">${total.toFixed(2)}</span>
        </li>
      </ul>

      <div className="space-y-4 mt-8">
        <PrimaryButton
          isSubmitting={isLoading}
          type="button"
          onClick={handlePurchase}
          className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          Complete Purchase
        </PrimaryButton>
        <button
          type="button"
          onClick={onContinue}
          className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-gray-100 hover:bg-gray-200 border border-gray-300 text-slate-900 cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
