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
          <h2 className="text-3xl font-bold">Acesso ao Dashboard</h2>
          <p className="text-gray-400 mt-2 text-sm">Insira suas credenciais para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center rounded-lg">{error}</div>}
          
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

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">Senha</label>
              <a href="/esqueci-senha" className="text-xs text-gray-400 hover:text-white transition-colors">Esqueceu a senha?</a>
            </div>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Entrar de Forma Segura
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Não tem uma conta? <a href="/cadastro" className="text-white font-medium hover:underline">Criar conta</a>
        </div>
      </div>
    </main>
  );
}
