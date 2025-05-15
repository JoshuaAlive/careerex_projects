const express = require("express")
const router = express.Router()
const {loginUser, registerUser} = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")
const { getWallet, makeTransfer, getTransactions } = require("../controllers/walletController")


router.post("/auth/register", registerUser)
router.post("/auth/login", loginUser)
router.get("/wallet", authMiddleware, getWallet)
router.patch("/wallet/transfer", authMiddleware, makeTransfer)
router.get("/transactions", authMiddleware, getTransactions)

module.exports = router