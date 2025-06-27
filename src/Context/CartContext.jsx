import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  // Local state to simulate cart
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartID, setCartID] = useState("mock-cart-id-123");
  const [cartItems, setCartItems] = useState([]); // array of { productId, count }

  // Simulate adding product to cart
  async function addProductToCart(pID) {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCartItems((prev) => {
          const existing = prev.find((item) => item.productId === pID);
          if (existing) {
            // increment count
            return prev.map((item) =>
              item.productId === pID ? { ...item, count: item.count + 1 } : item
            );
          }
          // add new
          return [...prev, { productId: pID, count: 1 }];
        });
        setNumOfCartItems((prev) => prev + 1);
        resolve({ data: { success: true, productId: pID } });
      }, 300);
    });
  }

  // Simulate fetching cart data
  async function getLoggedUserCart() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            cartID,
            items: cartItems,
            totalItems: numOfCartItems,
          },
        });
      }, 300);
    });
  }

  // Simulate updating product count
  async function updateProductCount(pID, count) {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCartItems((prev) => {
          const updated = prev.map((item) =>
            item.productId === pID ? { ...item, count } : item
          );
          // recalc total count
          const total = updated.reduce((sum, i) => sum + i.count, 0);
          setNumOfCartItems(total);
          return updated;
        });
        resolve({ data: { success: true, productId: pID, count } });
      }, 300);
    });
  }

  // Simulate deleting item from cart
  async function deleteItem(pID) {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCartItems((prev) => {
          const filtered = prev.filter((item) => item.productId !== pID);
          // recalc total count
          const total = filtered.reduce((sum, i) => sum + i.count, 0);
          setNumOfCartItems(total);
          return filtered;
        });
        resolve({ data: { success: true, productId: pID } });
      }, 300);
    });
  }

  // Simulate clearing the cart
  async function clearCart() {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCartItems([]);
        setNumOfCartItems(0);
        resolve({ data: { success: true } });
      }, 300);
    });
  }

  // Simulate checkout (just resolve)
  async function checkOut(cartID, formValues) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            cartID,
            shippingAddress: formValues,
          },
        });
      }, 300);
    });
  }

  // Initialize or refresh cart on mount
  async function getLogged() {
    const response = await getLoggedUserCart();
    setNumOfCartItems(response.data.totalItems ?? 0);
    setCartID(response.data.cartID ?? null);
    setCartItems(response.data.items ?? []);
  }

  useEffect(() => {
    getLogged();
  }, []);

  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        addProductToCart,
        updateProductCount,
        deleteItem,
        clearCart,
        numOfCartItems,
        setNumOfCartItems,
        checkOut,
        cartID,
        getLogged,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
