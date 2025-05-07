const express = require("express")
const app = express()
const dbConnect = require("./db")
require("dotenv").config()
const port = process.env.PORT || 8000
const Item = require("./models/itemModel")
const mongoose = require("mongoose")
app.use(express.json())

dbConnect()

// Add a found item
app.post("/item/add", async (req, res) => {
    try {
        const { itemName, description, locationFound, dateFound, claimed } = req.body
        // Validate request body
        if (!itemName || !description || !locationFound || !dateFound) {
            return res.status(400).json({ "message": "All fields are required" })
        }


        const newItem = new Item({
            itemName,
            description,
            locationFound,
            dateFound,
            claimed: claimed || false,
        })

        await newItem.save()

        res.status(200).json({ "message": "New item added", "item": newItem })
    } catch (e) {
        res.status(500).json({ "error": e })
    }
})

// View all unclaimed items
app.get("/items/unclaimed/", async (req, res) => {
    try {
        // Find all unclaimed items
        const unclaimedItems = await Item.find({ claimed: false })
        if (unclaimedItems.length === 0) {
            return res.status(404).json({ "message": "No unclaimed items found" })
        }
        res.status(200).json({
            "message": "Unclaimed items",
            unclaimedItems,
        })
    }
    catch (e) {
        console.error("Error fetching unclaimed items:", e)
        console.log(e)
        res.status(500).json({ "error": e })
    }
})

// View item by ID
app.get("/item/:itemId", async (req, res) => {
    try {
        const strId = req.params.itemId
        console.log(strId)
        if (!strId) {
            return res.status(400).json({ "message": "Item ID is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(strId)) {
            return res.status(400).json({ "message": "Invalid item ID" })
        }
       
        const itemId = new mongoose.Types.ObjectId(strId)
        // Find item in the db
        const foundItem = await Item.findOne({ _id: itemId })

        if (!foundItem) {
            return res.status(404).json({ "message": "Item not found" })
        }

        res.status(200).json({
            "message": "An item", 
            foundItem,
        })

    } catch (e){
        res.status(500).json({ "error": e })
    }
})

// Update an item's details
app.patch("/item/update",  async (req, res) => {
    try {
        const strId = req.params.id
        if (!strId) {
            return res.status(400).json({ "message": "Item ID is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(strId)) {
            return res.status(400).json({ "message": "Invalid item ID" })
        }
        const itemId = new mongoose.Types.ObjectId(strId)
        // Find item in the db
        const foundItem = await Item.findOne({ _id: itemId })

        if (!foundItem) {
            return res.status(404).json({ "message": "Item not found" })
        }

        // Update item details
        const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true })

        res.status(200).json({
            "message": "Item updated",
            updatedItem,
        })

    } catch (e){
        res.status(500).json({ "error": e })
    }
})

// Mark all as claimed
app.patch("/items/mark-as-claimed", async (req, res) => {
    try {
        // Find all unclaimed items
        const unclaimedItems = await Item.find({ claimed: false })
        if (unclaimedItems.length === 0) {
            return res.status(404).json({ "message": "No unclaimed items found" })
        }
        // Mark all items as claimed
        await Item.updateMany({ claimed: false }, { claimed: true })

        res.status(200).json({
            "message": "All items marked as claimed",
            unclaimedItems,
        })
    }
    catch (e) {
        console.error("Error fetching unclaimed items:", e)
        console.log(e)
        res.status(500).json({ "error": e })
    }
})
// Delete an irrelevant item
app.delete("/item/delete/:id", async (req, res) => {
    try {
        const strId = req.params.id
        if (!strId) {
            return res.status(400).json({ "message": "Item ID is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(strId)) {
            return res.status(400).json({ "message": "Invalid item ID" })
        }
        const itemId = new mongoose.Types.ObjectId(strId)
        // Find item in the db
        const foundItem = await Item.findOne({ _id: itemId })

        if (!foundItem) {
            return res.status(404).json({ "message": "Item not found" })
        }

        // Delete item
        await Item.findByIdAndDelete(itemId)

        res.status(200).json({
            "message": "Item deleted",
            foundItem,
        })

    } catch (e){
        res.status(500).json({ "error": e })
    }
})



app.listen(port, () => {
    console.log("Server running on port", port)
})