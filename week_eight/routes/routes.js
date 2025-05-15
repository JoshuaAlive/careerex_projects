const express = require("express")
const router = express.Router()
const {loginUser, registerUser} = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")
const { getWallet, makeTransfer, getTransactions } = require("../controllers/walletController")

const getStatus = (req, res) => {
  res.status(200).json({"message": "PayFlow API operational!"})
}


router.post("/auth/register", registerUser)
router.post("/auth/login", loginUser)
router.get("/wallet", authMiddleware, getWallet)
router.patch("/wallet/transfer", authMiddleware, makeTransfer)
router.get("/transactions", authMiddleware, getTransactions)
router.get("/", getStatus)
module.exports = router
