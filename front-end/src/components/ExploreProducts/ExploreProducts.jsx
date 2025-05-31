import React, { useEffect, useState } from "react";
import { FaEye, FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExploreProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 8));
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.text();
      if (res.ok) {
        alert("Đã thêm vào giỏ hàng!");
      } else {
        alert("Thêm thất bại: " + data);
      }
    } catch (err) {
      alert("Lỗi hệ thống");
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500"></div>
          <h2 className="text-2xl font-semibold">Our Products</h2>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8">Explore Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => {
          const discountedPrice = Math.round(
            item.price * (1 - (item.flashSales || 0) / 100)
          );

          return (
            <div
              key={item._id}
              className="relative bg-white rounded-2xl shadow-lg p-4 flex flex-col border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              {item.flashSales > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                  -{item.flashSales}%
                </div>
              )}

              {/* <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => handleViewDetail(item._id)}
                  className="p-2 rounded-full bg-white shadow hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  title="Xem chi tiết"
                >
                  <FaEye />
                </button>
              </div> */}

              <div
                className="aspect-square mb-4 cursor-pointer rounded-lg overflow-hidden bg-gray-50"
                onClick={() => handleViewDetail(item._id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3
                className="text-lg font-semibold mb-1 text-gray-800 h-[48px] overflow-hidden leading-tight cursor-pointer"
                onClick={() => handleViewDetail(item._id)}
              >
                {item.name}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-600 text-lg font-semibold">
                  ${discountedPrice}
                </span>
                {item.flashSales > 0 && (
                  <>
                    <span className="text-gray-400 line-through text-sm">
                      ${item.price}
                    </span>
                    <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded-full">
                      -{item.flashSales}%
                    </span>
                  </>
                )}
              </div>

              <button
                onClick={() => handleAddToCart(item._id)}
                className="mt-auto flex items-center justify-center gap-2 bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <FaCartPlus />
                <span>Thêm vào giỏ</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default ExploreProducts;
