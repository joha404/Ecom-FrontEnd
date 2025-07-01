import axios from "axios";

const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";

// Sign In user
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

// login in user
export const loginUser = async (data) => {
  try {
    const res = axios.post(`${BASE_URL}/auth/login`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//  Resend Code to email
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

// Forget Password Reset
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

// Verify Email Adress
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

// Password Change
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

// Get Single User
export const singleUser = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/user/${id}`, {});
    return res;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};
