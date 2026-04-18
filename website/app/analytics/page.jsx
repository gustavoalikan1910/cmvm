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
    const [teamsRes, teamStatsRes, compRes, playersRes] = await Promise.all([
      client.query(`SELECT DISTINCT team_name FROM gold.obt_team_season_stats ORDER BY team_name`),
      client.query(`SELECT * FROM gold.obt_team_season_stats WHERE team_name = 'Corinthians' LIMIT 1`),
      client.query(`SELECT team_name, goals_for FROM gold.obt_team_season_stats ORDER BY goals_for DESC`),
      client.query(`
        SELECT player_name, position, appearances, goals, assists,
               shots_on_target, shots_off_target, accurate_passes, passes,
               tackles, interceptions, yellow_cards, red_cards, rating
        FROM gold.obt_player_season_stats
        WHERE team_name = 'Corinthians'
        ORDER BY appearances DESC
      `),
    ]);

    return {
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
  let initialData = { teams: [], team: null, comparison: [], players: [] };

  try {
    initialData = await fetchInitialData();
  } catch (err) {
    console.error('Erro ao carregar dados iniciais de analytics:', err);
  }

  return <AnalyticsClient initialData={initialData} />;
}
