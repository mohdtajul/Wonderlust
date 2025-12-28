const mongoose = require("mongoose")
const Review = require('./reviews.js');

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
            default:"https://cdn.pixabay.com/photo/2016/11/06/22/28/sundown-1807524_1280.jpg",
            set: (v)=>
                v===""
                ?"https://cdn.pixabay.com/photo/2016/11/06/22/28/sundown-1807524_1280.jpg"

                :v,
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

// middleware to delete all listing reviews when listing is deleted
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
})

// created model
const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;