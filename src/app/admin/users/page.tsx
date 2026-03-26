import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function AdminUsersPage() {
  const { data: authData } = await supabaseAdmin.auth.admin.listUsers();
  const users = authData?.users || [];

  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>User Directory</h1>
          <p className={styles.pageSubtitle}>Manage your registered players securely.</p>
        </div>
      </header>

      <div className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID String</th>
              <th>Email Address</th>
              <th>Login Provider</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td><code style={{background:'rgba(255,255,255,0.05)', padding:'2px 6px', borderRadius:'4px'}}>{u.id.substring(0,8)}...</code></td>
                <td style={{fontWeight: 500}}>{u.email}</td>
                <td style={{textTransform: 'capitalize'}}>{u.app_metadata?.provider || 'Email'}</td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={4} style={{textAlign:'center', padding:'2rem'}}>No users registered yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
