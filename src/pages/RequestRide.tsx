import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import MapView from "../components/MapView";
import { ChevronRight, MapPin, Navigation, Search } from "lucide-react";
import { Autocomplete } from "@react-google-maps/api";
import FullLocationPicker from "../components/FullLocationPicker";

type LocationPoint = {
  lat: number;
  lng: number;
  address: string;
};

export default function RequestRide() {
  const { user } = useAuth();
  const [pickup, setPickup] = useState<LocationPoint | null>(null);
  const [destination, setDestination] = useState<LocationPoint | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPickup({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          address: "Current Location",
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  const requestRide = async () => {
    if (!pickup || !destination) return;

    setLoading(true);

    await addDoc(collection(db, "rideRequests"), {
      userId: user?.uid,
      pickup,
      destination,
      status: "searching",
      createdAt: serverTimestamp(),
    });

    setLoading(false);
    alert("Ride requested 🚗");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hidden md:block bg-linear-to-r from-black to-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Request a ride now
          </h1>
          <p className="text-xl text-gray-300">
            Get where you're going, your way
          </p>
        </div>
      </div>
      {/* Request a ride map & form */}
      <div className="flex flex-col md:flex-row max-w-3xl mx-auto md:max-w-full  md:p-6 bg-white md:rounded-lg shadow-md md:mt-8">
        {/* Map View */}
        <div className=" md:col-span-2 w-dvw md:w-[50%] h-dvh md:h-[600px] rounded-xl overflow-hidden border border-gray-200">
          <MapView
          // pickupLocation={
          //   pickup
          //     ? {
          //         latitude: pickup.lat,
          //         longitude: pickup.lng,
          //       }
          //     : null
          // }
          // destinationLocation={
          //   destination
          //     ? {
          //         latitude: destination.lat,
          //         longitude: destination.lng,
          //       }
          //     : null
          // }
          // currentLocation={currentLocation}
          // onRouteCalculated={setRouteInfo}
          // showRoute={!!(pickup && destination)}
          // fitToMarkers={true}
          />
        </div>
        <div className="flex items-center justify-center px-4 w-full md:w-[50%]">
          <div className="flex md:hidden  fixed bottom-0 left-0 right-0 z-10 bg-white p-4 border border-gray-400 rounded-t-2xl">
            <div className="flex flex-col w-full">
              <h3 className="text-md font-semibold mb-2">
                <Navigation className="inline-block mr-2" size={20} />
                Where are we headed?
              </h3>
              <button className="flex justify-between items-center p-4 border border-gray-200 rounded-xl just"
                onClick={()=> setLocationPickerVisible(true)}
              >
                <div className="flex flex-row items-center">
                  <MapPin className="inline-block mr-2" size={16} />
                  <p>Select destination</p>
                </div>
                <ChevronRight size={18} />
              </button>
               <FullLocationPicker
              visible={locationPickerVisible}
              onClose={() => setLocationPickerVisible(false)}
              onConfirm={(pickupLoc, destLoc) => {
                setPickup(pickupLoc);
                setDestination(destLoc);
              }}
              initialPickup={pickup}
              initialDestination={destination}
            />
              <button
                disabled={!pickup || !destination}
                onClick={() => requestRide()}
                className={`items-center p-4 border border-gray-200 rounded-xl mt-4 bg-black text-white
                  ${pickup && destination
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-900 text-gray-500 cursor-not-allowed"}`}
              >
                {loading ? "Requesting..." : "Request Ride"}
              </button>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center w-full border border-gray-200 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">Set your destination</h3>

            {/* Pickup Location */}
            <div className="mb-6">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="mr-2" size={16} />
                Pickup location
              </label>
              <div className="relative">
                <Autocomplete
                  // onLoad={(auto) => (pickupAutoRef.current = auto)}
                  // onPlaceChanged={handlePickupPlaceChanged}
                  options={{
                    // types: [ 'establishment'],
                    componentRestrictions: { country: "gh" },
                  }}
                >
                  <input
                    type="text"
                    value={pickup?.address}
                    // onChange={handlePickupInputChange}
                    placeholder="Enter pickup location"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </Autocomplete>
                <Search
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
                <button
                  // onClick={handleUseCurrentLocation}
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
                  // onLoad={(auto) => (destinationAutoRef.current = auto)}
                  // onPlaceChanged={handleDestinationPlaceChanged}
                  options={{
                    // types: ['address', 'establishment'],
                    componentRestrictions: { country: "gh" },
                  }}
                >
                  <input
                    type="text"
                    // value={destination?.address}
                    // onChange={handleDestinationInputChange}
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
            {pickup && (
              <div className="mb-6 p-4 rounded-lg bg-gray-100 text-sm">
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700">Distance:</span>
                    <span>
                      {/* {(routeInfo.distanceMeters / 1000).toFixed(1)} km */}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700">Time:</span>
                    <span>
                      {/* {Math.ceil(routeInfo.durationSeconds / 60)} mins */}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Estimated fare:
                    </span>
                    <span className="font-bold text-lg">
                      {/* {calculateFare(routeInfo.distanceMeters, routeInfo.durationSeconds).totalFare.toFixed(2)} GH₵ */}
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
        </div>
      </div>

      {/* <button
        className="btn-primary mt-4"
        onClick={requestRide}
        disabled={loading}
      >
        {loading ? "Requesting..." : "Request Ride"}
      </button> */}
    </div>
  );
}
