import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Phone, 
  ChevronRight,
  FileText,
  Shield,
  CreditCard,
  User,
  Car,
  Smartphone,
  Mail,
  ArrowRight,
  Filter,
  Star,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  ShieldCheck,
  Download,
  Video,
  Headphones,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Types
interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  description: string;
}

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  popular: boolean;
  views: number;
}

interface Guide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  readTime: string;
  link: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  // FAQ Categories
  const categories: FAQCategory[] = [
    { 
      id: 'account', 
      title: 'Account & Profile', 
      icon: <User size={20} />, 
      color: 'bg-blue-100 text-blue-600', 
      count: 12,
      description: 'Manage your account, profile, and settings'
    },
    { 
      id: 'rides', 
      title: 'Rides & Booking', 
      icon: <Car size={20} />, 
      color: 'bg-green-100 text-green-600', 
      count: 15,
      description: 'Booking, cancelling, and managing rides'
    },
    { 
      id: 'payments', 
      title: 'Payments & Billing', 
      icon: <CreditCard size={20} />, 
      color: 'bg-purple-100 text-purple-600', 
      count: 8,
      description: 'Payment methods, charges, and refunds'
    },
    { 
      id: 'safety', 
      title: 'Safety & Security', 
      icon: <Shield size={20} />, 
      color: 'bg-red-100 text-red-600', 
      count: 10,
      description: 'Safety features and reporting'
    },
    { 
      id: 'app', 
      title: 'App & Technical', 
      icon: <Smartphone size={20} />, 
      color: 'bg-yellow-100 text-yellow-600', 
      count: 6,
      description: 'App issues and technical support'
    },
    { 
      id: 'driver', 
      title: 'Driving with Us', 
      icon: <Car size={20} />, 
      color: 'bg-indigo-100 text-indigo-600', 
      count: 14,
      description: 'Become a driver and manage your account'
    },
    { 
      id: 'business', 
      title: 'Business Services', 
      icon: <FileText size={20} />, 
      color: 'bg-cyan-100 text-cyan-600', 
      count: 7,
      description: 'Corporate accounts and enterprise solutions'
    },
    { 
      id: 'accessibility', 
      title: 'Accessibility', 
      icon: <Globe size={20} />, 
      color: 'bg-emerald-100 text-emerald-600', 
      count: 5,
      description: 'Accessibility features and support'
    }
  ];

  // FAQ Data
  const faqs: FAQItem[] = [
    { 
      id: 1, 
      category: 'account', 
      question: 'How do I reset my password?', 
      answer: 'Go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email. You can also reset your password from the Profile → Security settings.', 
      popular: true, 
      views: 2450 
    },
    { 
      id: 2, 
      category: 'rides', 
      question: 'How do I cancel a ride?', 
      answer: 'Open the active ride details and tap "Cancel Ride". You can cancel for free up to 5 minutes after booking. After that, a cancellation fee may apply. Cancelled rides appear in your ride history.', 
      popular: true, 
      views: 1890 
    },
    { 
      id: 3, 
      category: 'payments', 
      question: 'How are fares calculated?', 
      answer: 'Fares are based on: 1) Base fare, 2) Distance, 3) Time, 4) Current demand (surge pricing), and 5) Service type (Economy, Comfort, etc.). You\'ll see an upfront price before confirming your ride. Tolls and fees are included.', 
      popular: true, 
      views: 3210 
    },
    { 
      id: 4, 
      category: 'safety', 
      question: 'What safety features are available?', 
      answer: 'We offer: 1) 24/7 safety support line, 2) Real-time ride tracking, 3) Emergency assistance button, 4) Share trip details with contacts, 5) Driver background checks, 6) Vehicle inspections, 7) Anonymous two-way feedback.', 
      popular: true, 
      views: 1560 
    },
    { 
      id: 5, 
      category: 'app', 
      question: 'How do I update the app?', 
      answer: 'Visit your device\'s app store and check for updates. Enable auto-updates to always have the latest version. Make sure your device OS is also updated for optimal performance.', 
      popular: false, 
      views: 890 
    },
    { 
      id: 6, 
      category: 'driver', 
      question: 'How do I become a driver?', 
      answer: 'Visit our Drive page and submit an application. Requirements: Valid license, clean driving record, vehicle meeting requirements, and passing background check. The process takes 3-7 business days.', 
      popular: true, 
      views: 2780 
    },
    { 
      id: 7, 
      category: 'account', 
      question: 'How do I update my profile information?', 
      answer: 'Go to Profile → Edit Profile. You can update your name, phone number, email, profile picture, and communication preferences. Some changes may require verification.', 
      popular: false, 
      views: 670 
    },
    { 
      id: 8, 
      category: 'rides', 
      question: 'Can I schedule a ride in advance?', 
      answer: 'Yes! Select the "Schedule" option when booking and choose your preferred pickup time (up to 30 days in advance). You\'ll get a reminder before your scheduled ride.', 
      popular: false, 
      views: 1230 
    },
    { 
      id: 9, 
      category: 'payments', 
      question: 'How do I add a payment method?', 
      answer: 'Go to Profile → Payments → Add Payment Method. We accept credit cards, debit cards, PayPal, and digital wallets. All payment methods are encrypted and secure.', 
      popular: false, 
      views: 980 
    },
    { 
      id: 10, 
      category: 'safety', 
      question: 'How are drivers vetted?', 
      answer: 'All drivers undergo: 1) Comprehensive background check, 2) Driving record review, 3) Vehicle inspection, 4) Identity verification, 5) Safety training, and 6) Ongoing monitoring.', 
      popular: false, 
      views: 1120 
    },
    { 
      id: 11, 
      category: 'business', 
      question: 'How do corporate accounts work?', 
      answer: 'Business accounts allow companies to manage employee rides with centralized billing, custom policies, and detailed reporting. Contact our business team for setup.', 
      popular: false, 
      views: 540 
    },
    { 
      id: 12, 
      category: 'accessibility', 
      question: 'Do you offer wheelchair accessible vehicles?', 
      answer: 'Yes, select "Accessible" vehicle type when booking. We partner with certified accessible vehicle providers. Additional wait time may apply in some areas.', 
      popular: false, 
      views: 760 
    }
  ];

  // Quick guides
  const quickGuides: Guide[] = [
    { 
      id: 1, 
      title: 'Getting Started Guide', 
      description: 'Learn how to book your first ride, set up your account, and use basic features', 
      icon: <BookOpen size={20} />, 
      readTime: '5 min read',
      link: '/guides/getting-started' 
    },
    { 
      id: 2, 
      title: 'Safety Handbook', 
      description: 'Complete guide to all safety features and best practices', 
      icon: <ShieldCheck size={20} />, 
      readTime: '8 min read',
      link: '/guides/safety' 
    },
    { 
      id: 3, 
      title: 'Driver Onboarding', 
      description: 'Step-by-step guide to becoming a RideRequest driver', 
      icon: <Car size={20} />, 
      readTime: '10 min read',
      link: '/guides/driver-onboarding' 
    },
    { 
      id: 4, 
      title: 'Business Account Setup', 
      description: 'How to set up and manage corporate accounts', 
      icon: <FileText size={20} />, 
      readTime: '7 min read',
      link: '/guides/business-setup' 
    },
    { 
      id: 5, 
      title: 'Payment Methods Guide', 
      description: 'Understanding payment options and billing', 
      icon: <CreditCard size={20} />, 
      readTime: '6 min read',
      link: '/guides/payments' 
    },
    { 
      id: 6, 
      title: 'App Troubleshooting', 
      description: 'Fix common app issues and technical problems', 
      icon: <Smartphone size={20} />, 
      readTime: '4 min read',
      link: '/guides/troubleshooting' 
    }
  ];

  // Recent articles
  const recentArticles: Article[] = [
    { 
      id: 1, 
      title: 'New Safety Features Update', 
      excerpt: 'Learn about our latest safety enhancements including real-time alerts', 
      category: 'safety', 
      date: '2024-01-15',
      readTime: '3 min read'
    },
    { 
      id: 2, 
      title: 'How to Maximize Earnings as a Driver', 
      excerpt: 'Tips and strategies for drivers to increase their income', 
      category: 'driver', 
      date: '2024-01-10',
      readTime: '5 min read'
    },
    { 
      id: 3, 
      title: 'Understanding Surge Pricing', 
      excerpt: 'Learn how pricing changes during high demand periods', 
      category: 'payments', 
      date: '2024-01-05',
      readTime: '4 min read'
    },
    { 
      id: 4, 
      title: 'Accessibility Improvements', 
      excerpt: 'New features for riders with disabilities', 
      category: 'accessibility', 
      date: '2023-12-20',
      readTime: '2 min read'
    }
  ];

  // Contact options
  const contactOptions = [
    { 
      icon: <MessageSquare size={24} />, 
      title: 'Live Chat', 
      description: 'Instant help from our support team', 
      response: 'Response in minutes',
      available: true,
      action: 'Start Chat',
      link: '/support/chat'
    },
    { 
      icon: <Phone size={24} />, 
      title: 'Phone Support', 
      description: 'Speak directly with an agent', 
      response: '24/7 availability',
      available: true,
      action: 'Call Now',
      link: 'tel:+15551234567'
    },
    { 
      icon: <Mail size={24} />, 
      title: 'Email Support', 
      description: 'Send us a detailed message', 
      response: 'Response within 2 hours',
      available: true,
      action: 'Send Email',
      link: 'mailto:support@riderequest.com'
    },
    { 
      icon: <Headphones size={24} />, 
      title: 'Callback Service', 
      description: 'Request a call from our team', 
      response: 'Within 30 minutes',
      available: true,
      action: 'Request Callback',
      link: '/support/callback'
    }
  ];

  // Popular topics
  const popularTopics = [
    { title: 'Cancellation Policy', views: 12400 },
    { title: 'Lost Items', views: 8900 },
    { title: 'Rating System', views: 7600 },
    { title: 'Promo Codes', views: 5400 },
    { title: 'Family Profiles', views: 3200 }
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Popular FAQs
  const popularFaqs = faqs.filter(faq => faq.popular);

  // Display FAQs (limit unless showing all)
  const displayFaqs = showAllFaqs ? filteredFaqs : filteredFaqs.slice(0, 6);

  // Toggle FAQ
  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex p-4 bg-white/10 rounded-full mb-6">
              <HelpCircle size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help?</h1>
            <p className="text-xl text-gray-300 mb-8">
              Find answers, guides, and contact options
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles, FAQs, or guides..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="absolute right-2 top-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center mb-3">
              <Clock className="text-purple-600 mr-2" size={24} />
              <div className="text-3xl font-bold">24/7</div>
            </div>
            <div className="font-medium">Support Available</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center mb-3">
              <Zap className="text-green-600 mr-2" size={24} />
              <div className="text-3xl font-bold">2h</div>
            </div>
            <div className="font-medium">Avg. Response Time</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center mb-3">
              <Star className="text-yellow-600 mr-2" size={24} />
              <div className="text-3xl font-bold">95%</div>
            </div>
            <div className="font-medium">Customer Satisfaction</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="text-blue-600 mr-2" size={24} />
              <div className="text-3xl font-bold">10K+</div>
            </div>
            <div className="font-medium">Articles & Guides</div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg ${activeCategory === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-6 rounded-xl text-left transition ${activeCategory === category.id ? 'ring-2 ring-purple-500 bg-white shadow-lg' : 'bg-white hover:shadow-md'}`}
              >
                <div className="flex items-center mb-3">
                  <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{category.title}</h3>
                    <div className="text-sm text-gray-500">{category.count} articles</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Popular FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Most Popular Questions</h2>
          <div className="space-y-4">
            {popularFaqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-4 ${categories.find(c => c.id === faq.category)?.color}`}>
                      {categories.find(c => c.id === faq.category)?.icon}
                    </div>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                  {openFaq === faq.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <div className="pl-12 border-l-2 border-purple-200">
                      <p className="text-gray-600 mb-4">{faq.answer}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">{faq.views.toLocaleString()} views</span>
                        <span>Helpful to {Math.floor(faq.views * 0.85).toLocaleString()} people</span>
                      </div>
                      <div className="flex space-x-4 mt-4">
                        <button className="text-sm text-purple-600 hover:text-purple-500">
                          Helpful ✓
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Not Helpful
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* All FAQs */}
        {filteredFaqs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {activeCategory === 'all' ? 'All Questions' : `${categories.find(c => c.id === activeCategory)?.title} Questions`}
                <span className="text-gray-500 text-lg font-normal ml-2">({filteredFaqs.length})</span>
              </h2>
              {!showAllFaqs && filteredFaqs.length > 6 && (
                <button
                  onClick={() => setShowAllFaqs(true)}
                  className="text-purple-600 hover:text-purple-500 font-medium"
                >
                  View all {filteredFaqs.length} questions →
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {displayFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openFaq === faq.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Guides */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Quick Guides</h2>
            <Link 
              to="/guides"
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              View all guides →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickGuides.map((guide) => (
              <Link
                key={guide.id}
                to={guide.link}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4 group-hover:bg-purple-200 transition">
                    {guide.icon}
                  </div>
                  <h3 className="font-bold text-lg">{guide.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{guide.readTime}</span>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-purple-600 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Options */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg mr-4">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{option.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        {option.available ? 'Available now' : 'Offline'}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{option.response}</span>
                    <a
                      href={option.link}
                      className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                    >
                      {option.action}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Articles */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-6">Recent Articles & Updates</h3>
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-600">
                        {article.category.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <h4 className="font-bold mb-2">{article.title}</h4>
                    <p className="text-gray-600 mb-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                      <button className="text-purple-600 hover:text-purple-500 text-sm font-medium">
                        Read Article →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Resources */}
          <div className="space-y-6">
            {/* Popular Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-6">Popular Topics</h3>
              <div className="space-y-4">
                {popularTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{topic.title}</span>
                    <span className="text-sm text-gray-500">{topic.views.toLocaleString()} views</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Resources */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-xl mb-6">Download Resources</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition">
                  <div className="flex items-center">
                    <FileText size={20} className="text-gray-400 mr-3" />
                    <span>Safety Guide PDF</span>
                  </div>
                  <Download size={20} className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition">
                  <div className="flex items-center">
                    <Video size={20} className="text-gray-400 mr-3" />
                    <span>Driver Training Videos</span>
                  </div>
                  <Download size={20} className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition">
                  <div className="flex items-center">
                    <FileText size={20} className="text-gray-400 mr-3" />
                    <span>Accessibility Guide</span>
                  </div>
                  <Download size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Award className="text-green-600 mr-3" size={24} />
                <h3 className="font-bold">Satisfaction Guarantee</h3>
              </div>
              <p className="text-gray-600 mb-4">
                We're committed to resolving your issues. If unsatisfied, contact our escalation team.
              </p>
              <a 
                href="mailto:escalations@riderequest.com"
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Contact Escalations →
              </a>
            </div>

            {/* Community Forum */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-4">Community Forum</h3>
              <p className="text-gray-600 mb-4">
                Connect with other riders and drivers in our community forum.
              </p>
              <a 
                href="https://community.riderequest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-600 hover:text-purple-500 font-medium"
              >
                Visit Forum <ArrowRight className="ml-2" size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-gray-300 mb-8">
            Can't find what you're looking for? Our team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition"
            >
              <Phone size={20} className="mr-2" />
              Call Support
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-black transition"
            >
              <MessageSquare size={20} className="mr-2" />
              Contact Form
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-8">
            Average wait time: <span className="font-bold text-green-400">2 minutes</span> for chat, 
            <span className="font-bold text-green-400"> 5 minutes</span> for phone
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;