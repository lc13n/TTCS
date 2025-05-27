import React from 'react';
import { Link } from 'react-router-dom';
import speakerImage from '../../assets/images/speaker-banner.png';

const PromoBanner = () => {
    return (
        <div className="bg-black text-white text-center py-2 text-sm">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="flex-1"></div>
                <div className="flex-1 text-center">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
                    <Link to="/shop" className="font-medium underline hover:no-underline">
                        ShopNow
                    </Link>
                </div>
                <div className="flex-1 text-right">
                    <select
                        className="bg-black text-white text-sm focus:outline-none cursor-pointer"
                        defaultValue="English"
                    >
                        <option value="English">English</option>
                        <option value="Vietnamese">Vietnamese</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PromoBanner; 