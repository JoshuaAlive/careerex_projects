const mongooose = require('mongoose');
const itemSchema = new mongooose.Schema({
    "itemName": {
        type: String,
    },
    "description": {
        type: String,
    },
    "locationFound": {
        type: String,
    },
    "dateFound": {
        type: Date,
    },
    "claimed": {
        type: Boolean
    }
})

const Item = mongooose.model("items", itemSchema)

module.exports = Item

