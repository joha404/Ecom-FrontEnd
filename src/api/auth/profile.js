import axios from "axios";

const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("userToken");

    const res = await axios.get(`${BASE_URL}/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const token = localStorage.getItem("userToken");

    const res = await axios.post(`${BASE_URL}/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
