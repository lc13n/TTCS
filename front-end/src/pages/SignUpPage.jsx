import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import signupImage from '../assets/images/signup-image.png';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // dùng để redirect sau khi đăng ký thành công

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = 'Username is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email or Phone Number is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', formData);
            alert('Đăng ký thành công!');
            navigate('/login'); // chuyển sang trang đăng nhập
        } catch (error) {
            if (error.response?.status === 409) {
                setErrors({ username: 'Tài khoản đã tồn tại' });
            } else {
                alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
                console.error('Đăng ký lỗi:', error);
            }
        }
    };

    const handleGoogleSignUp = () => {
        console.log('Google Sign up clicked');
        // TODO: Thêm logic Google OAuth nếu cần
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
                        <h1 className="text-4xl font-medium mb-6">Create an account</h1>
                        <p className="text-base text-gray-600 mb-8">Enter your details below</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                />
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email or Phone Number"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#DB4444] text-white py-4 rounded hover:bg-red-600 transition-colors"
                            >
                                Create Account
                            </button>

                            <button
                                type="button"
                                onClick={handleGoogleSignUp}
                                className="w-full border border-black py-4 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                            >
                                <img src="/images/google.svg" alt="Google" className="w-5 h-5" />
                                Sign up with Google
                            </button>
                        </form>

                        <div className="mt-4 text-center">
                            <p className="text-gray-600">
                                Already have account?{' '}
                                <Link to="/login" className="text-black hover:underline">
                                    Log in
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

export default SignUpPage;
