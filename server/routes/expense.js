const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense")

// Add an expense 
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const newExpense = new Expense(req.body);
        const expense = await newExpense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json(err)
        console.log(error)
    }
})
// Get all expense 
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json(err)
    }
})
//update expense 
router.put("/:id", async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(201).json(expense)
    } catch (error) {
        res.status(500).json(err)
    }
})
// Delete an expense
router.delete("/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.status(201).json("Deleted successfully")
    } catch (error) {
        res.status(500).json(err)
    }
})
module.exports = router;