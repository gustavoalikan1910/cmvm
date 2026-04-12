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
        setMensagem('Protocolo aceito! Redirecionando...');
        setTimeout(() => router.push('/login'), 2500);
      } else {
        setErro(data.error);
      }
    } catch (err) {
      setErro('Erro de conexão ao servidor.');
    }
    setLoading(false);
  };

  if (!token) return (
    <div className="text-center p-8 bento-card">
       <div className="text-red-400 font-bold mb-4 uppercase tracking-widest text-xs">Access Denied</div>
       <p className="text-gray-500 text-sm">Security token missing or invalid.</p>
    </div>
  );

  return (
    <div className="w-full max-w-md p-8 bento-card shadow-2xl relative animate-fade-in-up">
      <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            INITIALIZE KEY
          </h2>
          <p className="text-gray-500 mt-2 text-xs uppercase tracking-widest">
            Define your encryption password
          </p>
      </div>

      {mensagem && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest text-center rounded-2xl">
          {mensagem}
        </div>
      )}
      
      {erro && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest text-center rounded-2xl">
          {erro}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">New Secure Key</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-all text-sm"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" disabled={loading} className={`w-full py-5 text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl transition-all duration-300 ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 hover:scale-[1.01] shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
          {loading ? 'Initializing...' : 'Save Protocol'}
        </button>
      </form>
    </div>
  );
}

export default function DefinirSenha() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Suspense fallback={<div className="text-gray-500 text-[10px] uppercase tracking-widest animate-pulse">Establishing Connection...</div>}>
        <PasswordForm />
      </Suspense>
    </div>
  );
}
