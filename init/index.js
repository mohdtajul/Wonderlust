const mongoose = require("mongoose")
const Listing = require("../models/listing.js")
const initData = require("./data.js")
require('dotenv').config();


// mongodb connection
main()
.then(()=>{console.log("Database connected successfully")})
.catch(err => console.log(err))

async function main(){
    await mongoose.connect(process.env.DB_URL)
}

async function initDB(){
    await Listing.deleteMany({})
    await Listing.insertMany(initData.data)
    console.log("data inserted successfully")
}

initDB();

