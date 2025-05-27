const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed', err));

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    const adminUser = new User({
      username: 'admin',
      password: '$2a$10$3FKZsWmjPPfSkY0jgCHMLeJhBbLCoWKT0OgyJnIyYD1k/nKZFuPLu', 
      email: 'dzkien2@gmail.com',
      role: 'admin'
    });
    await adminUser.save();

    const electronics = new Category({ name: 'Electronics' });
    const fashion = new Category({ name: 'Fashion' });
    await electronics.save();
    await fashion.save();

    const iphone = new Product({
      name: 'iPhone 14',
      price: 999,
      description: 'Latest Apple smartphone',
      category: electronics._id,
      image: './img/1.png'
    });

    const tshirt = new Product({
      name: 'T-Shirt',
      price: 19.99,
      description: '100% Cotton T-shirt',
      category: fashion._id,
      image: './img/2.png'
    });

    await iphone.save();
    await tshirt.save();

    console.log('Seed data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
