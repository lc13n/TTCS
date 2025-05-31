import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const categoryDescriptions = {
  phone: {
    title: "Phone",
    description: (
      <>
        <strong>Điện thoại</strong> là thiết bị không thể thiếu trong cuộc sống
        hiện đại, giúp bạn liên lạc, giải trí và làm việc mọi lúc mọi nơi. Nổi
        bật với các dòng <strong>iPhone</strong>,{" "}
        <strong>Samsung Galaxy</strong> và <strong>Xiaomi</strong>, điện thoại
        ngày nay sở hữu thiết kế tinh tế cùng hiệu năng vượt trội.
      </>
    ),
  },
  computer: {
    title: "Computer",
    description: (
      <>
        <strong>Máy tính</strong> là công cụ đắc lực trong học tập, làm việc và
        giải trí. Từ các dòng <strong>PC văn phòng</strong> đến{" "}
        <strong>máy tính gaming</strong> và{" "}
        <strong>máy trạm chuyên dụng</strong>, bạn dễ dàng chọn được thiết bị
        phù hợp nhu cầu cá nhân hoặc công việc chuyên môn cao.
      </>
    ),
  },
  smartwatch: {
    title: "SmartWatch",
    description: (
      <>
        <strong>Smartwatch</strong> không chỉ hiển thị giờ mà còn là trợ lý sức
        khỏe thông minh, hỗ trợ đo nhịp tim, theo dõi giấc ngủ và nhận thông báo
        từ điện thoại. Các dòng như <strong>Apple Watch</strong>,{" "}
        <strong>Samsung Galaxy Watch</strong> và <strong>Huawei Watch</strong>{" "}
        giúp bạn sống hiện đại và năng động hơn.
      </>
    ),
  },
  camera: {
    title: "Camera",
    description: (
      <>
        <strong>Camera</strong> ghi lại những khoảnh khắc quý giá trong cuộc
        sống với chất lượng hình ảnh sắc nét. Từ <strong>máy ảnh DSLR</strong>,{" "}
        <strong>mirrorless</strong> đến <strong>camera hành trình</strong>,
        người dùng có nhiều lựa chọn từ nghiệp dư đến chuyên nghiệp.
      </>
    ),
  },
  headphones: {
    title: "HeadPhones",
    description: (
      <>
        <strong>Tai nghe</strong> giúp bạn đắm chìm vào thế giới âm nhạc, tập
        trung làm việc hoặc giải trí mọi lúc mọi nơi. Các sản phẩm như{" "}
        <strong>AirPods</strong>, <strong>Sony WH-1000XM</strong> và{" "}
        <strong>JBL</strong> mang lại chất âm tuyệt vời và khả năng chống ồn
        hiệu quả.
      </>
    ),
  },
  gaming: {
    title: "Gaming",
    description: (
      <>
        <strong>Gaming</strong> là thế giới dành cho game thủ với các thiết bị
        như <strong>tay cầm chơi game</strong>, <strong>ghế gaming</strong>,
        <strong>tai nghe chuyên game</strong> và{" "}
        <strong>máy chơi game console</strong>, giúp bạn tận hưởng trải nghiệm
        chơi game đỉnh cao và chân thực.
      </>
    ),
  },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/filter/category?category=${slug}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải sản phẩm.");
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

    fetchByCategory();
    fetchWishlist();
  }, [slug]);

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
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
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
          setWishlistIds((prev) => [...new Set([...prev, productId])]);
        }
      }
    } catch (err) {
      console.error("Lỗi khi thay đổi wishlist:", err);
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
      if (res.ok) {
        alert("Đã thêm vào giỏ hàng!");
      }
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
    }
  };

  const handleViewDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading)
    return (
      <div className="text-center py-10 text-lg font-medium">
        Đang tải sản phẩm...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 py-10">Lỗi: {error}</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 capitalize">{slug}</span>
        </div>

        {categoryDescriptions[slug?.toLowerCase()] && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {categoryDescriptions[slug.toLowerCase()].title}
            </h2>
            <p className="text-gray-700">
              {categoryDescriptions[slug.toLowerCase()].description}
            </p>
          </div>
        )}

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

                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => handleToggleWishlist(item._id)}
                    className="p-2 rounded-full bg-white shadow hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
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

      <Footer />
    </div>
  );
};

export default CategoryPage;
