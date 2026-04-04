export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-gray-500 selection:text-white relative overflow-hidden font-sans">
      {/* Injeção do Tailwind via CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
              },
              animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'bounce-slow': 'bounceSlow 3s infinite',
              },
              keyframes: {
                fadeInUp: {
                  '0%': { opacity: '0', transform: 'translateY(20px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                bounceSlow: {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(10px)' },
                }
              }
            }
          }
        }
      `}} />

      {/* Efeitos de Luz no Fundo (Ambient Glows) - Tons de cinza/branco sutil */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-gray-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-gray-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <header className="pt-32 pb-24 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm font-medium text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-300"></span>
            </span>
            Engenharia e Análise Esportiva
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-600">
            SOCCER DATA PLATFORM
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A inteligência e o detalhe por trás do esporte de alto rendimento. Processamento de dados e estatísticas do mundo do futebol ponta a ponta.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/cadastro" className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Criar Conta Gratuita
              <span className="absolute inset-0 rounded-lg ring-2 ring-white/50 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
            <a href="/login" className="px-8 py-4 bg-white/5 text-white font-bold rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Entrar no Sistema
            </a>
          </div>
        </header>

        {/* Fluxograma Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Arquitetura de Dados</h2>
            <p className="text-gray-400">Como transformamos dados brutos em inteligência tática</p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
            
            {/* Step 1 */}
            <div className="w-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-lg hover:border-white/30 transition-all hover:bg-white/10 group">
              <div className="flex items-center gap-6">
                <div className="text-4xl bg-white/10 p-4 rounded-xl group-hover:scale-110 transition-transform">🕸️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">1. Coleta (Scraping)</h3>
                  <p className="text-gray-400">Jupyter Notebooks atuam na web como olheiros, buscando estatísticas de ligas em tempo real.</p>
                </div>
              </div>
            </div>

            <div className="text-3xl text-gray-600 animate-bounce-slow">↓</div>

            {/* Step 2 */}
            <div className="w-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-lg hover:border-white/30 transition-all hover:bg-white/10 group">
              <div className="flex items-center gap-6">
                <div className="text-4xl bg-white/10 p-4 rounded-xl group-hover:scale-110 transition-transform">🪣</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">2. Landing Layer</h3>
                  <p className="text-gray-400">Os dados brutos chegam sem tratamento no Data Lake em MinIO.</p>
                </div>
              </div>
            </div>

            <div className="text-3xl text-gray-600 animate-bounce-slow">↓</div>

            {/* Step 3 */}
            <div className="w-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-lg hover:border-white/30 transition-all hover:bg-white/10 group">
              <div className="flex items-center gap-6">
                <div className="text-4xl bg-white/10 p-4 rounded-xl group-hover:scale-110 transition-transform">⚙️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">3. Silver Layer</h3>
                  <p className="text-gray-400">Os dados são limpos e consolidados em tabelas estruturadas via PostgreSQL.</p>
                </div>
              </div>
            </div>

            <div className="text-3xl text-gray-600 animate-bounce-slow">↓</div>

            {/* Step 4 (Highlight) - Alterado para tema cinza e borda branca */}
            <div className="w-full bg-gray-500/10 border border-gray-500/40 p-8 rounded-2xl backdrop-blur-lg hover:bg-gray-500/20 hover:border-gray-400 transition-all group relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              {/* Highlight Glow inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-400/20 blur-3xl rounded-full"></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="text-4xl bg-white/10 text-white p-4 rounded-xl group-hover:scale-110 transition-transform">🏆</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">4. Gold Layer (Serviço)</h3>
                  <p className="text-gray-300">O PostgreSQL expõe a camada analítica perfeitamente pronta para o seu negócio e tomada de decisão.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl relative z-10 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-2">⚽ CVMC Data Platform</h4>
            <p className="text-gray-500 text-sm max-w-sm">
              Engenharia de Dados em alta performance, construído com ferramentas de ponta para análise tática no esporte.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a href="https://wa.me/5511992001821" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm text-gray-300">
              📱 WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/gustavo-alikan-465967b6/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm text-gray-300">
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
