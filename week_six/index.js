const drugs = [

    { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },

    { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },

    { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },

    { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },

    { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },

    { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },

    { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },

    { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },

    { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },

    { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },

    { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },

    { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },

    { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },

    { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },

    { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },

    { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },

    { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },

    { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },

    { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },

    { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }

];
const express = require("express")
const app = express()
const PORT = 3001
app.use(express.json())

// Return all drugs where category is "Antibiotic".
app.get("/drugs/antibiotics", (req, res) => {
    const antibiotics = drugs.filter(drug => drug.category === "Antibiotic")
    res.json({ "antibiotics": antibiotics })
})

// Return an array of all drug names converted to lowercase.
app.get("/drugs/names", (req, res) => {
    const drugNamesLowercase = drugs.map(drug => drug.name.toLowerCase())
    res.json({ "lowercaseDrugs": drugNamesLowercase })
})

// Accept a category in the body and return all drugs under that category.
app.post("/drugs/by-category", (req, res) => {
    const { category } = req.body
    const drugsByCategory = drugs.filter(drug => drug.category === category)
    res.json({ "categorizedDrugs": drugsByCategory })
})

// Return an array of objects showing each drug's name and manufacturer.
app.get("/drugs/names-manufacturers", (req, res) => {
    const ans = drugs.map(drug => {
        return { "name": drug.name, "manufacturer": drug.manufacturer }
    })
    res.json({ "result": ans })
})

// Return all drugs where isPrescriptionOnly is true.
app.get("/drugs/prescription", (req, res) => {
    const prescriptionDrugs = drugs.filter(drug => drug.isPrescriptionOnly === true)
    res.json({"pDrugs" : prescriptionDrugs})
})

// Return a new array where each item is a string like:
app.get("/drugs/formatted", (req, res) => {
    const drugStrings = drugs.map(drug => `Drug: ${drug.name} - ${drug.dosageMg}mg`);
    res.json({drugStrings})
})

// Return all drugs where stock is less than 50.
app.get("/drugs/low-stock", (req, res) => {
    const drugLowStock = drugs.filter(drug => drug.stock < 50 )
    res.json({drugLowStock})
} )

// Return all drugs where isPrescriptionOnly is false.
app.get("/drugs/non-prescription", (req, res) => {
    const nonPrescriptionDrugs = drugs.filter(drug => drug.isPrescriptionOnly === true)
    res.json({nonPrescriptionDrugs})
})

// Accept a manufacturer in the body and return how many drugs are produced by that manufacturer.
app.post(" /drugs/manufacturer-count", (req, res) => {
    const { manufacturer } = req.body
    const drugsByManufacturer = drugs.filter(drug => drug.manufacturer === manufacturer).length
    res.json({ drugsByManufacturer})
})

// Count and return how many drugs have the category "Analgesic".
app.get("/drugs/count-analgesics", (req, res) => {
    const analgesicCount = drugs.filter(drug => drug.category === "Analgesic").length
    res.json({ analgesicCount})
})


app.listen(PORT, () => {
    console.log("Listening to port", PORT)
})

