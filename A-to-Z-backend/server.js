const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
console.log("Starting server...");
dotenv.config();
console.log("Environment variables loaded:", process.env.PORT);

const app = express();

// Middleware
console.log("Setting up middleware...");
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log("Attempting to connect to MongoDB...");
(async () => {
  try {
    await connectDB(); // Wait for DB connection
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }

  // Basic route
  console.log("Setting up routes...");
  app.get("/", (req, res) => {
    console.log("Root route accessed");
    res.send("E-commerce Backend is Running");
  });

  // Test DB route
  app.get("/test-db", async (req, res) => {
    try {
      const testCollection = mongoose.connection.db.collection("test");
      await testCollection.insertOne({ test: "Hello MongoDB" });
      const result = await testCollection.findOne({ test: "Hello MongoDB" });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  console.log("Starting server on port", PORT);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
