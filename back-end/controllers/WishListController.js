const Product = require('../models/Product');
const WishList = require('../models/WishList');
const Cart = require('../models/Cart'); // 

exports.viewWishList = async (req, res) => {
    const wishList = await WishList.findOne({ userId: req.user.id }).populate('products.productId');
    res.json(wishList);
};

exports.addToWishList = async (req, res) => {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');

    let wishList = await WishList.findOne({ userId: req.user.id });
    if (!wishList) {
        wishList = new WishList({ userId: req.user.id, products: [] });
    }

    const index = wishList.products.findIndex(item => item.productId.toString() === productId);
    if (index > -1) {
        wishList.products[index].quantity += 1;
    } else {
        wishList.products.push({ productId, quantity: 1 });
    }

    await wishList.save();
    res.send('Product added to WishList');
};

exports.removeFromWishList = async (req, res) => {
    const { productId } = req.body;

    const wishList = await WishList.findOne({ userId: req.user.id });
    if (!wishList) return res.status(404).send('WishList not found');

    wishList.products = wishList.products.filter(item => item.productId.toString() !== productId);
    await wishList.save();
    res.send('Product removed from WishList');
};

exports.addAll = async (req, res) => {
    try {
        const wishList = await WishList.findOne({ userId: req.user.id });
        if (!wishList || wishList.products.length === 0) {
            return res.status(404).send('WishList is empty or not found');
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [] });
        }

        wishList.products.forEach(wishItem => {
            const index = cart.products.findIndex(cartItem =>
                cartItem.productId.toString() === wishItem.productId.toString()
            );

            if (index > -1) {
                cart.products[index].quantity += wishItem.quantity;
            } else {
                cart.products.push({
                    productId: wishItem.productId,
                    quantity: wishItem.quantity
                });
            }
        });

        await cart.save();

        res.send('All wishlist items moved to cart');
    } catch (error) {
        console.error('Error moving wishlist to cart:', error);
        res.status(500).send('Internal Server Error');
    }
};
