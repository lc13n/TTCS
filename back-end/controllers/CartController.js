
const Product = require('../models/Product');

const Cart = require('../models/Cart'); 

exports.viewCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    res.json(cart);
};

exports.addToCart = async (req, res) => {
    const { productId } = req.body;


    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
        cart = new Cart({ userId: req.user.id, products: [] });
    }

    const index = cart.products.findIndex(item => item.productId.toString() === productId);
    if (index > -1) {
        cart.products[index].quantity += 1;
    } else {
        cart.products.push({ productId: productId, quantity: 1 });
    }

    await cart.save();

    res.send('Product added to cart');
};

exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).send('Cart not found');

    const item = cart.products.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).send('Product not found in cart');

    item.quantity = quantity;
    await cart.save();
    res.send('Cart updated');
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).send('Cart not found');

    cart.products = cart.products.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.send('Product removed from cart');
};

exports.clearCart = async (req, res) => {

    await Cart.findOneAndDelete({ userId: req.user.id });

    res.send('Cart cleared');
};
