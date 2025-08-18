import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function ProtectedRoute() {
  const { user, ready } = useAuth();
  if (!ready) return <div style={{ padding: 16 }}>Carregando…</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
