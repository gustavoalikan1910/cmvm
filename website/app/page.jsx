export default function Home() {
  return (
    <><main className="container">
      <header className="hero">
        <div className="badge">⚽ Engenharia e Análise Esportiva</div>
        <h1>SOCCER DATA PLATFORM</h1>
        <p>A inteligência e o detalhe por trás do esporte de alto rendimento. Processamento de dados e estatísticas do mundo do futebol ponta a ponta.</p>
        <div className="actions" style={{ flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Crie sua conta gratuitamente para ter acesso ao database</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/cadastro" className="btn btn-primary">Criar Conta</a>
            <a href="/login" className="btn btn-secondary">Entrar no Sistema</a>
          </div>
        </div>
      </header>


      <section id="arquitetura" className="architecture-section">
        <h2>Fluxograma do Processo</h2>
        <div className="flowchart">

          <div className="flow-step">
            <div className="icon">🕸️</div>
            <h3>1. Coleta (Scraping)</h3>
            <p>Jupyter Notebooks atuam na web como olheiros, buscando estatísticas de ligas em tempo real.</p>
          </div>

          <div className="flow-arrow">⬇️</div>

          <div className="flow-step">
            <div className="icon">🪣</div>
            <h3>2. Landing Layer</h3>
            <p>Os dados brutos chegam sem tratamento no Data Lake em MinIO.</p>
          </div>

          <div className="flow-arrow">⬇️</div>

          <div className="flow-step">
            <div className="icon">⚙️</div>
            <h3>3. Silver Layer</h3>
            <p>Os dados são limpos e consolidados em tabelas estruturadas (disponível via PostgreSQL).</p>
          </div>

          <div className="flow-arrow">⬇️</div>

          <div className="flow-step highlight-step">
            <div className="icon">🏆</div>
            <h3>4. Gold Layer (Serviço)</h3>
            <p>O PostgreSQL expõe a camada analítica perfeitamente pronta para o seu negócio!</p>
          </div>

        </div>
      </section>
    </main>

    <footer className="glass-footer">
      <div className="footer-content">
        <div className="footer-brand">⚽ CVMC Data Platform</div>
        <div className="footer-desc">
          Engenharia de Dados em alta performance, construído com ferramentas de ponta para análise tática e gerencial no esporte.
        </div>
        
        <div className="footer-links">
          <a href="https://wa.me/5511992001821" target="_blank" rel="noopener noreferrer" className="footer-link">
            📱 WhatsApp
          </a>
          <a href="https://www.linkedin.com/in/gustavo-alikan-465967b6/" target="_blank" rel="noopener noreferrer" className="footer-link">
            🔗 LinkedIn
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Gustavo Alikan. Todos os direitos reservados.
      </div>
    </footer>
    </>
  );
}
