const express= require('express');
const router = express.Router();


const { getProducts,
        newProduct, 
        getSingleProduct, 
        updateProduct, 
        deleteProduct, 
        createProductReview,
        getProductReviews,
        deleteReview
      } = require('../controllers/productController');

const { isAuthenticatedUser,
        authorizedRoles 
      } = require('../middleWares/auth');

// for getting all products
router.route('/products').get(getProducts);

// for getting a single product
router.route('/product/:id').get(getSingleProduct);

// for post a new product
router.route('/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);

// for put a new product
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct);

// for deleting a product
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);

// Product Review
router.route('/review').put(isAuthenticatedUser, createProductReview);

// Get Product Reviews
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);

// Delete a review
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;  