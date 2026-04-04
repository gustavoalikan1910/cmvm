import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'cvmc-secret-fallback-change-in-production';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const client = await pool.connect();
    const result = await client.query('SELECT * FROM acessos.usuarios WHERE email = $1', [email]);
    client.release();

    if (result.rows.length === 0) {
      return Response.json({ error: 'Usuário não encontrado.' }, { status: 401 });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.senha_hash);

    if (match) {
      // Assina o token JWT com chave secreta — não pode ser forjado sem a chave
      const sessionData = { id: user.id, nome: user.nome, email: user.email };
      const token = jwt.sign(sessionData, JWT_SECRET, { expiresIn: '1d' });

      cookies().set('cvmc_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 dia
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
