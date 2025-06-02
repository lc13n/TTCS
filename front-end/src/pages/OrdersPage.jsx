import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";

// ✅ Modal chi tiết đơn hàng với hình ảnh sản phẩm
const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white w-[90%] max-w-xl rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Chi Tiết Đơn Hàng</h2>
        <p><strong>Mã đơn hàng:</strong> #{order._id}</p>
        <p><strong>Trạng thái:</strong> {order.status}</p>

        <hr className="my-3" />
        <h3 className="font-semibold mb-2">Sản phẩm:</h3>
        {order.products.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between mb-2 text-sm">
            <div className="flex items-center gap-3">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded border"
              />
              <span>{item.product.name} x {item.quantity}</span>
            </div>
            <span>{item.product.price.toLocaleString()}₫</span>
          </div>
        ))}

        <hr className="my-3" />
        <p className="font-semibold">
          Tổng tiền: <span className="text-red-500">{order.total.toLocaleString()}₫</span>
        </p>

        {order.billingInfo && (
          <>
            <hr className="my-3" />
            <p><strong>Người nhận:</strong> {order.billingInfo.fullName}</p>
            <p><strong>Địa chỉ:</strong> {order.billingInfo.street}, {order.billingInfo.district}, {order.billingInfo.city}</p>
            <p><strong>SĐT:</strong> {order.billingInfo.phone}</p>
            <p><strong>Email:</strong> {order.billingInfo.email}</p>
          </>
        )}
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để xem đơn hàng");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("http://localhost:3000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
        setError("Lỗi khi lấy đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmDelete = window.confirm("Xác nhận đã nhận đơn hàng!");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/orders/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      alert("Xác nhận đơn hàng thành công");
    } catch (err) {
      console.error("Lỗi khi xác nhận đơn hàng:", err);
      alert("Xác nhận đơn hàng thất bại");
    }
  };

  const handleContactSeller = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Lịch sử đơn hàng</h1>

        {loading ? (
          <p className="text-center">Đang tải đơn hàng...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="mb-6 rounded-lg shadow-sm bg-white border border-gray-200"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b text-sm">
                <div className="text-gray-600 font-medium">
                  <span className="text-gray-400">Mã đơn:</span> #{order._id}
                </div>
                <div
                  className={`font-semibold ${
                    order.status === "Delivered" ? "text-green-600" : "text-orange-500"
                  }`}
                >
                  {order.status}
                </div>
              </div>

              {order.products.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 px-4 py-3 border-b last:border-none"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm mb-1">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Số lượng: x{item.quantity}</p>
                  </div>
                  <div className="text-right text-sm text-red-500 font-semibold">
                    {item.product.price.toLocaleString()}₫
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-t bg-gray-50 gap-3">
                <div className="text-sm text-gray-600">
                  Tổng tiền:{" "}
                  <span className="text-lg text-red-600 font-bold">
                    {order.total.toLocaleString()}₫
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap justify-end">
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Đã Nhận Hàng
                  </button>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="border border-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-100"
                  >
                    Chi Tiết Đơn Hàng
                  </button>
                  <button
                    onClick={handleContactSeller}
                    className="border border-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-100"
                  >
                    Liên Hệ Người Bán
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Hiển thị modal chi tiết */}
        {selectedOrder && (
          <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
