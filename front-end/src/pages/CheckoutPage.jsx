import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    district: "",
    city: "",
    phone: "",
    email: "",
    saveInfo: false,
  });

  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/cart/view", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const items =
          res.data?.products?.map((item) => ({
            id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            flashSales: item.productId.flashSales || 0,
            image: item.productId.image,
            quantity: item.quantity,
          })) || [];

        setCartItems(items);
      } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { firstName, lastName, email, phone, address } = res.data;

        setFormData((prev) => ({
          ...prev,
          fullName: `${firstName || ""} ${lastName || ""}`.trim(),
          street: address?.street || "",
          district: address?.district || "",
          city: address?.city || "",
          phone: phone || "",
          email: email || "",
        }));
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateDiscountedPrice = (price, flashSales) => {
    return Math.round(price * (1 - (flashSales || 0) / 100));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const discounted = calculateDiscountedPrice(item.price, item.flashSales);
    return sum + discounted * item.quantity;
  }, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "cash") {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để đặt hàng");
        return;
      }

      if (cartItems.length === 0) {
        alert("Giỏ hàng của bạn đang trống");
        return;
      }

      try {
        const orderData = {
          products: cartItems.map((item) => ({
            product: item.id,
            quantity: item.quantity,
          })),
          total,
          paymentMethod,
          billingInfo: {
            fullName: formData.fullName,
            street: formData.street,
            district: formData.district,
            city: formData.city,
            phone: formData.phone,
            email: formData.email,
          },
        };

        const res = await axios.post(
          "http://localhost:3000/api/orders/create",
          orderData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Đặt hàng thành công!");
        navigate("/orders");
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        alert("Đặt hàng thất bại. Vui lòng thử lại.");
      }
    } else {
      alert("Phương thức thanh toán hiện tại chỉ hỗ trợ Cash on delivery");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full">
        <div className="w-full max-w-[1440px] mx-auto px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900">Checkout</span>
          </div>
          {/* <div className="text-sm breadcrumbs mb-8">
            <ul className="flex items-center space-x-2 text-gray-500">
              <li>Account</li>
              <li>My Account</li>
              <li>Product</li>
              <li>View Cart</li>
              <li className="text-black">Checkout</li>
            </ul>
          </div> */}

          <h1 className="text-2xl font-bold mb-8">Billing Details</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Billing Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: "Full Name*", name: "fullName", required: true },
                  { label: "Street*", name: "street", required: true },
                  { label: "District*", name: "district", required: true },
                  { label: "City*", name: "city", required: true },
                  { label: "Phone Number*", name: "phone", required: true },
                  { label: "Email Address*", name: "email", required: true },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                      <input
                        type={
                          field.name === "email"
                            ? "email"
                            : field.name === "phone"
                            ? "tel"
                            : "text"
                        }
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required={field.required}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </label>
                  </div>
                ))}
{/* 
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Save this information for faster check-out next time
                  </label>
                </div> */}
              </form>
            </div>

            {/* Order Summary */}
            <div className="order-summary bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const discounted = calculateDiscountedPrice(
                    item.price,
                    item.flashSales
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                      </div>
                      <div className="text-right">
                        <span>${discounted * item.quantity}</span>
                      </div>
                    </div>
                  );
                })}

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {["bank", "cash"].map((method) => (
                    <div key={method} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id={method}
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4"
                      />
                      <label htmlFor={method}>
                        {method === "bank" ? (
                          <div className="flex items-center justify-between w-full">
                            <span>Bank</span>
                            <div className="flex items-center gap-2 pl-5">
                              <img
                                src="src/assets/images/visa.png"
                                alt="Visa"
                                className="h-4"
                              />
                              <img
                                src="src/assets/images/master-card.png"
                                alt="Mastercard"
                                className="h-5"
                              />
                            </div>
                          </div>
                        ) : (
                          "Cash on delivery"
                        )}
                      </label>
                    </div>
                  ))}
                </div>

                {/* <div className="flex space-x-4 mt-6">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="flex-1 px-4 py-2 border rounded"
                  />
                  <button className="bg-red-500 text-white px-6 py-2 rounded">
                    Apply Coupon
                  </button>
                </div> */}

                <button
                  onClick={handleSubmit}
                  className="w-full bg-red-500 text-white py-3 rounded mt-6 cursor-pointer hover:bg-red-600 transition-colors duration-200"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
