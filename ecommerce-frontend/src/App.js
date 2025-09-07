// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/Products";
import CategoryPage from "./pages/categoryPage";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

// Context
import { CartProvider } from "./context/CartContext";

function App() {
  // Global state for search term and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ price: "" });

  return (
    <CartProvider>
      <Router>
        <div className="app-container d-flex flex-column min-vh-100">
          {/* Navbar with search and filters */}
          <Navbar onSearch={setSearchTerm} onFilterChange={setFilters} />

          {/* Main content area */}
          <div className="flex-grow-1">
            <Routes>
              {/* Home page with Hero Video */}
              <Route
                path="/"
                element={
                  <>
                    <div className="hero-video-wrapper">
                      <video
                        src="videos/Untitled design (2).mp4" 
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                    <HomePage searchTerm={searchTerm} filters={filters} />
                  </>
                }
              />

              {/* Category pages */}
              <Route
                path="/category/:category"
                element={<CategoryPage filters={filters} />}
              />

              {/* Product Detail page */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Cart */}
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>

          {/* Footer fixed at bottom */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;



