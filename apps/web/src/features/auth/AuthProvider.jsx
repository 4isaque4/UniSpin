import { useEffect, useState } from "react";
import { AuthCtx } from "./AuthContext.jsx";


export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, { credentials: "include" })
      .then(r => (r.ok ? r.json() : null))
      .then(setUser)
      .finally(() => setReady(true));
  }, []);

  return (
    <AuthCtx.Provider value={{ user, setUser, ready }}>
      {children}
    </AuthCtx.Provider>
  );
}
