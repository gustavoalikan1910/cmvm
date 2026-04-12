import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CVMC | Data Intelligence Platform',
  description: 'Arquitetura de dados de futebol de alto rendimento. De Scrapers a Insights Analíticos.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-[#050505] text-white selection:bg-white selection:text-black min-h-screen relative overflow-x-hidden`}>
        {/* Background Global Decor */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neutral-800/20 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Conteúdo da Página */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
