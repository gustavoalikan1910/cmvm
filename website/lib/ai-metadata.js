export const DB_METADATA = {
  schema: 'gold',
  tables: [
    {
      name: 'obt_player_match_stats',
      description: 'Estatísticas de performance de jogadores por partida individual.',
      columns: ['season', 'league', 'team_name', 'player_name', 'position', 'minutes_played', 'goals', 'assists', 'expected_goals', 'expected_assists', 'rating', 'shots_on_target', 'passes', 'accurate_passes', 'key_passes']
    },
    {
      name: 'obt_player_season_stats',
      description: 'Estatísticas acumuladas de jogadores por temporada completa.',
      columns: ['season', 'league', 'player_name', 'team_name', 'appearances', 'minutes_played', 'goals', 'assists', 'expected_goals', 'expected_assists', 'rating']
    },
    {
      name: 'obt_team_match_stats',
      description: 'Estatísticas de performance de times por partida individual.',
      columns: ['season', 'league', 'home_team_name', 'away_team_name', 'home_score', 'away_score', 'ballPossession_home', 'ballPossession_away', 'expectedGoals_home', 'expectedGoals_away', 'shotsOnGoal_home', 'shotsOnGoal_away']
    },
    {
      name: 'obt_team_season_stats',
      description: 'Classificação e estatísticas acumuladas de times por temporada.',
      columns: ['season', 'league', 'team_name', 'position', 'points', 'wins', 'draws', 'losses', 'goals_for', 'goals_against', 'xg_for', 'xg_against']
    }
  ]
};
