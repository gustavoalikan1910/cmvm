'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// Componente para números animados
const CountUp = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const target = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const isKOrM = value.includes('K') || value.includes('M');
  const actualSuffix = isKOrM ? value.replace(/[0-9.]/g, '') : suffix;

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.span>
      {displayValue % 1 === 0 ? displayValue : displayValue.toFixed(1)}
      {actualSuffix}
    </motion.span>
  );
};

// Componente de Botão Magnético
const MagneticButton = ({ children, className, href }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

export default function Home() {
  const [stats, setStats] = useState({ totalEventos: '0', uptime: '0%', latencia: '0ms', isPipelineActive: false });
  const [isLoading, setIsLoading] = useState(true);

  // Parallax de Mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useSpring(useTransform(mouseX, [0, 1920], [-20, 20]), { stiffness: 50, damping: 30 });
  const bgY = useSpring(useTransform(mouseY, [0, 1080], [-20, 20]), { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Fetch stats via internal API ou Server Action simplificada aqui para o exemplo client-side
    // Em produção, isso pode ser passado via props de um Server Component pai
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/login'); // Placeholder ou rota de status
        // Simulando resposta para o exemplo visual imediato
        setTimeout(() => {
          setStats({
            totalEventos: '1.2M',
            uptime: '99.9%',
            latencia: '< 45ms',
            isPipelineActive: true
          });
          setIsLoading(false);
        }, 800);
      } catch (e) {
        setIsLoading(false);
      }
    };
    fetchStats();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050505]">
      {/* Background Decor com Parallax */}
      <motion.div style={{ x: bgX, y: bgY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-zinc-800/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-neutral-800/15 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10"
      >
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 glass-pill mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Pipeline v2.0 Production Ready
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black tracking-tighter mb-10 bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
            <motion.img 
              whileHover={{ rotate: 10, scale: 1.1 }}
              src="/assets/simbolo_CP.png" 
              alt="Corinthians" 
              className="w-20 h-20 md:w-32 md:h-32 object-contain brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
            />
            <span className="leading-[0.85] text-center uppercase">COMO VAI O MEU<br className="hidden md:block" /> CORINTHIANS?</span>
            <motion.img 
              whileHover={{ rotate: -10, scale: 1.1 }}
              src="/assets/simbolo_CP.png" 
              alt="Corinthians" 
              className="w-20 h-20 md:w-32 md:h-32 object-contain brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] hidden md:block" 
            />
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-zinc-500 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-16 font-light italic">
            "A engenharia de dados que o Timão merece. Estatísticas reais para o bando de loucos."
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
            <MagneticButton 
              href="/login" 
              className="px-10 py-5 bg-white text-black font-black rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-shadow duration-500 text-lg uppercase tracking-tight"
            >
              Acessar banco de dados
            </MagneticButton>
            <a href="/arquitetura" className="px-10 py-5 bg-zinc-900/50 border border-white/10 text-white font-bold rounded-full hover:bg-zinc-800 transition-all text-lg uppercase tracking-tight backdrop-blur-sm">
              Explorar Arquitetura
            </a>
          </motion.div>
        </div>

        {/* Stats Header */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto items-center text-center mt-32 mb-32 pb-16 border-b border-white/5"
        >
           <div className="group cursor-default">
             <div className="text-6xl md:text-7xl font-black mb-3 tabular-nums group-hover:text-zinc-300 transition-colors">
               {!isLoading && <CountUp value={stats.totalEventos} />}
             </div>
             <div className="text-xs uppercase text-zinc-600 tracking-[0.3em] font-bold">Eventos Processados</div>
           </div>
           <div className="group cursor-default">
             <div className="text-6xl md:text-7xl font-black mb-3 tabular-nums group-hover:text-zinc-300 transition-colors">
               {!isLoading && <CountUp value={stats.uptime} />}
             </div>
             <div className="text-xs uppercase text-zinc-600 tracking-[0.3em] font-bold">Uptime Pipelines</div>
           </div>
           <div className="group cursor-default">
             <div className="text-6xl md:text-7xl font-black mb-3 tabular-nums group-hover:text-zinc-300 transition-colors">
               {!isLoading && <CountUp value={stats.latencia} />}
             </div>
             <div className="text-xs uppercase text-zinc-600 tracking-[0.3em] font-bold">Latência Queries</div>
           </div>
        </motion.div>

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

      </motion.div>
    </main>
  );
}