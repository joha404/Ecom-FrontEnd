import React from "react";

export default function OrderCardList({ orders, onCancel }) {
  return (
    <div className="sm:hidden space-y-4">
      {orders &&
        orders.map((order) =>
          order.products.map((product) => (
            <div
              key={`${order.id}-${product.id}`}
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Qty: {product.quantity}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Price: ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-3 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Transaction ID:</strong> {order.transactionId}
                </p>
                <p>
                  <strong>Order Date:</strong> {order.orderDate}
                </p>
                <p>
                  <strong>Delivery Date:</strong> {order.deliveryDate}
                </p>
                <div className="mt-2">
                  {order.cancelable ? (
                    <button
                      onClick={() => onCancel(order.id)}
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
