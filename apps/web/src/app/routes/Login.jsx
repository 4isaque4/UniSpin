import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../features/auth/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.message || data?.error || `Erro ${res.status}`;
        throw new Error(msg);
      }

      setUser(data);
      navigate("/videos");
    } catch (err) {
      setError(err.message || "Erro desconhecido no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth-card">
        <h2 className="auth-title">Entrar na UniSpin</h2>
        <p className="auth-subtitle">Acesse sua conta para continuar</p>

        {error && (
          <div className="auth-error">
            <strong>Erro:</strong> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <span>Email</span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu.email@spinengenharia.com.br"
            />
          </div>

          <div className="auth-field">
            <span>Senha</span>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Sua senha"
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading} aria-busy={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link to="/" className="btn secondary">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
