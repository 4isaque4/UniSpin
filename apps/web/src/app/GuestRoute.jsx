import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function GuestRoute() {
  const { user, loading } = useAuth();

  // Log para debug
  console.log("GuestRoute - user:", user, "loading:", loading);

  // Se ainda está carregando, aguarda
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se há usuário autenticado, redireciona para trilhas
  if (user) {
    console.log("GuestRoute - usuário autenticado, redirecionando para /trilhas");
    return <Navigate to="/trilhas" replace />;
  }

  console.log("GuestRoute - usuário não autenticado, renderizando login");
  return <Outlet />;
}
