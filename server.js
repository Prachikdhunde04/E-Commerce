// src/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const fetch = require("node-fetch"); // fetch external APIs

const app = express();

// ------------------------
// Middleware
// ------------------------
app.use(express.json());
app.use(cors());

// ------------------------
// MongoDB Connection
// ------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ------------------------
// Test Route
// ------------------------
app.get("/api/test", (req, res) => res.send("API is running..."));

// ------------------------
// API Routes
// ------------------------
const authRoutes = require("./routes/auth");
const itemsRoutes = require("./routes/items");
const cartRoutes = require("./routes/carts");

app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/products", async (req, res) => {
  try {
    const [fakeRes, dummyRes, kolzRes] = await Promise.all([
      fetch("https://fakestoreapi.com/products").then(r => r.json()),
      fetch("https://dummyjson.com/products").then(r => r.json()),
      fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json").then(r => r.json()),
    ]);

    // Normalize FakeStore
    const normalizedFake = fakeRes.map(p => ({
      uniqueId: `fake-${p.id}`,
      title: p.title || "Unknown Product",
      price: p.price || 0,
      image: p.image || "/placeholder.jpg",
      category: (() => {
        const c = p.category.toLowerCase();
        if (c.includes("men") || c.includes("women") || c.includes("fashion")) return "fashion";
        if (c.includes("jewelery")) return "beauty"; // adjust as needed
        return c;
      })(),
    }));

    // Normalize DummyJSON
    const normalizedDummy = dummyRes.products.map(p => ({
      uniqueId: `dummy-${p.id}`,
      title: p.title || "Unknown Product",
      price: p.price || 0,
      image: p.images?.[0] || "/placeholder.jpg",
      category: (() => {
        const c = p.category.toLowerCase();
        if (c.includes("fashion")) return "fashion";
        if (c.includes("smartphones") || c.includes("electronics")) return "electronics";
        return c;
      })(),
    }));

    // Normalize Kolzsticks
    const normalizedKolz = kolzRes.map((p, idx) => ({
      uniqueId: `kolz-${idx}`,
      title: p.name || "Unknown Product",
      price: p.price || 0,
      image: p.image || "/placeholder.jpg",
      category: p.category?.toLowerCase() || "other",
    }));

    res.json([...normalizedFake, ...normalizedDummy, ...normalizedKolz]);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
});


// ------------------------
// Serve React Frontend
// ------------------------
app.use(express.static(path.join(__dirname, "ecommerce-frontend/build")));

// Catch-all route for SPA (Express v5 alpha compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "ecommerce-frontend/build", "index.html"));
});

// ------------------------
// Start Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




