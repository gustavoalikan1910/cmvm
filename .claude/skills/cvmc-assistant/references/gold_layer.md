# Gold Layer — Data Catalog

Camada final do pipeline Medallion. Todas as tabelas seguem o padrão OBT (One Big Table), desnormalizadas para consumo direto pelo website e analytics.

Schema: `gold` | Banco: `cvmc_data` | Engine: PostgreSQL 15

---

## Tabelas

| Tabela | Granularidade | Descrição |
|--------|--------------|-----------|
| `obt_player_match_stats` | 1 linha por jogador por partida | Estatísticas individuais de cada jogador em cada jogo |
| `obt_player_season_stats` | 1 linha por jogador por temporada | Estatísticas acumuladas do jogador na temporada |
| `obt_team_match_stats` | 1 linha por time por partida | Estatísticas táticas do time em cada jogo (home e away lado a lado) |
| `obt_team_season_stats` | 1 linha por time por temporada | Estatísticas acumuladas e posição na tabela de classificação |

---

## gold.obt_player_match_stats

Granularidade: **1 linha = 1 jogador × 1 partida**

Colunas de identificação:
| Coluna | Tipo | Nullable | Descrição |
|--------|------|----------|-----------|
| `season` | text | YES | Temporada (ex: "2026") |
| `league` | text | YES | Liga (ex: "brasileirao-serie-a") |
| `team_id` | bigint | YES | ID do time |
| `team_name` | text | YES | Nome do time |
| `team_slug` | text | YES | Slug do time |
| `location` | text | NO | "home" ou "away" |
| `player_id` | bigint | YES | ID do jogador |
| `player_name` | text | YES | Nome do jogador |
| `player_slug` | text | YES | Slug do jogador |
| `position` | text | YES | Posição do jogador |
| `event_id` | bigint | YES | ID da partida |

Estatísticas do jogador:
| Coluna | Tipo | Nullable | Descrição |
|--------|------|----------|-----------|
| `minutes_played` | bigint | YES | Minutos jogados |
| `goals` | bigint | YES | Gols marcados |
| `assists` | bigint | YES | Assistências |
| `expected_goals` | double precision | YES | xG (expected goals) |
| `expected_assists` | double precision | YES | xA (expected assists) |
| `xgxa` | double precision | YES | xG + xA combinado |
| `shots_on_target` | bigint | YES | Chutes no gol |
| `shots_off_target` | bigint | YES | Chutes fora |
| `passes` | bigint | YES | Passes tentados |
| `accurate_passes` | bigint | YES | Passes certos |
| `key_passes` | bigint | YES | Passes decisivos |
| `tackles` | bigint | YES | Desarmes |
| `interceptions` | bigint | YES | Interceptações |
| `duels_won` | bigint | YES | Duelos ganhos |
| `duels_lost` | bigint | YES | Duelos perdidos |
| `yellow_cards` | bigint | YES | Cartões amarelos |
| `red_cards` | bigint | YES | Cartões vermelhos |
| `rating` | double precision | YES | Rating geral do jogador na partida |
| `saves` | bigint | YES | Defesas (goleiros) |
| `clearances` | bigint | YES | Cortes |
| `fouls` | bigint | YES | Faltas cometidas |
| `was_fouled` | bigint | YES | Faltas sofridas |
| `touches` | bigint | YES | Toques na bola |
| `dt_updated_at` | timestamp | NO | Data de atualização do registro |

---

## gold.obt_player_season_stats

Granularidade: **1 linha = 1 jogador × 1 temporada**

| Coluna | Tipo | Nullable | Descrição |
|--------|------|----------|-----------|
| `season` | text | YES | Temporada |
| `league` | text | YES | Liga |
| `player_id` | bigint | YES | ID do jogador |
| `player_name` | text | YES | Nome do jogador |
| `player_slug` | text | YES | Slug do jogador |
| `position` | text | YES | Posição do jogador |
| `team_id` | bigint | YES | ID do time |
| `team_name` | text | YES | Nome do time |
| `team_slug` | text | YES | Slug do time |
| `appearances` | integer | YES | Número de partidas disputadas |
| `minutes_played` | integer | YES | Total de minutos jogados |
| `goals` | integer | YES | Total de gols |
| `assists` | integer | YES | Total de assistências |
| `expected_goals` | double precision | YES | Total xG acumulado |
| `expected_assists` | double precision | YES | Total xA acumulado |
| `shots_on_target` | integer | YES | Total chutes no gol |
| `shots_off_target` | integer | YES | Total chutes fora |
| `passes` | integer | YES | Total de passes |
| `accurate_passes` | integer | YES | Total de passes certos |
| `key_passes` | integer | YES | Total de passes decisivos |
| `tackles` | integer | YES | Total de desarmes |
| `interceptions` | integer | YES | Total de interceptações |
| `duels_won` | integer | YES | Total de duelos ganhos |
| `duels_lost` | integer | YES | Total de duelos perdidos |
| `yellow_cards` | integer | YES | Total de cartões amarelos |
| `red_cards` | integer | YES | Total de cartões vermelhos |
| `rating` | double precision | YES | Rating médio na temporada |
| `saves` | integer | YES | Total de defesas (goleiros) |
| `clearances` | integer | YES | Total de cortes |
| `fouls` | integer | YES | Total de faltas cometidas |
| `was_fouled` | integer | YES | Total de faltas sofridas |
| `dt_updated_at` | timestamp | NO | Data de atualização do registro |

---

## gold.obt_team_match_stats

Granularidade: **1 linha = 1 time × 1 partida**

> Cada coluna de estatística possui versão `_home` e `_away`, representando os dois lados da partida na mesma linha.

Identificação:
| Coluna | Tipo | Nullable | Descrição |
|--------|------|----------|-----------|
| `season` | text | YES | Temporada |
| `league` | text | YES | Liga |
| `team_id` | bigint | YES | ID do time (linha é deste time) |
| `team_name` | text | YES | Nome do time |
| `team_slug` | text | YES | Slug do time |
| `event_type` | text | NO | Tipo de evento (ex: "match") |
| `event_id` | bigint | YES | ID da partida |
| `home_team_id` | bigint | YES | ID do time da casa |
| `home_team_name` | text | YES | Nome do time da casa |
| `away_team_id` | bigint | YES | ID do time visitante |
| `away_team_name` | text | YES | Nome do time visitante |
| `home_score` | bigint | YES | Gols do time da casa |
| `away_score` | bigint | YES | Gols do time visitante |
| `time_start_timestamp` | text | YES | Timestamp de início da partida |

Estatísticas táticas (todas em pares `_home` / `_away`):
| Coluna Base | Tipo | Descrição |
|-------------|------|-----------|
| `accurateCross` | double precision | Cruzamentos precisos |
| `ballPossession` | double precision | Posse de bola (%) |
| `bigChanceCreated` | double precision | Grandes chances criadas |
| `bigChanceMissed` | double precision | Grandes chances desperdiçadas |
| `bigChanceScored` | double precision | Grandes chances convertidas |
| `dispossessed` | double precision | Perdas de bola |
| `errorsLeadToGoal` | double precision | Erros que resultaram em gol |
| `errorsLeadToShot` | double precision | Erros que resultaram em chute |
| `expectedGoals` | double precision | xG da partida |
| `fouls` | double precision | Faltas cometidas |
| `freeKicks` | double precision | Cobranças de falta |
| `goalKicks` | double precision | Tiros de meta |
| `goalkeeperSaves` | double precision | Defesas do goleiro |
| `interceptionWon` | double precision | Interceptações bem-sucedidas |
| `offsides` | double precision | Impedimentos |
| `passes` | double precision | Passes tentados |
| `redCards` | double precision | Cartões vermelhos |
| `shotsOffGoal` | double precision | Chutes fora do gol |
| `shotsOnGoal` | double precision | Chutes no gol |
| `throwIns` | double precision | Laterais |
| `totalClearance` | double precision | Total de cortes |
| `totalShotsInsideBox` | double precision | Chutes dentro da área |
| `totalShotsOutsideBox` | double precision | Chutes fora da área |
| `totalTackle` | double precision | Total de desarmes |
| `touchesInOppBox` | double precision | Toques na área adversária |
| `yellowCards` | double precision | Cartões amarelos |

Controle:
| Coluna | Tipo | Nullable |
|--------|------|----------|
| `dt_updated_at` | timestamp | NO |

---

## gold.obt_team_season_stats

Granularidade: **1 linha = 1 time × 1 temporada** (tabela de classificação)

| Coluna | Tipo | Nullable | Descrição |
|--------|------|----------|-----------|
| `season` | text | YES | Temporada |
| `league` | text | YES | Liga |
| `team_id` | bigint | YES | ID do time |
| `team_name` | text | YES | Nome do time |
| `team_slug` | text | YES | Slug do time |
| `position` | bigint | YES | Posição na tabela |
| `points` | bigint | YES | Pontos |
| `matches_played` | bigint | YES | Partidas disputadas |
| `wins` | bigint | YES | Vitórias |
| `draws` | bigint | YES | Empates |
| `losses` | bigint | YES | Derrotas |
| `goals_for` | bigint | YES | Gols marcados |
| `goals_against` | bigint | YES | Gols sofridos |
| `goal_difference` | bigint | YES | Saldo de gols |
| `shots` | bigint | YES | Total de chutes |
| `shots_on_target` | bigint | YES | Chutes no gol |
| `shots_off_target` | bigint | YES | Chutes fora |
| `expected_goals` | double precision | YES | Total xG na temporada |
| `expected_assists` | double precision | YES | Total xA na temporada |
| `possession` | double precision | YES | Posse de bola média (%) |
| `passes_for` | bigint | YES | Passes tentados |
| `passes_against` | bigint | YES | Passes sofridos pelo adversário |
| `yellow_cards` | bigint | YES | Total de cartões amarelos |
| `red_cards` | bigint | YES | Total de cartões vermelhos |
| `fouls` | bigint | YES | Total de faltas cometidas |
| `corners_for` | bigint | YES | Escanteios a favor |
| `corners_against` | bigint | YES | Escanteios contra |
| `tackles_for` | bigint | YES | Desarmes feitos |
| `tackles_against` | bigint | YES | Desarmes sofridos |
| `interceptions` | bigint | YES | Total de interceptações |
| `big_chances` | bigint | YES | Grandes chances criadas |
| `xg_for` | double precision | YES | xG total a favor |
| `xg_against` | double precision | YES | xG total sofrido |
| `key_passes` | bigint | YES | Passes decisivos |
| `successful_dribbles` | bigint | YES | Dribles certos |
| `saves` | bigint | YES | Defesas do goleiro |
| `dt_updated_at` | timestamp | NO | Data de atualização |

---

## Exemplos de Queries Úteis

```sql
-- Top artilheiros da temporada
SELECT player_name, team_name, goals, assists, rating
FROM gold.obt_player_season_stats
WHERE season = '2026' AND league = 'brasileirao-serie-a'
ORDER BY goals DESC
LIMIT 10;

-- Tabela de classificação
SELECT position, team_name, points, wins, draws, losses, goals_for, goals_against, goal_difference
FROM gold.obt_team_season_stats
WHERE season = '2026' AND league = 'brasileirao-serie-a'
ORDER BY position;

-- Estatísticas de um time em partidas específicas
SELECT home_team_name, away_team_name, home_score, away_score,
       ballPossession_home, ballPossession_away,
       shotsOnGoal_home, shotsOnGoal_away
FROM gold.obt_team_match_stats
WHERE team_name = 'Corinthians' AND season = '2026'
ORDER BY event_id DESC;

-- Desempenho de um jogador partida a partida
SELECT player_name, event_id, goals, assists, rating, minutes_played
FROM gold.obt_player_match_stats
WHERE player_name = 'Yuri Alberto' AND season = '2026'
ORDER BY event_id;
```
