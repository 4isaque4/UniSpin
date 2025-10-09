import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Tentando fazer login com:", { email, password });
      console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
      console.log("Supabase Anon Key:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "Configurado" : "Não configurado");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro no login:", error);
        throw error;
      }

      console.log("Login bem-sucedido:", data);
      console.log("Navegando para /videos...");
      navigate("/videos");
    } catch (error) {
      console.error("Erro capturado:", error);
      setError(error.message || "Erro desconhecido no login");
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
              placeholder="seu.email@unispin.com"
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

        <div className="auth-muted">
          <p>Credenciais de teste:</p>
          <p>Email: admin@spinengenharia.com</p>
          <p>Senha: (verificar no banco)</p>
        </div>
      </div>
    </main>
  );
}
