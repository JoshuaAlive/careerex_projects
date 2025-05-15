const express = require("express")
const app = express()
const dbConnect = require("./db")
require("dotenv").config()
const port = process.env.PORT || 8000
const router = require("./routes/routes")


app.use(express.json())
app.use(router)
dbConnect()


app.listen(port, () => {
    console.log("Server running on port", port)
})