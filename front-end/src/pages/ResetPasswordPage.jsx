import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import signupImage from "../assets/images/signup-image.png";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    // TODO: Gửi password mới lên backend để cập nhật
    fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess(true);
        } else {
          alert("Đặt lại mật khẩu thất bại!");
        }
      });
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
              alt="Reset password"
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
            <h1 className="text-4xl font-medium mb-6">Reset Password</h1>
            <p className="text-base text-gray-600 mb-8">
              Enter your new password below
            </p>

            {success ? (
              <div className="text-green-600 mb-6">
                Mật khẩu đã được thay đổi. Bạn có thể đăng nhập lại!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black placeholder-gray-500"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black placeholder-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#DB4444] text-white px-8 py-4 rounded hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Confirm Reset
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link to="/login" className="text-black hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;