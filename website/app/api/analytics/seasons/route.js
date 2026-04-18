import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT DISTINCT season FROM gold.obt_team_season_stats ORDER BY season DESC`
    );
    client.release();
    return Response.json({ seasons: result.rows.map(r => r.season) });
  } catch (err) {
    console.error('Erro em /api/analytics/seasons:', err);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
