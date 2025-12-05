// custom error handling class for custom statusCode and message
class ExpressError extends Error{
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;