import React from "react";

export default function OrderCardList({ orders = [], onCancel }) {
  console.log(orders);

  return (
    <div className="sm:hidden space-y-4">
      {orders?.map((order) =>
        order?.cart?.map((item, idx) => (
          <div
            key={`${order._id}-${idx}`}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <img
                src={item.product?.image || "/placeholder.png"}
                alt={item.product?.product || "Product"}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {item.product?.name || item.product}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Qty: {item.quantity}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-3 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    order.status === "Approved"
                      ? "text-green-600 font-semibold"
                      : order.status === "Pending"
                      ? "text-yellow-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {order.status}
                </span>
              </p>
              <p>
                <strong>Transaction ID:</strong> {order.tranjectionId}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Delivery Status:</strong> {order.deliveryStatus}
              </p>

              <div className="mt-2">
                {order.status === "Pending" ? (
                  <button
                    onClick={() => onCancel(order._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 w-full"
                  >
                    Cancel Order
                  </button>
                ) : (
                  <span className="italic text-gray-400">
                    Cancel Not Available
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
