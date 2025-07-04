import React from "react";

const OrderSummary = ({
  subtotal,
  discount,
  shipping,
  tax,
  onPurchase,
  onContinue,
}) => {
  const total = subtotal - discount + shipping + tax;

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
        <hr className="border-slate-300" />
        <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
          Total <span className="ml-auto">${total.toFixed(2)}</span>
        </li>
      </ul>

      <div className="space-y-4 mt-8">
        <button
          type="button"
          onClick={onPurchase}
          className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          Complete Purchase
        </button>
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
