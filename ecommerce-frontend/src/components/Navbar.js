import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

export default function Navbar({ onSearch, onFilterChange }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    price: "",
    color: "",
    discount: "",
  });

  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  // Calculate total items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
    navigate("/");
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <nav className="navbar-custom navbar navbar-expand-lg">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Left Section: Home + Categories */}
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="nav-link nav-item-custom d-flex flex-column align-items-center"
          >
            <i className="bi bi-house-door-fill"></i>
            <span>Home</span>
          </Link>

          <div className="d-flex ms-4 gap-4">
            <Link
              to="/category/fashion"
              className="nav-link nav-item-custom d-flex flex-column align-items-center"
            >
              <i className="bi bi-bag-fill"></i>
              <span>Fashion</span>
            </Link>
            <Link
              to="/category/beauty"
              className="nav-link nav-item-custom d-flex flex-column align-items-center"
            >
              <i className="bi bi-brush"></i>
              <span>Beauty</span>
            </Link>
            <Link
              to="/category/electronics"
              className="nav-link nav-item-custom d-flex flex-column align-items-center"
            >
              <i className="bi bi-laptop"></i>
              <span>Electronics</span>
            </Link>
            <Link
              to="/category/Essentials"
              className="nav-link nav-item-custom d-flex flex-column align-items-center"
            >
              <i className="bi bi-basket-fill"></i>
              <span>Essentials</span>
            </Link>
          </div>
        </div>

        {/* Center Section: Search */}
        <form
          className="d-flex flex-grow-1 align-items-center ms-5"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            className="form-control search-input"
            placeholder="Search for products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn search-btn ms-2">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Right Section: Filters + Cart + Login */}
        <div className="d-flex align-items-center gap-3">
          {/* Mini Filters */}
          <div className="d-flex flex-column small-filters">
            <select
              className="form-select form-select-sm mb-1"
              value={filters.price}
              onChange={(e) => handleFilterChange("price", e.target.value)}
            >
              <option value="">Price</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
            </select>
            <select
              className="form-select form-select-sm mb-1"
              value={filters.color}
              onChange={(e) => handleFilterChange("color", e.target.value)}
            >
              <option value="">Color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="Voilet">Voilet</option>
              <option value="Beige">Beige</option>
              <option value="Pink">Pink</option>
              <option value="Brown">Brown</option>
              <option value="grey">Grey</option>
            </select>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="nav-link nav-item-custom d-flex flex-column align-items-center position-relative"
          >
            <i className="bi bi-cart-fill"></i>
            <span>Cart</span>
            {totalItems > 0 && (
              <span
                className="cart-badge"
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  backgroundColor:"#fefae0",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="nav-link nav-item-custom d-flex flex-column align-items-center"
          >
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login/Sign-up</span>
          </Link>
        </div>
      </div>

      {/* Extra styling for small filters */}
      <style>
        {`
          .small-filters select {
            min-width: 100px;
            font-size: 12px;
            padding: 2px 4px;
          }
        `}
      </style>
    </nav>
  );
}


