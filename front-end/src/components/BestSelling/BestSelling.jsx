import React from 'react';
import { AiOutlineHeart, AiOutlineEye } from 'react-icons/ai';
import aoDo from '../../assets/images/672462_ZAH9D_5626_002_100_0000_Light-The-North-Face-x-Gucci-coat 1.png';
import gucciBag from '../../assets/images/672462_ZAH9D_5626_002_100_0000_Light-The-North-Face-x-Gucci-coat 1.png';
import cpuCooler from '../../assets/images/loa.png';
import bookshelf from '../../assets/images/keSach.png';

const products = [
    {
        id: 1,
        name: 'The north coat',
        image: aoDo,
        price: 260,
        oldPrice: 360,
        rating: 5,
        reviews: 65
    },
    {
        id: 2,
        name: 'Gucci duffle bag',
        image: gucciBag,
        price: 960,
        oldPrice: 1160,
        rating: 5,
        reviews: 65
    },
    {
        id: 3,
        name: 'RGB liquid CPU Cooler',
        image: cpuCooler,
        price: 160,
        oldPrice: 170,
        rating: 5,
        reviews: 65
    },
    {
        id: 4,
        name: 'Small BookSelf',
        image: bookshelf,
        price: 360,
        oldPrice: null,
        rating: 5,
        reviews: 65
    }
];

const BestSelling = () => {
    return (
        <div className="py-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-red-500"></div>
                    <h2 className="text-2xl font-semibold">This Month</h2>
                </div>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    View All
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-8">Best Selling Products</h1>

            <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-lg p-4">
                        <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute right-4 top-4 space-y-2">
                                <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100">
                                    <AiOutlineHeart className="w-5 h-5" />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100">
                                    <AiOutlineEye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-red-500 font-semibold">${product.price}</span>
                            {product.oldPrice && (
                                <span className="text-gray-500 line-through">${product.oldPrice}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            {'★'.repeat(product.rating)}
                            <span className="text-gray-500 text-sm">({product.reviews})</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSelling; 