// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "./auth";

export default function ProtectedRoute({ children }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const t = getToken();
    setAuthed(!!t);
    setReady(true);
  }, []);

  if (!ready) return null;      
  if (!authed) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
