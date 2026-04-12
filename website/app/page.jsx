import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 glass-pill mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Production Ready: Data Pipeline v2.4
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent flex flex-col md:flex-row items-center justify-center gap-4">
            <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-32 md:h-32 fill-white opacity-80" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
              <path d="M45.5 25.5v15.9h-5.7v-15.9h-8.5v28.4c0 4.7 3.8 8.5 8.5 8.5h5.7c4.7 0 8.5-3.8 8.5-8.5v-28.4h-8.5zm17.1 0v42.6h8.5v-15.9h5.7c4.7 0 8.5-3.8 8.5-8.5v-9.7c0-4.7-3.8-8.5-8.5-8.5h-14.2zm8.5 8.5h5.7v11.4h-5.7v-11.4z"/>
            </svg>
            <span>COMO VAI O MEU<br className="hidden md:block" /> CORINTHIANS?</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Estrutura de dados desenvolvida para mensurar estatísticas do todo poderoso timão. 
            Uma plataforma Medalhão escalável para inteligência esportiva.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/login" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform">
              Acessar Dashboard
            </a>
            <a href="#architecture" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
              Explorar Arquitetura
            </a>
          </div>
        </div>

        {/* Bento Grid Architecture */}
        <section id="architecture" className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
          
          {/* Card 1: Ingestion (Large) */}
          <div className="md:col-span-8 bento-card group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">01. Ingestão Distribuída</h3>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Active</div>
            </div>
            <p className="text-gray-400 max-w-md mb-8">
              Notebooks Jupyter orquestrados pelo Airflow que realizam o scraping simultâneos, injetando dados brutos na Landing Layer (MinIO).
            </p>
            <div className="flex gap-3">
              {['Python', 'Spark', 'Jupyter', 'Airflow'].map(tech => (
                <span key={tech} className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">{tech}</span>
              ))}
            </div>
            {/* Fake Code Preview */}
            <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-black/40 border-l border-t border-white/10 rounded-tl-2xl p-4 translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 hidden md:block">
               <pre className="text-[10px] text-emerald-500/50 font-mono">
                {`def fetch_match_data(match_id):
  raw_data = scraper.get(match_id)
  s3.put_object(
    Bucket='landing',
    Key=f'raw_{match_id}.json',
    Body=raw_data
  )`}
               </pre>
            </div>
          </div>

          {/* Card 2: Silver Layer (Small) */}
          <div className="md:col-span-4 bento-card border-emerald-500/20">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold mb-2">Silver Layer</h3>
            <p className="text-sm text-gray-500">
              Tratamento de schema, deduplicação e normalização SQL pura. 
              Garantia de integridade para análise.
            </p>
          </div>

          {/* Card 3: Database Tech (Medium) */}
          <div className="md:col-span-4 bento-card">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Core Engine</h3>
                <p className="text-sm text-gray-500 italic">PostgreSQL (Camada Gold)</p>
              </div>
              <div className="text-6xl font-black text-white/5 select-none self-end">SQL</div>
            </div>
          </div>

          {/* Card 4: Stats (Large) */}
          <div className="md:col-span-8 bento-card bg-gradient-to-br from-white/[0.05] to-transparent">
             <div className="grid grid-cols-3 gap-8 h-full items-center text-center">
                <div>
                  <div className="text-4xl font-bold mb-1">2.4M</div>
                  <div className="text-[10px] uppercase text-gray-500 tracking-tighter">Eventos Processados</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">99.8%</div>
                  <div className="text-[10px] uppercase text-gray-500 tracking-tighter">Uptime Pipelines</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">&lt; 2s</div>
                  <div className="text-[10px] uppercase text-gray-500 tracking-tighter">Latência Queries</div>
                </div>
             </div>
          </div>

        </section>

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
