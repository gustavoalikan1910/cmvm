import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teamName = searchParams.get('team_name') || 'Corinthians';

  try {
    const client = await pool.connect();
    const [teamRes, compRes] = await Promise.all([
      client.query(
        `SELECT * FROM gold.obt_team_season_stats WHERE team_name = $1 LIMIT 1`,
        [teamName]
      ),
      client.query(
        `SELECT team_name, goals_for FROM gold.obt_team_season_stats ORDER BY goals_for DESC`
      ),
    ]);
    client.release();

    if (teamRes.rows.length === 0) {
      return Response.json({ error: 'Time não encontrado' }, { status: 404 });
    }

    return Response.json({
      team: teamRes.rows[0],
      comparison: compRes.rows,
    });
  } catch (err) {
    console.error('Erro em /api/analytics/team-stats:', err);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
