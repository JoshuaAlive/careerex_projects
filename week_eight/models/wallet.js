const mongoose = require("mongoose")

const walletSchema = mongoose.Schema({
    "balance": {
        type: Number,
        default: 0,
    },
    "user": {
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    "transactions": [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})

const Wallet = mongoose.model("wallets", walletSchema)

module.exports = Wallet