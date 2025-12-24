import { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, CreditCard, Shield, Clock, 
  Settings, Bell, Lock, HelpCircle, LogOut, Edit, Camera,
  Star, Car, ShieldCheck, Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState<any | null>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    profileImage: null,
    notifications: {
      rideUpdates: true,
      promotions: false,
      safetyAlerts: true,
      paymentReceipts: true
    },
    paymentMethods: [
      { id: 1, type: 'credit', last4: '4242', default: true },
      { id: 2, type: 'credit', last4: '8888', default: false },
      { id: 3, type: 'paypal', email: 'john@paypal.com', default: false }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userData });

  // Ride history data
  const rideHistory = [
    {
      id: 1,
      date: '2024-01-15',
      pickup: 'Times Square',
      destination: 'JFK Airport',
      price: '$48.75',
      rating: 5,
      driver: 'Michael T.',
      type: 'Comfort'
    },
    {
      id: 2,
      date: '2024-01-10',
      pickup: 'Home',
      destination: 'Central Park',
      price: '$23.50',
      rating: 4,
      driver: 'Sarah J.',
      type: 'Economy'
    },
    {
      id: 3,
      date: '2024-01-05',
      pickup: 'Office',
      destination: 'Restaurant',
      price: '$18.25',
      rating: 5,
      driver: 'Robert K.',
      type: 'Comfort'
    }
  ];

  // Handle profile image upload
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  // Handle notification toggle
  const toggleNotification = (key: any) => {
    setUserData({
      ...userData,
      notifications: {
        ...userData.notifications,
        [key]: !userData.notifications[key]
      }
    });
  };

  // Handle payment method changes
  const handleSetDefaultPayment = (id: any) => {
    const updatedMethods = userData.paymentMethods.map((method: any) => ({
      ...method,
      default: method.id === id
    }));
    setUserData({ ...userData, paymentMethods: updatedMethods });
  };

  // User stats
  const userStats = [
    { label: 'Total Rides', value: '48', icon: <Car size={20} /> },
    { label: 'Avg Rating', value: '4.8', icon: <Star size={20} /> },
    { label: 'Member Since', value: '2023', icon: <ShieldCheck size={20} /> },
    { label: 'Packages', value: '3', icon: <Package size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-linear-to-r from-black to-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-white/20">
                  {editData.profileImage ? (
                    <img 
                      src={editData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition">
                    <Camera size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <div>
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <p className="text-gray-300">{userData.email}</p>
                <div className="flex items-center mt-2">
                  <Star size={16} className="text-yellow-400 mr-1" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-400 ml-2">Rider Rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditData({ ...userData });
                  }}
                  className="flex items-center px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  <Edit size={18} className="mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* User Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Your Stats</h3>
              <div className="space-y-4">
                {userStats.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        {stat.icon}
                      </div>
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-2">
              {[
                { id: 'personal', label: 'Personal Info', icon: <User size={20} /> },
                { id: 'rides', label: 'Ride History', icon: <Clock size={20} /> },
                { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
                { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
                { id: 'security', label: 'Security', icon: <Shield size={20} /> },
                { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
                { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center p-4 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-purple-50 text-purple-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
              
              {/* Logout Button */}
              <button className="w-full flex items-center p-4 rounded-lg text-red-600 hover:bg-red-50 transition mt-2">
                <LogOut size={20} className="mr-3" />
                Log Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({...editData, name: e.target.value})}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({...editData, phone: e.target.value})}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={editData.address}
                          onChange={(e) => setEditData({...editData, address: e.target.value})}
                          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <User className="text-gray-400 mr-3" size={20} />
                          <span className="text-sm text-gray-600">Full Name</span>
                        </div>
                        <p className="font-medium">{userData.name}</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Phone className="text-gray-400 mr-3" size={20} />
                          <span className="text-sm text-gray-600">Phone Number</span>
                        </div>
                        <p className="font-medium">{userData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Mail className="text-gray-400 mr-3" size={20} />
                        <span className="text-sm text-gray-600">Email Address</span>
                      </div>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MapPin className="text-gray-400 mr-3" size={20} />
                        <span className="text-sm text-gray-600">Address</span>
                      </div>
                      <p className="font-medium">{userData.address}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Ride History Tab */}
            {activeTab === 'rides' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Ride History</h2>
                  <button className="text-sm text-purple-600 hover:text-purple-500 font-medium">
                    Download All Receipts
                  </button>
                </div>
                
                <div className="space-y-4">
                  {rideHistory.map((ride) => (
                    <div key={ride.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <div>
                              <p className="font-bold">{ride.pickup}</p>
                              <p className="text-sm text-gray-600">Pickup</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                            <div>
                              <p className="font-bold">{ride.destination}</p>
                              <p className="text-sm text-gray-600">Destination</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 text-right">
                          <p className="text-2xl font-bold">{ride.price}</p>
                          <div className="flex items-center justify-end mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < ride.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Driver:</span> {ride.driver}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Service:</span> {ride.type}
                          </p>
                        </div>
                        
                        <div className="space-x-3 mt-4 md:mt-0">
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            View Receipt
                          </button>
                          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                            Repeat Ride
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Payment Methods</h2>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Add Payment Method
                  </button>
                </div>
                
                <div className="space-y-4 mb-8">
                  {userData.paymentMethods.map((method: any) => (
                    <div key={method.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center mr-4">
                            <CreditCard size={20} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="font-bold">
                              {method.type === 'paypal' 
                                ? `PayPal: ${method.email}`
                                : `Card ending in ${method.last4}`
                              }
                            </p>
                            <p className="text-sm text-gray-600">
                              {method.default ? 'Default payment method' : 'Secondary payment method'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-x-3">
                          {!method.default && (
                            <button
                              onClick={() => handleSetDefaultPayment(method.id)}
                              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                              Set as Default
                            </button>
                          )}
                          <button className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Billing History */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Billing History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Description</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Amount</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: 'Jan 15, 2024', desc: 'Ride to JFK Airport', amount: '$48.75', status: 'Paid' },
                          { date: 'Jan 10, 2024', desc: 'Central Park trip', amount: '$23.50', status: 'Paid' },
                          { date: 'Jan 5, 2024', desc: 'Dinner ride', amount: '$18.25', status: 'Paid' }
                        ].map((bill, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-4">{bill.date}</td>
                            <td className="py-4">{bill.desc}</td>
                            <td className="py-4 font-medium">{bill.amount}</td>
                            <td className="py-4">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {bill.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {Object.entries(userData.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">
                          {key === 'rideUpdates' && 'Ride Updates'}
                          {key === 'promotions' && 'Promotions & Offers'}
                          {key === 'safetyAlerts' && 'Safety Alerts'}
                          {key === 'paymentReceipts' && 'Payment Receipts'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {key === 'rideUpdates' && 'Get notified about your ride status'}
                          {key === 'promotions' && 'Receive special offers and discounts'}
                          {key === 'safetyAlerts' && 'Important safety updates and features'}
                          {key === 'paymentReceipts' && 'Receipts for completed rides'}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => toggleNotification(key)}
                        className={`w-12 h-6 rounded-full transition ${
                          value ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transform transition ${
                            value ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="p-6 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">Change Password</h3>
                        <p className="text-gray-600">Update your account password</p>
                      </div>
                      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                        Change Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">Two-Factor Authentication</h3>
                        <p className="text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">Connected Devices</h3>
                        <p className="text-gray-600">Manage devices signed into your account</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        View Devices
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">Currently signed in on 2 devices</p>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="p-6 border border-gray-200 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Language & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select className="p-3 border border-gray-300 rounded-lg">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                      <select className="p-3 border border-gray-300 rounded-lg">
                        <option>United States (USD)</option>
                        <option>Canada (CAD)</option>
                        <option>United Kingdom (GBP)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-gray-200 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span>Show my profile to other riders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span>Allow ride history to improve service</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span>Share data with third-party partners</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-gray-200 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                        <p className="font-medium">Download your data</p>
                        <p className="text-sm text-gray-600">Get a copy of your data</p>
                      </button>
                      <button className="w-full text-left p-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition">
                        <p className="font-medium">Delete your account</p>
                        <p className="text-sm">Permanently remove your account and data</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Help & Support Tab */}
            {activeTab === 'help' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Help & Support</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-lg mb-3">Contact Support</h3>
                    <p className="text-gray-600 mb-4">Get help from our support team</p>
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                      Chat Now
                    </button>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-lg mb-3">Help Center</h3>
                    <p className="text-gray-600 mb-4">Find answers to common questions</p>
                    <Link to="/help" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition inline-block">
                      Visit Help Center
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Frequently Asked Questions</h3>
                  {[
                    { q: 'How do I cancel a ride?', a: 'You can cancel from the ride details page up to 5 minutes after booking.' },
                    { q: 'How are prices calculated?', a: 'Prices are based on distance, time, and current demand.' },
                    { q: 'How do I report an issue?', a: 'Use the Help section in the app or contact support.' }
                  ].map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <p className="font-medium mb-2">{faq.q}</p>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;