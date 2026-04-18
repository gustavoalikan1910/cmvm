import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teamName = searchParams.get('team_name') || 'Corinthians';
  const season = searchParams.get('season');

  try {
    const client = await pool.connect();
    const result = season
      ? await client.query(
          `SELECT
            player_name, position, appearances, goals, assists,
            shots_on_target, shots_off_target,
            accurate_passes, passes,
            tackles, interceptions,
            yellow_cards, red_cards, rating
          FROM gold.obt_player_season_stats
          WHERE team_name = $1 AND season = $2
          ORDER BY appearances DESC`,
          [teamName, season]
        )
      : await client.query(
          `SELECT
            player_name, position, appearances, goals, assists,
            shots_on_target, shots_off_target,
            accurate_passes, passes,
            tackles, interceptions,
            yellow_cards, red_cards, rating
          FROM gold.obt_player_season_stats
          WHERE team_name = $1
            AND season = (SELECT MAX(season) FROM gold.obt_player_season_stats)
          ORDER BY appearances DESC`,
          [teamName]
        );
    client.release();
    return Response.json({ players: result.rows });
  } catch (err) {
    console.error('Erro em /api/analytics/players:', err);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
