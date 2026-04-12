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
      setMensagem('Se o e-mail estiver cadastrado, enviamos o protocolo de recuperação.');
    } catch (err) {
      setMensagem('Erro de conexão ao servidor.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 bento-card shadow-2xl relative animate-fade-in-up">
        <div className="text-center mb-10">
          <a href="/login" className="inline-block px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-6">
            ← Back to Auth
          </a>
          <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            RECOVER KEY
          </h2>
          <p className="text-gray-500 mt-2 text-xs uppercase tracking-widest">
            Credential Reset Protocol
          </p>
        </div>

        {mensagem && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest text-center rounded-2xl">
            {mensagem}
          </div>
        )}
        
        <form onSubmit={submit} className="space-y-6">
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
          <button type="submit" disabled={loading} className={`w-full py-5 text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl transition-all duration-300 ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 hover:scale-[1.01] shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
            {loading ? 'Processing...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
