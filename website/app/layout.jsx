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
      <body className={`${inter.className} bg-[#050505] selection:bg-white selection:text-black`}>
        {children}
      </body>
    </html>
  )
}
