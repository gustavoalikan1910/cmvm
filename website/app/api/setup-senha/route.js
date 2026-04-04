import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    const client = await pool.connect();
    
    const res = await client.query('SELECT * FROM acessos.usuarios WHERE token_seguranca = $1 AND token_expiracao > NOW()', [token]);
    if (res.rows.length === 0) {
       client.release();
       return Response.json({ error: 'Token de ativação inválido ou link expirado.' }, { status: 400 });
    }

    const user = res.rows[0];
    const hash = await bcrypt.hash(password, 10);

    // Inicia transaction para atualizar tabela auth E rodar a engenharia de DB (CREATE ROLE) atômica
    await client.query('BEGIN');
    
    try {
      await client.query(`UPDATE acessos.usuarios SET senha_hash = $1, token_seguranca = NULL, token_expiracao = NULL WHERE id = $2`, [hash, user.id]);
      
      const sanitizedUser = user.db_user.replace(/[^a-zA-Z0-9_]/g, '');
      const pwd = password.replace(/'/g, "''"); // fallback seguro

      // CREATE ROLE dinâmica:
      const roleExists = await client.query(`SELECT 1 FROM pg_roles WHERE rolname='${sanitizedUser}'`);
      if(roleExists.rows.length === 0) {
        await client.query(`CREATE ROLE ${sanitizedUser} WITH LOGIN PASSWORD '${pwd}'`);
        await client.query(`GRANT CONNECT ON DATABASE airflow TO ${sanitizedUser}`);
        // Libera schema silver
        await client.query(`GRANT USAGE ON SCHEMA silver TO ${sanitizedUser}`);
        await client.query(`GRANT SELECT ON ALL TABLES IN SCHEMA silver TO ${sanitizedUser}`);
        await client.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA silver GRANT SELECT ON TABLES TO ${sanitizedUser}`);
        // Libera schema gold
        await client.query(`GRANT USAGE ON SCHEMA gold TO ${sanitizedUser}`);
        await client.query(`GRANT SELECT ON ALL TABLES IN SCHEMA gold TO ${sanitizedUser}`);
        await client.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA gold GRANT SELECT ON TABLES TO ${sanitizedUser}`);
      } else {
        await client.query(`ALTER ROLE ${sanitizedUser} WITH PASSWORD '${pwd}'`);
      }

      await client.query('COMMIT');
      client.release();

      return Response.json({ success: true, message: 'Senha registrada e Perfil Analítico criado direto no Postgres!' }, { status: 200 });

    } catch (dbError) {
      await client.query('ROLLBACK');
      client.release();
      throw dbError;
    }

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro ao configurar conta conectando-se ao banco.' }, { status: 500 });
  }
}
