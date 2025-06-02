const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://kien:hehe@shopping-app.nfn3dio.mongodb.net/?retryWrites=true&w=majority&appName=shopping-app",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed", err));

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    const adminUser = new User({
      username: "admin",
      password: "$2a$10$3FKZsWmjPPfSkY0jgCHMLeJhBbLCoWKT0OgyJnIyYD1k/nKZFuPLu",
      email: "dzkien2@gmail.com",
      role: "admin",
    });
    await adminUser.save();

    const phone = new Category({ name: "Phone" });
    const computer = new Category({ name: "Computer" });
    await phone.save();
    await computer.save();

    const iphone = new Product({
      name: "iPhone 14",
      price: 999,
      description: "Latest Apple smartphone",
      category: phone._id,
      image: "https://example.com/images/iphone14.jpg",
      inStock: true,
      flashSales: 10,
      rating: 4.5,
    });

    const tshirt = new Product({
      name: "T-Shirt",
      price: 19.99,
      description: "100% Cotton T-shirt",
      category: computer._id,
      image: "https://example.com/images/tshirt.jpg",
      inStock: true,
      flashSales: 0,
      rating: 4.0,
    });

    const morePhones = [
      {
        name: "Samsung Galaxy S23",
        price: 899,
        description: "Flagship Android phone",
        category: phone._id,
        image: "https://example.com/images/galaxy-s23.jpg",
        inStock: true,
        flashSales: 5,
        rating: 4.4,
      },
      {
        name: "Google Pixel 8",
        price: 799,
        description: "Clean Android experience",
        category: phone._id,
        image: "https://example.com/images/pixel-8.jpg",
        inStock: true,
        flashSales: 2,
        rating: 4.3,
      },
      {
        name: "Xiaomi 13 Pro",
        price: 699,
        description: "Affordable flagship",
        category: phone._id,
        image: "https://example.com/images/xiaomi-13pro.jpg",
        inStock: true,
        flashSales: 7,
        rating: 4.1,
      },
      {
        name: "OnePlus 11",
        price: 749,
        description: "High performance Android",
        category: phone._id,
        image: "https://example.com/images/oneplus-11.jpg",
        inStock: true,
        flashSales: 6,
        rating: 4.2,
      },
      {
        name: "Sony Xperia 5 V",
        price: 949,
        description: "Compact flagship phone",
        category: phone._id,
        image: "https://example.com/images/xperia-5v.jpg",
        inStock: true,
        flashSales: 4,
        rating: 4.0,
      },
      {
        name: "Nokia X30",
        price: 529,
        description: "Eco-friendly phone",
        category: phone._id,
        image: "https://example.com/images/nokia-x30.jpg",
        inStock: true,
        flashSales: 1,
        rating: 3.9,
      },
      {
        name: "Motorola Edge 40",
        price: 599,
        description: "Curved OLED display",
        category: phone._id,
        image: "https://example.com/images/moto-edge40.jpg",
        inStock: true,
        flashSales: 3,
        rating: 4.1,
      },
      {
        name: "Asus ROG Phone 7",
        price: 999,
        description: "Gaming phone beast",
        category: phone._id,
        image: "https://example.com/images/rog-phone7.jpg",
        inStock: true,
        flashSales: 8,
        rating: 4.6,
      },
      {
        name: "Realme GT Neo 5",
        price: 499,
        description: "Fast charging powerhouse",
        category: phone._id,
        image: "https://example.com/images/realme-gtneo5.jpg",
        inStock: true,
        flashSales: 9,
        rating: 4.2,
      },
      {
        name: "Huawei P60 Pro",
        price: 899,
        description: "Top-tier camera phone",
        category: phone._id,
        image: "https://example.com/images/huawei-p60pro.jpg",
        inStock: true,
        flashSales: 4,
        rating: 4.3,
      },
    ];

    const moreComputers = [
      {
        name: 'MacBook Pro 16"',
        price: 2399,
        description: "Apple M2 Pro chip with 16GB RAM",
        category: computer._id,
        image: "https://example.com/images/macbook-pro.jpg",
        inStock: true,
        flashSales: 5,
        rating: 4.8,
      },
      {
        name: "Dell XPS 13",
        price: 1299,
        description: "13-inch ultrabook with Intel i7",
        category: computer._id,
        image: "https://example.com/images/dell-xps13.jpg",
        inStock: true,
        flashSales: 3,
        rating: 4.5,
      },
      {
        name: "HP Spectre x360",
        price: 1399,
        description: "Convertible laptop with touchscreen",
        category: computer._id,
        image: "https://example.com/images/hp-spectre.jpg",
        inStock: true,
        flashSales: 4,
        rating: 4.4,
      },
      {
        name: "Lenovo ThinkPad X1 Carbon",
        price: 1499,
        description: "Business laptop with legendary keyboard",
        category: computer._id,
        image: "https://example.com/images/thinkpad-x1.jpg",
        inStock: true,
        flashSales: 2,
        rating: 4.6,
      },
      {
        name: "Asus ZenBook 14",
        price: 1099,
        description: "Lightweight laptop with OLED display",
        category: computer._id,
        image: "https://example.com/images/zenbook-14.jpg",
        inStock: true,
        flashSales: 6,
        rating: 4.3,
      },
      {
        name: "Microsoft Surface Laptop 5",
        price: 1199,
        description: "Sleek design with PixelSense display",
        category: computer._id,
        image: "https://example.com/images/surface-laptop.jpg",
        inStock: true,
        flashSales: 2,
        rating: 4.2,
      },
      {
        name: "MSI Stealth 15",
        price: 1499,
        description: "Gaming laptop with RTX 4070",
        category: computer._id,
        image: "https://example.com/images/msi-stealth.jpg",
        inStock: true,
        flashSales: 7,
        rating: 4.1,
      },
      {
        name: "Acer Swift 5",
        price: 999,
        description: "Lightweight and powerful",
        category: computer._id,
        image: "https://example.com/images/acer-swift5.jpg",
        inStock: true,
        flashSales: 3,
        rating: 4.0,
      },
      {
        name: "Razer Blade 15",
        price: 1999,
        description: "Premium gaming and creator laptop",
        category: computer._id,
        image: "https://example.com/images/razer-blade.jpg",
        inStock: true,
        flashSales: 4,
        rating: 4.5,
      },
      {
        name: "LG Gram 17",
        price: 1599,
        description: 'Ultra-light 17" laptop for portability',
        category: computer._id,
        image: "https://example.com/images/lg-gram17.jpg",
        inStock: true,
        flashSales: 1,
        rating: 4.4,
      },
    ];

    await iphone.save();
    await tshirt.save();
    await Product.insertMany(morePhones);
    await Product.insertMany(moreComputers);

    console.log("Seed data inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
