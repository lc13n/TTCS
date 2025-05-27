import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // res.data.orders là theo API bạn backend đã trả về
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

  if (loading)
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex justify-center items-center text-xl">Đang tải đơn hàng...</main>
        <Footer />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex justify-center items-center text-red-600">{error}</main>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Lịch sử đơn hàng</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="mb-6 rounded-lg shadow-sm bg-white border border-gray-200"
            >
              {/* Header */}
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

              {/* Product List */}
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
                    {item.variant && (
                      <p className="text-xs text-gray-500">Phân loại: {item.variant}</p>
                    )}
                    <p className="text-xs text-gray-500">Số lượng: x{item.quantity}</p>
                  </div>
                  <div className="text-right text-sm">
                    {item.originalPrice && (
                      <p className="text-gray-400 line-through">
                        {item.originalPrice.toLocaleString()}₫
                      </p>
                    )}
                    <p className="text-red-500 font-semibold">
                      {item.product.price.toLocaleString()}₫
                    </p>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-t bg-gray-50 gap-3">
                <div className="text-sm text-gray-600">
                  Tổng tiền:{" "}
                  <span className="text-lg text-red-600 font-bold">
                    {order.total.toLocaleString()}₫
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap justify-end">
                  {order.status === "Delivered" ? (
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded text-sm">
                      Đánh Giá
                    </button>
                  ) : (
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm">
                      Đã Nhận Hàng
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-100">
                    Yêu Cầu Trả Hàng
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-100">
                    Liên Hệ Người Bán
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
