const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  targetPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "TRIGGERED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Alert", alertSchema);
