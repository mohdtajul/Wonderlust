const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {listingSchema} = require("../schema.js")
const Listing = require("../models/listing.js") // model imported


const validationListing = (req,res,next)=>{
    const { error } = listingSchema.validate(req.body);

    if(error){
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
}

// READ data API Call || read route
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({}) // mongo se pura listings collection ka data liya h
    res.render("listings/index.ejs",{allListings})

    })
)

router.get("/new",(req,res)=>{
    res.render("listings/newplace.ejs") // rendering form to get data for listing 
})

router.get("/:id", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate("reviews"); //  MOST IMPORTANT

    res.render("listings/show.ejs", { listing });
}));


// CREATE API Call || create route

router.post("/new",validationListing, wrapAsync(async (req,res,next)=>{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success", "New Listing Created")
        res.redirect("/listings")
    })
);
    
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
    })
)

// UPDATE API Call || update route
router.put("/:id",validationListing, wrapAsync(async(req,res)=>{

    let {id}= req.params
    let {listing} = req.body
    const updatedData = await Listing.findByIdAndUpdate(id,{
        title: listing.title,
        description: listing.description,
        image: { url: listing.image.url },
        price: listing.price,
        location: listing.location,
        country: listing.country
   })
    req.flash("success", "Listing Updated")
    res.redirect("/listings")

    })
)

// DELETE API Call || delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing Deleted")
    res.redirect("/listings")

    })
)

module.exports = router;
