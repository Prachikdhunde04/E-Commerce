// src/components/Filters.js
import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react"; // icon

function Filters({ onFilterChange }) {
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [discount, setDiscount] = useState("");
  const [isOpen, setIsOpen] = useState(false); // for mobile

  const handleChange = () => {
    onFilterChange({ price, color, discount });
  };

  return (
    <>
      {/* ✅ Desktop Filters Bar */}
      <div
        className="filters-bar"
        style={{
          position: "fixed",
          top: "60px", // just below navbar
          left: 0,
          width: "100%",
          background: "#f9f9f9",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "6px 12px",
          zIndex: 999,
          fontSize: "14px",
        }}
      >
        {/* Mobile: Show only icon */}
        <div className="mobile-only" style={{ display: "none" }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            <SlidersHorizontal />
          </button>
        </div>

        {/* Desktop: Show filters */}
        <div className="desktop-only" style={{ display: "flex", gap: "12px" }}>
          {/* Price Filter */}
          <select
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              handleChange();
            }}
          >
            <option value="">Price</option>
            <option value="0-500">₹0 - ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="1000-5000">₹1000 - ₹5000</option>
          </select>

          {/* Color Filter */}
          <select
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              handleChange();
            }}
          >
            <option value="">Color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>

          {/* Discount Filter */}
          <select
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.value);
              handleChange();
            }}
          >
            <option value="">Discount</option>
            <option value="10">10%+</option>
            <option value="20">20%+</option>
            <option value="50">50%+</option>
          </select>
        </div>
      </div>

      {/* ✅ Mobile Drawer */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            width: "100%",
            background: "#fff",
            borderBottom: "1px solid #ddd",
            padding: "12px",
            zIndex: 1000,
          }}
        >
          <h4 style={{ marginBottom: "8px" }}>Filters</h4>

          <div style={{ marginBottom: "8px" }}>
            <label>Price</label>
            <select
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                handleChange();
              }}
              style={{ width: "100%" }}
            >
              <option value="">Any</option>
              <option value="0-500">₹0 - ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="1000-5000">₹1000 - ₹5000</option>
            </select>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label>Color</label>
            <select
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                handleChange();
              }}
              style={{ width: "100%" }}
            >
              <option value="">Any</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label>Discount</label>
            <select
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
                handleChange();
              }}
              style={{ width: "100%" }}
            >
              <option value="">Any</option>
              <option value="10">10%+</option>
              <option value="20">20%+</option>
              <option value="50">50%+</option>
            </select>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* ✅ Simple responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-only { display: none !important; }
            .mobile-only { display: block !important; }
          }
          @media (min-width: 769px) {
            .desktop-only { display: flex !important; }
            .mobile-only { display: none !important; }
          }
        `}
      </style>
    </>
  );
}

export default Filters;
