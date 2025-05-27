import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email or Phone Number is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // TODO: Implement API call for sign up
                console.log('Form submitted:', formData);
            } catch (error) {
                console.error('Sign up error:', error);
                setErrors(prev => ({
                    ...prev,
                    submit: 'Failed to create account. Please try again.'
                }));
            }
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            // TODO: Implement Google Sign up
            console.log('Google Sign up clicked');
        } catch (error) {
            console.error('Google sign up error:', error);
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to sign up with Google. Please try again.'
            }));
        }
    };

    return (
        <div className="w-1/2 flex items-center justify-center p-12">
            <div className="w-full max-w-[370px]">
                <h1 className="text-4xl font-medium mb-6">Create an account</h1>
                <p className="text-base text-gray-600 mb-8">Enter your details below</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black placeholder-gray-500"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email or Phone Number"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black placeholder-gray-500"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black placeholder-gray-500"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    {errors.submit && (
                        <p className="text-sm text-red-600 text-center">{errors.submit}</p>
                    )}

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
                        <FcGoogle className="text-xl" />
                        Sign up with Google
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have account?{' '}
                        <Link to="/login" className="text-black hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm; 