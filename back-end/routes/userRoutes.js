const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate } = require('../middleware/authMiddleware'); 

router.get('/profile', authenticate, UserController.profile);
router.put('/update-profile', authenticate, UserController.updateProfile);
router.put('/change-password', authenticate, UserController.changePassword);
router.get('/order-history', authenticate, UserController.orderHistory);

module.exports = router;
