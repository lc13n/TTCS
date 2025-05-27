import React from 'react';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaDesktop, FaHeadphones, FaGamepad } from 'react-icons/fa';
import { IoWatchOutline, IoCamera } from 'react-icons/io5';

const categories = [
  { id: 1, name: 'Phones', slug: 'phone', icon: <FaMobileAlt size={24} /> },
  { id: 2, name: 'Computers', slug: 'computer', icon: <FaDesktop size={24} /> },
  { id: 3, name: 'SmartWatch', slug: 'smartwatch', icon: <IoWatchOutline size={24} /> },
  { id: 4, name: 'Camera', slug: 'camera', icon: <IoCamera size={24} /> },
  { id: 5, name: 'HeadPhones', slug: 'headphone', icon: <FaHeadphones size={24} /> },
  { id: 6, name: 'Gaming', slug: 'gaming', icon: <FaGamepad size={24} /> },
];

const BrowseCategories = () => {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500"></div>
          <h2 className="text-2xl font-semibold">Categories</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border rounded hover:bg-gray-100">
            <span className="sr-only">Previous</span>←
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            <span className="sr-only">Next</span>→
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Browse By Category</h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            to={`/${category.slug}`}
            key={category.id}
            className="flex flex-col items-center justify-center p-6 border rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
          >
            {category.icon}
            <span className="mt-2 text-sm">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;
