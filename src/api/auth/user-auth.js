import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

export const loginUser = async (data) => {
  try {
    const res = axios.post(`${BASE_URL}/auth/login`, data);
    console.log(data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
