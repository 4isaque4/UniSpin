import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Log para debug
  console.log("ProtectedRoute - user:", user, "loading:", loading);

  // Se ainda está carregando, aguarda
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não há usuário, redireciona para login
  if (!user) {
    console.log("ProtectedRoute - redirecionando para /login");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute - usuário autenticado, renderizando conteúdo");
  return <Outlet />;
}
