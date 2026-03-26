import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { Users, TrendingUp, Heart, Gift, ArrowUpRight } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function AdminOverview() {
  
  // Real Server-Side Data Fetch bypassing RLS
  const { data: authData, error } = await supabaseAdmin.auth.admin.listUsers();
  const realUsers = authData?.users || [];
  
  const stats = {
    totalUsers: realUsers.length,
    activeSubs: 0, // Production db zero-state
    totalPrizePool: 0, 
    charityContributions: 0 
  };

  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Platform Overview</h1>
          <p className={styles.pageSubtitle}>High-level metrics and system status.</p>
        </div>
      </header>

      <div className={styles.grid}>
        
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Total Users</span>
            <Users size={18} className={styles.statIcon} />
          </div>
          <div className={styles.statValue}>{stats.totalUsers.toLocaleString()}</div>
          <div className={styles.statTrend}><TrendingUp size={14}/> +12% this month</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Active Subscriptions</span>
            <CheckSquare size={18} className={styles.statIcon} />
          </div>
          <div className={styles.statValue}>{stats.activeSubs.toLocaleString()}</div>
          <div className={styles.statTrend}><TrendingUp size={14}/> +8% this month</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Total Prize Pool Distributed</span>
            <Gift size={18} className={styles.statIcon} />
          </div>
          <div className={styles.statValue}>₹{stats.totalPrizePool.toLocaleString()}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Charity Impact</span>
            <Heart size={18} className={styles.statIcon} />
          </div>
          <div className={styles.statValue}>₹{stats.charityContributions.toLocaleString()}</div>
        </div>

      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Recent Activity</h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Event</th>
              <th>User / Target</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {realUsers.slice(0, 3).map((u, i) => (
              <tr key={u.id}>
                <td>New Registration</td>
                <td>{u.email}</td>
                <td style={{color: 'var(--primary)'}}>Verified</td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            
            {realUsers.length === 0 && (
              <tr>
                <td colSpan={4} style={{textAlign: 'center', opacity: 0.5}}>No recent metrics available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

// Dummy icon to satisfy import error avoidance
function CheckSquare({ size, className }: { size: number, className: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;
}
