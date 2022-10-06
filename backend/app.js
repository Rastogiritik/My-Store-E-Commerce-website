const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleWare = require('./middleWares/error')


app.use(express.json());
app.use(cookieParser());


//Import Product routes
const products = require('./routes/product');

// Import user and auth routes
const auth = require('./routes/auth');

// Import Order routes
const order = require('./routes/order');

// Use for product
app.use('/api/v1', products);

// Use for user and auth
app.use('/api/v1', auth);

// Use for Order
app.use('/api/v1', order);

// middleware to handle error
app.use(errorMiddleWare);


module.exports = app;