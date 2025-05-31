import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaEye,
  FaCartPlus,
  FaSortAmountUpAlt,
  FaSortAmountDownAlt,
  FaPercent,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const SortOptions = ({ selected, onChange }) => {
  const options = [
    {
      key: "highToLow",
      label: "Giá Cao - Thấp",
      icon: <FaSortAmountDownAlt />,
    },
    { key: "lowToHigh", label: "Giá Thấp - Cao", icon: <FaSortAmountUpAlt /> },
    { key: "hotSale", label: "Khuyến Mãi Hot", icon: <FaPercent /> },
    { key: "mostViewed", label: "Xem nhiều", icon: <FaEye /> },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Sắp xếp theo</h2>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition cursor-pointer ${
              selected === option.key
                ? "border-red-500 text-red-600 bg-red-50"
                : "border-gray-200 text-gray-600 bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);

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

  const sortedProducts = [...products].sort((a, b) => {
    const aDiscount = Math.round(a.price * (1 - (a.flashSales || 0) / 100));
    const bDiscount = Math.round(b.price * (1 - (b.flashSales || 0) / 100));

    switch (sortBy) {
      case "highToLow":
        return bDiscount - aDiscount;
      case "lowToHigh":
        return aDiscount - bDiscount;
      case "hotSale":
        return (b.flashSales || 0) - (a.flashSales || 0);
      case "mostViewed":
        return (b.views || 0) - (a.views || 0);
      default:
        return 0;
    }
  });

  if (loading)
    return (
      <div className="text-center py-10 text-lg font-medium">
        Đang tải sản phẩm...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 py-10">Lỗi: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">Products</span>
      </div>
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Sản phẩm nổi bật</h1>
      </div> */}

      <SortOptions selected={sortBy} onChange={setSortBy} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedProducts.map((item) => {
          const discountedPrice = Math.round(
            item.price * (1 - (item.flashSales || 0) / 100)
          );

          return (
            <div
              key={item._id}
              className="relative bg-white rounded-2xl shadow-lg p-4 flex flex-col border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              {/* Badge sale */}
              {item.flashSales > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                  -{item.flashSales}%
                </div>
              )}

              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  onClick={() => handleToggleWishlist(item._id)}
                  className="p-2 rounded-full bg-white shadow hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
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
              </div>

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
                className="text-lg font-semibold mb-1 text-gray-800 truncate cursor-pointer"
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
    </div>
  );
};

export default Products;
