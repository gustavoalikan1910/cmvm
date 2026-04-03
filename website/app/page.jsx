export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <h1>CVMC Data Platform</h1>
        <p>Plataforma de Engenharia de Dados para Coleta e Processamento de Dados de Futebol.</p>
        <div className="actions">
          <a href="/login" className="btn btn-primary">Acessar Dashboard</a>
          <a href="#arquitetura" className="btn btn-secondary">Ver Arquitetura</a>
        </div>
      </header>

      <section id="arquitetura" className="architecture-section">
        <h2>Arquitetura do Projeto</h2>
        <div className="cards">
          <div className="card">
            <h3>1. Coleta</h3>
            <p>Jupyter Notebooks atuando como Scrapers, extraindo dados de fontes externas (HTML/APIs).</p>
          </div>
          <div className="card">
            <h3>2. Data Lake</h3>
            <p>Camadas Landing, Raw e Silver armazenadas localmente no MinIO (S3-compatible) em formato Delta Lake.</p>
          </div>
          <div className="card">
            <h3>3. Gold & Serving</h3>
            <p>Camada agregada Gold servida via PostgreSQL para consumo neste Dashboard e outras ferramentas.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
