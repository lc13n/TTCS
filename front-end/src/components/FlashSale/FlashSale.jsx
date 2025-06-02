import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/products/flash-sales"
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm Flash Sale:", err);
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
        const data = await res.json();
        const ids = data?.products?.map((p) => p.productId._id) || [];
        setWishlistIds(ids);
      } catch (err) {
        console.error("Lỗi khi lấy wishlist:", err);
      }
    };

    fetchFlashSales();
    fetchWishlist();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-${index < rating ? "yellow" : "gray"}-400`}
      >
        ★
      </span>
    ));
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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

  const handleToggleWishlist = async (productId) => {
    try {
      if (wishlistIds.includes(productId)) {
        // Xóa khỏi wishlist
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
        // Thêm vào wishlist
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

  const handleViewDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  const renderProductCard = (product) => {
    const discountedPrice = Math.round(
      product.price * (1 - (product.flashSales || 0) / 100)
    );
    const rating = product.rating || 0;
    const reviews = product.reviews || 0;

    return (
      <div
        key={product._id}
        className="min-w-[260px] bg-white p-4 rounded-lg border border-gray-300 hover:border-red-500 shadow-md hover:shadow-xl transition-all duration-300 group relative"
      >
        {product.flashSales > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded">
            -{product.flashSales}%
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => handleToggleWishlist(product._id)}
            className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
          >
            <FaHeart
              className={
                wishlistIds.includes(product._id) ? "text-pink-500" : ""
              }
            />
          </button>
          <button
            onClick={() => handleViewDetail(product._id)}
            className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
          >
            <FaEye />
          </button>
        </div>
        <div className="mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain"
          />
        </div>
        <button
          onClick={() => handleAddToCart(product._id)}
          className="w-full bg-black text-white py-2 rounded mb-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          Add To Cart
        </button>
        <h4
          onClick={() => handleViewDetail(product._id)}
          className="font-medium mb-2 cursor-pointer"
        >
          {product.name}
        </h4>
        <div className="flex gap-2 mb-2">
          <span className="text-red-500">${discountedPrice}</span>
          <span className="text-gray-400 line-through">${product.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(rating)}</div>
          <span className="text-gray-400">({reviews})</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-5 h-10 bg-red-500 rounded"></div>
        <h2 className="text-red-500">Today's</h2>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold">Flash Sales</h3>
        <div className="flex gap-4">
          {["days", "hours", "minutes", "seconds"].map((key, idx) => (
            <React.Fragment key={key}>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {timeLeft[key].toString().padStart(2, "0")}
                </div>
                <div className="text-sm capitalize">{key}</div>
              </div>
              {idx < 3 && <div className="text-2xl font-bold">:</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {!showAll ? (
        <div className="relative">
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar"
          >
            <div className="inline-flex gap-4">
              {products.slice(0, 6).map(renderProductCard)}
            </div>
          </div>

          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <FaChevronRight />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8 mt-6">
          {products.map(renderProductCard)}
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default FlashSale;
