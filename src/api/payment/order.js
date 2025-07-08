import axios from "axios";

const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";

export const getAllOrders = async (userId) => {
  try {
    const res = axios.get(`${BASE_URL}/order/user/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
