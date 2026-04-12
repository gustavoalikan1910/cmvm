import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 animate-fade-in-up">
        <div>
          <div className="glass-pill mb-4 w-fit">Active Session: {db_user}</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            OPERATOR DASHBOARD
          </h1>
          <p className="text-gray-500 mt-2 text-xs uppercase tracking-widest font-bold">
            Data Access & System Integrity Center
          </p>
        </div>
        <a href="/login" className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 text-white text-[10px] uppercase tracking-widest font-black rounded-2xl transition-all">
          Terminate Session
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[180px]">

        {/* KPI 1 */}
        <div className="md:col-span-4 bento-card flex flex-col justify-between group">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Matches Scanned</div>
          <div className="text-5xl font-black text-white group-hover:scale-105 transition-transform origin-left">1,425</div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full w-[70%] bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="md:col-span-4 bento-card flex flex-col justify-between group">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Active Teams</div>
          <div className="text-5xl font-black text-white group-hover:scale-105 transition-transform origin-left">86</div>
          <div className="text-[10px] text-gray-600">Cross-referenced across 4 leagues</div>
        </div>

        {/* KPI 3 */}
        <div className="md:col-span-4 bento-card flex flex-col justify-between bg-emerald-500/5 border-emerald-500/20">
          <div className="text-[10px] uppercase tracking-widest text-emerald-500/50 font-bold">DaaS Status</div>
          <div className="text-3xl font-black text-emerald-400">OPERATIONAL</div>
          <div className="flex gap-1">
             {[...Array(5)].map((_, i) => (
               <div key={i} className="h-4 w-2 bg-emerald-500/40 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
             ))}
          </div>
        </div>

        {/* PostgreSQL Direct Access (Large) */}
        <div className="md:col-span-12 bento-card h-auto py-12 border-white/20">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-black tracking-tighter mb-4 italic text-white">🔐 DIRECT PROTOCOL ACCESS</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Your credentials are synchronized with our core PostgreSQL engine. 
              Use any DaaS-compatible client (DBeaver, Python/SQLAlchemy) to run queries directly against 
              the <span className="text-white font-bold">Silver</span> and <span className="text-white font-bold">Gold</span> layers.
            </p>
            
            <div className="bg-black/40 border border-white/10 rounded-3xl p-8 font-mono text-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 text-5xl font-black uppercase pointer-events-none">Postgres</div>
               <div className="space-y-4 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-white/5">
                    <span className="text-gray-600 font-sans font-bold uppercase tracking-widest text-[10px]">Cluster Host</span>
                    <span className="text-emerald-500">{process.env.NEXT_PUBLIC_DB_EXTERNAL_HOST || 'cluster-01.cvmc.data'}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-white/5">
                    <span className="text-gray-600 font-sans font-bold uppercase tracking-widest text-[10px]">System Port</span>
                    <span className="text-white">5432</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-white/5">
                    <span className="text-gray-600 font-sans font-bold uppercase tracking-widest text-[10px]">Operator Identity</span>
                    <span className="text-white font-bold">{db_user}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-white/5">
                    <span className="text-gray-600 font-sans font-bold uppercase tracking-widest text-[10px]">Target Database</span>
                    <span className="text-white">cvmc_data</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
                    <span className="text-gray-600 font-sans font-bold uppercase tracking-widest text-[10px]">Access Key</span>
                    <span className="text-gray-400 italic">•••••••••••• (Account Password)</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {['SSL: Required', 'Query: Read-Only', 'Role: Grant Select'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest text-gray-400 font-bold">{tag}</span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <footer className="mt-20 pt-10 border-t border-white/5 text-center">
         <p className="text-[10px] uppercase tracking-widest text-gray-600">
           CVMC DATA INTERFACE v2.4.0-STABLE // ENCRYPTED SESSION
         </p>
      </footer>

    </main>
  );
}
