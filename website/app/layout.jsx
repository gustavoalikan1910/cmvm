import './globals.css'

export const metadata = {
  title: 'CVMC Data Platform',
  description: 'Portfólio de Engenharia de Dados',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
