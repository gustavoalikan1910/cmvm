import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardContent from '@/components/DashboardContent';

export default function Dashboard() {
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

  return <DashboardContent db_user={db_user} />;
}
