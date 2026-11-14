const mongoose = require("mongoose");

const FundsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      index: true
    },
    availableBalance: {
      type: Number,
      default: 54250,
      min: 0
    },
    totalDeposited: {
      type: Number,
      default: 54250,
      min: 0
    },
    totalWithdrawn: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = { FundsSchema };
