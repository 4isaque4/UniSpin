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
      <div className="container">
        <div className="authCard">
          <h2>Entrar na UniSpin</h2>
          
          {error && (
            <div className="error" style={{ color: "#ff6b6b", marginBottom: "16px", padding: "12px", background: "rgba(255,107,107,0.1)", borderRadius: "8px" }}>
              <strong>Erro:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu.email@unispin.com"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Sua senha"
              />
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Link to="/" className="btn secondary">
              Voltar ao início
            </Link>
          </div>

          <div style={{ marginTop: "16px", fontSize: "12px", color: "#666", textAlign: "center" }}>
            <p>Credenciais de teste:</p>
            <p>Email: admin@spinengenharia.com</p>
            <p>Senha: (verificar no banco)</p>
          </div>
        </div>
      </div>
    </main>
  );
}
