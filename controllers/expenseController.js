const Expense = require("../models/Expense");
const Wallet = require("../models/Wallet");





// Add expense
exports.addExpense = async (req, res) => {
  const { walletId, amount, description } = req.body;

  const wallet = await Wallet.findById(walletId);
  if (!wallet) return res.status(404).json({ message: "Wallet not found" });

  if (!wallet.members.includes(req.user))
    return res.status(403).json({ message: "You are not a member of this wallet" });

  const expense = await Expense.create({
    wallet: walletId,
    amount,
    description,
    createdBy: req.user
  });

  res.json(expense);
};

// Get all expenses of a wallet
exports.getWalletExpenses = async (req, res) => {
  const { walletId } = req.params;

  const wallet = await Wallet.findById(walletId);
  if (!wallet) return res.status(404).json({ message: "Wallet not found" });

  if (!wallet.members.includes(req.user))
    return res.status(403).json({ message: "Not authorized" });

  const expenses = await Expense.find({ wallet: walletId });

  res.json(expenses);
};
