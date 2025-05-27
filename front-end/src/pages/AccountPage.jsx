import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    district: '',
    city: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:3000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { email, phone, firstName, lastName, address } = res.data;

        setProfileData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email,
          phone: phone || '',
          street: address?.street || '',
          district: address?.district || '',
          city: address?.city || '',
        }));
      } catch (err) {
        console.error('Lỗi khi fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert("Chưa đăng nhập");

    try {
      await axios.put(
        'http://localhost:3000/api/users/update-profile',
        {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.phone,
          street: profileData.street,
          district: profileData.district,
          city: profileData.city,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (profileData.newPassword && profileData.confirmPassword) {
        if (profileData.newPassword !== profileData.confirmPassword) {
          return alert("Mật khẩu xác nhận không khớp");
        }

        await axios.put(
          'http://localhost:3000/api/users/change-password',
          {
            oldPassword: profileData.currentPassword,
            newPassword: profileData.newPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      alert("Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi cập nhật");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <span className="text-gray-900">My Account</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Manage My Account</h2>
            <div className="space-y-2">
              <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}>My Profile</button>
              <button onClick={() => setActiveTab('address')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'address' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}>Address Book</button>
              <button onClick={() => setActiveTab('payment')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'payment' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}>My Payment Options</button>
            </div>
            <h2 className="text-lg font-semibold mt-8 mb-4">My Orders</h2>
            <div className="space-y-2">
              <button onClick={() => setActiveTab('returns')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'returns' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}>My Returns</button>
              <button onClick={() => setActiveTab('cancellations')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'cancellations' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}>My Cancellations</button>
            </div>
            <h2 className="text-lg font-semibold mt-8 mb-4">My Wishlist</h2>
            <div className="space-y-2">
              <Link to="/wishlist" className="block px-4 py-2 rounded hover:bg-gray-100">View Wishlist</Link>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-red-500 mb-6">Edit Your Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name
                    <input type="text" name="firstName" value={profileData.firstName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name
                    <input type="text" name="lastName" value={profileData.lastName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email
                    <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone
                    <input type="text" name="phone" value={profileData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Street
                    <input type="text" name="street" value={profileData.street} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">District
                    <input type="text" name="district" value={profileData.district} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City
                    <input type="text" name="city" value={profileData.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </label>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">Password Changes</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password
                      <input type="password" name="currentPassword" value={profileData.currentPassword} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password
                      <input type="password" name="newPassword" value={profileData.newPassword} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password
                      <input type="password" name="confirmPassword" value={profileData.confirmPassword} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button type="button" className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
