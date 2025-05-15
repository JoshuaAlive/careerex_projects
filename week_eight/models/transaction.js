const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    senderWallet: {
        type: mongoose.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    recipientWallet: {
        type: mongoose.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
