import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlistIds, setWishlistIds] = useState([]); // lưu id các sản phẩm trong wishlist

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        const data = res.data;
        setProduct(data);
        setSelectedColor(data.colors?.[0] || '');
        setSelectedSize(data.sizes?.[0] || '');
        setSelectedImage(0);

        // Lấy sản phẩm liên quan theo category name
        if (data.category?.name) {
          const relatedRes = await axios.get(
            `http://localhost:3000/api/products/filter/category?category=${data.category.name}`
          );
          const others = relatedRes.data.filter(p => p._id !== data._id);
          const shuffled = others.sort(() => 0.5 - Math.random());
          setRelatedProducts(shuffled.slice(0, 4));
        }
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
      }
    };

    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:3000/api/wishlist/view', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Lấy id sản phẩm trong wishlist
        const ids = res.data.products.map(item => item.productId._id.toString());
        setWishlistIds(ids);
      } catch (err) {
        console.error('Lỗi khi lấy wishlist:', err);
      }
    };

    fetchProduct();
    fetchWishlist();
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1) setQuantity(newQty);
  };

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }
    try {
      await axios.post(
        'http://localhost:3000/api/cart/add',
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (err) {
      console.error('Lỗi khi thêm giỏ hàng:', err);
      alert('Thêm giỏ hàng thất bại');
    }
  };

  // Thêm hoặc xóa sản phẩm khỏi wishlist
  const toggleWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để quản lý wishlist');
      return;
    }

    if (wishlistIds.includes(product._id)) {
      // Đã có trong wishlist -> xóa
      try {
        await axios.delete('http://localhost:3000/api/wishlist/remove', {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId: product._id },
        });
        setWishlistIds(prev => prev.filter(id => id !== product._id));
      } catch (err) {
        console.error('Lỗi khi xóa khỏi wishlist:', err);
      }
    } else {
      // Chưa có -> thêm mới
      try {
        await axios.post(
          'http://localhost:3000/api/wishlist/add',
          { productId: product._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlistIds(prev => [...prev, product._id]);
      } catch (err) {
        console.error('Lỗi khi thêm vào wishlist:', err);
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (!product) return <p className="p-10">Loading...</p>;

  // Tính giá giảm (discounted price) cho sản phẩm chính
  const discountPercent = product.flashSales || product.discount || 0;
  const discountedPrice = (product.price * (1 - discountPercent / 100)).toFixed(0);

  // Hàm tính giá giảm cho sản phẩm liên quan
  const getDiscountedPrice = (item) => {
    const discount = item.flashSales || item.discount || 0;
    return (item.price * (1 - discount / 100)).toFixed(0);
  };

  const isInWishlist = wishlistIds.includes(product._id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Image thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-red-500' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">{renderStars(product.rating || 0)}</div>
            <span className="text-gray-500">({product.reviews || 0} Reviews)</span>
            {product.inStock && <span className="text-green-500">In Stock</span>}
          </div>

          {/* Giá sản phẩm chính */}
          <div className="flex items-center gap-3 text-2xl font-bold">
            <span className="text-red-500">${discountedPrice}</span>
            {discountPercent > 0 && (
              <span className="text-gray-400 line-through text-lg">${product.price.toFixed(0)}</span>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Màu sắc */}
          <div className="space-y-4">
            {/* <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Colours:</h3>
              <div className="flex space-x-2">
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full ${
                      color === 'white' ? 'bg-white' : 'bg-pink-500'
                    } ${
                      selectedColor === color
                        ? 'ring-2 ring-offset-2 ring-red-500'
                        : ''
                    }`}
                  />
                ))}
              </div>
            </div> */}

            {/* Size */}
            {/* <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size:</h3>
              <div className="flex space-x-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size
                        ? 'border-red-500 text-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Wishlist & Quantity */}
            <div className="flex items-center space-x-4">
              <div
                onClick={toggleWishlist}
                className={`cursor-pointer p-2 rounded-full ${
                  isInWishlist ? 'text-pink-500' : 'text-gray-400'
                } hover:text-pink-500 transition-colors`}
                title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg
                  className="w-6 h-6"
                  fill={isInWishlist ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>

              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 border-r border-gray-300"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 border-l border-gray-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-8 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* Delivery & Returns */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="text-sm text-gray-500">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <div>
                <h4 className="font-medium">Return Delivery</h4>
                <p className="text-sm text-gray-500">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => {
            const discountPercentRelated = item.flashSales || item.discount || 0;
            const discountedPriceRelated = (item.price * (1 - discountPercentRelated / 100)).toFixed(0);

            return (
              <div key={item._id} className="group relative">
                <div className="relative">
                  {discountPercentRelated > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{discountPercentRelated}%
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500 font-medium">${discountedPriceRelated}</span>
                    {discountPercentRelated > 0 && (
                      <span className="text-gray-400 line-through">${item.price.toFixed(0
                      )}</span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">{renderStars(item.rating || 0)}</div>
                    <span className="ml-2 text-sm text-gray-500">({item.reviews || 0})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
