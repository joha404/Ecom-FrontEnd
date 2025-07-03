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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If backend returns updated cart, update Redux state
      if (res.data?.cart) {
        dispatch(setCartItem(res.data.cart));
      }

      return res.data;
    } catch (error) {
      console.error("Add to cart failed:", error?.response?.data || error);
      throw error;
    } finally {
      dispatch(setIsCartLoading(false));
    }
  };

/**
 * Get all cart items for a user
 */
export const getAllCart = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/cart/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error?.response?.data || error);
    throw error;
  }
};

/**
 * Remove a single cart item
 * @param {{ userId: string, productId: string }} data
 */
export const removeSingleCart = async (data, dispatch) => {
  try {
    dispatch(setIsCartLoading(true));

    const res = await axios.delete(`${BASE_URL}/cart/remove`, {
      data,
    });
    dispatch(setCartItem(res.data.cart.items));

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

export const clearAllCartItems = async (data, dispatch) => {
  try {
    dispatch(setIsCartLoading(true));

    const res = await axios.delete(`${BASE_URL}/cart/clear`, {
      data,
    });

    console.log("Clear Cart response:", res.data);

    dispatch(setCartItem(res.data.cart || []));

    return res.data; // 👈 this needs to return something (like JSON)
  } catch (error) {
    console.error("Failed to clear cart:", error?.response?.data || error);
    throw error;
  } finally {
    dispatch(setIsCartLoading(false));
  }
};
