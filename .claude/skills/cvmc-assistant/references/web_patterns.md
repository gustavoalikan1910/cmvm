# CVMC Web Patterns Reference

Padrões de desenvolvimento web utilizados no projeto CVMC.
Diretório raiz do website: `website/`

## Estrutura de Arquivos

```
website/
├── app/                    # Next.js App Router
│   ├── layout.jsx          # Root layout (dark theme, grid background)
│   ├── page.jsx            # Home page (Server Component com raw SQL)
│   ├── arquitetura/        # Página de arquitetura de dados
│   ├── dashboard/          # Dashboard protegido por JWT
│   ├── login/              # Autenticação
│   ├── cadastro/           # Registro de usuário
│   ├── esqueci-senha/      # Recuperação de senha
│   ├── definir-senha/      # Setup de senha
│   └── api/                # API Routes (Route Handlers)
│       ├── login/route.js
│       ├── cadastro/route.js
│       ├── esqueci-senha/route.js
│       └── setup-senha/route.js
├── components/             # Componentes reutilizáveis
│   ├── HomeAnimations.js   # Framer Motion: AnimatedNumber, MagneticButton, etc.
│   └── DashboardContent.jsx
├── lib/
│   ├── db.js               # Pool de conexão PostgreSQL (pg)
│   ├── gemini.js           # Google Gemini AI client
│   └── mailer.js           # Nodemailer para emails transacionais
├── middleware.js            # Proteção JWT de rotas /dashboard
└── tailwind.config.mjs
```

## Padrão: Server Components com Raw SQL

Pages são Server Components que executam SQL diretamente.
Sempre use `pool.query()` da lib `@/lib/db`, nunca ORMs.

```jsx
// app/alguma-pagina/page.jsx
import pool from '@/lib/db';

export const dynamic = 'force-dynamic'; // Evita cache estático para dados em tempo real

export default async function Page() {
  const result = await pool.query(`
    SELECT coluna FROM schema.tabela WHERE condicao = $1
  `, [valor]);

  return <div>{result.rows[0].coluna}</div>;
}
```

## Padrão: API Routes (Route Handlers)

```js
// app/api/recurso/route.js
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { campo } = await request.json();
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM schema.tabela WHERE campo = $1',
      [campo]
    );
    client.release();
    return Response.json({ data: result.rows }, { status: 200 });
  } catch (err) {
    console.error('Erro:', err);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
```

## Padrão: Autenticação JWT

- Geração de token: `jsonwebtoken` nas API Routes (Node.js runtime)
- Verificação de token: `Web Crypto API` no middleware (Edge Runtime)
- Cookie: `cvmc_session` (httpOnly, secure em produção)
- Proteção de rotas: `middleware.js` protege `/dashboard/*`

```js
// Gerar token (API Route)
import jwt from 'jsonwebtoken';
const token = jwt.sign({ id, nome, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
cookies().set('cvmc_session', token, { httpOnly: true, secure: true, maxAge: 86400 });

// Verificar token (Middleware - Edge Runtime)
const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
```

## Padrão: Design System (Dark Theme)

Paleta de cores e classes Tailwind padrão do projeto:

```
Fundo global:    bg-[#050505]
Texto principal: text-white
Texto muted:     text-zinc-500 / text-zinc-600
Bordas sutis:    border-white/5 / border-white/10
Cards:           bg-zinc-900/50 backdrop-blur-sm
Accent verde:    bg-emerald-400 / bg-emerald-500
```

### Background Global (em layout.jsx)
```jsx
<div className="fixed inset-0 z-0 pointer-events-none">
  {/* Blobs de luz */}
  <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full" />
  <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neutral-800/20 blur-[120px] rounded-full" />
  {/* Grid sutil */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
</div>
```

### Status Pill (Badge de status "ao vivo")
```jsx
<span className="relative flex h-2 w-2">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
</span>
```

### Gradiente de Texto
```jsx
<h1 className="bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent">
  Título
</h1>
```

## Padrão: Componentes de Animação (Framer Motion)

Importados de `@/components/HomeAnimations.js`:

| Componente       | Uso                                             |
|------------------|-------------------------------------------------|
| `AnimatedNumber` | Anima valores numéricos (stats, métricas)       |
| `MagneticButton` | Botão com efeito magnético no hover             |
| `ParallaxBackground` | Fundo com efeito parallax               |
| `FadeInContainer`| Wrapper que aplica fade-in aos filhos           |
| `FadeInItem`     | Item individual com animação de entrada         |

```jsx
import { AnimatedNumber, FadeInContainer, FadeInItem } from '@/components/HomeAnimations';

<FadeInContainer>
  <FadeInItem className="...">
    <AnimatedNumber value={totalEventos} />
  </FadeInItem>
</FadeInContainer>
```

## Padrão: Métricas Técnicas na Home

A Home page exibe 3 métricas em tempo real consultadas diretamente do Postgres:

```sql
-- Total de eventos nas tabelas gold
SELECT COALESCE(SUM(n_live_tup), 0) AS total_eventos
FROM pg_stat_user_tables WHERE schemaname = 'gold';

-- Uptime dos pipelines Airflow
SELECT ROUND(COUNT(CASE WHEN state = 'success' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0), 1) AS uptime
FROM dag_run WHERE dag_id = 'cvmc_pipeline__brasileirao-serie-a__2026';

-- Latência medida com performance.now() no Server Component
```

## Variáveis de Ambiente

```env
DB_USER=postgres
DB_PASSWORD=...
DB_HOST=postgres   # nome do serviço no docker-compose
DB_PORT=5432
DB_NAME=cvmc_db
JWT_SECRET=...     # segredo para assinar tokens JWT
```

## Aliases de Path (jsconfig.json)

```json
{ "paths": { "@/*": ["./*"] } }
```

Usar sempre `@/` para imports absolutos:
```js
import pool from '@/lib/db';
import { Component } from '@/components/NomeComponente';
```
