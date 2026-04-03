export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <div className="badge">⚽ Analytics & Engenharia Esportiva</div>
        <h1>CVMC Data Platform</h1>
        <p>A inteligência e o detalhe por trás do esporte de alto rendimento. Processamento de dados e estatísticas do mundo do futebol ponta a ponta.</p>
        <div className="actions">
          <a href="/login" className="btn btn-primary">Entrar no Vestiário (Dashboard)</a>
          <a href="#arquitetura" className="btn btn-secondary">Ver Esquema Tático</a>
        </div>
      </header>

      <section id="arquitetura" className="architecture-section">
        <h2>Nosso Esquema Tático (Arquitetura)</h2>
        <div className="cards">
          <div className="card">
            <div className="card-icon">1</div>
            <h3>Olheiros (Coleta)</h3>
            <p>Jupyter Notebooks atuando como Scrapers, extraindo dados valiosos de desempenho e mercado de ligas pelo mundo.</p>
          </div>
          <div className="card">
            <div className="card-icon">2</div>
            <h3>Centro de Tratamento</h3>
            <p>O Data Lake. Camadas Landing, Raw e Silver armazenadas no MinIO refinando as estatísticas puras.</p>
          </div>
          <div className="card">
            <div className="card-icon">3</div>
            <h3>Camada de Elite (Gold)</h3>
            <p>Dados consolidados e servidos pelo PostgreSQL prontos para o cruzamento de KPIs e tomada de decisão.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
