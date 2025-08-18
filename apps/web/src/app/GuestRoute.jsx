import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function GuestRoute() {
  const { user, ready } = useAuth();

  if (!ready) {
    return <div style={{ padding: 16 }}>Carregando…</div>;
  }
  return user ? <Navigate to="/trilhas" replace /> : <Outlet />;
}
