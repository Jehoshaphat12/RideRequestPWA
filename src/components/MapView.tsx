import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

/* ---------------- TYPES ---------------- */

export type Location = {
  latitude: number;
  longitude: number;
  address?: string;
};

interface MapViewProps {
  pickupLocation?: Location | null;
  destinationLocation?: Location | null;
  currentLocation?: Location | null;
  showRoute?: boolean;
  fitToMarkers?: boolean;
  onRouteCalculated?: (data: {
    distanceMeters: number;
    durationSeconds: number;
  }) => void;
}

/* ---------------- CONSTANTS ---------------- */

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

// const DEFAULT_CENTER = { lat: 5.6037, lng: -0.187 }; // Accra fallback

/* ---------------- COMPONENT ---------------- */

export default function MapView({
  pickupLocation,
  destinationLocation,
  currentLocation,
  showRoute = true,
  fitToMarkers = true,
  onRouteCalculated,
}: MapViewProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [initialFitDone, setInitialFitDone] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  /* ---------------- HELPERS ---------------- */

  const isValidLocation = (loc?: Location | null): loc is Location =>
    !!loc &&
    typeof loc.latitude === "number" &&
    typeof loc.longitude === "number" &&
    loc.latitude !== 0 &&
    loc.longitude !== 0;

  /* ---------------- ROUTE CALCULATION ---------------- */

  useEffect(() => {
    if (
      !isLoaded ||
      !showRoute ||
      !isValidLocation(pickupLocation) ||
      !isValidLocation(destinationLocation)
    ) {
      setDirections(null);
      return;
    }

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: {
          lat: pickupLocation.latitude,
          lng: pickupLocation.longitude,
        },
        destination: {
          lat: destinationLocation.latitude,
          lng: destinationLocation.longitude,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);

          const leg = result.routes[0].legs[0];

          onRouteCalculated?.({
            distanceMeters: leg.distance?.value ?? 0,
            durationSeconds: leg.duration?.value ?? 0,
          });

          // 🔥 Fit map to route ONCE (same idea as RN version)
          if (fitToMarkers && mapRef.current && !initialFitDone) {
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(leg.start_location);
            bounds.extend(leg.end_location);

            mapRef.current.fitBounds(bounds);
            setInitialFitDone(true);
          }
        } else {
          console.error("Directions failed:", status);
        }
      }
    );
  }, [
    isLoaded,
    pickupLocation,
    destinationLocation,
    showRoute,
    fitToMarkers,
    initialFitDone,
    // onRouteCalculated,
  ]);

  useEffect(() => {
  if (!mapRef.current || !currentLocation) return;

  // Only recenter if pickup is current location
  if (
    pickupLocation?.latitude === currentLocation.latitude &&
    pickupLocation?.longitude === currentLocation.longitude
  ) {
    mapRef.current.panTo({
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    });
    mapRef.current.setZoom(15);
  }
}, [currentLocation, pickupLocation]);

  /* ---------------- RENDER ---------------- */

  if (!isLoaded) {
    return (
      <Loader />
    );
  }

 

if (!isLoaded) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      Loading map…
    </div>
  );
}

  const center = isValidLocation(pickupLocation)
    ? { lat: pickupLocation.latitude, lng: pickupLocation.longitude }
    : currentLocation
    ? { lat: currentLocation.latitude, lng: currentLocation.longitude }
    : { lat: 5.6037, lng: -0.187 }; // Accra fallback

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      // onLoad={(map) => (mapRef.current = map)}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {/* Pickup Marker */}
      {isValidLocation(pickupLocation) && (
        <Marker
          position={{
            lat: pickupLocation.latitude,
            lng: pickupLocation.longitude,
          }}
          
        />
      )}

      {/* Destination Marker */}
      {isValidLocation(destinationLocation) && (
        <Marker
          position={{
            lat: destinationLocation.latitude,
            lng: destinationLocation.longitude,
          }}
          
        />
      )}

      {currentLocation && (
        <Marker
          position={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          label="U"
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#007bff",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
          }}
        />
      )}

      {/* Route */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#6200ee",
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}
