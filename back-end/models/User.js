const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' },
  phone: { type: String, default: '' },       // Tỉnh/thành phố
  address: {
    street: { type: String, default: '' },     // Đường
    district: { type: String, default: '' },   // Huyện/quận
    city: { type: String, default: '' },       // Tỉnh/thành phố
  },

  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
