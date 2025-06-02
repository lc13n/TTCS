import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
  const [showSearchDropdown, setShowSearchDropdown] = useState(false); // Hiển thị dropdown
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    // Ẩn user menu khi click ngoài
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  const handleLogout = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      alert("Bạn đã đăng xuất");
      setShowUserMenu(false);
      navigate("/");
    } else {
      alert("Bạn chưa đăng nhập");
    }
  };

  // Gọi API tìm kiếm sản phẩm
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length === 0) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/products/search?q=${encodeURIComponent(
          value
        )}`
      );
      setSearchResults(res.data || []);
      setShowSearchDropdown(true);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", err);
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  // Khi chọn sản phẩm trong kết quả search
  const handleSelectProduct = (productId) => {
    setSearchTerm("");
    setSearchResults([]);
    setShowSearchDropdown(false);
    navigate(`/products/${productId}`);
  };

  return (
    <header>
      {/* Top Header */}
      <div className="bg-black text-white">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="w-[550px] flex items-center justify-between py-3">
              <span className="text-sm">
                Get the best deals on electronics — Up to 50% OFF + Free
                Shipping!
              </span>
              <select className="bg-black text-white text-sm border-none focus:ring-0 cursor-pointer">
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold ml-20">
              Exclusive
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-primary ml-60">
                Home
              </Link>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
              <Link
                to="/signup"
                className="hover:text-primary whitespace-nowrap"
              >
                Sign Up
              </Link>
            </nav>

            {/* Search and Icons */}
            <div className="flex items-center gap-4 relative">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  className="w-[300px] py-2 px-4 bg-gray-100 rounded-md pr-10"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchResults.length > 0) setShowSearchDropdown(true);
                  }}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Dropdown kết quả tìm kiếm */}
                {showSearchDropdown && (
                  <ul className="absolute z-50 top-full left-0 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {searchResults.length === 0 ? (
                      <li className="px-4 py-2 text-gray-500">
                        Không có kết quả
                      </li>
                    ) : (
                      searchResults.map((product) => (
                        <li
                          key={product._id}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSelectProduct(product._id)}
                        >
                          {product.name}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <Link to="/wishlist" className="hover:text-primary">
                  <FaHeart size={24} />
                </Link>
                <Link to="/cart" className="relative hover:text-primary">
                  <FaShoppingCart size={24} />
                </Link>

                {/* User Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={handleUserIconClick}
                    className="hover:text-primary focus:outline-none cursor-pointer"
                  >
                    <FaUser size={24} />
                  </button>

                  {showUserMenu && isAuthenticated && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Manage My Account
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        My Order
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
