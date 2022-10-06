const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    // 500 internal server error code.. for default
    err.statusCode = err.statusCode || 500;
    

    // Show error at development time
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    // show error at production time
    if(process.env.NODE_ENV === 'PROUDCTION'){
        let error = {...err}

        error.message = err.message;

        // Wrong Mongoose id error
        if(err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handling  Mongoose Validation Error
        if(err.name === 'validationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose duplicate key error
        if(err.code === E11000) {
            const message = `Duplicate ${Object.keys(err.keyvalue)} entered`
            error = new ErrorHandler(message, 400)
        }

        // Handling wrong JWT error code
        if(err.name === 'JsonWebTokenError'){
            const message = 'Json Web Token is invalid. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }
        
        // Handling expire JWT error code
        if(err.name === 'TokenExpiredError'){
            const message = 'Json Web Token is expired. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        // server error
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }

    
} 