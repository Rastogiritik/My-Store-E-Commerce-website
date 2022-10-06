const User = require('../models/user');

const crypto = require('crypto')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleWares/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: 'cld-sample',
            url: 'https://res.cloudinary.com/dbl14xih5/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1663652091/cld-sample.jpg'
        }
    })
    sendToken(user, 200, res);
})

// Login user => /api/v1/login
exports.loginUser = catchAsyncError( async(req, res, next) => {
    const { email, password } = req.body

    // Chexk if email and password is enterned by the user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }  
    sendToken(user, 200, res);
})

// Forgot Password  => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'MyStore Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}` 
        })
    } 
    catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset Password  => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest
    ('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('password does not match', 400))
    }

    // setUp new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})

// Get currenly logged in user deatils => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    // Check previos User Password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)
})

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncError(async (req, res, next)=> {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar: TODO

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })
    
    res.status(200).json({
        success: true
    })
})

// Logout user => /api/v1/logout
exports.logout = catchAsyncError(async(req,res,next)=>{
    res.cookie('token', null,{ 
        expires: new Date(Date.now()),
        httpOnly: true
     })

     res.status(200).json({
        success: true,
        message: 'Logged Out'
     })
})
// Admin Routes below

// Get all users => /api/v1/admin/users
 exports.allUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();

    
    res.status(200).json({
        success: true,
        users
    })
})

// Get users Details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found id: ${req.params.id}`))
    }
    

    res.status(200).json({
        success: true,
        user
    })
})

// Update user Role => /api/v1/admin/user/:id
exports.updateUserRole = catchAsyncError(async (req, res, next)=> {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    // Update avatar: TODO

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })
    
    res.status(200).json({
        success: true
    })
})

// Delete users  => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found id: ${req.params.id}`))
    }
    
    // Remove avatar from cloudinary - Todo

    await user.remove();

    res.status(200).json({
        success: true,
    })
})