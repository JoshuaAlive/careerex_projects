const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    "firstName": {
        type: String,
    },
    "lastName": {
        type: String,
    },
    "email": {
        type: String,
    },
    "password": {
        type: String,
        required: true,
    },
    "walletRef": {
        type: mongoose.Types.ObjectId,
        ref: "Wallet"
    }
})

const User = mongoose.model("users", userSchema)

module.exports = User

