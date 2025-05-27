import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import qrCode from '../../assets/images/qr-code.png';
import googlePlay from '../../assets/images/google-play.png';
import appStore from '../../assets/images/app-store.png';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-5 gap-8 mb-16">
                    {/* Exclusive Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Exclusive</h2>
                        <div className="mb-4">
                            <h3 className="mb-2">Subscribe</h3>
                            <p className="text-gray-400 mb-4">Get 10% off your first order</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-black border border-white px-4 py-2 rounded-l outline-none flex-1"
                                />
                                <button className="bg-white text-black px-4 py-2 rounded-r hover:bg-gray-200">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Support</h2>
                        <div className="space-y-4 text-gray-400">
                            <p>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
                            <p>exclusive@gmail.com</p>
                            <p>+88015-88888-9999</p>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Account</h2>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white">My Account</a></li>
                            <li><a href="#" className="hover:text-white">Login / Register</a></li>
                            <li><a href="#" className="hover:text-white">Cart</a></li>
                            <li><a href="#" className="hover:text-white">Wishlist</a></li>
                            <li><a href="#" className="hover:text-white">Shop</a></li>
                        </ul>
                    </div>

                    {/* Quick Link Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Quick Link</h2>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms Of Use</a></li>
                            <li><a href="#" className="hover:text-white">FAQ</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Download App Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Download App</h2>
                        <p className="text-gray-400 text-sm mb-4">Save $3 with App New User Only</p>
                        <div className="flex gap-4">
                            <div className="w-24">
                                <img src={qrCode} alt="QR Code" className="w-full" />
                            </div>
                            <div className="space-y-2">
                                <img src={googlePlay} alt="Google Play" className="h-10" />
                                <img src={appStore} alt="App Store" className="h-10" />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <a href="#" className="hover:text-gray-300">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <FaTwitter />
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <FaInstagram />
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>© Copyright Rimel 2023. All right reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 