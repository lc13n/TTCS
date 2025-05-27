import React from 'react';
import { AiOutlineHeart, AiOutlineEye } from 'react-icons/ai';
import dogFood from '../../assets/images/dogfood.png';
import camera from '../../assets/images/camera.png';
import laptop from '../../assets/images/laptop.png';
import skincare from '../../assets/images/skincare.png';
import kidsCar from '../../assets/images/kidscar.png';
import shoes from '../../assets/images/shoes.png';
import gamepad from '../../assets/images/gamepad.png';
import jacket from '../../assets/images/jacket.png';

const products = [
    {
        id: 1,
        name: 'Breed Dry Dog Food',
        image: dogFood,
        price: 100,
        rating: 5,
        reviews: 35,
        badge: null
    },
    {
        id: 2,
        name: 'CANON EOS DSLR Camera',
        image: camera,
        price: 360,
        rating: 4,
        reviews: 95,
        badge: 'Add To Cart'
    },
    {
        id: 3,
        name: 'ASUS FHD Gaming Laptop',
        image: laptop,
        price: 700,
        rating: 5,
        reviews: 325,
        badge: null
    },
    {
        id: 4,
        name: 'Curology Product Set',
        image: skincare,
        price: 500,
        rating: 4,
        reviews: 145,
        badge: null
    },
    {
        id: 5,
        name: 'Kids Electric Car',
        image: kidsCar,
        price: 960,
        rating: 5,
        reviews: 65,
        badge: 'New'
    },
    {
        id: 6,
        name: 'Jr. Zoom Soccer Cleats',
        image: shoes,
        price: 1160,
        rating: 5,
        reviews: 35,
        badge: 'New'
    },
    {
        id: 7,
        name: 'GP11 Shooter USB Gamepad',
        image: gamepad,
        price: 660,
        rating: 4,
        reviews: 55,
        badge: null
    },
    {
        id: 8,
        name: 'Quilted Satin Jacket',
        image: jacket,
        price: 660,
        rating: 4,
        reviews: 55,
        badge: null
    }
];

const ExploreProducts = () => {
    return (
        <div className="py-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-red-500"></div>
                    <h2 className="text-2xl font-semibold">Our Products</h2>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 border rounded hover:bg-gray-100">
                        <span className="sr-only">Previous</span>
                        ←
                    </button>
                    <button className="p-2 border rounded hover:bg-gray-100">
                        <span className="sr-only">Next</span>
                        →
                    </button>
                </div>
            </div>

            <h1 className="text-3xl font-bold mb-8">Explore Our Products</h1>

            <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-lg p-4">
                        <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.badge && (
                                <div className={`absolute left-4 top-4 px-3 py-1 rounded ${product.badge === 'New' ? 'bg-green-500' : 'bg-red-500'
                                    } text-white text-sm`}>
                                    {product.badge}
                                </div>
                            )}
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
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            {'★'.repeat(product.rating)}
                            <span className="text-gray-500 text-sm">({product.reviews})</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                    View All Products
                </button>
            </div>
        </div>
    );
};

export default ExploreProducts; 