const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware'); 


router.get('/dashboard', authenticate, authorizeAdmin, AdminController.dashboard);
router.get('/users', authenticate, authorizeAdmin, AdminController.manageUsers);
router.get('/orders', authenticate, authorizeAdmin, AdminController.manageOrders);
router.get('/products', authenticate, authorizeAdmin, AdminController.manageProducts);
router.get('/categories', authenticate, authorizeAdmin, AdminController.manageCategories);

module.exports = router;
