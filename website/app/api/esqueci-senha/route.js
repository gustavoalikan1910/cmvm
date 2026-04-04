import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    const client = await pool.connect();
    const exists = await client.query('SELECT * FROM acessos.usuarios WHERE email = $1', [email]);
    if (exists.rows.length === 0) {
      client.release();
      // 200 em falso pra não enumerar dados
      return Response.json({ success: true }, { status: 200 });
    }

    const token = uuidv4();
    const expiracao = new Date(Date.now() + 2 * 60 * 60 * 1000);

    await client.query('UPDATE acessos.usuarios SET token_seguranca = $1, token_expiracao = $2 WHERE email = $3', [token, expiracao, email]);
    client.release();

    const link = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/definir-senha?token=${token}`;
    
    await sendMail({
      to: email,
      subject: 'Recuperação de Senha - CVMC',
      html: `<h2>Recuperação de Conta DaaS</h2>
             <p>Clique neste link para registrar uma nova senha e atualizar as regras de conexão do seu usuário analítico:</p>
             <br><a href="${link}">${link}</a>`
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
