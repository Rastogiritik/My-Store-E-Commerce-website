const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleWares/catchAsyncError');
const order = require('../models/order');

// Create a new order => /api/v1/order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { 
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single Order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user Order => /api/v1/orders/me
exports.myOrders = catchAsyncError(async (req, res, next) => {

    const order = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        order
    })
})

// Get All Order by admin => /api/v1/admin/orders/
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})


// Update and Process Order by admin => /api/v1/admin/order/:id
exports.updateAndProcessOrders = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.Product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}

// Delet Order => /api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if(!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
        order
    })
})
