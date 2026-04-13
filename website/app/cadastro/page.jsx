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
        setMensagem('Cadastro iniciado! Verifique a sua caixa de entrada.');
      } else {
        setErro(data.error);
      }
    } catch (err) {
      setErro('Erro de conexão.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-3xl shadow-2xl relative animate-fade-in-up">
        
        <div className="text-center mb-10">
          <a href="/" className="inline-block px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-6">
            ← Voltar ao Início
          </a>
          <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            CRIAR CONTA
          </h2>
          <p className="text-gray-500 mt-2 text-xs uppercase tracking-widest">
            Acessar a infraestrutura de dados
          </p>
        </div>

        {mensagem && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest text-center rounded-2xl animate-pulse">
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
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Usuário</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
              className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-all text-sm"
              placeholder="Ex: data_scout_01"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-all text-sm"
              placeholder="operador@cvmc.data"
            />
          </div>

          <button type="submit" disabled={loading} className={`w-full py-5 text-[11px] uppercase tracking-[0.2em] font-black rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 hover:scale-[1.01] shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-600">
            Já possui conta? <a href="/login" className="text-white font-bold hover:underline decoration-white/30 underline-offset-4">Autenticar-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}
