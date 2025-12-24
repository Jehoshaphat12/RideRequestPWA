import { useState } from 'react';
import { DollarSign, Shield, CheckCircle,  MapPin } from 'lucide-react';

const Drive = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    vehicleType: '',
    hasVehicle: false
  });

  const [step, setStep] = useState(1);

  const requirements = [
    'Be at least 21 years old',
    'Have a valid driver\'s license',
    'Have at least 1 year of driving experience',
    'Pass a background check',
    'Have vehicle insurance'
  ];

  const earnings = [
    { title: 'Average hourly earnings', amount: '$25-35', description: 'Before tips' },
    { title: 'Flexible schedule', amount: '24/7', description: 'Drive anytime' },
    { title: 'Weekly payments', amount: 'Direct deposit', description: 'Fast and secure' }
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Application submitted:', formData);
      // Handle submission
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-black to-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Drive with RideRequest</h1>
          <p className="text-xl text-gray-300 mb-8">Earn money on your schedule</p>
          <button className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Start Earning
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {earnings.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <DollarSign className="mx-auto mb-4 text-purple-600" size={32} />
              <h3 className="text-2xl font-bold mb-2">{item.amount}</h3>
              <p className="font-medium mb-2">{item.title}</p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Requirements */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Requirements to drive</h2>
            <div className="space-y-4 mb-8">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1" size={20} />
                  <span className="text-lg">{req}</span>
                </div>
              ))}
            </div>

            <div className="bg-linear-to-r from-purple-50 to-blue-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="mr-3" />
                Safety First
              </h3>
              <p className="text-gray-700">
                All drivers undergo comprehensive background checks and safety training. We provide 24/7 support for both drivers and riders.
              </p>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Get started</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">Step {step} of 3</span>
                <div className="ml-3 h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle type
                    </label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select vehicle type</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="van">Van</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.hasVehicle}
                        onChange={(e) => setFormData({...formData, hasVehicle: e.target.checked})}
                        className="mr-2"
                      />
                      <span>I have access to a qualifying vehicle</span>
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-2">Almost done!</h3>
                    <p className="text-green-700">
                      Review your information and submit your application. We'll contact you within 24 hours.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>City:</strong> {formData.city}</p>
                    <p><strong>Vehicle Type:</strong> {formData.vehicleType}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800"
                >
                  {step === 3 ? 'Submit Application' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently asked questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How much can I earn?',
                a: 'Drivers typically earn $25-35 per hour before tips, depending on location and hours.'
              },
              {
                q: 'When do I get paid?',
                a: 'We offer weekly payments via direct deposit. You can cash out instantly for a small fee.'
              },
              {
                q: 'Can I drive with my own car?',
                a: 'Yes! Most drivers use their personal vehicles that meet our requirements.'
              },
              {
                q: 'How are riders rated?',
                a: 'You can rate riders after each trip. Low-rated riders may be restricted from the platform.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drive;