const express = require("express");
const router = express.Router();
// const verifyToken = require("../middleware/verifyToken");
const Item = require("../models/Item"); 

console.log("Item model:", Item);
// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from MongoDB
    res.json(items);
  } catch (err) {
    console.error("GET /api/items error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
//delete later 
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const items = await Item.find(); // Fetch all items from MongoDB
//     res.json(items);
//   } catch (err) {
//     console.error("GET /api/items error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // POST new item
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const newItem = new Item(req.body);
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     console.error("POST /api/items error:", err);
//     res.status(400).json({ message: "Invalid data" });
//   }
// });

module.exports = router;
