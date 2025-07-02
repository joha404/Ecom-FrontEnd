import axios from "axios";

const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";

// Get all Product
export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/category/all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get Single Product
export const getSingleCategories = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/category/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
