const Product = require('../models/Product');
const Category = require('../models/Category');

exports.index = async (req, res) => {
    const products = await Product.find().populate('category');
    res.json(products);
};

exports.show = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
};

exports.search = async (req, res) => {
    const query = req.query.q;
    const products = await Product.find({ name: new RegExp(query, 'i') });
    res.json(products);
};

exports.filterByCategory = async (req, res) => {
  const categoryName = req.query.category; // ví dụ: "phone"

  try {
    const category = await Category.findOne({ name: new RegExp(`^${categoryName}$`, 'i') });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ category: category._id }).populate('category');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi lọc sản phẩm theo category' });
  }
};

exports.filterByPrice = async (req, res) => {
    const { min, max } = req.query;
    const products = await Product.find({ price: { $gte: min, $lte: max } });
    res.json(products);
};

exports.flashSales = async (req, res) => {
    try {
        const products = await Product.find({ flashSales: { $gt: 0 } }).populate('category');
        // console.log(products);
        res.json(products);
    } catch (err) {
        res.status(500).send('Failed to fetch flash sale products');
    }
};

