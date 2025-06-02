const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/create', PaymentController.createPayment);
router.post('/callback', PaymentController.paymentCallback);
router.get('/status/:orderId', PaymentController.paymentStatus);

router.post('/paymentWithMomo', PaymentController.paymentWithMomo);
router.post('/paymentWithMomoCallback', PaymentController.paymentWithMomoCallback);
router.post('/transaction-status', PaymentController.transactionStatus);

router.post('/test-log', (req, res) => {
    console.log("Đã vào /api/payments/test-log", req.body);
    res.json({ ok: true });
});

module.exports = router;
