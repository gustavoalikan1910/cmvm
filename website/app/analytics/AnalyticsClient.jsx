'use client';

import { useState, useCallback } from 'react';
import { AnimatedNumber } from '@/components/HomeAnimations';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  LinearScale,
  ScatterController
} from 'chart.js';
import { Radar, Scatter } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  LinearScale,
  ScatterController,
  annotationPlugin
);

ChartJS.defaults.color = '#71717a';
ChartJS.defaults.font.family = 'ui-sans-serif, system-ui, sans-serif';
ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.9)';
ChartJS.defaults.plugins.tooltip.titleColor = '#fff';
ChartJS.defaults.plugins.tooltip.bodyColor = '#a1a1aa';
ChartJS.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.1)';
ChartJS.defaults.plugins.tooltip.borderWidth = 1;
ChartJS.defaults.plugins.tooltip.padding = 12;

const POSITION_MAP = {
  'Todos': null,
  'Atacantes': 'F',
  'Meio-campistas': 'M',
  'Defensores': 'D',
  'Goleiros': 'G',
};

function fmt(val, decimals = 0) {
  if (val == null) return '—';
  const n = parseFloat(val);
  if (isNaN(n)) return '—';
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
}

function getPercentile(val, allVals, invert = false) {
  if (!allVals || allVals.length === 0) return 0;
  const sorted = [...allVals].sort((a, b) => a - b);
  let rank = sorted.findIndex(v => v >= val);
  if (rank === -1) rank = sorted.length - 1;
  const pct = (rank / Math.max(1, sorted.length - 1)) * 100;
  return invert ? 100 - pct : pct;
}

function KpiCard({ label, value, sub, progress }) {
  const max = progress?.max || 100;
  const pct = progress ? Math.min((parseFloat(value) / max) * 100, 100) : null;
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 hover:border-white/[0.12] transition-colors">
      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-2">{label}</p>
      <p className="text-5xl font-black tracking-tight leading-none text-white">
        <AnimatedNumber value={value} />
      </p>
      {sub && <p className="text-[9px] text-zinc-700 uppercase tracking-widest mt-1.5">{sub}</p>}
      {pct !== null && (
        <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden mt-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-white/20 to-white/50"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

function RecordItem({ value, label, color }) {
  return (
    <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
      <p className="text-3xl font-black" style={{ color: color || '#fff' }}>{value ?? '—'}</p>
      <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-600 mt-0.5">{label}</p>
    </div>
  );
}

function BarChart({ data, selectedTeam }) {
  const maxVal = Math.max(...data.map(d => d.goals_for || 0), 1);
  return (
    <div className="space-y-2.5">
      {data.map((d) => {
        const pct = (d.goals_for / maxVal) * 100;
        const isSelected = d.team_name === selectedTeam;
        return (
          <div key={d.team_name} className="flex items-center gap-3">
            <span className={`text-[9px] w-28 text-right shrink-0 font-${isSelected ? '700' : '400'} ${isSelected ? 'text-white' : 'text-zinc-600'}`}>
              {d.team_name}
            </span>
            <div className="flex-1 h-[5px] bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: isSelected
                    ? 'linear-gradient(90deg, rgba(255,255,255,0.5), #fff)'
                    : 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))',
                }}
              />
            </div>
            <span className={`text-[10px] font-bold w-8 shrink-0 ${isSelected ? 'text-white' : 'text-zinc-600'}`}>
              {d.goals_for ?? 0}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TabTimes({ team, comparison, selectedTeam }) {
  if (!team) {
    return (
      <div className="text-zinc-600 text-sm py-10 text-center">
        Nenhum dado encontrado para este time.
      </div>
    );
  }

  // Radar Chart Data
  const pPossession = getPercentile(parseFloat(team.possession) || 0, comparison.map(c => parseFloat(c.possession) || 0));
  const pXg = getPercentile(parseFloat(team.xg_for) || 0, comparison.map(c => parseFloat(c.xg_for) || 0));
  const pShots = getPercentile(parseInt(team.shots_on_target) || 0, comparison.map(c => parseInt(c.shots_on_target) || 0));
  const pTackles = getPercentile(parseInt(team.tackles_for) || 0, comparison.map(c => parseInt(c.tackles_for) || 0));
  const pDefense = getPercentile(parseInt(team.goals_against) || 0, comparison.map(c => parseInt(c.goals_against) || 0), true);

  const radarData = {
    labels: ['Posse de Bola', 'Chances (xG)', 'Chutes a Gol', 'Desarmes', 'Defesa Sólida'],
    datasets: [
      {
        label: team.team_name,
        data: [pPossession, pXg, pShots, pTackles, pDefense],
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.8)',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        borderWidth: 2,
      },
      {
        label: 'Média da Liga',
        data: [50, 50, 50, 50, 50],
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderColor: 'rgba(16, 185, 129, 0.4)',
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#000',
        borderWidth: 1.5,
        borderDash: [5, 5]
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.05)' },
        grid: { color: 'rgba(255,255,255,0.05)' },
        pointLabels: { color: '#a1a1aa', font: { size: 10, weight: 'bold' } },
        ticks: { display: false, min: 0, max: 100 }
      }
    },
    plugins: { legend: { position: 'bottom', labels: { color: '#fff', font: { size: 10, weight: 'bold' }, usePointStyle: true } } }
  };

  // Scatter Chart Data
  const scatterData = {
    datasets: [
      {
        label: team.team_name,
        data: comparison.filter(c => c.team_name === selectedTeam).map(c => ({ x: parseFloat(c.xg_for) || 0, y: parseFloat(c.goals_for) || 0, team: c.team_name })),
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
        pointStyle: 'rectRot'
      },
      {
        label: 'Outros Times',
        data: comparison.filter(c => c.team_name !== selectedTeam).map(c => ({ x: parseFloat(c.xg_for) || 0, y: parseFloat(c.goals_for) || 0, team: c.team_name })),
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: 'rgba(255,255,255,0.4)',
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const maxX = Math.max(...comparison.map(c => parseFloat(c.xg_for) || 0)) + 5;
  const maxY = Math.max(...comparison.map(c => parseFloat(c.goals_for) || 0)) + 5;

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'EXPECTED GOALS (xG)' }, grid: { color: 'rgba(255,255,255,0.03)' }, min: 0, max: maxX },
      y: { title: { display: true, text: 'GOLS MARCADOS' }, grid: { color: 'rgba(255,255,255,0.03)' }, min: 0, max: maxY }
    },
    plugins: {
      legend: { position: 'bottom', labels: { color: '#fff', font: { size: 10, weight: 'bold' }, usePointStyle: true } },
      tooltip: { callbacks: { label: (ctx) => ` ${ctx.raw.team} • xG: ${ctx.raw.x.toFixed(1)} | Gols: ${ctx.raw.y}` } },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: 0, xMax: Math.max(maxX, maxY),
            yMin: 0, yMax: Math.max(maxX, maxY),
            borderColor: 'rgba(255,255,255,0.15)',
            borderDash: [5, 5],
            borderWidth: 2,
            label: { content: 'xG = Gols (Equilíbrio)', display: true, position: 'start', color: '#71717a', backgroundColor: 'transparent', font: { size: 10 } }
          }
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-lg px-3 py-1.5 font-mono text-[9px] text-zinc-500 mb-2">
        <span>📊</span>
        <span>gold.obt_team_season_stats · temporada {team.season}</span>
      </div>

      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-700 mb-3">
        {team.team_name} — Resumo da Temporada
      </p>

      {/* New Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-1">Identidade e Estilo</p>
          <p className="text-[8px] text-zinc-700 uppercase tracking-widest mb-5">Comparativo com a Média da Liga (Percentis)</p>
          <div className="relative h-64 w-full"><Radar data={radarData} options={radarOptions} /></div>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-1">Eficiência de Finalização</p>
          <p className="text-[8px] text-zinc-700 uppercase tracking-widest mb-5">Expected Goals (xG) vs Gols Marcados</p>
          <div className="relative h-64 w-full"><Scatter data={scatterData} options={scatterOptions} /></div>
        </div>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Gols Marcados" value={fmt(team.goals_for)} sub="goals_for" progress={{ max: Math.max(...comparison.map(c => c.goals_for || 0)) }} />
        <KpiCard label="Gols Sofridos" value={fmt(team.goals_against)} sub="goals_against" progress={{ max: Math.max(...comparison.map(c => c.goals_for || 0)) }} />
        <KpiCard label="Posse Média" value={`${fmt(team.possession, 1)}%`} sub="possession" progress={{ max: 100 }} />
        <KpiCard label="Pontos" value={fmt(team.points)} sub={`posição #${team.position}`} progress={{ max: team.matches_played * 3 }} />
      </div>

      {/* W/D/L + Disciplina */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-3">Aproveitamento</p>
          <div className="flex gap-2">
            <RecordItem value={team.wins} label="Vitórias" />
            <RecordItem value={team.draws} label="Empates" />
            <RecordItem value={team.losses} label="Derrotas" />
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-3">Disciplina</p>
          <div className="flex gap-2">
            <RecordItem value={team.yellow_cards} label="🟡 Amarelos" color="#facc15" />
            <RecordItem value={team.red_cards} label="🔴 Vermelhos" color="#ef4444" />
            <RecordItem value={team.fouls} label="Faltas" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Total de Chutes" value={fmt(team.shots)} sub="shots" />
        <KpiCard label="Chutes a Gol" value={fmt(team.shots_on_target)} sub="shots_on_target" />
        <KpiCard label="Chutes Fora" value={fmt(team.shots_off_target)} sub="shots_off_target" />
      </div>

      <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-5">
          Comparativo — Gols Marcados · Todos os Times
        </p>
        <BarChart data={comparison} selectedTeam={selectedTeam} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-3">Expected Goals (xG)</p>
          <p className="text-4xl font-black text-white leading-none mb-4">{fmt(team.xg_for, 1)}</p>
          <div className="space-y-2">
            {[
              { label: 'xG a favor', val: team.xg_for },
              { label: 'xG sofrido', val: team.xg_against },
            ].map(({ label, val }) => {
              const maxXg = Math.max(parseFloat(team.xg_for) || 0, parseFloat(team.xg_against) || 0, 1);
              return (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[9px] text-zinc-600 w-24 text-right">{label}</span>
                  <div className="flex-1 h-[5px] bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-white/20 to-white/40" style={{ width: `${(val / maxXg) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-zinc-500 w-8">{fmt(val, 1)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-3">Métricas Adicionais</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Grandes Chances', val: team.big_chances, sub: 'big_chances' },
              { label: 'Escanteios', val: team.corners_for, sub: 'corners_for' },
              { label: 'Desarmes', val: team.tackles_for, sub: 'tackles_for' },
              { label: 'Defesas', val: team.saves, sub: 'saves' },
            ].map(({ label, val, sub }) => (
              <div key={label}>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-1">{label}</p>
                <p className="text-2xl font-black text-white">{fmt(val)}</p>
                <p className="text-[9px] text-zinc-700 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabJogadores({ players }) {
  const [posFilter, setPosFilter] = useState('Todos');
  const [sortConfig, setSortConfig] = useState({ key: 'appearances', direction: 'desc' });
  const [selectedPlayerName, setSelectedPlayerName] = useState('');

  const SORT_MAP = {
    'Jogador': 'player_name',
    'Jogos': 'appearances',
    'Gols': 'goals',
    'Assist': 'assists',
    'Chutes ✓/✗': 'shots_on_target',
    'Passes ✓/✗': 'accurate_passes',
    'Desarmes': 'tackles',
    'Intercep.': 'interceptions',
    '🟡/🔴': 'yellow_cards',
    'Rating': 'rating'
  };

  const handleSort = (headerName) => {
    const key = SORT_MAP[headerName];
    if (sortConfig.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key, direction: key === 'player_name' ? 'asc' : 'desc' });
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const key = sortConfig.key;
    let valA = a[key];
    let valB = b[key];

    if (key !== 'player_name') {
      valA = parseFloat(valA) || 0;
      valB = parseFloat(valB) || 0;
    } else {
      valA = valA || '';
      valB = valB || '';
    }

    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredPlayers = posFilter === 'Todos'
    ? sortedPlayers
    : sortedPlayers.filter(p => p.position === POSITION_MAP[posFilter]);

  const totalGoals = players.reduce((s, p) => s + (parseInt(p.goals) || 0), 0);
  const totalAssists = players.reduce((s, p) => s + (parseInt(p.assists) || 0), 0);
  const avgRating = players.length
    ? (players.reduce((s, p) => s + (parseFloat(p.rating) || 0), 0) / players.length).toFixed(1)
    : 0;
  const totalWithAppearances = players.filter(p => (parseInt(p.appearances) || 0) > 0).length;

  // Radar logic
  const validPlayers = filteredPlayers.length > 0 ? filteredPlayers : players;
  const selectedPlayer = validPlayers.find(p => p.player_name === selectedPlayerName) || validPlayers[0];

  const activePlayers = validPlayers.filter(p => (parseInt(p.appearances) || 0) > 0);
  const denominator = activePlayers.length || 1;

  const avgTeamGoals = activePlayers.reduce((s, p) => s + (parseInt(p.goals) || 0), 0) / denominator;
  const avgTeamAssists = activePlayers.reduce((s, p) => s + (parseInt(p.assists) || 0), 0) / denominator;
  const avgTeamShots = activePlayers.reduce((s, p) => s + (parseInt(p.shots_on_target) || 0), 0) / denominator;
  const avgTeamPasses = activePlayers.reduce((s, p) => s + (parseInt(p.accurate_passes) || 0), 0) / denominator;
  const avgTeamTackles = activePlayers.reduce((s, p) => s + (parseInt(p.tackles) || 0), 0) / denominator;

  const maxGoals = Math.max(1, ...validPlayers.map(p => parseInt(p.goals) || 0));
  const maxAssists = Math.max(1, ...validPlayers.map(p => parseInt(p.assists) || 0));
  const maxShots = Math.max(1, ...validPlayers.map(p => parseInt(p.shots_on_target) || 0));
  const maxPasses = Math.max(1, ...validPlayers.map(p => parseInt(p.accurate_passes) || 0));
  const maxTackles = Math.max(1, ...validPlayers.map(p => parseInt(p.tackles) || 0));

  let playerRadarData = null;
  if (selectedPlayer) {
    playerRadarData = {
      labels: ['Gols', 'Assistências', 'Chutes no Alvo', 'Passes Certos', 'Desarmes'],
      datasets: [
        {
          label: selectedPlayer.player_name,
          data: [
            ((parseInt(selectedPlayer.goals) || 0) / maxGoals) * 100,
            ((parseInt(selectedPlayer.assists) || 0) / maxAssists) * 100,
            ((parseInt(selectedPlayer.shots_on_target) || 0) / maxShots) * 100,
            ((parseInt(selectedPlayer.accurate_passes) || 0) / maxPasses) * 100,
            ((parseInt(selectedPlayer.tackles) || 0) / maxTackles) * 100,
          ],
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.8)',
          pointBackgroundColor: '#fff',
          pointBorderColor: '#000',
          borderWidth: 2,
        },
        {
          label: 'Média do Time',
          data: [
            (avgTeamGoals / maxGoals) * 100,
            (avgTeamAssists / maxAssists) * 100,
            (avgTeamShots / maxShots) * 100,
            (avgTeamPasses / maxPasses) * 100,
            (avgTeamTackles / maxTackles) * 100,
          ],
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          borderColor: 'rgba(16, 185, 129, 0.4)',
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#000',
          borderWidth: 1.5,
          borderDash: [5, 5]
        }
      ]
    };
  }

  const playerRadarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.05)' },
        grid: { color: 'rgba(255,255,255,0.05)' },
        pointLabels: { color: '#a1a1aa', font: { size: 9, weight: 'bold' } },
        ticks: { display: false, min: 0, max: 100 }
      }
    },
    plugins: { legend: { position: 'bottom', labels: { color: '#fff', font: { size: 10, weight: 'bold' }, usePointStyle: true } } }
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-lg px-3 py-1.5 font-mono text-[9px] text-zinc-500 mb-2">
        <span>📊</span>
        <span>gold.obt_player_season_stats · jogadores do elenco</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Total de Gols" value={fmt(totalGoals)} sub="SUM(goals)" />
        <KpiCard label="Total Assistências" value={fmt(totalAssists)} sub="SUM(assists)" />
        <KpiCard label="Rating Médio" value={`${avgRating}`} sub="AVG(rating)" />
        <KpiCard label="Jogadores Usados" value={fmt(totalWithAppearances)} sub="appearances > 0" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="lg:w-1/3 bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-1">Análise Individual</p>
          <p className="text-[8px] text-zinc-700 uppercase tracking-widest mb-5">Selecione na tabela para comparar</p>
          
          <div className="mb-4">
            <select
              value={selectedPlayer?.player_name || ''}
              onChange={(e) => setSelectedPlayerName(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm font-bold text-white cursor-pointer focus:outline-none focus:border-white/30"
            >
              {validPlayers.map(p => (
                <option key={p.player_name} value={p.player_name} className="bg-zinc-900">
                  {p.player_name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative h-64 w-full">
            {playerRadarData && <Radar data={playerRadarData} options={playerRadarOptions} />}
          </div>
          <p className="mt-4 text-[9px] text-zinc-800 tracking-[0.15em] uppercase text-center">
            Métricas normalizadas (Max = 100%)
          </p>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {Object.keys(POSITION_MAP).map(pos => (
              <button
                key={pos}
                onClick={() => {
                  setPosFilter(pos);
                  setSelectedPlayerName(''); // reset radar
                }}
                className={`px-4 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-200
                  ${posFilter === pos
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.03] border-white/[0.08] text-zinc-500 hover:text-zinc-300'
                  }`}
              >
                {pos}
              </button>
            ))}
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 flex-1 overflow-hidden">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-5">
              Estatísticas por Jogador
            </p>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#050505] z-10">
                  <tr>
                    {['Jogador', 'Jogos', 'Gols', 'Assist', 'Chutes ✓/✗', 'Passes ✓/✗', 'Desarmes', 'Intercep.', '🟡/🔴', 'Rating'].map(h => (
                      <th 
                        key={h} 
                        onClick={() => handleSort(h)}
                        className="text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-700 text-left px-3 pb-3 border-b border-white/[0.06] first:pl-0 cursor-pointer hover:text-white transition-colors group select-none"
                      >
                        <div className="flex items-center gap-1">
                          {h}
                          <span className={`text-[10px] ${sortConfig.key === SORT_MAP[h] ? 'text-zinc-400' : 'text-transparent group-hover:text-zinc-600'}`}>
                            {sortConfig.key === SORT_MAP[h] ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((p, i) => {
                    const isSelected = p.player_name === selectedPlayer?.player_name;
                    return (
                    <tr 
                      key={i} 
                      onClick={() => setSelectedPlayerName(p.player_name)}
                      className={`group cursor-pointer transition-colors ${isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'}`}
                    >
                      <td className="py-3.5 pl-0 pr-3 border-b border-white/[0.04] group-last:border-0">
                        <span className="text-white font-bold text-sm">{p.player_name}</span>
                        {p.position && (
                          <span className="ml-2 px-2 py-0.5 border border-white/10 rounded text-[8px] text-zinc-500 tracking-widest">
                            {p.position}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-zinc-500 text-xs border-b border-white/[0.04] group-last:border-0">{p.appearances}</td>
                      <td className="py-3.5 px-3 border-b border-white/[0.04] group-last:border-0">
                        <span className="text-white font-black text-sm">{p.goals}</span>
                      </td>
                      <td className="py-3.5 px-3 text-zinc-500 text-xs border-b border-white/[0.04] group-last:border-0">{p.assists}</td>
                      <td className="py-3.5 px-3 text-xs border-b border-white/[0.04] group-last:border-0">
                        <span className="text-white font-bold">{p.shots_on_target}</span>
                        <span className="text-zinc-700 mx-0.5">/</span>
                        <span className="text-zinc-500">{p.shots_off_target}</span>
                      </td>
                      <td className="py-3.5 px-3 text-xs border-b border-white/[0.04] group-last:border-0">
                        <span className="text-white font-bold">{p.accurate_passes}</span>
                        <span className="text-zinc-700 mx-0.5">/</span>
                        <span className="text-zinc-500">{p.passes ? p.passes - p.accurate_passes : '—'}</span>
                      </td>
                      <td className="py-3.5 px-3 text-zinc-500 text-xs border-b border-white/[0.04] group-last:border-0">{p.tackles}</td>
                      <td className="py-3.5 px-3 text-zinc-500 text-xs border-b border-white/[0.04] group-last:border-0">{p.interceptions}</td>
                      <td className="py-3.5 px-3 text-zinc-500 text-xs border-b border-white/[0.04] group-last:border-0">
                        <span className="text-yellow-400">{p.yellow_cards}</span>
                        <span className="text-zinc-700 mx-0.5">/</span>
                        <span className="text-red-500">{p.red_cards}</span>
                      </td>
                      <td className="py-3.5 px-3 border-b border-white/[0.04] group-last:border-0">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 text-white font-black text-xs">
                          {fmt(p.rating, 1)}
                        </span>
                      </td>
                    </tr>
                  )})}
                  {filteredPlayers.length === 0 && (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-zinc-700 text-sm">
                        Nenhum jogador encontrado para esta posição.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[9px] text-zinc-800 tracking-[0.15em] uppercase">
              Chutes ✓ = shots_on_target · ✗ = shots_off_target &nbsp;|&nbsp; Passes ✓ = accurate_passes · ✗ = passes − accurate_passes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsClient({ initialData }) {
  const {
    seasons,
    selectedSeason: initialSeason,
    teams: initialTeams,
    team: initialTeam,
    comparison: initialComparison,
    players: initialPlayers,
  } = initialData;

  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  const [selectedTeam, setSelectedTeam] = useState(initialTeam?.team_name || 'Corinthians');
  const [activeTab, setActiveTab] = useState('times');
  const [teams, setTeams] = useState(initialTeams);
  const [teamData, setTeamData] = useState(initialTeam);
  const [comparison, setComparison] = useState(initialComparison);
  const [players, setPlayers] = useState(initialPlayers);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (teamName, season) => {
    setLoading(true);
    try {
      const qs = `team_name=${encodeURIComponent(teamName)}&season=${encodeURIComponent(season)}`;
      const [statsRes, playersRes] = await Promise.all([
        fetch(`/api/analytics/team-stats?${qs}`).then(r => r.json()),
        fetch(`/api/analytics/players?${qs}`).then(r => r.json()),
      ]);
      setTeamData(statsRes.team);
      setComparison(statsRes.comparison);
      setPlayers(playersRes.players);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTeamChange = useCallback((teamName) => {
    setSelectedTeam(teamName);
    fetchData(teamName, selectedSeason);
  }, [selectedSeason, fetchData]);

  const handleSeasonChange = useCallback(async (season) => {
    setSelectedSeason(season);
    setLoading(true);
    try {
      const teamsRes = await fetch(`/api/analytics/teams?season=${encodeURIComponent(season)}`).then(r => r.json());
      const newTeams = teamsRes.teams || [];
      setTeams(newTeams);
      const newTeam = newTeams.includes(selectedTeam) ? selectedTeam : (newTeams[0] || 'Corinthians');
      setSelectedTeam(newTeam);
      await fetchData(newTeam, season);
    } catch (err) {
      console.error('Erro ao trocar temporada:', err);
      setLoading(false);
    }
  }, [selectedTeam, fetchData]);

  return (
    <main className="min-h-screen relative bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 relative z-10">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Brasileirão Série A · Dados em Tempo Real
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
                Analytics
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mt-2">
                Gold Layer · PostgreSQL
              </p>
            </div>

            {/* Selectors */}
            <div className="flex flex-wrap gap-4 items-end">
              {/* Season selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600">Temporada</label>
                <div className="relative">
                  <select
                    value={selectedSeason || ''}
                    onChange={(e) => handleSeasonChange(e.target.value)}
                    disabled={loading}
                    className="appearance-none bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-white cursor-pointer focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50 min-w-[130px]"
                  >
                    {seasons.map(s => (
                      <option key={s} value={s} className="bg-zinc-900">{s}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">▾</div>
                </div>
              </div>

              {/* Team selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600">Time</label>
                <div className="relative">
                  <select
                    value={selectedTeam}
                    onChange={(e) => handleTeamChange(e.target.value)}
                    disabled={loading}
                    className="appearance-none bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-white cursor-pointer focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50 min-w-[200px]"
                  >
                    {teams.map(t => (
                      <option key={t} value={t} className="bg-zinc-900">{t}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">▾</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/[0.06] mb-9">
          {[
            { id: 'times', label: 'Visão por Time' },
            { id: 'jogadores', label: 'Visão por Jogador' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.25em] border-b-2 -mb-px transition-all duration-200
                ${activeTab === tab.id
                  ? 'text-white border-white'
                  : 'text-zinc-600 border-transparent hover:text-zinc-400'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 animate-pulse">
              Carregando dados...
            </div>
          </div>
        )}

        {/* Tab content */}
        {!loading && activeTab === 'times' && (
          <TabTimes team={teamData} comparison={comparison} selectedTeam={selectedTeam} />
        )}
        {!loading && activeTab === 'jogadores' && (
          <TabJogadores players={players} />
        )}

        <footer className="mt-16 pt-6 border-t border-white/[0.04] text-center text-[9px] font-bold uppercase tracking-[0.4em] text-white/10">
          CVMC Analytics · Gold Layer · Dados ao vivo · Brasileirão
        </footer>
      </div>
    </main>
  );
}
