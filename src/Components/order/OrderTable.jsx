import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../../api/product/product";

export default function OrderTable({ orders = [], onCancel }) {
  const [productMap, setProductMap] = useState({});
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const uniqueProductIds = new Set();
      orders?.forEach((order) => {
        order?.cart?.forEach((item) => {
          if (!productMap[item.product]) {
            uniqueProductIds.add(item.product);
          }
        });
      });

      const productEntries = await Promise.all(
        Array.from(uniqueProductIds).map(async (id) => {
          try {
            const res = await getSingleProduct(id);

            setProductDetails(res.data.product);
            return [id, res.data.product];
          } catch (err) {
            console.error("Failed to fetch product:", id, err);
            return [id, null];
          }
        })
      );

      const newProductMap = {};
      productEntries.forEach(([id, product]) => {
        if (product) newProductMap[id] = product;
      });

      setProductMap((prev) => ({ ...prev, ...newProductMap }));
    };

    fetchProducts();
  }, [orders]);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md hidden sm:block">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="border px-3 py-2">Product</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Qty</th>
            <th className="border px-3 py-2">Price ($)</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Transaction ID</th>
            <th className="border px-3 py-2">Order Date</th>
            <th className="border px-3 py-2">Delivery Status</th>
            <th className="border px-3 py-2">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) =>
            order?.cart?.map((item, i) => {
              const product = productMap[item.product] || {};
              return (
                <tr
                  key={`${order._id}-${i}`}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="border px-3 py-2 text-center">
                    <img
                      src={
                        productDetails.images &&
                        productDetails.images.length > 0
                          ? productDetails.images[0]
                          : "/placeholder.png"
                      }
                      alt={productDetails.name || "Product"}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="border px-3 py-2">
                    {productDetails.name || item.product}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border px-3 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td
                    className={`border px-3 py-2 ${
                      order.status === "Approved"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    } font-semibold`}
                  >
                    {order.status}
                  </td>
                  <td className="border px-3 py-2 break-words max-w-[160px]">
                    {order.tranjectionId}
                  </td>
                  <td className="border px-3 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2">{order.deliveryStatus}</td>
                  <td className="border px-3 py-2 text-center">
                    {order.status === "Pending" ? (
                      <button
                        onClick={() => onCancel(order._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
