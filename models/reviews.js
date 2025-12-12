const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    Comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt:{
        type: Date,
        Default: Date.now(),
    },
})

module.exports = mongoose.model('Review',reviewSchema)