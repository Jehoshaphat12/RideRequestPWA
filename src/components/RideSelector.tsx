import { useState } from "react";
import { Car, Users, Luggage, Clock } from "lucide-react";

const RideSelector = () => {
  const [selectedRide, setSelectedRide] = useState("comfort");

  const rideOptions = [
    {
      id: "economy",
      name: "Economy",
      icon: <Car size={24} />,
      price: "$25-30",
      time: "5 min",
      capacity: "1-3",
      features: ["Affordable", "Everyday rides"]
    },
    {
      id: "comfort",
      name: "Comfort",
      icon: <Car size={24} className="text-purple-500" />,
      price: "$35-40",
      time: "3 min",
      capacity: "1-4",
      features: ["Extra legroom", "Top-rated drivers"],
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      icon: <Car size={24} className="text-yellow-500" />,
      price: "$50-60",
      time: "2 min",
      capacity: "1-3",
      features: ["Luxury cars", "Professional drivers"]
    },
    {
      id: "xl",
      name: "XL",
      icon: <Users size={24} />,
      price: "$40-50",
      time: "7 min",
      capacity: "1-6",
      features: ["Extra seats", "Luggage space"]
    }
  ];

  return (
    <div className="z-10">
      <h3 className="text-xl font-bold mb-6">Choose your ride</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rideOptions.map((ride) => (
          <div
            key={ride.id}
            className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedRide === ride.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedRide(ride.id)}
          >
            {ride.popular && (
              <span className="absolute -top-2 left-4 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                Most Popular
              </span>
            )}
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {ride.icon}
                </div>
                <div>
                  <h4 className="font-bold">{ride.name}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={14} className="mr-1" />
                    <span>{ride.time}</span>
                    <span className="mx-2">•</span>
                    <Users size={14} className="mr-1" />
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
              {ride.features.map((feature, idx) => (
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
    </div>
  );
};

export default RideSelector;