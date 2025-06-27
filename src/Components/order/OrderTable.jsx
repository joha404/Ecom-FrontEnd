export default function OrderTable({ orders, onCancel, skeletonRows = 3 }) {
  if (!orders) {
    // Render skeleton rows while loading
    return (
      <div className="overflow-x-auto rounded-lg shadow-md hidden sm:block">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
                Product
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
                Name
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
                Qty
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
                Price ($)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
                Status
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2 max-w-[120px]">
                Transaction ID
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
                Order Date
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
                Delivery Date
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
                Cancel
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                {[...Array(9)].map((__, idx) => (
                  <td
                    key={idx}
                    className="border border-gray-300 dark:border-gray-600 px-3 py-2"
                  >
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg shadow-md hidden sm:block">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
              Product
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
              Name
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
              Qty
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
              Price ($)
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
              Status
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2 max-w-[120px]">
              Transaction ID
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
              Order Date
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
              Delivery Date
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2">
              Cancel
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) =>
              order.products.map((product) => (
                <tr
                  key={`${order.id}-${product.id}`}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="border border-gray-300 dark:border-gray-600 px-3 text-center py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 ">
                    {(product.price * product.quantity).toFixed(2)}
                  </td>
                  <td
                    className={`border border-gray-300 dark:border-gray-600 px-3 py-2 ${
                      order.status === "Delivered"
                        ? "text-green-600 font-semibold"
                        : order.status === "Pending"
                        ? "text-yellow-600 font-semibold"
                        : order.status === "Rejected"
                        ? "text-red-600 font-semibold"
                        : ""
                    }`}
                  >
                    {order.status}
                  </td>

                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 break-words max-w-[150px]">
                    {order.transactionId}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">
                    {order.orderDate}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">
                    {order.deliveryDate}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center">
                    {order.cancelable ? (
                      <button
                        onClick={() => onCancel(order.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
}
