import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../features/auth/AuthContext.jsx";
import "../../styles/auth.css";

export default function Login() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/trilhas";
  const { setUser, setSession } = useAuth();

  const [email, setEmail]     = useState("");
  const [password, setPass]   = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");

  const emailRef = useRef(null);
  useEffect(() => { emailRef.current?.focus(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErr("E-mail ou senha inválidos.");
        return;
      }
      setSession(data.session);
      setUser(data.user);
      nav(next, { replace: true });
    } catch {
      setErr("Falha ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <div className="auth-card">
        <h1 className="auth-title">Entrar</h1>
        <p className="auth-subtitle">Acesse a plataforma da <strong>Spin Engenharia</strong>.</p>
        {err && <div className="auth-error">{err}</div>}
        <form className="auth-form" onSubmit={onSubmit}>
          <label className="auth-field">
            <span>E-mail</span>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email@spinengenharia.com"
              autoComplete="email"
              required
            />
          </label>
          <label className="auth-field">
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={e => setPass(e.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="auth-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </section>
  );
}
