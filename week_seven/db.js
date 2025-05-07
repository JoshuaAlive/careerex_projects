const mongoose = require("mongoose")
// Fallback to local MongoDB installation if the online URI isn't provided
const dbString = process.env.DB_URL || "mongodb://localhost:27017" 

function dbConnect(){
    try {
        mongoose.connect(dbString)
        console.log("Database connected successfully")
    } catch(error){
        console.log("Database connection error:", error)
    }
}

module.exports = dbConnect