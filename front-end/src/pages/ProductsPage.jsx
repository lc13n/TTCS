import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Products from "../components/Products/Products";

const ProductsPage = () => {

  const handleAddToCart = (id) => {
    // TODO: Implement real add to cart
    console.log("Add to cart:", id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <Products />

      <Footer />
    </div>
  );
};

export default ProductsPage;