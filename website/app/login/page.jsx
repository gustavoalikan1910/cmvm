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
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Falha na autenticação.');
      }
    } catch (err) {
      setError('Falha de conexão com o servidor.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-3xl shadow-2xl relative animate-fade-in-up">
        
        <div className="text-center mb-10">
          <a href="/" className="inline-block px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-6">
            ← Back to Terminal
          </a>
          <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            RESTRICTED ACCESS
          </h2>
          <p className="text-gray-500 mt-2 text-xs uppercase tracking-widest">
            Identity verification required
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest text-center rounded-2xl">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Secure Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-all text-sm"
              placeholder="operator@cvmc.data"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Access Key</label>
              <a href="/esqueci-senha" className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Recover?</a>
            </div>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full py-5 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-gray-200 transition-all duration-300 hover:scale-[1.01] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Authenticate
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-600">
            No credentials? <a href="/cadastro" className="text-white font-bold hover:underline decoration-white/30 underline-offset-4">Provision Account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
