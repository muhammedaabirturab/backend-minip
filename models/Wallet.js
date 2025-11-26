const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Wallet", walletSchema);
