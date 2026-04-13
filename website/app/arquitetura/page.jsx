'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Arquitetura() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    {
      id: 1,
      title: "Orquestração",
      tech: ["Airflow", "Papermill"],
      desc: "O Apache Airflow atua como o orquestrador principal de pipelines, coordenando o fluxo de dados e a execução das tarefas parametrizadas."
    },
    {
      id: 2,
      title: "Ingestão (Scrapers)",
      tech: ["Python", "Jupyter"],
      desc: "Notebooks Jupyter Python buscam dados atualizados de estatísticas esportivas (SofaScore/StatsHub) após cada partida do Brasileirão."
    },
    {
      id: 3,
      title: "Raw (Data Lake)",
      tech: ["Spark", "Delta Lake"],
      desc: "Dados brutos (JSON) são convertidos para o formato Delta Lake na camada Raw com schema evolution (Autoloader)."
    },
    {
      id: 4,
      title: "Silver (Cleansing)",
      tech: ["Spark", "Delta Lake"],
      desc: "Processamento com Apache Spark. Conversão dos dados brutos aninhados para tabelas normalizadas Delta Lake."
    },
    {
      id: 5,
      title: "Gold (Analytics)",
      tech: ["PostgreSQL", "SQL"],
      desc: "O Spark realiza agregações e pivots, criando tabelas OBT (One Big Table) prontas para alta performance no PostgreSQL."
    },
    {
      id: 6,
      title: "Acesso & Visualização",
      tech: ["Next.js", "React"],
      desc: "A aplicação web acessa o PostgreSQL para exibir dashboards rápidos e otimizados sobre o desempenho do Timão."
    }
  ];

  return (
    <main className="min-h-screen relative py-20 px-6 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neutral-800/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center md:text-left"
        >
          <a href="/" className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-all hover:bg-white/10 mb-8">
            ← Voltar ao Início
          </a>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
            Arquitetura de Dados
          </h1>
          <p className="text-zinc-400 mt-6 text-lg md:text-xl max-w-2xl leading-relaxed">
            Visão detalhada do fluxo de processamento de estatísticas do CVMC, desde a coleta até a visualização analítica.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative space-y-24">
          
          {/* Progress Line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800/50 -translate-x-1/2 overflow-hidden">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-white to-transparent origin-top"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
            >
              {/* Point Indicator */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] text-white font-bold z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-500">
                {step.id}
              </div>

              {/* Card */}
              <motion.div 
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{step.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                  {step.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.tech.map(t => (
                    <span key={t} className="text-[10px] font-mono uppercase tracking-widest bg-zinc-900 border border-white/10 px-3 py-1 rounded-lg text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}

        </div>

        {/* Closing Label */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 pt-20 text-center border-t border-white/5"
        >
          <div className="inline-block px-4 py-2 bg-zinc-900 rounded-2xl border border-white/5 text-zinc-500 text-xs font-mono">
             PIPELINE STABLE - PRODUCTION READY V2.0
          </div>
        </motion.div>
      </div>
    </main>
  );
}