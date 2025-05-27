import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppleLogo from '../../assets/images/1200px-Apple_gray_logo 1.png';
import IphoneBanner from '../../assets/images/ip_image.png';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        {
            title: "iPhone 14 Series",
            description: "Up to 10% off Voucher",
            image: IphoneBanner,
            logo: AppleLogo,
            path: "/shop-now"
        },
        {
            title: "iPhone 14 Pro",
            description: "Special Launch Offer",
            image: IphoneBanner,
            logo: AppleLogo,
            path: "/shop-now"
        },
        {
            title: "iPhone 14 Pro Max",
            description: "New Arrival",
            image: IphoneBanner,
            logo: AppleLogo,
            path: "/shop-now"
        },
        {
            title: "iPhone Special",
            description: "Limited Time Offer",
            image: IphoneBanner,
            logo: AppleLogo,
            path: "/shop-now"
        },
        {
            title: "iPhone Deals",
            description: "Best Price Guarantee",
            image: IphoneBanner,
            logo: AppleLogo,
            path: "/shop-now"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === banners.length - 1 ? 0 : prevSlide + 1
            );
        }, 3000); // Chuyển slide sau mỗi 3 giây

        return () => clearInterval(timer); // Cleanup khi component unmount
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative overflow-hidden bg-black rounded-lg">
            {/* Banner Content */}
            <div className="relative h-[400px]">
                <div className="absolute inset-0 flex items-center transition-transform duration-500 ease-in-out">
                    {/* Left Content */}
                    <div className="w-1/2 px-12 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <img src={banners[currentSlide].logo} alt="Apple" className="w-8 h-8 brightness-0 invert" />
                            <span className="text-lg">{banners[currentSlide].title}</span>
                        </div>
                        <h2 className="text-5xl font-bold mb-8">{banners[currentSlide].description}</h2>
                        <Link
                            to={banners[currentSlide].path}
                            className="inline-flex items-center text-sm border-b border-white hover:gap-2 transition-all"
                        >
                            Shop Now
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right Content - Image */}
                    <div className="w-1/2 h-full relative">
                        <img
                            src={banners[currentSlide].image}
                            alt="Banner"
                            className="w-full h-full object-contain transition-opacity duration-500"
                        />
                    </div>
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
