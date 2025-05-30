import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Categories = () => {
  const categories = [
    { name: "Phones", path: "/categories/phone" },
    { name: "Computers", path: "/categories/computer" },
    { name: "SmartWatch", path: "/categories/smartwatch" },
    { name: "Camera", path: "/categories/camera" },
    { name: "HeadPhones", path: "/categories/headphones" },
    { name: "Gaming", path: "/categories/gaming" },
    { name: "Flash Sale", path: "/flash-sale" },
    { name: "Trending Now", path: "/trending" },
    { name: "Special Offers", path: "/offers" },
  ];

  return (
    <div className="bg-white">
      <ul className="divide-y divide-gray-100">
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              to={category.path}
              className="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="text-sm">{category.name}</span>
              <FaChevronRight className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transform transition duration-200" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
