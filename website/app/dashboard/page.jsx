import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import pool from '@/lib/db';
import DashboardContent from '@/components/DashboardContent';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const cookieStore = cookies();
  const session = cookieStore.get('cvmc_session');

  if (!session) {
    redirect('/login');
  }

  let user = null;
  if (session) {
    try {
      const base64Url = session.value.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
      user = JSON.parse(jsonPayload);
    } catch {
      user = null;
    }
  }

  const db_user = user?.nome?.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'undefined';

  let matchesCount = '0';
  let teamsCount = '0';

  try {
    const [matchesRes, teamsRes] = await Promise.all([
      pool.query('SELECT COUNT(DISTINCT event_id) FROM "gold"."obt_team_match_stats"'),
      pool.query('SELECT COUNT(DISTINCT team_id) FROM "gold"."obt_team_match_stats"')
    ]);

    matchesCount = matchesRes.rows[0].count;
    teamsCount = teamsRes.rows[0].count;
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
  }

  return <DashboardContent 
    db_user={db_user} 
    matchesCount={matchesCount} 
    teamsCount={teamsCount} 
  />;
}
