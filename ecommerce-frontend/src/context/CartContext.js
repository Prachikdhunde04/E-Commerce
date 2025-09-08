// src/context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add or update item in cart
  const addToCart = (product) => {
    const id = product.id || product.uniqueId;

    setCartItems((prev) => {
      const existing = prev.find((item) => (item.id || item.uniqueId) === id);

      if (existing) {
        // Update quantity
        return prev.map((item) =>
          (item.id || item.uniqueId) === id
            ? { ...item, quantity: Math.max(item.quantity + (product.quantity || 1), 1) }
            : item
        );
      } else {
        // Add new item with quantity
        return [...prev, { ...product, quantity: product.quantity || 1, id }];
      }
    });
  };

  // Remove item completely from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item.uniqueId) !== id));
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  // Total items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}










