const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");
const mongoose = require("mongoose")
const getWallet = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(req.user)
        // Find the wallet associated with the user
        const wallet = await Wallet.findOne({ user: userId });

        if (!wallet) {
            return res.status(404).json({ "error": "No wallet associated with this user" });
        }

        // Send wallet details in the response
        res.status(200).json({
            "message": "Wallet retrieved successfully",
            wallet: {
                id: wallet._id,
                balance: wallet.balance,
                transactions: wallet.transactions,
            }
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ "error": "Server error" });
    }
};


/*
    Money transfer logic between wallets - Number for Milestone 2 
 */
const makeTransfer = async (req, res) => {
    try {
        const { amount, recipientId } = req.body;

        if (!amount) {
            return res.status(400).json({ "error": "No amount passed" });
        }

        if (!recipientId) {
            return res.status(400).json({ "error": "No recipient ID provided" });
        }

        // Make sure the amount is a positive number
        const usefulAmount = Math.abs(amount);

        const userId = req.user.userId;  // Get userId from the authenticated user

        // Find the sender's wallet
        const senderWallet = await Wallet.findOne({ user: userId });

        if (!senderWallet) {
            return res.status(404).json({ "error": "No wallet found for the user" });
        }

        // Check if the sender has enough balance - validation for number 2
        if (senderWallet.balance < usefulAmount) {
            return res.status(400).json({ "error": "Insufficient funds" });
        }

        // Find the recipient's wallet
        const recipientWallet = await Wallet.findOne({ user: recipientId });

        if (!recipientWallet) {
            return res.status(404).json({ "error": "Recipient wallet not found" });
        }

        // Update the sender's wallet balance
        senderWallet.balance -= usefulAmount;
        await senderWallet.save();

        // Update the recipient's wallet balance
        recipientWallet.balance += usefulAmount;
        await recipientWallet.save();

        // Transaction logging
        const newTransaction = new Transaction({
            senderWallet,
            recipientWallet,
            amount,
        })
        await newTransaction.save()
        res.status(200).json({
            "message": "Transfer successful",
            "senderWallet": senderWallet,
            "recipientWallet": recipientWallet,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ "error": "Server error" });
    }
};

const getTransactions = async (req, res) => {
    try {
        const senderId = new mongoose.Types.ObjectId(req.user.userId)
        const transactions = await Transaction.findOne({ senderWallet: senderId })
        if (!transactions) {
            res.status(404).json({ "messages": "User hasn't performed any transactions" })
        }
        res.status(200).json({transactions})
    } catch (e) {
        console.error(e);
        return res.status(500).json({ "error": "Server error" });
    }
}

module.exports = { makeTransfer, getWallet, getTransactions }
