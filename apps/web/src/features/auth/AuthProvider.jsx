import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { AuthCtx } from "./AuthContext.jsx";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    })();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      });

    return () => subscription.unsubscribe();
  }, []);

  const value = { user, session, loading, setUser, setSession };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
