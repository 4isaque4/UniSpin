import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function GuestRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/trilhas" replace />;
  }

  return children;
}
