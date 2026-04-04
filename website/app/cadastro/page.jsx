'use client';
import { useState } from 'react';

export default function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErro(''); setMensagem('');
    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
      });
      const data = await res.json();
      if (res.ok) {
        setMensagem('Cadastro iniciado! Verifique a sua caixa de entrada real (ou o Anti-Spam) para o e-mail oficial.');
      } else {
        setErro(data.error);
      }
    } catch (err) {
      setErro('Erro de conexão.');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Criar Conta DaaS CVMC</h2>
        {mensagem && <div className="success-msg" style={{ color: '#10b981', marginBottom: '1rem' }}>{mensagem}</div>}
        {erro && <div className="error-msg">{erro}</div>}

        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Ex: dev_dados" />
          </div>
          <div className="form-group">
            <label>E-mail Corporativo</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seu@email.com" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary login-btn">
            {loading ? 'Provisionando...' : 'Criar Conta Mestra'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <a href="/login" style={{ color: 'var(--text-secondary)' }}>Já tem credenciais criadas? Entrar no sistema</a>
        </div>
      </div>
      <style jsx>{`
        .login-container { display: flex; align-items: center; justify-content: center; height: 100vh; }
        .login-card { background: var(--card-bg); padding: 2.5rem; border-radius: 1rem; border: 1px solid var(--card-border); width: 100%; max-width: 400px; backdrop-filter: blur(10px); }
        .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        input { padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--card-border); background: rgba(0,0,0,0.2); color: white; outline: none; }
        input:focus { border-color: var(--accent-color); }
        .login-btn { margin-top: 1rem; width: 100%; }
        .error-msg { color: #ef4444; font-size: 0.875rem; text-align: center; }
      `}</style>
    </div>
  );
}
