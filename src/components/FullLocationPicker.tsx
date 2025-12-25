// import { useTheme } from "@/contexts/ThemeContext";
import { X, MapPin, Loader2 } from "lucide-react";
import{ useState } from "react";
import LocationSearchInputs from "./LocationSearchInputs";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (pickup: any, destination: any) => void;
  initialPickup?: any;
  initialDestination?: any;
}

export default function FullLocationPicker({
  visible,
  onClose,
  onConfirm,
  initialPickup,
  initialDestination,
}: Props) {
//   const { theme } = useTheme();
  const [pickup, setPickup] = useState(initialPickup || null);
  const [destination, setDestination] = useState(initialDestination || null);
  const [activeField, setActiveField] = useState<"pickup" | "destination">("pickup");
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [setSelectedPrediction] = useState<any>(null);

  const GOOGLE_MAPS_API_KEY = import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.status === "OK") {
        const location = data.result.geometry.location;
        const address = data.result.formatted_address;

        if (activeField === "pickup") {
          setPickup({ lat: location.lat, lng: location.lng, address });
        } else {
          setDestination({ lat: location.lat, lng: location.lng, address });
        }
      } else {
        alert("Error: Could not fetch location details.");
      }
    } catch (error) {
      console.error(error);
      alert("Error: Failed to get place details.");
    }
  };

  const handlePredictionSelect = async (prediction: any) => {
    setLoading(true);
    setSelectedPrediction(prediction);
    try {
      await fetchPlaceDetails(prediction.place_id);

      // ✅ Update field's visible text immediately
      if (activeField === "pickup") {
        setPickup((prev: any) => ({
          ...prev,
          address: prediction.description,
        }));
      } else {
        setDestination((prev: any) => ({
          ...prev,
          address: prediction.description,
        }));
      }

      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!pickup || !destination) {
      alert("Missing Info: Please select both pickup and destination");
      return;
    }
    onConfirm(pickup, destination);
    onClose();
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
    //   style={{ backgroundColor: theme.background }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4"
        //   style={{ backgroundColor: theme.card }}
        >
          <button
            onClick={onClose}
            className="p-1 hover:opacity-80 transition-opacity"
          >
            <X size={24} />
          </button>
          <h2 
            className="text-lg font-semibold"
            // style={{ color: theme.text }}
          >
            Select Route
          </h2>
          <div className="w-6" />
        </div>

        {/* Pickup & Destination Inputs */}
        <div 
          className="p-4 space-y-3"
        //   style={{ backgroundColor: theme.card }}
        >
          <button
            onClick={() => setActiveField("pickup")}
            className="w-full text-left"
          >
            <LocationSearchInputs
              placeholder="Pickup location"
              iconName="locate-outline"
            //   iconColor={theme.primary}
              value={pickup?.address}
              onLocationSelect={(loc) => {
                setPickup(loc);
                setPredictions([]);
              }}
              showDropdown={false}
              autoFillCurrentLocation={false}
              isPickup
              onPredictionsChange={(data: any[]) => {
                if (activeField === "pickup") setPredictions(data);
              }}
            />
          </button>

          <button
            onClick={() => setActiveField("destination")}
            className="w-full text-left"
          >
            <LocationSearchInputs
              placeholder="Destination"
              iconName="flag-outline"
            //   iconColor={theme.primary}
              value={destination?.address}
              onLocationSelect={(loc) => {
                setDestination(loc);
                setPredictions([]);
              }}
              autoFillCurrentLocation={false}
              isPickup
              onPredictionsChange={(data: any[]) => {
                if (activeField === "destination") setPredictions(data);
              }}
            />
          </button>
        </div>

        {/* Predictions List */}
        <div className="flex-1 px-4 pt-3">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 
                className="h-8 w-8 animate-spin" 
                // style={{ color: theme.primary }}
              />
            </div>
          ) : predictions.length > 0 ? (
            <div className="h-full overflow-y-auto">
              {predictions.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center py-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors px-2"
                //   style={{ borderBottomColor: theme.border }}
                  onClick={() => handlePredictionSelect(item)}
                >
                  <MapPin
                    size={20}
                    // style={{ color: theme.primary }}
                    className="mr-3 flex-shrink-0"
                  />
                  <span 
                    className="text-gray-900 dark:text-gray-100 flex-1 text-left truncate"
                  >
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <span 
                className="text-gray-500 dark:text-gray-400"
                // style={{ color: theme.muted }}
              >
                Start typing to see suggestions...
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div 
          className="flex gap-3 p-4 border-t"
        //   style={{ 
        //     backgroundColor: theme.card,
        //     borderTopColor: theme.border 
        //   }}
        >
          <button
            className="flex-1 py-3 rounded-lg border text-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            // style={{ 
            //   borderColor: theme.border,
            //   color: theme.text 
            // }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 rounded-lg text-center transition-opacity hover:opacity-90 disabled:opacity-50"
            // style={{ 
            //   backgroundColor: theme.primary,
            //   color: theme.primaryText 
            // }}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <Loader2 
                className="h-5 w-5 animate-spin mx-auto" 
                // style={{ color: theme.primaryText }}
              />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}