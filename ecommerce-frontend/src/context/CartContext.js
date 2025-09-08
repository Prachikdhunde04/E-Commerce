// src/context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const id = product.id || product.uniqueId;
      const existing = prev.find((item) => (item.id || item.uniqueId) === id);

      if (existing) {
        // Update quantity
        return prev.map((item) =>
          (item.id || item.uniqueId) === id
            ? { ...item, quantity: Math.max(item.quantity + (product.quantity || 1), 1) }
            : item
        );
      } else {
        // Add new item
        return [...prev, { ...product, quantity: product.quantity || 1, id }];
      }
    });
  };

  // Remove item completely from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item.uniqueId) !== id));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}









