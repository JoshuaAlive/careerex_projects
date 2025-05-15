const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Wallet = require("../models/wallet");
require("dotenv").config()
// Login 


function generateTokens(user) {
    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
    return { accessToken, refreshToken }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ "error": "Email field required" })
        }
        const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ "error": "Invalid email format" })
        }
        if (!password) {
            return res.status(400).json({ "error": "Password field required" })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ error: "No user found with that email" });
        }
        
        const validPassword = await bcrypt.compare(password, existingUser.password)
        if (!validPassword) {
            return res.status(400).json({ "error": "Incorrect password" })
        }

        // Sign a JWT
        const { accessToken, refreshToken } = generateTokens(existingUser)

        res.status(200).json({
            "message": `Welcome back ${existingUser.firstName} ${existingUser.lastName}!`,
            "accessToken": accessToken,
            "refreshToken": refreshToken,
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ "error": "Server error" })
    }
}
// Signup
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        if (!firstName) {
            return res.status(400).json({ "error": "First name field required" })
        }
        if (!lastName) {
            return res.status(400).json({ "error": "Last name field required" })
        }
        if (!email) {
            return res.status(400).json({ "error": "Email field required" })
        }
        const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ "error": "Invalid email format" })
        }
        if (!password) {
            return res.status(400).json({ "error": "Password field required" })
        }
        // Check if user already exists 
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ "error": "User already exists with that email" })
        }
        /* End of validation */

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        await newUser.save()


        const wallet = new Wallet({
            user: newUser._id,
        })

        await wallet.save()

        res.status(201).json({
            "message": "New user created successfully!",
            "newUser": {
                firstName,
                lastName,
                email,
            }
        })
    } catch (e) {
        res.status(500).json({ "error": "Server error" })
        console.error(e)
    }
}

module.exports = { registerUser, loginUser }