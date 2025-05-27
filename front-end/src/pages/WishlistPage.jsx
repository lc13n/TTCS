import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/wishlist/view', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                console.log(res);
                const data = await res.json();
                // Map dữ liệu để dễ hiển thị
                const mappedItems = data.products.map(item => ({
                    id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    originalPrice: item.productId.originalPrice,
                    discount: item.productId.discount,
                    image: item.productId.image,
                    quantity: item.quantity
                }));
                setWishlistItems(mappedItems);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemoveFromWishlist = async (id) => {
        try {
            await fetch('http://localhost:3000/api/wishlist/remove', {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                body: JSON.stringify({ productId: id })
            });
            setWishlistItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Remove error:', error);
        }
    };

    const handleAddToCart = async (id) => {
        try {
            await fetch('http://localhost:3000/api/cart/add', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                body: JSON.stringify({ productId: id })
            });
            console.log('Added to cart:', id);
        } catch (error) {
            console.error('Add to cart error:', error);
        }
    };

    const handleMoveAllToBag = async () => {
        try {
            await fetch('http://localhost:3000/api/wishlist/add-all', {
                method: 'DELETE',
                headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        } 
            });
            setWishlistItems([]);
        } catch (error) {
            console.error('Move all to bag error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-medium">
                        Wishlist ({wishlistItems.length})
                    </h1>
                    <button
                        onClick={handleMoveAllToBag}
                        className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                        Move All To Bag
                    </button>
                </div>

                {loading ? (
                    <p>Loading wishlist...</p>
                ) : wishlistItems.length === 0 ? (
                    <p>No items in wishlist.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => {
                            const discountedPrice = Math.round(item.price * (1 - (item.discount || 0) / 100));
                            return (
                                <div key={item.id} className="bg-[#F5F5F5] p-4 relative group">
                                    {item.discount && (
                                        <span className="absolute top-4 left-4 bg-[#DB4444] text-white px-3 py-1 text-sm">
                                            -{item.discount}%
                                        </span>
                                    )}
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="aspect-square mb-4">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-medium text-lg">{item.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#DB4444] font-medium">${discountedPrice}</span>
                                            {item.originalPrice && (
                                                <span className="text-gray-500 line-through">${item.price}</span>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(item.id)}
                                            className="w-full bg-black text-white py-2 hover:bg-gray-800 transition-colors"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default WishlistPage;
