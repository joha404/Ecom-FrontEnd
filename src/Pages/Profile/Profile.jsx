import React, { useState, useEffect } from "react";
import UserInfo from "../../Components/user/userInfo";
import OrderTable from "../../Components/order/OrderTable";
import OrderCardList from "../../Components/order/OrderCardList";

export default function Profile() {
  const [orders, setOrders] = useState(null);
  const userData = {
    profileImage:
      "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    fullName: "Md Joha Hossain",
    details: {
      email: "johahossainm@gmail.com",
      phoneNumber: "01321075429",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: "ORD001",
          transactionId: "TX123456789",
          orderDate: "2025-06-01",
          deliveryDate: "2025-06-07",
          status: "Delivered",
          cancelable: false,
          products: [
            {
              id: "P001",
              image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
              name: "Wireless Headphones",
              quantity: 1,
              price: 59.99,
            },
          ],
        },
        {
          id: "ORD002",
          transactionId: "TX987654321",
          orderDate: "2025-06-10",
          deliveryDate: "2025-06-18",
          status: "Pending",
          cancelable: true,
          products: [
            {
              id: "P002",
              image:
                "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=64&h=64&q=80",
              name: "Smartwatch",
              quantity: 2,
              price: 199.99,
            },
            {
              id: "P003",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBks98xcOTXXIYF3z87erbFfZ2RE4mWK5myQ&s",
              name: "Bluetooth Speaker",
              quantity: 1,
              price: 89.99,
            },
          ],
        },
      ]);
    }, 2000);
  }, []);
  function handleCancelOrder(orderId) {
    alert(`Cancel order ${orderId} clicked! Implement cancel logic here.`);
  }

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900 mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <UserInfo user={userData} />
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Your Orders
        </h2>
        <OrderTable orders={orders} onCancel={handleCancelOrder} />
        <OrderCardList orders={orders} onCancel={handleCancelOrder} />
      </div>
    </section>
  );
}
