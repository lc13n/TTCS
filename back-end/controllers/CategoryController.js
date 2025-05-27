const Category = require('../models/Category');

exports.index = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

exports.show = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).send('Category not found');
    }
    res.json(category);
};

exports.create = async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).send('Category created');
};

exports.edit = async (req, res) => {
    const { name } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { name });
    res.send('Category updated');
};

exports.delete = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.send('Category deleted');
};
