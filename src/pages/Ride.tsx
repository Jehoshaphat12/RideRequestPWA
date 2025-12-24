import { useState } from 'react';
import { MapPin, Clock, Shield, Car, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ride = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState('comfort');
  const [isLoading, setIsLoading] = useState(false);
  const [rideOptions] = useState<any[]>([
    {
      id: 'economy',
      name: 'Economy',
      icon: <Car size={20} />,
      price: '$25-30',
      time: '5 min',
      capacity: '1-3',
      features: ['Affordable', 'Everyday rides'],
      color: 'bg-gray-100'
    },
    {
      id: 'comfort',
      name: 'Comfort',
      icon: <Car size={20} className="text-purple-500" />,
      price: '$35-40',
      time: '3 min',
      capacity: '1-4',
      features: ['Extra legroom', 'Top-rated drivers'],
      color: 'bg-purple-50',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: <Car size={20} className="text-yellow-500" />,
      price: '$50-60',
      time: '2 min',
      capacity: '1-3',
      features: ['Luxury cars', 'Professional drivers'],
      color: 'bg-yellow-50'
    },
    {
      id: 'xl',
      name: 'XL',
      icon: <Users size={20} />,
      price: '$40-50',
      time: '7 min',
      capacity: '1-6',
      features: ['Extra seats', 'Luggage space'],
      color: 'bg-blue-50'
    }
  ]);

  const handleBookRide = () => {
    if (!pickup || !destination) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to ride confirmation
      console.log('Ride booked:', { pickup, destination, selectedRide });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-black to-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a ride now</h1>
          <p className="text-xl text-gray-300">Get where you're going, your way</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Where to?</h2>
              
              {/* Pickup Location */}
              <div className="mb-6">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="mr-2" size={16} />
                  Pickup location
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup location"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Destination */}
              <div className="mb-8">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="mr-2" size={16} />
                  Where to?
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Suggested Destinations */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-700 mb-4">Quick destinations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Airport', 'Coffee Shop', 'Hotel', 'Train Station'].map((place) => (
                    <button
                      key={place}
                      onClick={() => setDestination(place)}
                      className="py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                    >
                      {place}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ride Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Choose your ride</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rideOptions.map((ride) => (
                  <div
                    key={ride.id}
                    onClick={() => setSelectedRide(ride.id)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedRide === ride.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {ride.popular && (
                      <span className="inline-block bg-purple-500 text-white text-xs px-2 py-1 rounded mb-2">
                        Most Popular
                      </span>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${ride.color} rounded-lg`}>
                          {ride.icon}
                        </div>
                        <div>
                          <h3 className="font-bold">{ride.name}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={12} className="mr-1" />
                            <span>{ride.time}</span>
                            <span className="mx-2">•</span>
                            <Users size={12} className="mr-1" />
                            <span>{ride.capacity} people</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{ride.price}</div>
                        <div className="text-sm text-gray-600">Est. total</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {ride.features.map((feature: any, idx: string) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Book Ride Button */}
              <button
                onClick={handleBookRide}
                disabled={!pickup || !destination || isLoading}
                className={`w-full mt-8 py-4 rounded-lg font-bold text-lg transition ${
                  !pickup || !destination || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Finding your ride...
                  </span>
                ) : (
                  'Confirm Ride'
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Features & Info */}
          <div className="lg:col-span-1">
            {/* Safety Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <Shield className="text-purple-600 mr-3" size={24} />
                <h3 className="text-xl font-bold">Safety Features</h3>
              </div>
              <ul className="space-y-3">
                {[
                  '24/7 Safety Support',
                  'Share trip details with contacts',
                  'Emergency assistance button',
                  'Driver background checks'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Popular in your area</h3>
              <div className="space-y-3">
                {[
                  { name: 'Times Square', time: '15 min', price: '$18-22' },
                  { name: 'Central Park', time: '20 min', price: '$22-28' },
                  { name: 'JFK Airport', time: '40 min', price: '$45-55' },
                  { name: 'Brooklyn Bridge', time: '25 min', price: '$25-32' }
                ].map((destination, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium">{destination.name}</p>
                      <p className="text-sm text-gray-600">{destination.time} • {destination.price}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Ride History Link */}
            <Link
              to="/history"
              className="block mt-8 bg-linear-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-2xl p-6 text-center hover:shadow-lg transition"
            >
              <Clock className="mx-auto mb-3 text-purple-600" size={24} />
              <h3 className="font-bold text-lg mb-2">View Ride History</h3>
              <p className="text-gray-600 text-sm">See your past trips and receipts</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;