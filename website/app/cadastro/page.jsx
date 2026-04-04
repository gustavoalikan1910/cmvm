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
    <main className="min-h-screen flex items-center justify-center bg-[#050505] text-white selection:bg-gray-500 selection:text-white relative overflow-hidden font-sans">
      {/* Injeção do Tailwind via CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: { sans: ['Inter', 'sans-serif'] },
              animation: { 'fade-in-up': 'fadeInUp 0.8s ease-out forwards' },
              keyframes: {
                fadeInUp: {
                  '0%': { opacity: '0', transform: 'translateY(20px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' },
                }
              }
            }
          }
        }
      `}} />

      {/* Efeitos de Luz no Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-gray-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-gray-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <a href="/" className="inline-block text-gray-400 hover:text-white mb-6 text-sm transition-colors">← Voltar para a Home</a>
          <h2 className="text-3xl font-bold">Criar Conta DaaS</h2>
          <p className="text-gray-400 mt-2 text-sm">Provisione seu acesso à nossa plataforma de dados</p>
        </div>

        {mensagem && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-sm text-center rounded-lg">
            {mensagem}
          </div>
        )}

        {erro && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center rounded-lg">
            {erro}
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
              placeholder="Ex: dev_dados"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">E-mail Corporativo</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <button type="submit" disabled={loading} className={`w-full py-4 font-bold rounded-lg transition-all duration-300 ${loading ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}>
            {loading ? 'Provisionando...' : 'Criar Conta Mestra'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Já tem credenciais criadas? <a href="/login" className="text-white font-medium hover:underline">Entrar no sistema</a>
        </div>
      </div>
    </main>
  );
}
