const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
  amount: Number,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);
