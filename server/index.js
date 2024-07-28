const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ExpenseRoute = require('./routes/expense')
const cron = require("node-cron");
dotenv.config();
const app = express();

// for middleware 
app.use(cors());
app.use(express.json())

// Routes 
app.use("/expenses",ExpenseRoute)

// Database Connection 
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log(err)
})
const run =() =>{
    cron.schedule('* * * * *',()=>{
        
    })
}
run();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})