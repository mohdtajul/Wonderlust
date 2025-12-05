const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")

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


// READ data API Call || read route
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({}) // mongo se pura listings collection ka data liya h
    res.render("listings/index.ejs",{allListings})

    })
)

app.get("/listings/new",(req,res)=>{
    res.render("listings/newplace.ejs") // rendering form to get data for listing 
})

app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}= req.params
    const listing = await Listing.findById(id)
    // console.log(listing)
    res.render("listings/show.ejs",{listing})

    })
)

// CREATE API Call || create route

app.post("/listings/new",wrapAsync(async (req,res,next)=>{
        if(!req.body.listing){
            throw new ExpressError(400,"send valid listing data")
        }
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings")
    })
);
    
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
    })
)

// UPDATE API Call || update route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid listing data")
    }
    let {id}= req.params
    let {listing} = req.body
    const updatedData = await Listing.findByIdAndUpdate(id,{
        title: listing.title,
        description: listing.description,
        image: listing.image.url,
        price: listing.price,
        location: listing.location,
        country: listing.country
   })
  
    res.redirect("/listings")

    })
)

// DELETE API Call || delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")

    })
)

// jab koi route match na krega tb chlega ye
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// custom error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})