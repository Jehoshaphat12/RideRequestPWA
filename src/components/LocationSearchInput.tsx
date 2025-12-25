// components/LocationSearchInput.tsx
// import { useTheme } from '@/contexts/ThemeContext';
// import { useLocationTracking } from '@/hooks/useLocationTracking';
import { Search, MapPin, Navigation, Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface LocationSearchInputProps {
  placeholder: string;
  iconName: string;
  iconColor: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  isPickup?: boolean;
  autoFillCurrentLocation?: boolean;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function LocationSearchInput({
  placeholder,
  iconColor,
  onLocationSelect,
  isPickup = false,
  autoFillCurrentLocation = false,
}: LocationSearchInputProps) {
//   const { theme } = useTheme();
//   const { currentLocation } = useLocationTracking();
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAutoFilled = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Auto-fill current location for pickup field
  useEffect(() => {
    if (isPickup && autoFillCurrentLocation && currentLocation && !hasAutoFilled.current) {
      autoFillWithCurrentLocation();
    }
  }, [currentLocation, isPickup, autoFillCurrentLocation]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const autoFillWithCurrentLocation = async () => {
    if (!currentLocation || hasAutoFilled.current) return;
    
    setIsGettingLocation(true);
    try {
      const address = await getAddressFromCoordinates(
        currentLocation.latitude,
        currentLocation.longitude
      );
      
      const locationData = {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        address: address || 'Current Location'
      };
      
      setQuery(address || 'Current Location');
      onLocationSelect(locationData);
      hasAutoFilled.current = true;
    } catch (error) {
      console.error('Error getting current location address:', error);
      const locationData = {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        address: 'Current Location'
      };
      setQuery('Current Location');
      onLocationSelect(locationData);
      hasAutoFilled.current = true;
    } finally {
      setIsGettingLocation(false);
    }
  };

  const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results.find((r: any) => 
          r.types.includes('street_address') || 
          r.types.includes('premise') ||
          r.types.includes('point_of_interest')
        ) || data.results[0];
        
        return result.formatted_address;
      }
      return '';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return '';
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const searchPlaces = async (searchText: string) => {
    if (searchText.length < 3) {
      setPredictions([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          searchText
        )}&key=${GOOGLE_MAPS_API_KEY}&components=country:gh`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK') {
        setPredictions(data.predictions);
        setShowResults(true);
      } else {
        setPredictions([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Error searching places:', error);
      setPredictions([]);
      setShowResults(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      searchPlaces(text);
    }, 300);
  };

  const handlePredictionSelect = async (prediction: any) => {
    try {
      const detailsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${GOOGLE_MAPS_API_KEY}`
      );
      
      const detailsData = await detailsResponse.json();
      
      if (detailsData.status === 'OK') {
        const location = detailsData.result.geometry.location;
        onLocationSelect({
          lat: location.lat,
          lng: location.lng,
          address: prediction.description,
        });
        setQuery(prediction.description);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Error getting place details:', error);
    }
  };

  const handleUseCurrentLocation = async () => {
    if (!currentLocation) return;
    
    setIsGettingLocation(true);
    try {
      const address = await getAddressFromCoordinates(
        currentLocation.latitude,
        currentLocation.longitude
      );
      
      const locationData = {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        address: address || 'Current Location'
      };
      
      setQuery(address || 'Current Location');
      onLocationSelect(locationData);
      setShowResults(false);
    } catch (error) {
      console.error('Error using current location:', error);
      const locationData = {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        address: 'Current Location'
      };
      setQuery('Current Location');
      onLocationSelect(locationData);
      setShowResults(false);
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Map icon names from Ionicons to lucide-react
  const renderIcon = () => {
    // You can extend this mapping based on your iconName prop
    // For now, using Search as default
    if (isGettingLocation) {
      return <Loader2 className="h-5 w-5 animate-spin" style={{ color: iconColor }} />;
    }
    return <Search className="h-5 w-5" style={{ color: iconColor }} />;
  };

  return (
    <div className="relative mb-3 w-full">
      <div 
        className="flex items-center rounded-xl px-4 h-12 shadow-sm"
        // style={{ backgroundColor: theme.card }}
      >
        <div className="mr-3 w-5 flex items-center justify-center">
          {renderIcon()}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="flex-1 h-full bg-transparent outline-none text-base placeholder-gray-400"
        //   style={{ color: theme.text }}
          placeholder={placeholder}
          value={query}
          onChange={handleTextChange}
          onFocus={() => query.length >= 3 && setShowResults(true)}
        />
        
        {isPickup && currentLocation && !isGettingLocation && (
          <button
            onClick={handleUseCurrentLocation}
            className="p-1 ml-2 flex items-center justify-center hover:opacity-80 transition-opacity"
            type="button"
            aria-label="Use current location"
          >
            {isGettingLocation ? (
              <Loader2 className="h-4 w-4 animate-spin"  />
            ) : (
              <Navigation className="h-4 w-4"  />
            )}
          </button>
        )}
      </div>

      {showResults && predictions.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 rounded-xl max-h-48 overflow-y-auto z-50 shadow-lg mt-1"
        //   style={{ backgroundColor: theme.card }}
        >
          <ul className="py-1">
            {predictions.map((item) => (
              <li key={item.place_id} className="border-b last:border-b-0">
                <button
                  className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                //   style={{ borderBottomColor: theme.border }}
                  onClick={() => handlePredictionSelect(item)}
                  type="button"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0 mr-2"  />
                  <span 
                    className="text-sm truncate flex-1"
                    // style={{ color: theme.text }}
                  >
                    {item.description}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}