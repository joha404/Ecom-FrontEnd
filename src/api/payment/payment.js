import axios from "axios";

// const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";
const BASE_URL = "http://localhost:3000/api/v1";

export const createPayment = async (data) => {
  try {
    const res = axios.post(`${BASE_URL}/payment/initiate`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
