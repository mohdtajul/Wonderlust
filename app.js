const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
require('dotenv').config();


const port = process.env.PORT
const Listing = require("./models/listing.js") // model imported

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

// mongodb connection
main()
.then(()=>{console.log("Database connected successfully")})
.catch(err => console.log(err))
async function main(){
    await mongoose.connect(process.env.DB_URL)
}

// API Calls
app.get("/",(req,res)=>{
    res.send("req is comming")
})


// READ data API Call
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({}) // mongo se pura listings collection ka data liya h
    res.render("listings/index.ejs",{allListings})
})

app.get("/listings/new",(req,res)=>{
    res.render("listings/newplace.ejs") // rendering form to get data for listing 
})

app.get("/listings/:id",async(req,res)=>{
    let {id}= req.params
    const listing = await Listing.findById(id)
    // console.log(listing)
    res.render("listings/show.ejs",{listing})

})

// CREATE API Call

app.post("/listings/new",(req,res)=>{
    let {title,description,price,location,country} = req.body;
    Listing.create({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
    })
    res.redirect("/listings")
})

app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
})

// UPDATE API Call
app.put("/listings/:id",async(req,res)=>{
   let {id}= req.params
   let {title,description,url,price,location,country} = req.body
     const updatedData = await Listing.findByIdAndUpdate(id,{
        title: title,
        description: description,
        url: url,
        price: price,
        location: location,
        country: country
   })
//    console.log(updatedData)
   res.redirect("/listings")

})

// DELETE API Call
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")

})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})