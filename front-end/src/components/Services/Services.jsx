import React from 'react';
import { FaTruck, FaHeadphones, FaShieldAlt } from 'react-icons/fa';

const services = [
    {
        id: 1,
        icon: <FaTruck className="w-8 h-8" />,
        title: 'FREE AND FAST DELIVERY',
        description: 'Free delivery for all orders over $140'
    },
    {
        id: 2,
        icon: <FaHeadphones className="w-8 h-8" />,
        title: '24/7 CUSTOMER SERVICE',
        description: 'Friendly 24/7 customer support'
    },
    {
        id: 3,
        icon: <FaShieldAlt className="w-8 h-8" />,
        title: 'MONEY BACK GUARANTEE',
        description: 'We return money within 30 days'
    }
];

const Services = () => {
    return (
        <div className="py-16 bg-white">
            <div className="grid grid-cols-3 gap-8">
                {services.map((service) => (
                    <div key={service.id} className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6">
                            <div className="text-white">
                                {service.icon}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services; 