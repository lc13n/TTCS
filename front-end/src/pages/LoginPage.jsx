import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import signupImage from '../assets/images/signup-image.png';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            const { token } = res.data;

            // Lưu token vào localStorage
            localStorage.setItem('token', token);

            // Chuyển sang trang chủ hoặc dashboard
            navigate('/');
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Sai tài khoản hoặc mật khẩu');
            } else {
                setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                console.error(err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="flex min-h-[calc(100vh-200px)]">
                {/* Left Side - Image */}
                <div className="w-1/2 bg-[#C1DBE3] p-12 flex items-center justify-center">
                    <div className="relative w-full max-w-[500px] aspect-square">
                        <img
                            src={signupImage}
                            alt="Shopping cart with smartphone"
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#D9D9D9] rounded-full opacity-30"></div>
                        <div className="absolute -bottom-4 right-12 w-8 h-8 bg-[#D9D9D9] rounded-full opacity-30"></div>
                        <div className="absolute top-1/4 -right-4 w-6 h-6 bg-[#D9D9D9] rounded-full opacity-30"></div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-1/2 flex items-center justify-center p-12">
                    <div className="w-full max-w-[370px]">
                        <h1 className="text-4xl font-medium mb-6">Log in to Exclusive</h1>
                        <p className="text-base text-gray-600 mb-8">Enter your details below</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black placeholder-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black placeholder-gray-500"
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-[#DB4444] text-white px-8 py-4 rounded hover:bg-red-600 transition-colors"
                                >
                                    Log in
                                </button>
                                <Link to="/forgot-password" className="text-[#DB4444] hover:underline">
                                    Forget Password?
                                </Link>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-black hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LoginPage;
