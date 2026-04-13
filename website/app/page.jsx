import React from 'react';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let isPipelineActive = false;
  let totalEventos = '0';
  let uptime = '0%';
  let latencia = '0ms';

  try {
    const start = performance.now();

    const [pipelineResult, eventosResult, uptimeResult] = await Promise.all([
      pool.query("SELECT state FROM dag_run WHERE dag_id = 'cvmc_pipeline__brasileirao-serie-a__2026' ORDER BY execution_date DESC LIMIT 1"),
      pool.query("SELECT COALESCE(SUM(n_live_tup), 0) AS total_eventos FROM pg_stat_user_tables WHERE schemaname = 'gold'"),
      pool.query("SELECT ROUND(COUNT(CASE WHEN state = 'success' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0), 1) AS uptime FROM dag_run WHERE dag_id = 'cvmc_pipeline__brasileirao-serie-a__2026'")
    ]);

    const end = performance.now();

    if (pipelineResult.rows.length > 0 && pipelineResult.rows[0].state === 'success') {
      isPipelineActive = true;
    }

    if (eventosResult.rows.length > 0) {
      const eventos = parseInt(eventosResult.rows[0].total_eventos, 10);
      if (eventos > 1000000) {
        totalEventos = (eventos / 1000000).toFixed(1) + 'M';
      } else if (eventos > 1000) {
        totalEventos = (eventos / 1000).toFixed(1) + 'K';
      } else {
        totalEventos = eventos.toString();
      }
    }

    if (uptimeResult.rows.length > 0 && uptimeResult.rows[0].uptime !== null) {
      uptime = uptimeResult.rows[0].uptime + '%';
    } else {
      uptime = '100%';
    }

    latencia = '< ' + Math.ceil(end - start) + 'ms';
  } catch (error) {
    console.error('Failed to fetch pipeline status:', error);
  }

  return (
    <main className="min-h-screen relative">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neutral-800/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-pill mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Pipeline em Produção: CMVC v1.0
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <img src="/assets/simbolo_CP.png" alt="Corinthians" className="w-16 h-16 md:w-28 md:h-28 object-contain brightness-0 invert opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            <span className="leading-none text-center">COMO VAI O MEU<br className="hidden md:block" /> CORINTHIANS?</span>
            <img src="/assets/simbolo_CP.png" alt="Corinthians" className="w-16 h-16 md:w-28 md:h-28 object-contain brightness-0 invert opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hidden md:block" />
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Estrutura de dados desenvolvida para mensurar estatísticas do todo poderoso timão. 
            Uma plataforma Medalhão escalável para inteligência esportiva.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/login" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform">
              Acessar banco de dados
            </a>
            <a href="/arquitetura" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
              Explorar Arquitetura
            </a>
          </div>
        </div>

        {/* Stats Header */}
        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto items-center text-center mb-24 pb-12 border-b border-white/5">
           <div>
             <div className="text-4xl md:text-5xl font-bold mb-2">{totalEventos}</div>
             <div className="text-xs uppercase text-gray-500 tracking-tighter">Eventos Processados</div>
           </div>
           <div>
             <div className="text-4xl md:text-5xl font-bold mb-2">{uptime}</div>
             <div className="text-xs uppercase text-gray-500 tracking-tighter">Uptime Pipelines</div>
           </div>
           <div>
             <div className="text-4xl md:text-5xl font-bold mb-2">{latencia}</div>
             <div className="text-xs uppercase text-gray-500 tracking-tighter">Latência Queries</div>
           </div>
        </div>

        {/* Tech Stack Footer */}
        <footer className="mt-32 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h4 className="font-bold text-lg mb-2">⚽ CVMC Intelligence</h4>
            <p className="text-gray-500 text-sm italic">Onde o código encontra o campo.</p>
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">API Status</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </footer>

      </div>
    </main>
  );
}