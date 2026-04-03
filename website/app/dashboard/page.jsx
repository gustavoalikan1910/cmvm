export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h1>Dashboard - Camada Gold</h1>
        <a href="/" className="btn btn-secondary">Sair</a>
      </header>

      <section className="kpis">
        <div className="kpi-card">
          <h3>Total de Partidas (Exemplo)</h3>
          <div className="value">1,245</div>
        </div>
        <div className="kpi-card">
          <h3>Média de Gols (Exemplo)</h3>
          <div className="value">2.4</div>
        </div>
        <div className="kpi-card">
          <h3>Times Cadastrados (Exemplo)</h3>
          <div className="value">42</div>
        </div>
      </section>

      <div className="chart-placeholder">
        {/* Aqui renderizaremos um gráfico do Chart.js ou Recharts futuramente */}
        <p>Aguardando integração com o banco Postgres para plotar gráficos.</p>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 1rem;
        }
        .kpis {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .kpi-card {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid var(--card-border);
          text-align: center;
        }
        .kpi-card h3 {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .kpi-card .value {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--accent-color);
        }
        .chart-placeholder {
          background: rgba(0,0,0,0.2);
          border: 1px dashed var(--text-secondary);
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
