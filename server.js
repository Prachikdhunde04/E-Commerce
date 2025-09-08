const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Test route
app.get("/api/test", (req, res) => res.send("API is running..."));

// Routes
const authRoutes = require("./routes/auth");
const itemsRoutes = require("./routes/items");
const cartRoutes = require("./routes/carts");

app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/cart", cartRoutes);

// Fetch merged products
app.get("/api/products", async (req, res) => {
  try {
    const [fakeRes, dummyRes, kolzRes] = await Promise.all([
      fetch("https://fakestoreapi.com/products").then(r => r.json()),
      fetch("https://dummyjson.com/products").then(r => r.json()),
      fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json").then(r => r.json()),
    ]);

    // Normalize data
    const normalizedFake = fakeRes.map(p => ({
      uniqueId: `fake-${p.id}`,
      title: p.title || "Unknown",
      price: p.price || 0,
      image: p.image || "/placeholder.jpg",
    }));

    const normalizedDummy = dummyRes.products.map(p => ({
      uniqueId: `dummy-${p.id}`,
      title: p.title || "Unknown",
      price: p.price || 0,
      image: p.images?.[0] || "/placeholder.jpg",
    }));

    const normalizedKolz = kolzRes.map((p, idx) => ({
      uniqueId: `kolz-${idx}`,
      title: p.name || "Unknown",
      price: p.price || 0,
      image: p.image || "/placeholder.jpg",
    }));

    res.json([...normalizedFake, ...normalizedDummy, ...normalizedKolz]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "ecommerce-frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "ecommerce-frontend/build", "index.html"))
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


