import axios from "axios";

const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";

export const getAddress = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/address/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateAddress = async (data, addressId) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/address/update/${addressId}`,
      data
    );
    console.log(addressId);

    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const createAddress = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/address/add`, data);

    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/address/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
