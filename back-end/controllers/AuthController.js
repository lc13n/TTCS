const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OTP = require('../models/Otp');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const checkUser = await User.findOne({ username });
    if (checkUser) {
      return res.status(409).json({ message: "Tài khoản đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({ email, code, expiresAt: Date.now() + 5 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cayfam0102@gmail.com',
        pass: 'meov redp pawo wetv',
      },
    });

    await transporter.sendMail({
      from: 'cayfam0102@gmail.com',
      to: email,
      subject: 'Mã khôi phục mật khẩu',
      text: `Mã khôi phục của bạn là: ${code}`,
    });

    res.json({ message: 'OTP đã được gửi' });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Lỗi server khi xử lý quên mật khẩu" });
  }
};

// Hàm mới verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;

    const otpRecord = await OTP.findOne({ email, code });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP không đúng" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP đã hết hạn" });
    }

    res.json({ message: "OTP hợp lệ" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Lỗi server khi xác thực OTP" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const otpRecord = await OTP.findOne({ email, code });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP không đúng" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP đã hết hạn" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({ message: "Mật khẩu đã được đặt lại thành công" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Lỗi server khi đặt lại mật khẩu" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
