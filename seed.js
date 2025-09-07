const mongoose = require("mongoose");
const Item = require("./models/Item"); // path to your Item model

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Optional: clear old items
    await Item.deleteMany({});

    // Insert sample products
    await Item.insertMany([
      { name: "Sample Product 1", price: 100 },
      { name: "Sample Product 2", price: 200 },
      { name: "Sample Product 3", price: 300 },
    ]);

    console.log("✅ Sample items added");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error connecting to MongoDB", err);
  });
