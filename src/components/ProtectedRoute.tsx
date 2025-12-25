import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { JSX } from "react";
import Loader from "./Loader";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) return <div className="w-dvw h-dvh flex flex-col justify-center items-center"><Loader />
    <p>Loading...</p>
  </div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
