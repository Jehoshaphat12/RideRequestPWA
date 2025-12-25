import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Globe, 
  Award, 
  Clock, 
  TrendingUp, 
  Heart, 
  Target,
  CheckCircle,
  Car,
  MapPin,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Types for TypeScript
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Milestone {
  year: number;
  event: string;
  description: string;
}

interface Statistic {
  label: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const About: React.FC = () => {
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('story');

  // Team data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Former transportation executive with 15+ years experience"
    },
    {
      id: 2,
      name: "Maria Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Ex-Google engineer focused on scalable transportation solutions"
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      bio: "10+ years in logistics and supply chain management"
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Head of Safety",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      bio: "Former safety regulator with expertise in transportation security"
    }
  ];

  // Milestones
  const milestones: Milestone[] = [
    {
      year: 2020,
      event: "Company Founded",
      description: "Started with a mission to revolutionize urban transportation"
    },
    {
      year: 2021,
      event: "First 10,000 Rides",
      description: "Reached milestone in New York City launch"
    },
    {
      year: 2022,
      event: "Expanded to 5 Cities",
      description: "Grew operations to major metropolitan areas"
    },
    {
      year: 2023,
      event: "10M+ Rides Completed",
      description: "Achieved significant user adoption and trust"
    },
    {
      year: 2024,
      event: "International Expansion",
      description: "Launching in 3 new countries"
    }
  ];

  // Statistics
  const statistics: Statistic[] = [
    {
      label: "Rides Completed",
      value: "10M+",
      icon: <Car className="text-purple-600" size={24} />,
      description: "Safe and reliable trips"
    },
    {
      label: "Active Drivers",
      value: "50K+",
      icon: <Users className="text-purple-600" size={24} />,
      description: "Verified and trained partners"
    },
    {
      label: "Cities",
      value: "25+",
      icon: <MapPin className="text-purple-600" size={24} />,
      description: "Across 3 countries"
    },
    {
      label: "Customer Rating",
      value: "4.8★",
      icon: <Star className="text-purple-600" size={24} />,
      description: "Based on 2M+ reviews"
    }
  ];

  // Values
  const values = [
    {
      title: "Safety First",
      icon: <Shield size={32} className="text-purple-600" />,
      description: "Every ride is monitored with 24/7 safety support"
    },
    {
      title: "Reliability",
      icon: <Clock size={32} className="text-purple-600" />,
      description: "Consistent service you can depend on"
    },
    {
      title: "Innovation",
      icon: <TrendingUp size={32} className="text-purple-600" />,
      description: "Continuously improving our technology and service"
    },
    {
      title: "Community",
      icon: <Heart size={32} className="text-purple-600" />,
      description: "Supporting the cities we serve"
    }
  ];

  // FAQ Data
  const faqs: FAQ[] = [
    {
      question: "How does RideRequest ensure safety?",
      answer: "We implement multiple layers of safety including driver background checks, 24/7 safety support, real-time ride tracking, and an emergency assistance button. All drivers undergo comprehensive screening and vehicles are regularly inspected."
    },
    {
      question: "What makes RideRequest different from other ride-hailing services?",
      answer: "We focus on reliability and customer experience with features like upfront pricing, no surge pricing during emergencies, better driver compensation, and dedicated customer support. Our technology optimizes routes for efficiency and environmental impact."
    },
    {
      question: "How does RideRequest support its drivers?",
      answer: "Drivers earn competitive rates with transparent earnings breakdowns. We offer flexible schedules, insurance options, and access to affordable vehicle maintenance. Our driver support team provides 24/7 assistance and educational resources."
    },
    {
      question: "What cities does RideRequest operate in?",
      answer: "Currently, we operate in 25+ major cities across North America with plans for international expansion. We're focused on providing excellent service in each market before expanding to new locations."
    },
    {
      question: "How does RideRequest handle customer complaints?",
      answer: "We have a dedicated support team that responds within 2 hours for urgent issues. Our transparent resolution process ensures fair outcomes for both riders and drivers. All interactions are logged and reviewed for quality improvement."
    }
  ];

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Driving the future of <span className="text-purple-400">urban mobility</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              We're on a mission to make transportation reliable, safe, and accessible for everyone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/requestride"
                className="px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition inline-flex items-center justify-center"
              >
                Book a Ride <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/drive"
                className="px-8 py-3 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-black transition inline-flex items-center justify-center"
              >
                Become a Driver
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex p-4 bg-purple-100 rounded-full mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="font-medium text-gray-900 mb-1">{stat.label}</div>
              {stat.description && (
                <div className="text-sm text-gray-600">{stat.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'story', label: 'Our Story' },
              { id: 'mission', label: 'Mission & Values' },
              { id: 'team', label: 'Our Team' },
              { id: 'impact', label: 'Impact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Our Story */}
        {activeTab === 'story' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2020, RideRequest began with a simple idea: transportation should be 
                  reliable, safe, and accessible for everyone. What started as a small operation 
                  in New York City has grown into a trusted mobility platform serving millions 
                  of riders across multiple cities.
                </p>
                <p className="text-gray-600 mb-6">
                  We've revolutionized the ride-hailing industry by prioritizing both rider 
                  experience and driver satisfaction. Our technology connects people with 
                  transportation that's not just convenient, but also sustainable and community-focused.
                </p>
                <div className="flex items-center">
                  <Target className="text-purple-600 mr-3" size={24} />
                  <span className="font-medium">Transforming urban mobility one ride at a time</span>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-64 lg:h-96 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                  <Award className="text-purple-600 mb-3" size={32} />
                  <h3 className="font-bold text-lg mb-2">Innovation Award 2023</h3>
                  <p className="text-gray-600 text-sm">Recognized for sustainable transportation solutions</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Our Milestones</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-purple-200"></div>
                
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div
                      key={milestone.year}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Year */}
                      <div className="flex-1 md:flex-none md:w-1/2">
                        <div className={`text-right ${index % 2 === 0 ? 'md:text-right pr-12' : 'md:text-left pl-12'}`}>
                          <div className="inline-flex items-center">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10">
                              <CheckCircle size={16} className="text-white" />
                            </div>
                            <div className="text-2xl font-bold text-purple-600">{milestone.year}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Event */}
                      <div className="flex-1 md:w-1/2">
                        <div className={`bg-white p-6 rounded-xl shadow-lg ${index % 2 === 0 ? 'ml-12 md:ml-0 md:mr-12' : 'ml-12 md:ml-12'}`}>
                          <h4 className="font-bold text-lg mb-2">{milestone.event}</h4>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mission & Values */}
        {activeTab === 'mission' && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8">
                To create a world where safe, reliable, and sustainable transportation is 
                accessible to everyone, everywhere
              </p>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-2xl">
                <Globe className="mx-auto mb-4 text-purple-600" size={48} />
                <p className="text-lg font-medium">
                  "We believe in building transportation solutions that connect communities, 
                  reduce environmental impact, and create economic opportunities for all."
                </p>
              </div>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
                    <div className="inline-flex p-4 bg-purple-100 rounded-full mb-6">
                      {value.icon}
                    </div>
                    <h4 className="font-bold text-xl mb-4">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Commitment */}
            <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Commitment</h3>
                  <ul className="space-y-4">
                    {[
                      "Carbon-neutral rides by 2025",
                      "Living wage for all drivers",
                      "Zero tolerance for discrimination",
                      "Transparent pricing always",
                      "Community reinvestment"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="text-green-400 mr-3" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-6 bg-white/10 rounded-2xl">
                    <Heart size={48} className="text-purple-400" />
                  </div>
                  <p className="mt-6 text-lg">
                    We're committed to making a positive impact in every community we serve
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Our Team */}
        {activeTab === 'team' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Meet Our Leadership</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A diverse team of innovators, operators, and transportation experts working 
                together to build the future of mobility
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative">
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                      <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-16 pb-6 px-6 text-center">
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                    <div className="mt-6 flex justify-center space-x-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">LI</span>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">TW</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Stats */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                  <div className="font-medium">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
                  <div className="font-medium">Countries Represented</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
                  <div className="font-medium">Women in Leadership</div>
                </div>
              </div>
            </div>

            {/* Join Team CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">Join Our Team</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We're always looking for talented people who share our passion for 
                transforming transportation
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition"
              >
                View Open Positions <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        )}

        {/* Impact */}
        {activeTab === 'impact' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Making a Difference</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beyond rides, we're committed to creating positive change in our communities
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Carbon Reduction",
                  value: "15K",
                  unit: "tons",
                  description: "CO2 emissions reduced through ride sharing",
                  icon: <Globe className="text-green-600" size={32} />
                },
                {
                  title: "Community Support",
                  value: "$2.5M",
                  unit: "invested",
                  description: "In local community initiatives",
                  icon: <Heart className="text-red-600" size={32} />
                },
                {
                  title: "Jobs Created",
                  value: "50K+",
                  unit: "opportunities",
                  description: "Economic opportunities for drivers",
                  icon: <Users className="text-blue-600" size={32} />
                }
              ].map((impact, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                  <div className="inline-flex p-4 bg-gray-100 rounded-full mb-6">
                    {impact.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {impact.value}<span className="text-2xl">{impact.unit}</span>
                  </div>
                  <h4 className="font-bold text-xl mb-3">{impact.title}</h4>
                  <p className="text-gray-600">{impact.description}</p>
                </div>
              ))}
            </div>

            {/* Sustainability */}
            <div className="bg-gradient-to-r from-green-900 to-emerald-900 text-white rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Sustainability Pledge</h3>
                  <p className="mb-6">
                    We're committed to reducing our environmental impact through:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "100% electric fleet by 2030",
                      "Carbon offset for every ride",
                      "Eco-friendly routing optimization",
                      "Partnerships with clean energy providers"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="text-green-400 mr-3" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-8 bg-white/10 rounded-2xl">
                    <Globe size={64} className="text-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find answers to common questions about RideRequest</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-medium">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions or want to partner with us? We'd love to hear from you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition"
            >
              Contact Us
            </Link>
            <Link
              to="/press"
              className="px-8 py-3 border-2 border-gray-300 rounded-lg font-bold hover:bg-white transition"
            >
              Press Kit
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} RideRequest Technologies, Inc. All rights reserved.</p>
        <p className="mt-2">
          <Link to="/terms" className="hover:text-gray-700 mx-2">Terms of Service</Link> • 
          <Link to="/privacy" className="hover:text-gray-700 mx-2">Privacy Policy</Link> • 
          <Link to="/accessibility" className="hover:text-gray-700 mx-2">Accessibility</Link>
        </p>
      </div>
    </div>
  );
};

export default About;