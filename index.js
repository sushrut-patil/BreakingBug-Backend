const dotenv = require('dotenv');
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")


// const dotenv = require("dotenv").config();
// FILE IS NOT MENTIONED FOR .ENV
// require("dotenv").config();


const app = express()
const Routes = require("./routes/route.js")



dotenv.config();
// the position of the below is changed so that it can read env variables
const PORT = process.env.PORT || 5000

app.use(express.json({ limit: '10mb' }))
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})
