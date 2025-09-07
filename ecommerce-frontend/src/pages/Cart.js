// src/pages/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const handleIncrease = (item) => {
    addToCart({ ...item, quantity: 1 }); // increment quantity by 1
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 }); // decrement quantity by 1
    } else {
      removeFromCart(item.id);
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item.id} className="col-md-12 mb-3">
              <div className="card p-3 d-flex flex-row align-items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "80px", height: "80px", objectFit: "contain" }}
                />
                <div className="ms-3 flex-grow-1">
                  <h6>{item.title}</h6>
                  <p>${item.price ? item.price.toFixed(2) : "Unavailable"}</p>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-3"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-4 text-end">
          <h5>Total: ${totalAmount.toFixed(2)}</h5>
          <button className="btn btn-primary mt-2">Place Order</button>
        </div>
      )}
    </div>
  );
}
