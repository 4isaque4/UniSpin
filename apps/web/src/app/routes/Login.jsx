import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext.jsx";
import "../../styles/auth.css";

// Ícones (SVG inline, sem libs)
function IconEye(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" {...props}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconEyeOff(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" {...props}>
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.8 21.8 0 0 1 5.06-5.94" />
      <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.78 21.78 0 0 1-3.17 4.49" />
      <path d="m1 1 22 22" />
    </svg>
  );
}

async function safeJson(res) {
  try { return await res.clone().json(); } catch { return null; }
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/trilhas";

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const emailRef = useRef(null);
  useEffect(() => { emailRef.current?.focus(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    // Validações rápidas de UX
    if (!emailRegex.test(email)) {
      setErr("Informe um e-mail válido.");
      return;
    }
    if (!password || password.length < 4) {
      setErr("Informe sua senha.");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!r.ok) {
        const data = await safeJson(r);
        // mapeia erros comuns vindos da API, mantém fallback amigável
        const map = {
          invalid_credentials: "E-mail ou senha inválidos.",
          unauthorized: "Sessão inválida. Faça login novamente.",
          rate_limited: "Muitas tentativas. Aguarde um pouco e tente de novo.",
        };
        const msg = map[data?.error] || data?.message || "E-mail ou senha inválidos.";
        setErr(msg);
        return;
      }

      const user = await r.json();
      setUser(user);
      nav(next, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setErr("Falha ao conectar à API. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <div className="auth-card" role="region" aria-labelledby="auth-title">
        <h1 id="auth-title" className="auth-title">Entrar</h1>
        <p className="auth-subtitle">
          Acesse a plataforma da <strong>Spin Engenharia</strong>.
        </p>

        {err && (
          <div className="auth-error" role="alert" aria-live="assertive">
            {err}
          </div>
        )}

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <label className="auth-field">
            <span>E-mail</span>
            <input
              ref={emailRef}
              type="email"
              placeholder="email@spinengenharia.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!err && !emailRegex.test(email)}
              required
              disabled={loading}
            />
          </label>

          <label className="auth-field">
            <span>Senha</span>
            <div className="auth-pass">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="auth-pass-toggle"
                onClick={() => setShowPass((v) => !v)}
                aria-pressed={showPass}
                aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
                title={showPass ? "Ocultar senha" : "Mostrar senha"}
                disabled={loading}
              >
                {showPass ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </label>

          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
            aria-busy={loading ? "true" : "false"}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-muted">
          Esqueceu a senha? Fale com o administrador.
        </p>
      </div>
    </section>
  );
}
