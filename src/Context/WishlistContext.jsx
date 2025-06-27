import React, { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [count, setCount] = useState(0);

  // Mock add
  async function AddProductToWishlist(pID) {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCount((prev) => prev + 1);
        resolve({ data: { success: true, productId: pID } });
      }, 300);
    });
  }

  // Mock get
  async function getLoggedUserWishlist() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { count } });
      }, 300);
    });
  }

  // Mock delete
  async function deleteProductFromWishlist(pID) {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
        resolve({ data: { success: true, productId: pID } });
      }, 300);
    });
  }

  // ✅ Expose a function named "getLogged" for Home.jsx
  async function getLogged() {
    const res = await getLoggedUserWishlist();
    setCount(res.data.count ?? 0);
  }

  useEffect(() => {
    getLogged();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        getLoggedUserWishlist,
        AddProductToWishlist,
        deleteProductFromWishlist,
        getLogged, // ✅ include this in context value
        count,
        setCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
