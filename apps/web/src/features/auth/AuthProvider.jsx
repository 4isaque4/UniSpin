import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { AuthCtx } from "./AuthContext.jsx";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      console.log("AuthProvider - verificando sessão inicial...");
      const { data: { session } } = await supabase.auth.getSession();
      console.log("AuthProvider - sessão inicial:", session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      console.log("AuthProvider - estado inicial definido, user:", session?.user ?? null);
    })();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        console.log("AuthProvider - mudança de estado de autenticação:", _event, session);
        setSession(session);
        setUser(session?.user ?? null);
      });

    return () => subscription.unsubscribe();
  }, []);

    const signOut = async () => {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    };

    const value = { user, session, loading: loading, ready: !loading, setUser, setSession, signOut };
    console.log("AuthProvider - valor do contexto:", value);
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
