import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cart from '../components/Cart';

const CartPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900">Cart</span>
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