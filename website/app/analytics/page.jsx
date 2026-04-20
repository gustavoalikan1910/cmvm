import pool from '@/lib/db';
import AnalyticsClient from './AnalyticsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Analytics | CVMC',
  description: 'Estatísticas reais do Brasileirão — Gold Layer PostgreSQL',
};

async function fetchInitialData() {
  const client = await pool.connect();
  try {
    const seasonsRes = await client.query(
      `SELECT DISTINCT season FROM gold.obt_team_season_stats ORDER BY season DESC`
    );
    const seasons = seasonsRes.rows.map(r => r.season);
    const latestSeason = seasons[0] || null;

    const [teamsRes, teamStatsRes, compRes, playersRes] = await Promise.all([
      client.query(
        `SELECT DISTINCT team_name FROM gold.obt_team_season_stats WHERE season = $1 ORDER BY team_name`,
        [latestSeason]
      ),
      client.query(
        `SELECT * FROM gold.obt_team_season_stats WHERE team_name = 'Corinthians' AND season = $1 LIMIT 1`,
        [latestSeason]
      ),
      client.query(
        `SELECT team_name, goals_for, goals_against, possession, xg_for, shots_on_target, tackles_for FROM gold.obt_team_season_stats WHERE season = $1 ORDER BY goals_for DESC`,
        [latestSeason]
      ),
      client.query(
        `SELECT player_name, position, appearances, goals, assists,
                shots_on_target, shots_off_target, accurate_passes, passes,
                tackles, interceptions, yellow_cards, red_cards, rating
         FROM gold.obt_player_season_stats
         WHERE team_name = 'Corinthians' AND season = $1
         ORDER BY appearances DESC`,
        [latestSeason]
      ),
    ]);

    return {
      seasons,
      selectedSeason: latestSeason,
      teams: teamsRes.rows.map(r => r.team_name),
      team: teamStatsRes.rows[0] || null,
      comparison: compRes.rows,
      players: playersRes.rows,
    };
  } finally {
    client.release();
  }
}

export default async function AnalyticsPage() {
  let initialData = { seasons: [], selectedSeason: null, teams: [], team: null, comparison: [], players: [] };

  try {
    initialData = await fetchInitialData();
  } catch (err) {
    console.error('Erro ao carregar dados iniciais de analytics:', err);
  }

  return <AnalyticsClient initialData={initialData} />;
}
