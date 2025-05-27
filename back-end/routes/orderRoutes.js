const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/create', authenticate, OrderController.createOrder);
router.get('/my-orders', authenticate, OrderController.getMyOrders);
router.delete('/delete/:orderId', authenticate, OrderController.deleteOrder);

module.exports = router;
