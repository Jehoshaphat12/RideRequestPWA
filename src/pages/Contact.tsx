import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  HelpCircle,
  Globe,
  FileText,
  Building,
  User,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Types for TypeScript
interface ContactMethod {
  id: number;
  icon: React.ReactNode;
  title: string;
  details: string[];
  description: string;
  actionLabel: string;
  actionUrl: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
  phone?: string;
  company?: string;
}

interface SupportTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Contact: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
    phone: '',
    company: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  // Contact methods
  const contactMethods: ContactMethod[] = [
    {
      id: 1,
      icon: <MessageSquare size={24} />,
      title: 'Customer Support',
      details: ['24/7 Live Chat', 'Phone Support', 'Email Support'],
      description: 'Get help with your rides, account, or payment issues',
      actionLabel: 'Start Chat',
      actionUrl: '/support/chat'
    },
    {
      id: 2,
      icon: <Building size={24} />,
      title: 'Business Inquiries',
      details: ['Enterprise Solutions', 'Partnerships', 'Corporate Accounts'],
      description: 'For companies looking to partner or use our services',
      actionLabel: 'Business Contact',
      actionUrl: '/business'
    },
    {
      id: 3,
      icon: <HelpCircle size={24} />,
      title: 'Help Center',
      details: ['FAQ', 'Guides', 'Troubleshooting'],
      description: 'Find answers to common questions and solutions',
      actionLabel: 'Visit Help Center',
      actionUrl: '/help'
    },
    {
      id: 4,
      icon: <FileText size={24} />,
      title: 'Media & Press',
      details: ['Press Kit', 'Media Inquiries', 'Brand Assets'],
      description: 'For journalists and media professionals',
      actionLabel: 'Media Resources',
      actionUrl: '/press'
    }
  ];

  // Contact info
  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'Email',
      details: [
        'General Inquiries: hello@riderequest.com',
        'Customer Support: support@riderequest.com',
        'Business: business@riderequest.com',
        'Press: press@riderequest.com'
      ]
    },
    {
      icon: <Phone size={20} />,
      title: 'Phone',
      details: [
        'Customer Support: (555) 123-4567',
        'Business Inquiries: (555) 987-6543',
        'Emergency Support: (555) 911-1111',
        'International: +1 (555) 123-4567'
      ]
    },
    {
      icon: <MapPin size={20} />,
      title: 'Office Locations',
      details: [
        'Headquarters: 123 Mobility Ave, San Francisco, CA 94107',
        'NYC Office: 456 Urban Plaza, New York, NY 10001',
        'London Office: 789 Transport Lane, London, UK',
        'Singapore Office: 101 Tech Hub, Singapore'
      ]
    },
    {
      icon: <Clock size={20} />,
      title: 'Support Hours',
      details: [
        'Customer Support: 24/7',
        'Business Hours: Mon-Fri 9AM-6PM PST',
        'Emergency Support: 24/7',
        'Weekend Support: Reduced hours'
      ]
    }
  ];

  // Support topics
  const supportTopics: SupportTopic[] = [
    {
      id: 'ride-issues',
      title: 'Ride Issues',
      description: 'Problems with booking, drivers, or rides',
      icon: <MessageSquare size={20} />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'account',
      title: 'Account & Profile',
      description: 'Login, security, and profile management',
      icon: <User size={20} />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'payment',
      title: 'Payment & Billing',
      description: 'Charges, refunds, and payment methods',
      icon: <FileText size={20} />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'safety',
      title: 'Safety Concerns',
      description: 'Report safety issues or incidents',
      icon: <HelpCircle size={20} />,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'business',
      title: 'Business Services',
      description: 'Corporate accounts and partnerships',
      icon: <Building size={20} />,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'technical',
      title: 'Technical Issues',
      description: 'App problems and technical support',
      icon: <Globe size={20} />,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  // Handle form input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success case
      setSubmitStatus('success');
      setSubmitMessage('Your message has been sent successfully! We\'ll get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general',
        phone: '',
        company: ''
      });
    } catch (error) {
      // Error case
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again or use one of our direct contact methods.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-filled message templates
  const messageTemplates = [
    {
      id: 'driver-issue',
      label: 'Driver was late',
      template: 'The driver arrived 15+ minutes late for my scheduled ride.'
    },
    {
      id: 'payment-issue',
      label: 'Incorrect charge',
      template: 'I was charged an incorrect amount for my recent ride.'
    },
    {
      id: 'safety-concern',
      label: 'Safety concern',
      template: 'I have a safety concern regarding my recent ride.'
    },
    {
      id: 'account-issue',
      label: 'Can\'t login',
      template: 'I\'m unable to login to my account.'
    }
  ];

  const applyTemplate = (template: string): void => {
    setFormData(prev => ({
      ...prev,
      message: template,
      subject: 'Regarding: ' + template.substring(0, 30) + '...'
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex p-4 bg-white/10 rounded-full mb-6">
              <MessageSquare size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-300 mb-8">
              We're here to help 24/7. Choose the best way to reach us
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+15551234567" 
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition"
              >
                <Phone size={20} className="mr-2" />
                Call Now
              </a>
              <button className="inline-flex items-center px-6 py-3 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-black transition">
                <MessageSquare size={20} className="mr-2" />
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Options */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How can we help you?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a topic below or use our contact form for specific inquiries
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method) => (
            <div 
              key={method.id} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  {method.icon}
                </div>
                <h3 className="font-bold text-lg">{method.title}</h3>
              </div>
              <ul className="space-y-2 mb-4">
                {method.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                    {detail}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm mb-4">{method.description}</p>
              <Link
                to={method.actionUrl}
                className="inline-flex items-center text-purple-600 font-medium hover:text-purple-500"
              >
                {method.actionLabel} →
              </Link>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Send us a message</h2>
                <div className="text-sm text-gray-500">
                  Average response time: <span className="font-bold text-green-600">2 hours</span>
                </div>
              </div>

              {/* Submit Status Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <span className="font-medium text-green-800">{submitMessage}</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="text-red-500 mr-3" size={20} />
                    <span className="font-medium text-red-800">{submitMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What can we help you with? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {supportTopics.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: topic.id }))}
                        className={`p-3 rounded-lg border text-left transition ${
                          formData.category === topic.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`p-2 rounded-md mr-3 ${topic.color}`}>
                            {topic.icon}
                          </div>
                          <span className="font-medium">{topic.title}</span>
                        </div>
                        <p className="text-xs text-gray-600">{topic.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Brief summary of your inquiry"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Message *
                    </label>
                    <div className="text-sm text-gray-500">
                      Quick templates:
                      <div className="flex gap-2 mt-1">
                        {messageTemplates.map((template) => (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() => applyTemplate(template.template)}
                            className="text-xs text-purple-600 hover:text-purple-500"
                          >
                            {template.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Please describe your issue or inquiry in detail..."
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    By submitting, you agree to our{' '}
                    <Link to="/privacy" className="text-purple-600 hover:text-purple-500">
                      Privacy Policy
                    </Link>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* FAQ Preview */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
              <h3 className="font-bold text-xl mb-4">Common Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "How do I get a refund?",
                  "How can I become a driver?",
                  "What safety measures are in place?",
                  "How are fares calculated?"
                ].map((question, idx) => (
                  <Link
                    key={idx}
                    to="/help"
                    className="p-4 bg-white rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center">
                      <HelpCircle size={16} className="text-gray-400 mr-3" />
                      <span className="font-medium">{question}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/help"
                  className="inline-flex items-center text-purple-600 font-medium hover:text-purple-500"
                >
                  Visit Help Center for more answers →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        {info.icon}
                      </div>
                      <h4 className="font-bold">{info.title}</h4>
                    </div>
                    <div className="space-y-2 ml-11">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                  <Phone size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Emergency Support</h3>
                  <p className="text-sm text-gray-600">Available 24/7 for urgent safety concerns</p>
                </div>
              </div>
              <a
                href="tel:+15559111111"
                className="block w-full text-center py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
              >
                Call Emergency: (555) 911-1111
              </a>
              <p className="text-xs text-gray-500 mt-3 text-center">
                For immediate safety assistance only
              </p>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Twitter', color: 'bg-blue-100 text-blue-600' },
                  { name: 'Facebook', color: 'bg-blue-100 text-blue-600' },
                  { name: 'Instagram', color: 'bg-pink-100 text-pink-600' },
                  { name: 'LinkedIn', color: 'bg-blue-100 text-blue-600' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className={`p-4 rounded-lg text-center hover:shadow-md transition ${social.color}`}
                  >
                    <div className="font-medium">{social.name}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-3" size={24} />
                <div>
                  <h3 className="font-bold text-lg">Response Time Guarantee</h3>
                  <p className="text-sm text-gray-600">
                    We respond to all inquiries within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Visit Our Offices</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                city: 'San Francisco',
                address: '123 Mobility Ave, San Francisco, CA 94107',
                hours: 'Mon-Fri 9AM-6PM PST',
                phone: '(555) 123-4567'
              },
              {
                city: 'New York',
                address: '456 Urban Plaza, New York, NY 10001',
                hours: 'Mon-Fri 9AM-6PM EST',
                phone: '(555) 234-5678'
              },
              {
                city: 'London',
                address: '789 Transport Lane, London, UK',
                hours: 'Mon-Fri 9AM-6PM GMT',
                phone: '+44 20 1234 5678'
              }
            ].map((office, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="text-gray-400 mr-3" size={20} />
                  <h3 className="font-bold text-lg">{office.city} Headquarters</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600">{office.address}</p>
                  <p className="text-gray-600">{office.hours}</p>
                  <p className="text-gray-600">{office.phone}</p>
                </div>
                <button className="mt-6 w-full py-2 border border-gray-300 rounded-lg hover:bg-white transition">
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-gray-300 mb-8">
            Our customer support team is available 24/7 to assist you
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
              to="/help"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-black transition"
            >
              <HelpCircle size={20} className="mr-2" />
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;