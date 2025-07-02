import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  isCartLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      state.cartItem = action.payload;
    },
    setIsCartLoading: (state, action) => {
      state.isCartLoading = action.payload;
    },

    addCartItem: (state, action) => {
      const item = action.payload;
      const existing = state.cartItem.find(
        (i) => i.productId === item.productId
      );

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.cartItem.push({ ...item, quantity: item.quantity || 1 });
      }
    },

    removeCartItem: (state, action) => {
      const id = action.payload;
      state.cartItem = state.cartItem.filter((item) => item.productId !== id);
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

export const {
  setCartItem,
  setIsCartLoading,
  addCartItem,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
