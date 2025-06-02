import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Cart from "../components/Cart";

const CartPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Cart</span>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-0 pb-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Giỏ hàng của bạn</h2>
            {/* <p className="text-gray-700">
              Đây là danh sách các sản phẩm bạn đã chọn mua. Bạn có thể cập nhật
              số lượng, xóa sản phẩm hoặc tiến hành thanh toán. Hãy kiểm tra kỹ
              thông tin trước khi đặt hàng để có trải nghiệm mua sắm tốt nhất.
            </p> */}
          </div>
        </div>

        {/* Cart Component */}
        <Cart />
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
