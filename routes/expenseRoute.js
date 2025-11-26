const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  addExpense,
  getWalletExpenses
} = require("../controllers/expenseController");

router.post("/add", auth, addExpense);
router.get("/:walletId", auth, getWalletExpenses);

module.exports = router;
