import React from 'react';
import { Download, FileText, Video, Image, Calendar, Award, Newspaper } from 'lucide-react';

const Press: React.FC = () => {
  const pressReleases = [
    {
      date: '2024-01-15',
      title: 'RideRequest Announces International Expansion',
      description: 'Company to launch services in three new countries in 2024'
    },
    {
      date: '2023-11-20',
      title: 'RideRequest Achieves Carbon Neutral Milestone',
      description: 'Company offsets 100% of emissions from rides'
    },
    {
      date: '2023-09-10',
      title: '$50M Series B Funding Round',
      description: 'Investment to accelerate technology development'
    }
  ];

  const mediaAssets = [
    {
      type: 'logo',
      title: 'Company Logos',
      description: 'High-resolution logo files in multiple formats',
      icon: <Image size={24} />
    },
    {
      type: 'images',
      title: 'Brand Photos',
      description: 'Official company and team photos',
      icon: <Image size={24} />
    },
    {
      type: 'broll',
      title: 'Video B-Roll',
      description: 'High-quality video footage',
      icon: <Video size={24} />
    },
    {
      type: 'factsheet',
      title: 'Company Fact Sheet',
      description: 'Quick facts and statistics',
      icon: <FileText size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Newspaper size={48} className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Press & Media</h1>
          <p className="text-xl text-gray-300">News and resources for journalists</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Latest News</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar size={16} className="mr-2" />
                    {new Date(release.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{release.title}</h3>
                  <p className="text-gray-600 mb-4">{release.description}</p>
                  <button className="text-purple-600 font-medium hover:text-purple-500">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Media Assets</h2>
            <div className="space-y-4">
              {mediaAssets.map((asset, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-3">
                    {asset.icon}
                    <h3 className="font-bold ml-3">{asset.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{asset.description}</p>
                  <button className="flex items-center text-purple-600 font-medium hover:text-purple-500">
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Press Contact</h3>
              <p className="text-gray-600 mb-4">
                For media inquiries, please contact our press team
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: press@riderequest.com</p>
                <p className="font-medium">Phone: (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;