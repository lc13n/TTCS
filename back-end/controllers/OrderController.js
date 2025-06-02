const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products, total, billingInfo } = req.body;

    if (!products || !products.length) {
      return res.status(400).json({ error: 'Danh sách sản phẩm không được để trống' });
    }

    const order = new Order({
      user: userId,
      products,
      total,
      billingInfo,
      status: 'Pending',
    });

    await order.save();

    res.json({ message: 'Tạo đơn hàng thành công', order });
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
};


// Lấy danh sách đơn hàng của user
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate('products.product', 'name price image')
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    console.error('Lỗi lấy đơn hàng:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Xóa đơn hàng theo orderId
exports.deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ error: 'Đơn hàng không tồn tại hoặc không có quyền xóa' });
    }

    await order.deleteOne();

    res.json({ message: 'Xóa đơn hàng thành công' });
  } catch (error) {
    console.error('Lỗi xóa đơn hàng:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
};
