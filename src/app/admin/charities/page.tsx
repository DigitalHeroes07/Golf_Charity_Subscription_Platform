import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { charityDirectory } from '@/app/charities/page';

export default function AdminCharitiesPage() {
  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Charity Partnerships</h1>
          <p className={styles.pageSubtitle}>Current roster of verified charitable organizations.</p>
        </div>
      </header>

      <div className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Charity ID</th>
              <th>Organization Name</th>
              <th>Sector Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {charityDirectory.map(c => (
              <tr key={c.id}>
                <td>#CH-{c.id.padStart(4, '0')}</td>
                <td style={{fontWeight: 500, color: 'var(--primary)'}}>{c.name}</td>
                <td>{c.category}</td>
                <td><span style={{background:'rgba(16,185,129,0.1)', color:'#10b981', padding:'4px 8px', borderRadius:'12px', fontSize:'0.8rem'}}>Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
