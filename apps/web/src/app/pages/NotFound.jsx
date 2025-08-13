import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="features">
      <div className="container">
        <h2>Página não encontrada</h2>
        <p className="lead">O link que você acessou pode ter mudado ou não existe.</p>
        <Link to="/" className="btn" style={{ marginTop: 12 }}>Voltar ao início</Link>
      </div>
    </main>
  );
}
