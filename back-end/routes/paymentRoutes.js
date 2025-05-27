const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/create', PaymentController.createPayment);
router.post('/callback', PaymentController.paymentCallback);
router.get('/status/:orderId', PaymentController.paymentStatus);

module.exports = router;
