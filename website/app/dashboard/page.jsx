import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const cookieStore = cookies();
  const session = cookieStore.get('cvmc_session');
  
  if (!session) {
    redirect('/login');
  }

  const user = session ? JSON.parse(Buffer.from(session.value, 'base64').toString('utf8')) : null;
  const db_user = user?.nome.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'undefined';

  return (
    <div className="container" style={{paddingTop: '3rem'}}>
      <header style={{display: 'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'3rem'}}>
        <h2>Painel Analítico CVMC</h2>
        <a href="/login" className="btn btn-secondary">Logout</a>
      </header>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
        
        {/* KPI Mocks */}
        <div className="card">
          <h3 style={{color:'var(--text-secondary)'}}>Partidas Analisadas</h3>
          <p style={{fontSize: '3rem', fontWeight: 'bold'}}>1,425</p>
        </div>
        <div className="card">
          <h3 style={{color:'var(--text-secondary)'}}>Times Ativos</h3>
          <p style={{fontSize: '3rem', fontWeight: 'bold'}}>86</p>
        </div>

        {/* Credenciais Postgres */}
        <div className="card" style={{gridColumn: '1 / -1', borderLeft: '4px solid #10b981'}}>
          <h3 style={{marginBottom:'1rem'}}>🔐 Credenciais de Acesso Direto (PostgreSQL)</h3>
          <p style={{color:'var(--text-secondary)', marginBottom: '1.5rem'}}>
            Seu usuário possui acesso programático garantido com regra `GRANT SELECT` nas camadas DaaS do projeto. 
            Utilize qualquer ferramenta (DBeaver, DataGrip, Python/Pandas) conectando-se com os dados abaixo:
          </p>
          <div style={{background:'rgba(0,0,0,0.5)', padding:'1.5rem', borderRadius:'0.5rem', fontFamily:'monospace', display:'grid', gap:'0.5rem', fontSize:'1.1rem'}}>
            <div><span style={{color:'var(--text-secondary)'}}>Host:</span> localhost</div>
            <div><span style={{color:'var(--text-secondary)'}}>Porta:</span> 5432</div>
            <div><span style={{color:'var(--text-secondary)'}}>Database:</span> airflow</div>
            <div><span style={{color:'var(--text-secondary)'}}>Schemas de Leitura:</span> silver, gold</div>
            <div style={{marginTop:'1rem', color:'#10b981'}}><strong>Usuário:</strong> {db_user}</div>
            <div style={{color:'#10b981'}}><strong>Senha:</strong> ******** (Sua senha web definida)</div>
          </div>
        </div>

      </div>
    </div>
  );
}
