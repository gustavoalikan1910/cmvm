import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT DISTINCT team_name FROM gold.obt_team_season_stats ORDER BY team_name`
    );
    client.release();
    return Response.json({ teams: result.rows.map(r => r.team_name) });
  } catch (err) {
    console.error('Erro em /api/analytics/teams:', err);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
