import React from 'react';
import pool from '@/lib/db';
import { 
  AnimatedNumber, 
  MagneticButton, 
  ParallaxBackground, 
  FadeInContainer, 
  FadeInItem 
} from '@/components/HomeAnimations';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let totalEventos = '0';
  let uptime = '0%';
  let latencia = '0ms';

  try {
    const start = performance.now();

    const [eventosResult, uptimeResult] = await Promise.all([
      pool.query("SELECT COALESCE(SUM(n_live_tup), 0) AS total_eventos FROM pg_stat_user_tables WHERE schemaname = 'gold'"),
      pool.query("SELECT ROUND(COUNT(CASE WHEN state = 'success' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0), 1) AS uptime FROM dag_run WHERE dag_id = 'cvmc_pipeline__brasileirao-serie-a__2026'")
    ]);

    const end = performance.now();

    if (eventosResult.rows.length > 0) {
      const eventos = parseInt(eventosResult.rows[0].total_eventos, 10);
      if (eventos > 1000000) totalEventos = (eventos / 1000000).toFixed(1) + 'M';
      else if (eventos > 1000) totalEventos = (eventos / 1000).toFixed(1) + 'K';
      else totalEventos = eventos.toString();
    }

    if (uptimeResult.rows.length > 0 && uptimeResult.rows[0].uptime !== null) {
      uptime = uptimeResult.rows[0].uptime + '%';
    } else {
      uptime = '100%';
    }

    latencia = Math.ceil(end - start) + 'ms';
  } catch (error) {
    console.error('Failed to fetch real stats:', error);
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050505]">
      <ParallaxBackground />

      {/* Logo Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-6">
        <a href="/" className="inline-block group">
          <img
            src="/assets/kuririn_logo.png"
            alt="Kuririn Logo"
            className="h-24 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg mix-blend-screen"
          />
        </a>
      </header>

      <FadeInContainer>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <FadeInItem className="inline-flex items-center gap-2 glass-pill mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Pipeline v2.0 Production Ready
            </FadeInItem>
            
            <FadeInItem className="text-6xl md:text-9xl font-black tracking-tighter mb-10 bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
              <img 
                src="/assets/simbolo_CP.png" 
                alt="Corinthians" 
                className="w-20 h-20 md:w-32 md:h-32 object-contain brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
              />
              <span className="leading-[0.85] text-center uppercase">COMO VAI O MEU<br className="hidden md:block" /> CORINTHIANS?</span>
              <img 
                src="/assets/simbolo_CP.png" 
                alt="Corinthians" 
                className="w-20 h-20 md:w-32 md:h-32 object-contain brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] hidden md:block" 
              />
            </FadeInItem>
            
            <FadeInItem className="text-zinc-500 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-16 font-light italic">
              "Estatísticas reais para o bando de loucos."
            </FadeInItem>

            <FadeInItem className="flex flex-wrap justify-center gap-6">
              <MagneticButton 
                href="/login" 
                className="px-10 py-5 bg-white text-black font-black rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-shadow duration-500 text-lg uppercase tracking-tight"
              >
                Acessar banco de dados
              </MagneticButton>
              <a href="/arquitetura" className="px-10 py-5 bg-zinc-900/50 border border-white/10 text-white font-bold rounded-full hover:bg-zinc-800 transition-all text-lg uppercase tracking-tight backdrop-blur-sm">
                Explorar Arquitetura
              </a>
            </FadeInItem>
          </div>

          {/* Stats Header */}
          <FadeInItem className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto items-center text-center mt-32 mb-32 pb-16 border-b border-white/5">
             <div className="group cursor-default">
               <div className="text-6xl md:text-7xl font-black mb-3 tabular-nums group-hover:text-zinc-300 transition-colors">
                 <AnimatedNumber value={totalEventos} />
               </div>
               <div className="text-xs uppercase text-zinc-600 tracking-[0.3em] font-bold">Eventos Processados</div>
             </div>
             <div className="group cursor-default">
               <div className="text-6xl md:text-7xl font-black mb-3 tabular-nums group-hover:text-zinc-300 transition-colors">
                 <AnimatedNumber value={uptime} />
               </div>
               <div className="text-xs uppercase text-zinc-600 tracking-[0.3em] font-bold">Uptime Pipelines</div>
             </div>
             <div className="group cursor-default">
               <div className="text-6xl md:text-7xl font-black mb-3 tabular-nums group-hover:text-zinc-300 transition-colors">
                 <AnimatedNumber value={latencia} />
               </div>
               <div className="text-xs uppercase text-zinc-600 tracking-[0.3em] font-bold">Latência Queries</div>
             </div>
          </FadeInItem>

          {/* Minimal Footer */}
          <footer className="mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-10 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-black">CP</div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase">CVMC Intelligence</h4>
                <p className="text-[10px] text-zinc-500 italic">Data Science for Corinthians</p>
              </div>
            </div>
            <div className="flex gap-8 text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Oracle Cloud</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </footer>

        </div>
      </FadeInContainer>
    </main>
  );
}
