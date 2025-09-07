// src/pages/ProductDetails.js
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { product } = state || {};
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);

  if (!product) {
    return (
      <div className="text-center mt-5">
        ⚠ Product not found <br />
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-2">
          Go Back
        </button>
      </div>
    );
  }

  const isAvailable = product.price && product.price > 0;

  return (
    <div className="container mt-4">
      <button onClick={() => navigate(-1)} className="btn btn-link mb-3">
        ← Back
      </button>

      <div className="row">
        <div className="col-md-6 text-center">
          {imageLoading && <p>⏳ Loading image...</p>}
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxWidth: "400px",
              objectFit: "contain",
              display: imageLoading ? "none" : "block",
            }}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </div>

        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p>
            {isAvailable ? `$${product.price.toFixed(2)}` : "Unavailable"}
          </p>
          <p>
            Delivery Charges: $
            {isAvailable ? (Math.random() * 3 + 1).toFixed(2) : 0}
          </p>

          <div className="d-flex align-items-center mb-3">
            <label className="me-2">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              disabled={!isAvailable}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: "70px" }}
            />
          </div>

          <button
            className="btn btn-dark me-2"
            disabled={!isAvailable}
            onClick={() => addToCart({ ...product, quantity })}
          >
            Add to Cart
          </button>

          <button className="btn btn-primary" disabled={!isAvailable}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
