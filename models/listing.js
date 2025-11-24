const mongoose = require("mongoose")

// created schema for collection
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        filename:String,
        url:{
            type:String,
            default:"https://pixabay.com/photos/beautiful-natural-image-1844362/",
            set: (v)=>
                v===""
                ?"https://pixabay.com/photos/beautiful-natural-image-1844362/"
                :v,
        }
    },
    price: Number,
    location: String,
    country: String,
})

// created model
const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;