import React from 'react';
import Header from '../components/Header/Header';
import Categories from '../components/Categories/Categories';
import Banner from '../components/Banner/Banner';
import FlashSale from '../components/FlashSale/FlashSale';
import BrowseCategories from '../components/Categories/BrowseCategories';
import BestSelling from '../components/BestSelling/BestSelling';
import PromoBanner from '../components/PromoBanner/PromoBanner';
import ExploreProducts from '../components/ExploreProducts/ExploreProducts';
import NewArrival from '../components/NewArrival/NewArrival';
import Services from '../components/Services/Services';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                {/* Top Section with Categories and Banner */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex">
                        <div className="w-[20%] relative">
                            <Categories />
                            <div className="absolute top-0 right-0 w-[1px] h-full bg-black"></div>
                        </div>
                        <div className="flex-1 pl-8">
                            <Banner />
                        </div>
                    </div>
                </div>

                {/* Content Sections with max-width and centered */}
                <div className="max-w-[1200px] mx-auto px-8">
                    {/* Flash Sale Section */}
                    <div className="my-16">
                        <FlashSale />
                    </div>

                    {/* Browse Categories Section */}
                    <div className="my-16">
                        <BrowseCategories />
                    </div>

                    {/* Best Selling Section */}
                    <div className="my-16">
                        <BestSelling />
                    </div>

                    {/* Promo Banner Section */}
                    <div className="my-16">
                        <PromoBanner />
                    </div>

                    {/* Explore Products Section */}
                    <div className="my-16">
                        <ExploreProducts />
                    </div>

                    {/* New Arrival Section */}
                    <div className="my-16">
                        <NewArrival />
                    </div>

                    {/* Services Section */}
                    <div className="my-16">
                        <Services />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
