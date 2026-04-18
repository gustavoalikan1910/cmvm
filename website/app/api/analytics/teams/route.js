import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const season = searchParams.get('season');

  try {
    const client = await pool.connect();
    const result = season
      ? await client.query(
          `SELECT DISTINCT team_name FROM gold.obt_team_season_stats WHERE season = $1 ORDER BY team_name`,
          [season]
        )
      : await client.query(
          `SELECT DISTINCT team_name FROM gold.obt_team_season_stats
           WHERE season = (SELECT MAX(season) FROM gold.obt_team_season_stats)
           ORDER BY team_name`
        );
    client.release();
    return Response.json({ teams: result.rows.map(r => r.team_name) });
  } catch (err) {
    console.error('Erro em /api/analytics/teams:', err);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
