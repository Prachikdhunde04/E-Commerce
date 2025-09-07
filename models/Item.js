const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true }, // <-- image URL
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);




