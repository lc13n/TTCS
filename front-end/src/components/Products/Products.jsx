import React, { useEffect, useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiUrl = "http://localhost:3000/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Lấy dữ liệu sản phẩm thất bại");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/wishlist/view", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          const ids = data?.products?.map((p) => p.productId._id) || [];
          setWishlistIds(ids);
        }
      } catch (err) {
        console.error("Lỗi khi lấy wishlist:", err);
      }
    };

    fetchProducts();
    fetchWishlist();
  }, []);

  const handleToggleWishlist = async (productId) => {
    try {
      if (wishlistIds.includes(productId)) {
        const res = await fetch("http://localhost:3000/api/wishlist/remove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ productId }),
        });
        if (res.ok) {
          alert("Đã xóa khỏi danh sách yêu thích!");
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
        } else {
          const msg = await res.text();
          alert("Xóa thất bại: " + msg);
        }
      } else {
        const res = await fetch("http://localhost:3000/api/wishlist/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ productId }),
        });
        if (res.ok) {
          alert("Đã thêm vào danh sách yêu thích!");
          setWishlistIds((prev) => [...new Set([...prev, productId])]);
        } else {
          const msg = await res.text();
          alert("Thêm thất bại: " + msg);
        }
      }
    } catch (err) {
      console.error("Lỗi khi thay đổi wishlist:", err);
      alert("Lỗi hệ thống");
    }
  };

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
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
      alert("Lỗi hệ thống");
    }
  };

  const handleViewDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading)
    return <div className="text-center py-10">Đang tải sản phẩm...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">Lỗi: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium">Products</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => {
          // Tính giá giảm (discountedPrice) theo flashSales nếu có
          const discountedPrice = Math.round(
            item.price * (1 - (item.flashSales || 0) / 100)
          );

          return (
            <div
              key={item._id}
              className="relative bg-white rounded-md shadow-md p-4 flex flex-col"
            >
              {/* Nút wishlist và nút xem chi tiết */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                  onClick={() => handleToggleWishlist(item._id)}
                  className="p-2 rounded-full bg-white shadow hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Add to wishlist"
                  title={
                    wishlistIds.includes(item._id)
                      ? "Xóa khỏi yêu thích"
                      : "Thêm vào yêu thích"
                  }
                >
                  <FaHeart
                    className={
                      wishlistIds.includes(item._id) ? "text-pink-500" : ""
                    }
                  />
                </button>

                <button
                  onClick={() => handleViewDetail(item._id)}
                  className="p-2 rounded-full bg-white shadow hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="View product details"
                  title="Xem chi tiết sản phẩm"
                >
                  <FaEye />
                </button>
              </div>

              {/* Ảnh sản phẩm */}
              <div
                className="aspect-square mb-4 cursor-pointer"
                onClick={() => handleViewDetail(item._id)}
                title="Xem chi tiết sản phẩm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Tên sản phẩm */}
              <h3
                className="text-lg font-semibold mb-2 truncate cursor-pointer"
                onClick={() => handleViewDetail(item._id)}
                title="Xem chi tiết sản phẩm"
              >
                {item.name}
              </h3>

              {/* Hiển thị giá */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-semibold">
                  ${discountedPrice}
                </span>
                {item.originalPrice && item.originalPrice > discountedPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ${item.originalPrice}
                  </span>
                )}
              </div>

              {/* Nút thêm vào giỏ hàng */}
              <button
                onClick={() => handleAddToCart(item._id)}
                className="mt-auto bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
