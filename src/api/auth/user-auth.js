import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

export const signInUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const res = axios.post(`${BASE_URL}/auth/login`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const resendCode = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/forgot-password`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};

export const forgerPasswordReset = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/verify-email`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};

export const verifyUserMail = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/verify-email`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};

export const changeUserPassword = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/change-password`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};
