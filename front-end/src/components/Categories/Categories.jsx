import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const Categories = () => {
    const categories = [
        { name: "Woman's Fashion", path: "/womens-fashion", hasArrow: true },
        { name: "Men's Fashion", path: "/mens-fashion", hasArrow: true },
        { name: "Electronics", path: "/electronics" },
        { name: "Home & Lifestyle", path: "/home-lifestyle" },
        { name: "Medicine", path: "/medicine" },
        { name: "Sports & Outdoor", path: "/sports-outdoor" },
        { name: "Baby's & Toys", path: "/baby-toys" },
        { name: "Groceries & Pets", path: "/groceries-pets" },
        { name: "Health & Beauty", path: "/health-beauty" }
    ];

    return (
        <div className="bg-white">
            <ul className="divide-y divide-gray-100">
                {categories.map((category, index) => (
                    <li key={index}>
                        <Link
                            to={category.path}
                            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                        >
                            <span className="text-sm">{category.name}</span>
                            {category.hasArrow && (
                                <FaChevronRight className="text-gray-400 text-xs" />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;