import axios from "axios";

const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";

// Get all Product
export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/product/all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get Single Product
export const getSingleProduct = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/product/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
