const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');

exports.dashboard = async (req, res) => {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    res.json({ userCount, productCount, orderCount });
};

exports.manageUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.manageOrders = async (req, res) => {
    const orders = await Order.find().populate('user');
    res.json(orders);
};

exports.manageProducts = async (req, res) => {
    const products = await Product.find().populate('category');
    res.json(products);
};

exports.manageCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};
