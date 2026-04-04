'use client';
import { useState } from 'react';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setMensagem('');
    try {
      await fetch('/api/esqueci-senha', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setMensagem('Se o e-mail existir no banco, o link foi gerado e disparado no terminal Nodemailer. Verifique lá!');
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Recuperação DaaS</h2>
        {mensagem && <div className="success-msg" style={{color:'#10b981', marginBottom:'1rem'}}>{mensagem}</div>}
        
        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label>E-mail Cadastrado</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Ex: admin@cvmc.com" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary login-btn">
            {loading ? 'Re-provisionando...' : 'Reenviar Link de Reset'}
          </button>
        </form>
        <div style={{marginTop:'1.5rem', textAlign:'center', fontSize:'0.9rem'}}>
          <a href="/login" style={{color:'var(--text-secondary)'}}>Lembrou sua senha? Voltar</a>
        </div>
      </div>
      <style jsx>{`
        .login-container { display: flex; align-items: center; justify-content: center; height: 100vh; }
        .login-card { background: var(--card-bg); padding: 2.5rem; border-radius: 1rem; border: 1px solid var(--card-border); width: 100%; max-width: 400px; backdrop-filter: blur(10px); }
        .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        input { padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--card-border); background: rgba(0,0,0,0.2); color: white; outline: none; }
        .login-btn { margin-top: 1rem; width: 100%; }
      `}</style>
    </div>
  );
}
