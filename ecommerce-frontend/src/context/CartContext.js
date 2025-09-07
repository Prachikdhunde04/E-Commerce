// src/context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Update quantity
        const updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(item.quantity + (product.quantity || 1), 1) }
            : item
        );
        return updated;
      } else {
        // Add new item with quantity
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Remove item completely from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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








