// wrapAsync function to catch async errors and forwards to error handler
module.exports = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
}