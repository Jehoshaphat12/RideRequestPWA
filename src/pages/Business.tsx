import { useState } from 'react';
import { Building, Users, CreditCard, BarChart, Shield, CheckCircle, Mail, Phone } from 'lucide-react';

const Business = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employeeCount: '',
    monthlyRides: '',
    companyType: ''
  });

  const features = [
    {
      icon: <CreditCard size={24} />,
      title: 'Centralized Billing',
      description: 'One monthly invoice for all employee rides'
    },
    {
      icon: <Shield size={24} />,
      title: 'Enhanced Safety',
      description: '24/7 safety support and ride tracking'
    },
    {
      icon: <BarChart size={24} />,
      title: 'Detailed Reporting',
      description: 'Real-time analytics and expense tracking'
    },
    {
      icon: <Users size={24} />,
      title: 'Employee Management',
      description: 'Easy employee onboarding and management'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$499',
      period: '/month',
      features: ['Up to 50 employees', 'Basic reporting', 'Email support', 'Centralized billing'],
      popular: false
    },
    {
      name: 'Business',
      price: '$999',
      period: '/month',
      features: ['Up to 200 employees', 'Advanced analytics', 'Priority support', 'Custom policies', 'API access'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Unlimited employees', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'Training'],
      popular: false
    }
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Business inquiry submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-900 to-purple-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Building className="mx-auto mb-6" size={48} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">RideRequest for Business</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Simplify employee transportation with our corporate ride-hailing solutions
          </p>
          <button className="mt-8 bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Benefits */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Why choose RideRequest Business?</h2>
            <div className="space-y-6">
              {[
                'Reduce transportation costs by up to 30%',
                'Improve employee safety and satisfaction',
                'Streamline expense reporting and reimbursement',
                'Gain visibility into transportation spend',
                'Set custom ride policies and restrictions'
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1" size={20} />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Client Logos */}
            <div className="mt-12">
              <h3 className="font-bold text-lg mb-6 text-gray-600">Trusted by leading companies</h3>
              <div className="grid grid-cols-3 gap-6">
                {['Tech Corp', 'Global Bank', 'Retail Co', 'Consulting', 'Health Inc', 'Media Group'].map((company) => (
                  <div key={company} className="bg-gray-100 p-4 rounded-lg text-center">
                    <span className="font-medium text-gray-700">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Request a demo</h2>
            <p className="text-gray-600 mb-8">Our team will contact you within 24 hours</p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact name
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company type
                    </label>
                    <select
                      value={formData.companyType}
                      onChange={(e) => setFormData({...formData, companyType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="tech">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee count
                    </label>
                    <select
                      value={formData.employeeCount}
                      onChange={(e) => setFormData({...formData, employeeCount: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="1-50">1-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly rides needed
                    </label>
                    <select
                      value={formData.monthlyRides}
                      onChange={(e) => setFormData({...formData, monthlyRides: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="1-100">1-100</option>
                      <option value="101-500">101-500</option>
                      <option value="501-1000">501-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Request Demo
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Pricing Plans */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Choose your plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl shadow-lg p-8 border-2 ${
                  plan.popular ? 'border-blue-500 relative' : 'border-transparent'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-bold transition ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;