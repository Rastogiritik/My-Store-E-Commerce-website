const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cloudinary = require('cloudinary');
const fileUpload = require ("express-fileupload");

const errorMiddleWare = require('./middleWares/error')


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


// setting up cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


//Import Product routes
const products = require('./routes/product');

// Import user and auth routes
const auth = require('./routes/auth');

// Import Order routes
const order = require('./routes/order');
const bodyParser = require('body-parser');

// Use for product
app.use('/api/v1', products);

// Use for user and auth
app.use('/api/v1', auth);

// Use for Order
app.use('/api/v1', order);

// middleware to handle error
app.use(errorMiddleWare);


module.exports = app;