import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";
import { AuthCtx } from "./AuthContext.jsx";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch("/auth/me");
        if (!cancelled) {
          if (res.ok) {
            const me = await res.json();
            setUser(me);
          } else {
            setUser(null);
          }
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    session: user ? { user } : null,
    loading,
    ready: !loading,
    setUser,
    setSession: () => {},
    logout,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
