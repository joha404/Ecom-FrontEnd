// src/redux/thunks/addToCartThunk.js
import axios from "axios";
import {
  removeCartItem,
  setCartItem,
  setIsCartLoading,
} from "../../redux/slices/cart-slice";

const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";

export const addToCartThunk =
  ({ userId, productId, quantity = 1 }) =>
  async (dispatch) => {
    try {
      dispatch(setIsCartLoading(true));

      const token = localStorage.getItem("userToken");

      const res = await axios.post(
        `${BASE_URL}/cart/add`,
        { userId, productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // backend should return cart array directly
      if (res.data?.cart) {
        dispatch(setCartItem(res.data.cart)); // cart is array of items
      }

      return res.data;
    } catch (error) {
      console.error("Add to cart failed:", error?.response?.data || error);
      throw error;
    } finally {
      dispatch(setIsCartLoading(false));
    }
  };

export const removeSingleCart = async (data, dispatch) => {
  try {
    dispatch(setIsCartLoading(true));
    const res = await axios.delete(`${BASE_URL}/cart/remove`, { data });
    dispatch(setCartItem(res.data.cart || [])); // always array
    return res.data;
  } catch (error) {
    console.error(
      "Failed to remove cart item:",
      error?.response?.data || error
    );
    throw error;
  } finally {
    dispatch(setIsCartLoading(false));
  }
};
export const getAllCart = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/cart/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error?.response?.data || error);
    throw error;
  }
};

export const clearAllCartItems = async (data, dispatch) => {
  try {
    dispatch(setIsCartLoading(true));
    const res = await axios.delete(`${BASE_URL}/cart/clear`, { data });
    dispatch(setCartItem(res.data.cart || [])); // always array
    return res.data;
  } catch (error) {
    console.error("Failed to clear cart:", error?.response?.data || error);
    throw error;
  } finally {
    dispatch(setIsCartLoading(false));
  }
};
