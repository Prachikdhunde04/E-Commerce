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
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ price: "" });

  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar onSearch={setSearchTerm} onFilterChange={setFilters} />

          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="hero-video-wrapper">
                      <div className="hero-video-wrapper">
                      <video
                        className="hero-video"
                        src="/videos/Untitled_design_2.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>

                    </div>
                    <HomePage searchTerm={searchTerm} filters={filters} />
                  </>
                }
              />
              <Route
                path="/category/:category"
                element={<CategoryPage filters={filters} />}
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;   