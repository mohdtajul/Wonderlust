const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session")
const flash = require("connect-flash")

const listings = require("./routes/listing.js") // listing routes ka group
const reviews = require("./routes/review.js") // review routes ka group

require('dotenv').config();


const port = process.env.PORT || 8080

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

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}

app.get("/",(req,res)=>{
    res.redirect("/listings");
})

app.use(session(sessionOptions))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.success =req.flash("success")
    next()
})

// API Calls
// jo bhi req /listings se start ho wo listing group me bhej do 
app.use("/listings", listings)

app.use("/listings/:id/reviews", reviews)


// jab koi route match na krega tb chlega ye New route 
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// custom error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.render("error.ejs",{message})
    //res.status(statusCode).send(message);
});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})