const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const connectDB = require(path.join(__dirname, "config", "db"));

const app = express()

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", require(path.join(__dirname, "routes", "authRoutes")));
app.use("/api/wallet", require(path.join(__dirname, "routes", "walletRoutes")));
app.use("/api/expense", require(path.join(__dirname, "routes", "expenseRoutes")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
