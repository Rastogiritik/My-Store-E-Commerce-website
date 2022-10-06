const express = require('express');
const router = express.Router();

const { newOrder, 
        getSingleOrder, 
        myOrders,
        getAllOrders,
        updateAndProcessOrders,
        deleteOrder
      } = require('../controllers/orderController');

const { isAuthenticatedUser,
        authorizedRoles 
      } = require('../middleWares/auth');

// Creating new Order
router.route('/order/new').post(isAuthenticatedUser, newOrder);

// Get single Order
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

// get logged in user orders
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// Get All orders by admin
router.route('/admin/orders').get(isAuthenticatedUser, authorizedRoles('admin'), getAllOrders);

// Update and Process order
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateAndProcessOrders);

// Delete order
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);


module.exports= router; 