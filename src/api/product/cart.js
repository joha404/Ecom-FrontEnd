// src/redux/thunks/addToCartThunk.js
import axios from "axios";
import { setCartItem, setIsCartLoading } from "../../redux/slices/cart-slice";

const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";

export const addToCartThunk =
  ({ userId, productId, quantity = 1 }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsCartLoading(true));

      const token = localStorage.getItem("userToken");

      const res = await axios.post(
        `${BASE_URL}/cart/add`,
        { userId, productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optional: Update cart items in Redux if backend returns updated cart
      if (res.data?.cart) {
        dispatch(setCartItem(res.data.cart));
      }

      return res.data;
    } catch (error) {
      console.error("Add to cart failed:", error);
      throw error;
    } finally {
      dispatch(setIsCartLoading(false));
    }
  };

export const getAllCart = async (userInfo) => {
  console.log(userInfo);
  try {
    const res = await axios.get(`${BASE_URL}/cart/`, userInfo);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error;
  }
};
