import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import qrCode from "../../assets/images/qr-code.png";
import googlePlay from "../../assets/images/google-play.png";
import appStore from "../../assets/images/app-store.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-6 text-sm">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Exclusive Section */}
          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Exclusive</h2>
            <div>
              <h3 className="mb-1 font-medium">Subscribe</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Get 10% off your first order
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-black border border-white px-3 py-2 rounded-l outline-none flex-1 text-sm"
                />
                <button className="bg-white text-black px-3 py-2 rounded-r hover:bg-gray-200 text-sm">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Support</h2>
            <div className="space-y-2 text-gray-400">
              <p>
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Quick Link</h2>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Download App Section */}
          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Download App</h2>
            <p className="text-gray-400 text-xs mb-3">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-4">
              <div className="w-20">
                <img src={qrCode} alt="QR Code" className="w-full" />
              </div>
              <div className="space-y-2">
                <img src={googlePlay} alt="Google Play" className="h-9" />
                <img src={appStore} alt="App Store" className="h-9" />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
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
        <div className="pt-6 border-t border-gray-800 text-center text-gray-400 text-xs">
          <p>© Copyright Rimel 2023. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
