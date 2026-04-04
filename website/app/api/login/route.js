import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Consultando o usuário no PostgreSQL
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM acessos.usuarios WHERE email = $1', [email]);
    client.release();

    if (result.rows.length === 0) {
      return Response.json({ error: 'Usuário não encontrado.' }, { status: 401 });
    }

    const user = result.rows[0];
    
    // Comparação do hash bcrypt
    const match = await bcrypt.compare(password, user.senha_hash);

    if (match) {
      // Cria o cookie de sessão para o usuário logado
      const sessionData = { id: user.id, nome: user.nome, email: user.email };
      cookies().set('cvmc_session', Buffer.from(JSON.stringify(sessionData)).toString('base64'), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 dia logado
        path: '/'
      });
      
      return Response.json({ success: true, user: sessionData }, { status: 200 });
    } else {
      return Response.json({ error: 'Senha incorreta.' }, { status: 401 });
    }
  } catch (err) {
    console.error('Erro na API de Login:', err);
    return Response.json({ error: 'Erro interno no servidor ao tentar se conectar ao banco de dados.' }, { status: 500 });
  }
}
