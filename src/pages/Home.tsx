import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Search,
  Clock,
  Shield,
  CreditCard,
  Star,
  Navigation,
} from "lucide-react";
import MapView from "../components/MapView";
import { Autocomplete } from "@react-google-maps/api";
import { calculateFare } from "../services/fareCalculation";

type LocationPoint = {
  lat: number;
  lng: number;
  address: string;
};

const Home = () => {
  const [pickup, setPickup] = useState<LocationPoint | null>(null);
  const [destination, setDestination] = useState<LocationPoint | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [routeInfo, setRouteInfo] = useState<{
    distanceMeters: number;
    durationSeconds: number;
    fare?: number;
  } | null>(null);

  const pickupAutoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationAutoRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentLocation(coords);

          // Set pickup to current location with proper coordinates
          setPickup({
            lat: coords.latitude,
            lng: coords.longitude,
            address: "Current Location",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleUseCurrentLocation = async () => {
    if (currentLocation) {
      setPickup({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        address: "Current Location",
      });
    } else {
      // Get location if not already available
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setCurrentLocation(coords);
            setPickup({
              lat: coords.latitude,
              lng: coords.longitude,
              address: "Current Location",
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            alert(
              "Unable to get your location. Please enable location services."
            );
          }
        );
      }
    }
  };

  

  // Handle pickup autocomplete
  const handlePickupPlaceChanged = () => {
    const place = pickupAutoRef.current?.getPlace();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    // Use place name if available, otherwise use formatted address
    const address = place.name || place.formatted_address || "";

    setPickup({
      lat,
      lng,
      address,
    });
  };

  // Handle destination autocomplete
  const handleDestinationPlaceChanged = () => {
    const place = destinationAutoRef.current?.getPlace();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    // Use place name if available, otherwise use formatted address
    const address = place.name || place.formatted_address || "";

    setDestination({
      lat,
      lng,
      address,
    });
  };

  // Handle manual input changes (fallback)
  const handlePickupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setPickup(null);
    } else if (pickup) {
      // Update just the address if coordinates exist
      setPickup({
        ...pickup,
        address: value,
      });
    }
  };

  const handleDestinationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!value) {
      setDestination(null);
    } else if (destination) {
      // Update just the address if coordinates exist
      setDestination({
        ...destination,
        address: value,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:w-2/3 lg:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-1 h-16 lg:h-20 mr-5 bg-purple-500" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Where are we <span className="text-purple-400">headed</span>{" "}
                today?
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Get a ride in minutes. Or become a driver and earn money on your
              schedule.
            </p>
          </div>
        </div>
      </div>

      {/* Ride Booking Card */}
      <div className="max-w-7xl mx-auto z-10 px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Right Column - Ride Details */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6">Set your destination</h3>

              {/* Pickup Location */}
              <div className="mb-6">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="mr-2" size={16} />
                  Pickup location
                </label>
                <div className="relative">
                  <Autocomplete
                    onLoad={(auto) => (pickupAutoRef.current = auto)}
                    onPlaceChanged={handlePickupPlaceChanged}
                    options={{
                      // types: [ 'establishment'],
                      componentRestrictions: { country: "gh" },
                    }}
                  >
                    <input
                      type="text"
                      value={pickup?.address}
                      onChange={handlePickupInputChange}
                      placeholder="Enter pickup location"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </Autocomplete>
                  <Search
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />
                  <button
                    onClick={handleUseCurrentLocation}
                    className="absolute right-3 top-2.5 text-sm bg-gray-100 p-2 rounded-full text-purple-600 font-medium hover:bg-gray-200 transition"
                    title="Use current location"
                  >
                    <Navigation size={18} />
                  </button>
                </div>
              </div>

              {/* Destination */}
              <div className="mb-8">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="mr-2" size={16} />
                  Where to?
                </label>
                <div className="relative">
                  <Autocomplete
                    onLoad={(auto) => (destinationAutoRef.current = auto)}
                    onPlaceChanged={handleDestinationPlaceChanged}
                    options={{
                      // types: ['address', 'establishment'],
                      componentRestrictions: { country: "gh" },
                    }}
                  >
                    <input
                      type="text"
                      value={destination?.address}
                      onChange={handleDestinationInputChange}
                      placeholder="Enter destination"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </Autocomplete>
                  <Search
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              {/* Route Info */}
              {routeInfo && (
                <div className="mb-6 p-4 rounded-lg bg-gray-100 text-sm">
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Distance:
                      </span>
                      <span>
                        {(routeInfo.distanceMeters / 1000).toFixed(1)} km
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700">Time:</span>
                      <span>
                        {Math.ceil(routeInfo.durationSeconds / 60)} mins
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Estimated fare:
                      </span>
                      <span className="font-bold text-lg">
                         {calculateFare(routeInfo.distanceMeters, routeInfo.durationSeconds).totalFare.toFixed(2)} GH₵
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Confirm Ride Button */}
              <button
                disabled={!pickup || !destination}
                className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                  pickup && destination
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {pickup && destination ? "Confirm Ride" : "Enter locations"}
              </button>
            </div>

            {/* Map View */}
            <div className="lg:col-span-2 h-[500px] md:h-[600px] rounded-xl overflow-hidden border border-gray-200">
              <MapView
                pickupLocation={
                  pickup
                    ? {
                        latitude: pickup.lat,
                        longitude: pickup.lng,
                      }
                    : null
                }
                destinationLocation={
                  destination
                    ? {
                        latitude: destination.lat,
                        longitude: destination.lng,
                      }
                    : null
                }
                currentLocation={currentLocation}
                onRouteCalculated={setRouteInfo}
                showRoute={!!(pickup && destination)}
                fitToMarkers={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why choose RideRequest?
          </h2>
          <p className="text-gray-600 text-lg">
            Safe, reliable rides at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Shield className="text-purple-600" size={32} />,
              title: "Safety First",
              desc: "24/7 safety support and verified drivers",
            },
            {
              icon: <Clock className="text-purple-600" size={32} />,
              title: "On-time pickup",
              desc: "Real-time tracking and accurate ETAs",
            },
            {
              icon: <CreditCard className="text-purple-600" size={32} />,
              title: "Cash-free",
              desc: "Seamless in-app payments",
            },
            {
              icon: <Star className="text-purple-600" size={32} />,
              title: "5-star drivers",
              desc: "Rated drivers for quality service",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to ride?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download our app for the best experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition">
              Download App
            </button>
            <button className="px-8 py-3 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-black transition">
              Sign Up to Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
