const express = require('express');
const router = express.Router();

const{ registerUser, 
       loginUser, 
       logout, 
       forgotPassword, 
       resetPassword, 
       getUserProfile, 
       updatePassword, 
       updateProfile,
       allUsers,
       getUserDetails,
       updateUserRole,
       deleteUser
     } = require('../controllers/authController');

const { isAuthenticatedUser,
        authorizedRoles 
      } = require('../middleWares/auth')

// Register User
router.route('/register').post(registerUser);

// Login User
router.route('/login').post(loginUser);

// Forgot Passsword
router.route('/password/forgot').post(forgotPassword)

// Reseet password
router.route('/password/reset/:token').put(resetPassword)

// Logout the user
router.route('/logout').get(logout)

// Find User Profile details
router.route('/me').get(isAuthenticatedUser, getUserProfile)

// Update and Change user password
router.route('/password/update').put(isAuthenticatedUser, updatePassword)

// update user profile with some changes
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

// Find all Users by admin
router.route('/admin/users').get(isAuthenticatedUser, authorizedRoles('admin'), allUsers)

// get user detail
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizedRoles('admin'), getUserDetails)

// Update user role
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateUserRole)

// Delete user
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser)



module.exports = router;