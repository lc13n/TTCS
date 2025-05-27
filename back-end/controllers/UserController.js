const User = require('../models/User');
const Order = require('../models/Order'); // đảm bảo bạn đã khai báo model Order
const bcrypt = require('bcryptjs');

exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).send('Failed to fetch profile');
    }
};

exports.updateProfile = async (req, res) => {
  const { firstName, lastName, phone, email, street, district, city } = req.body;

  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        email,
        firstName,
        lastName,
        phone,
        address: {
          street,
          district,
          city
        }
      },
      { new: true }
    );

    res.send('Profile updated');
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send('Failed to update profile');
  }
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).send('Old password is incorrect');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

        res.send('Password changed successfully');
    } catch (err) {
        console.error('Password change error:', err);
        res.status(500).send('Failed to change password');
    }
};

exports.orderHistory = async (req, res) => {
    // Giả sử bạn có một model Order
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
};
