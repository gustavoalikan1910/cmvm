'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AnimatedNumber, 
  TiltCard, 
  BorderBeam, 
  TextScramble, 
  ParallaxBackground,
  FadeInContainer,
  FadeInItem
} from './HomeAnimations';

export default function DashboardContent({ db_user, matchesCount, teamsCount }) {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050505]">
      <ParallaxBackground />
      
      <FadeInContainer>
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative z-10">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
            <div>
              <FadeInItem className="glass-pill mb-4 w-fit px-4 py-1 border-white/10 bg-white/5 text-zinc-400 font-mono text-[10px] uppercase">
                Sessão Ativa: <span className="text-white font-bold">{db_user}</span>
              </FadeInItem>
              <FadeInItem className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent uppercase">
                <TextScramble text="PAINEL DO OPERADOR" />
              </FadeInItem>
              <FadeInItem className="text-zinc-500 mt-2 text-[10px] uppercase tracking-[0.3em] font-bold">
                Acesso a Dados & Centro de Integridade
              </FadeInItem>
            </div>
            <FadeInItem>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                href="/login" 
                className="px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] uppercase tracking-widest font-black rounded-2xl transition-colors"
              >
                Encerrar Sessão
              </motion.a>
            </FadeInItem>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* KPI 1 */}
            <FadeInItem className="md:col-span-4">
              <TiltCard className="bento-card min-h-[180px] flex flex-col justify-between group overflow-hidden">
                
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold relative z-10">QTD TOTAL DE PARTIDAS</div>
                <div className="text-6xl font-black text-white relative z-10 tabular-nums">
                  <AnimatedNumber value={matchesCount} />
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 1.5, delay: 0.5 }}
                     className="h-full bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                   />
                </div>
              </TiltCard>
            </FadeInItem>

            {/* KPI 2 */}
            <FadeInItem className="md:col-span-4">
              <TiltCard className="bento-card min-h-[180px] flex flex-col justify-between group overflow-hidden">
                
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold relative z-10">QTD TOTAL DE EQUIPES</div>
                <div className="text-6xl font-black text-white relative z-10 tabular-nums">
                  <AnimatedNumber value={teamsCount} />
                </div>
                <div className="text-[10px] text-zinc-600 uppercase tracking-tighter relative z-10">Cruzamento de dados entre ligas</div>
              </TiltCard>
            </FadeInItem>

            {/* KPI 3 (Status) */}
            <FadeInItem className="md:col-span-4">
              <TiltCard className="bento-card min-h-[180px] flex flex-col justify-between bg-white/[0.01] border-white/20 overflow-hidden">
                
                <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold relative z-10">DaaS Status</div>
                <div className="text-3xl font-black text-white flex items-center gap-3 relative z-10">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                  OPERACIONAL
                </div>
                <div className="flex gap-1.5 relative z-10">
                   {[...Array(6)].map((_, i) => (
                     <motion.div 
                       key={i} 
                       animate={{ height: [8, 16, 8] }}
                       transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                       className="h-4 w-1.5 bg-white/20 rounded-full"
                     />
                   ))}
                </div>
              </TiltCard>
            </FadeInItem>

            {/* PostgreSQL Direct Access (Large) */}
            <FadeInItem className="md:col-span-12">
              <div className="bento-card h-auto py-12 border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden">
                
                <div className="max-w-3xl relative z-10">
                  <h3 className="text-2xl font-black tracking-tighter mb-4 italic text-white flex items-center gap-3 uppercase">
                    <span className="p-2 bg-white/5 rounded-lg border border-white/10">🔐</span>
                    Credenciais de Acesso ao Postgres
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-10">
                    Suas credenciais estão sincronizadas com nosso motor principal PostgreSQL. 
                    Utilize qualquer cliente compatível com DaaS para executar consultas diretamente contra 
                    as camadas <span className="text-white font-bold underline decoration-white/20">Silver</span> e <span className="text-white font-bold underline decoration-white/20">Gold</span>.
                  </p>
                  
                  <div className="bg-black/60 border border-white/10 rounded-3xl p-8 font-mono text-sm relative overflow-hidden group hover:border-white/30 transition-all duration-700">
                     <div className="space-y-5 relative z-10">
                        {[
                          { label: 'HOSTNAME', value: '163.176.241.242', color: 'text-white' },
                          { label: 'PORT', value: '5432', color: 'text-zinc-400' },
                          { label: 'USERNAME', value: db_user, color: 'text-white font-bold' },
                          { label: 'DATABASE', value: 'cvmc_data', color: 'text-zinc-400' },
                          { label: 'PASSWORD', value: '•••••••••••• (Senha da Conta)', color: 'text-zinc-600 italic' }
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <span className="text-zinc-600 font-sans font-bold uppercase tracking-[0.2em] text-[9px]">{item.label}</span>
                            <span className={`${item.color} tracking-tight`}>{item.value}</span>
                          </div>
                        ))}
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-20 w-full animate-scanline pointer-events-none" />
                  </div>

                  <div className="flex flex-wrap gap-3 mt-10">
                    {['SSL: Obrigatório', 'Consultas: Somente Leitura', 'Papel: Grant Select'].map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-zinc-500 font-bold hover:text-white hover:border-white/30 transition-all">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInItem>

          </div>

          <FadeInItem>
            <footer className="mt-20 pt-10 border-t border-white/5 text-center">
               <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-700 font-black">
                 CVMC DATA INTERFACE v2.4.0-STABLE // SESSÃO CRIPTOGRAFADA // PROTOCOLO NO GREEN
               </p>
            </footer>
          </FadeInItem>

        </div>
      </FadeInContainer>
    </main>
  );
}
