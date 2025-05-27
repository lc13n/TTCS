const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }, 
    flashSales: {type: Number, default: 0}, 
    rating: {type: Number, default: 0},
    color: {type: String, default:''},
    quantity: {type: Number, defautl:1}
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
