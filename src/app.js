require("dotenv").config();

const express = require("express");
const connectDb = require("../src/common/connectDb");
const { startPriceMonitor } = require("../src/workers/priceMonitor");

const app = express();

// Middlewares
app.use(express.json());

// Routes
const alertRoutes = require("./routes/alertRoutes");

// Database Connection
connectDb();

// API Routes
app.use("/api/v1/alerts", alertRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
    startPriceMonitor();
    console.log("Price Monitor Worker started...");
  });
}

module.exports = app; 