const Order = require('../models/Order');
const axios = require('axios');


exports.createPayment = async (req, res) => {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).send('Order not found');
    }
    const paymentUrl = await initiatePayment(order);
    res.json({ paymentUrl });
};

exports.paymentCallback = async (req, res) => {
    const { orderId, status } = req.body;
    if (status === 'success') {
        await Order.findByIdAndUpdate(orderId, { status: 'Paid' });
        res.send('Payment successful');
    } else {
        res.send('Payment failed');
    }
};

exports.paymentStatus = async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).send('Order not found');
    }
    res.json({ status: order.status });
};

exports.paymentWithMomo = async (req, res) => {
    console.log("Đã vào paymentWithMomo", req.body);
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
        console.log("Không tìm thấy đơn hàng với orderId:", orderId);
        return res.status(404).send('Order not found');
    }

    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var momoOrderId = requestId; // orderId gửi cho MoMo, không phải _id của đơn hàng
    var orderInfo = "pay with MoMo";
    var redirectUrl = "https://momo.vn/return";
    var ipnUrl = "https://your-ngrok-or-callback-url/paymentWithMomoCallback";
    var amount = Math.round(order.total * 24000).toString();
    var requestType = "captureWallet";
    var extraData = "";

    var rawSignature =
        "accessKey=" + accessKey +
        "&amount=" + amount +
        "&extraData=" + extraData +
        "&ipnUrl=" + ipnUrl +
        "&orderId=" + momoOrderId +
        "&orderInfo=" + orderInfo +
        "&partnerCode=" + partnerCode +
        "&redirectUrl=" + redirectUrl +
        "&requestId=" + requestId +
        "&requestType=" + requestType;

    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: momoOrderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en'
    });

    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    };

    let result;
    try {
        result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        console.error("Lỗi khi gọi MoMo:", error?.response?.data || error.message || error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error',
            detail: error?.response?.data || error.message || error
        });
    }
};

exports.paymentWithMomoCallback = async (req, res) => {
    console.log("callback")
    console.log(req.body)

    return res.status(200).json(req.body)
}

exports.transactionStatus = async (req, res) => {
    const { orderId } = req.body

    const rawSignature = "accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}"

    const signature = crypto
        .createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex')

    const requestBody = JSON.stringify({
        partnerCode: "MOMO",
        requestId: orderId,
        orderId: orderId,
        signature: signature,
        lang: 'vi'
    })


    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/query',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    }

    let result = await axios(options)
    return res.status(200).json(result.data)
}
