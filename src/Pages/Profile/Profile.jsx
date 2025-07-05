import React, { useState, useEffect } from "react";
import UserInfo from "../../Components/user/userInfo";
import OrderTable from "../../Components/order/OrderTable";
import OrderCardList from "../../Components/order/OrderCardList";
import Address from "../../Components/address/Address";
import { singleUser } from "../../api/auth/user-auth";
import { getAllOrders } from "../../api/payment/order";

export default function Profile() {
  const [orders, setOrders] = useState(null);
  const [userInfoData, setUserInfoData] = useState({});
  const userData = {
    profileImage:
      "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    fullName: "Md Joha Hossain",
    details: {
      email: "johahossainm@gmail.com",
      phoneNumber: "01321075429",
    },
  };

  const userDetails = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const userID = userDetails?.id;
  const userEmail = userDetails?.email;

  const fetchOrder = async () => {
    const res = await getAllOrders(userID);
    setOrders(res.data.orders);
  };

  const fetchUserDetails = async (userID) => {
    try {
      const res = await singleUser(userID);
      setUserInfoData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
    if (userID) {
      fetchUserDetails(userID);
    } else {
      console.warn("No user ID found in localStorage.");
    }
  }, [userID]);

  function handleCancelOrder(orderId) {
    alert(`Cancel order ${orderId} clicked! Implement cancel logic here.`);
  }

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900 mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <UserInfo user={userData} userInformation={userInfoData} />
      <div className="bg-none lg:bg-white  rounded-md shadow-none lg:shadow-md p-0 lg:p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Your Orders
        </h2>
        <OrderTable orders={orders} onCancel={handleCancelOrder} />
        {/* <OrderCardList orders={orders} onCancel={handleCancelOrder} /> */}
        <Address />
      </div>
    </section>
  );
}
