import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teamName = searchParams.get('team_name') || 'Corinthians';
  const season = searchParams.get('season');

  try {
    const client = await pool.connect();

    const seasonFilter = season
      ? `AND season = $2`
      : `AND season = (SELECT MAX(season) FROM gold.obt_team_season_stats)`;

    const compSeasonFilter = season
      ? `WHERE season = $1`
      : `WHERE season = (SELECT MAX(season) FROM gold.obt_team_season_stats)`;

    const [teamRes, compRes] = await Promise.all([
      season
        ? client.query(
            `SELECT * FROM gold.obt_team_season_stats WHERE team_name = $1 ${seasonFilter} LIMIT 1`,
            [teamName, season]
          )
        : client.query(
            `SELECT * FROM gold.obt_team_season_stats WHERE team_name = $1 ${seasonFilter} LIMIT 1`,
            [teamName]
          ),
      season
        ? client.query(
            `SELECT team_name, goals_for FROM gold.obt_team_season_stats ${compSeasonFilter} ORDER BY goals_for DESC`,
            [season]
          )
        : client.query(
            `SELECT team_name, goals_for FROM gold.obt_team_season_stats ${compSeasonFilter} ORDER BY goals_for DESC`
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
