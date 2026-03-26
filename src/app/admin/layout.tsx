'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, Users, CheckSquare, Dices, Gift, ArrowLeft } from 'lucide-react';
import styles from '@/components/admin/Admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: <Home size={20} /> },
    { label: 'Users & Subs', href: '/admin/users', icon: <Users size={20} /> },
    { label: 'Draw Engine', href: '/admin/draws', icon: <Dices size={20} /> },
    { label: 'Charities', href: '/admin/charities', icon: <Heart size={20} /> },
    { label: 'Winner Verification', href: '/admin/winners', icon: <CheckSquare size={20} /> },
  ];

  return (
    <div className={styles.layoutContainer}>
      
      {/* Admin Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoText} style={{ fontSize: '1.2rem' }}>
            Impact<span style={{color: 'var(--primary)'}}>Golf</span>
          </div>
          <div className={styles.adminBadge}>Admin Console</div>
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            <div className={styles.navLabel}>Management</div>
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`${styles.navItem} ${pathname === item.href ? styles.activeNav : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div style={{ padding: '0 16px', marginTop: '40px' }}>
            <Link href="/dashboard" className={styles.navItem}>
              <ArrowLeft size={20} />
              <span>Exit Admin</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {children}
      </main>
      
    </div>
  );
}
