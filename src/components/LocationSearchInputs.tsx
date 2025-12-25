// import { useTheme } from '@/contexts/ThemeContext';
// import { useLocationTracking } from '@/hooks/useLocationTracking';
import { MapPin, Navigation, Loader2, LocateIcon, Flag } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface LocationSearchInputProps {
  placeholder: string;
  iconName: string;
  iconColor?: string;
  showDropdown?: boolean;
  value?: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  onPredictionsChange?: (predictions: any[]) => void;
  isPickup?: boolean;
  autoFillCurrentLocation?: boolean;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function LocationSearchInputs({
  placeholder,
  iconName,
  iconColor,
  onLocationSelect,
  onPredictionsChange,
  showDropdown = true,
  value,
  // isPickup = false,
  // autoFillCurrentLocation = false,
}: LocationSearchInputProps) {
//   const { theme } = useTheme();
//   const { currentLocation } = useLocationTracking();
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const hasAutoFilled = useRef(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
      latitude: number;
      longitude: number;
    } | null>(null);

  useEffect(() => {
    if (typeof value === 'string' && value !== query) {
      setQuery(value);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
          //   setPickup({
          //     lat: coords.latitude,
          //     lng: coords.longitude,
          //     address: "Current Location",
          //   });
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          { enableHighAccuracy: true }
        );
      }
    }, []);

  const getReadableLocationName = async (lat: any, lng: any) => {
    try {
      // 1. First try Places API for nearby businesses/landmarks
      const placesResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=100&key=${GOOGLE_MAPS_API_KEY}`
      );
      const placesData = await placesResponse.json();
      
      if (placesData.status === 'OK' && placesData.results.length > 0) {
        const closestPlace = placesData.results[0];
        return `${closestPlace.name}`;
      }
      
      // 2. Fallback to reverse geocoding
      return await getBestAddressFromGeocoding(lat, lng);
      
    } catch (error) {
      console.error('Location name error:', error);
      return await getBestAddressFromGeocoding(lat, lng);
    }
  };

  const getBestAddressFromGeocoding = async (lat: any, lng: any) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      // Filter out plus codes
      const bestResult = data.results.find((result: any) => 
        !result.types.includes('plus_code') &&
        !result.formatted_address.includes('+')
      );
      
      if (bestResult) {
        return bestResult.formatted_address;
      }
    }
    
    // Final fallback
    return `Location near ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const handleUseCurrentLocation = async () => {
    if (!currentLocation) {
      alert('Location not available yet. Please wait or enable location services.');
      return;
    }

    setIsLoadingLocation(true);
    
    try {
      const address = await getReadableLocationName(
        currentLocation.latitude, 
        currentLocation.longitude
      );

      onLocationSelect({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        address: address,
      });

      setQuery(address);
      
    } catch (error) {
      console.error('Location error:', error);
      alert('Unable to get your location details');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const fetchPredictions = async (text: string) => {
    if (text.length < 3) {
      setPredictions([]);
      setShowResults(false);
      onPredictionsChange?.([]);
      return;
    }

    try {
      const params = new URLSearchParams({
        input: text,
        key: GOOGLE_MAPS_API_KEY || '',
      });

      if (currentLocation) {
        const { latitude, longitude } = currentLocation;
        params.append('location', `${latitude},${longitude}`);
        params.append('radius', '20000');
      }

      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`;

      const res = await fetch(apiUrl);
      const data = await res.json();
      
      if (data?.predictions) {
        setPredictions(data.predictions);
        onPredictionsChange?.(data.predictions);
      } else {
        setPredictions([]);
        onPredictionsChange?.([]);
      }
    } catch (error) {
      console.error('Prediction fetch error:', error);
    }
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
    setShowResults(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchPredictions(text), 500);
  };

  const handleSelectLocation = async (item: any) => {
    setShowResults(false);
    setQuery(item.description || item.address || '');
    setIsGettingLocation(true);

    try {
      let locationData = { lat: 0, lng: 0, address: item.description || item.address || '' };

      if (item.place_id) {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await res.json();
        const loc = data.result?.geometry?.location;
        if (loc) locationData = { lat: loc.lat, lng: loc.lng, address: item.description };
      }

      onLocationSelect(locationData);
    } catch (error) {
      console.error('Error selecting location:', error);
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Map icon names from Ionicons to lucide-react
  const renderIcon = () => {
    // You can extend this mapping based on your iconName prop
    if (iconName.includes('locate')) {
      return <LocateIcon className="h-5 w-5" style={{ color: iconColor }} />;
    } else if (iconName.includes('flag')) {
      return <Flag className="h-5 w-5" style={{ color: iconColor }} />;
    }
    return <MapPin className="h-5 w-5" style={{ color: iconColor }} />;
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center rounded-xl px-3 py-2 mb-2"
        // style={{ backgroundColor: theme.border }}
      >
        <div className="mr-2">
          {renderIcon()}
        </div>
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
        //   style={{ color: theme.text }}
          placeholder={placeholder}
          value={query}
          onChange={handleChangeText}
        />
        
        {currentLocation && !isGettingLocation && (
          <button
            onClick={handleUseCurrentLocation}
            className="p-1 ml-2 flex items-center justify-center hover:opacity-80 transition-opacity"
            type="button"
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <Loader2 className="h-4 w-4 animate-spin"  />
            ) : (
              <Navigation className="h-4 w-4"  />
            )}
          </button>
        )}
      </div>

      {showDropdown && showResults && predictions.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 rounded-lg overflow-hidden z-50 shadow-lg max-h-60 overflow-y-auto"
        //   style={{ backgroundColor: theme.card }}
        >
          {predictions.map((item) => (
            <button
              key={item.place_id}
              className="w-full flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b last:border-b-0"
            //   style={{ borderBottomColor: theme.border }}
              onClick={() => handleSelectLocation(item)}
              type="button"
            >
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0"  />
              <span 
                className="text-sm truncate text-left"
                // style={{ color: theme.text }}
              >
                {item.description}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}