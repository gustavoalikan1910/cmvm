import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const { username, email } = await request.json();

    const client = await pool.connect();
    
    // Verifica se já existe
    const exists = await client.query('SELECT id FROM acessos.usuarios WHERE email = $1 OR nome = $2', [email, username]);
    if (exists.rows.length > 0) {
      client.release();
      return Response.json({ error: 'Usuário ou E-mail já registrados.' }, { status: 400 });
    }

    const token = uuidv4();
    const expiracao = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    const db_user = username.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(); // limpa para ser aceito no postgres

    await client.query(
      `INSERT INTO acessos.usuarios (nome, email, db_user, token_seguranca, token_expiracao) 
       VALUES ($1, $2, $3, $4, $5)`,
      [username, email, db_user, token, expiracao]
    );
    client.release();

    const link = `http://localhost:3000/definir-senha?token=${token}`;
    
    // Dispara e-mail falso pro console via Ethereal
    await sendMail({
      to: email,
      subject: 'Complete seu cadastro no CVMC Data Platform',
      html: `<h2>Bem-vindo ao CVMC!</h2>
             <p>Seu acesso direto ao Data Lake PostgreSQL (Schemas Silver e Gold) foi pré-aprovado.</p>
             <p>Clique no link abaixo para criar sua senha forte e ativar sua role de banco de dados:</p>
             <a href="${link}">${link}</a>`
    });

    return Response.json({ success: true, message: 'Usuário pendente criado. O e-mail foi disparado!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro ao gerar acesso.' }, { status: 500 });
  }
}
