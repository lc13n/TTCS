import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { slug } = useParams(); // ví dụ: phone, computer
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchByCategory();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">Category: {slug}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white border rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-red-500 font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found for this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
