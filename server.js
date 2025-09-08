const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Load routes
const authRoutes = require("./routes/auth");
const itemsRoutes = require("./routes/items");
const cartRoutes = require("./routes/carts"); // Make sure filename matches

app.use("/api/auth", authRoutes);   // Signup/Login routes
app.use("/api/items", itemsRoutes); // Items routes (protected)
app.use("/api/cart", cartRoutes);   // Cart routes (protected)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const path = require("path");

// Serve frontend
app.use(express.static(path.join(__dirname, "client/build")));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'ecommerce-frontend/build', 'index.html'));
});

