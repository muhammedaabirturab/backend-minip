const Wallet = require("../models/Wallet");
const User = require("./models/User");

// Create wallet
exports.createWallet = async (req, res) => {
  try {
    const wallet = await Wallet.create({
      name: req.body.name,
      owner: req.user,
      members: [req.user]
    });

    res.json(wallet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add member
exports.addMember = async (req, res) => {
  try {
    const { walletId, memberEmail } = req.body;

    const wallet = await Wallet.findById(walletId);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    if (wallet.owner.toString() !== req.user)
      return res.status(403).json({ message: "Only owner can add members" });

    const member = await User.findOne({ email: memberEmail });
    if (!member) return res.status(404).json({ message: "User not found" });

    if (wallet.members.includes(member._id))
      return res.status(400).json({ message: "Already a member" });

    wallet.members.push(member._id);
    await wallet.save();

    res.json({ message: "Member added", wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get wallets of logged-in user
exports.getMyWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({ members: req.user });
    res.json(wallets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
