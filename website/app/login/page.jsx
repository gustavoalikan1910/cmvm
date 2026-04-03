'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Aqui vai entrar a request POST real para a rota de API do Next.js depois!
    // Para efeito de protótipo de UI visual rápida:
    if (email === 'admin@cvmc.com' && password === 'admin123') {
      router.push('/dashboard');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Acesso ao Dashboard</h2>
        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-msg">{error}</div>}
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary login-btn">Entrar</button>
        </form>
      </div>
      <style jsx>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .login-card {
          background: var(--card-bg);
          padding: 2.5rem;
          border-radius: 1rem;
          border: 1px solid var(--card-border);
          width: 100%;
          max-width: 400px;
          backdrop-filter: blur(10px);
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        input {
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid var(--card-border);
          background: rgba(0,0,0,0.2);
          color: white;
          outline: none;
        }
        input:focus {
          border-color: var(--accent-color);
        }
        .login-btn {
          margin-top: 1rem;
          width: 100%;
        }
        .error-msg {
          color: #ef4444;
          font-size: 0.875rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
