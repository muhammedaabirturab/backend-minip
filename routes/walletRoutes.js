const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createWallet,
  addMember,
  getMyWallets
} = require("../controllers/walletController");

router.post("/create", auth, createWallet);
router.post("/add-member", auth, addMember);
router.get("/my", auth, getMyWallets);

module.exports = router;
