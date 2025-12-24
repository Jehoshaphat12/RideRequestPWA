import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function RequestRide() {
  const { user } = useAuth();
  const [pickup, setPickup] = useState<any>(null);
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPickup({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
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
    <div className="p-4">
      <h1 className="text-xl font-bold">Request a Ride</h1>

      <p className="text-sm mt-2">
        Pickup:{" "}
        {pickup
          ? `${pickup.lat.toFixed(5)}, ${pickup.lng.toFixed(5)}`
          : "Getting location..."}
      </p>

      <input
        placeholder="Where are you going?"
        className="input mt-4"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <button
        className="btn-primary mt-4"
        onClick={requestRide}
        disabled={loading}
      >
        {loading ? "Requesting..." : "Request Ride"}
      </button>
    </div>
  );
}
