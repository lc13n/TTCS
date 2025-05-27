import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                <Link to="/" className="hover:text-gray-900">Home</Link>
                <span>/</span>
                <span className="text-gray-900">404 Error</span>
            </div>

            {/* 404 Content */}
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <h1 className="text-[200px] font-bold text-gray-900 leading-none mb-8">
                    404 Not Found
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Your visited page not found. You may go home page.
                </p>
                <Link
                    to="/"
                    className="px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Back to home page
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage; 