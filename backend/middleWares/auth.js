const jwt = require('jsonwebtoken');
const user = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');


// Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler('Login first to access thr resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id);

    next()

})


// Handling Users roles
exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))
        }
        next()
    }
}