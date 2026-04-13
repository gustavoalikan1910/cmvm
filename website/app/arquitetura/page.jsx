import React from 'react';

export default function Arquitetura() {
  return (
    <main className="min-h-screen relative py-20 px-6">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neutral-800/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-12">
          <a href="/" className="inline-block px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-6">
            ← Voltar ao Início
          </a>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Arquitetura de Dados
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Visão detalhada do fluxo de processamento de estatísticas do CVMC, desde a coleta até a visualização analítica.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-black font-bold z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              1
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Ingestão (Scrapers)</h3>
              <p className="text-gray-400 text-sm mb-4">
                Notebooks Jupyter Python buscam dados atualizados de estatísticas esportivas (SofaScore/StatsHub) após cada partida do Brasileirão.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">Python</span>
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">Jupyter</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-black font-bold z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              2
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Orquestração & Landing</h3>
              <p className="text-gray-400 text-sm mb-4">
                O Apache Airflow coordena o fluxo, executando as tarefas parametrizadas com Papermill. O dado JSON bruto cai diretamente no Data Lake (MinIO).
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">Airflow</span>
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">MinIO (S3)</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-black font-bold z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              3
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Raw (Data Lake)</h3>
              <p className="text-gray-400 text-sm mb-4">
                Dados brutos (JSON) são convertidos para o formato Delta Lake na camada Raw com schema evolution (Autoloader), preservando o histórico integral.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">Spark</span>
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">Delta Lake</span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-black font-bold z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              4
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Silver (Cleansing)</h3>
              <p className="text-gray-400 text-sm mb-4">
                Processamento com Apache Spark. Conversão dos dados brutos aninhados para tabelas normalizadas Delta Lake. Deduplicação e tratamento inicial de colunas.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">Spark</span>
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">Delta Lake</span>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-black font-bold z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              5
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Gold (Analytics)</h3>
              <p className="text-gray-400 text-sm mb-4">
                O Spark lê a camada Silver, realiza agregações e pivots, criando tabelas OBT (One Big Table) prontas para alta performance. Os dados finais são escritos no PostgreSQL.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">PostgreSQL</span>
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">SQL</span>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-black font-bold z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              6
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Acesso & Visualização</h3>
              <p className="text-gray-400 text-sm mb-4">
                A aplicação web (Next.js) acessa diretamente as tabelas do PostgreSQL para exibir dashboards rápidos e otimizados sobre o desempenho do Timão.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">Next.js</span>
                <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">React</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}