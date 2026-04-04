'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PasswordForm() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErro(''); setMensagem('');
    try {
      const res = await fetch('/api/setup-senha', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMensagem('Tudo certo! Redirecionando a página...');
        setTimeout(() => router.push('/login'), 2500);
      } else {
        setErro(data.error);
      }
    } catch (err) {
      setErro('Erro de conexão ao ativar banco.');
    }
    setLoading(false);
  };

  if (!token) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Link inválido: Token ausente na URL.</div>;

  return (
    <div className="login-card">
      <h2>Definir Nova Senha de Banco</h2>
      {mensagem && <div className="success-msg" style={{ color: '#10b981', marginBottom: '1rem' }}>{mensagem}</div>}
      {erro && <div className="error-msg">{erro}</div>}

      <form onSubmit={submit} className="login-form">
        <div className="form-group">
          <label>Nova Senha (Segura)</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary login-btn">
          {loading ? 'Executando script no servidor...' : 'Redefinir Senha'}
        </button>
      </form>
    </div>
  );
}

export default function DefinirSenha() {
  return (
    <div className="login-container">
      <Suspense fallback={<div>Carregando link dinâmico...</div>}>
        <PasswordForm />
      </Suspense>
      <style jsx>{`
        .login-container { display: flex; align-items: center; justify-content: center; height: 100vh; }
        .login-card { background: var(--card-bg); padding: 2.5rem; border-radius: 1rem; border: 1px solid var(--card-border); width: 100%; max-width: 400px; backdrop-filter: blur(10px); }
        .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        input { padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--card-border); background: rgba(0,0,0,0.2); color: white; outline: none; }
        .login-btn { margin-top: 1rem; width: 100%; }
        .error-msg { color: #ef4444; font-size: 0.875rem; text-align: center; }
      `}</style>
    </div>
  );
}
