'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, Edit3, Settings, LogOut, Menu, X, Gift } from 'lucide-react';
import styles from '@/components/dashboard/Dashboard.module.css';
import { supabase } from '@/lib/supabase/client';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: <Home size={20} /> },
    { label: 'My Scores', href: '/dashboard/scores', icon: <Edit3 size={20} /> },
    { label: 'Charity Impact', href: '/dashboard/charity', icon: <Heart size={20} /> },
    { label: 'Winnings & Draws', href: '/dashboard/winnings', icon: <Gift size={20} /> },
    { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
    { label: 'Monthly Draw', href: '/draws', icon: <Gift size={20} /> },
    { label: 'How it Works', href: '/how-it-works', icon: <Heart size={20} /> },
  ];

  return (
    <div className={styles.layoutContainer}>
      
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <Link href="/" className={styles.logo}>
          <Heart className={styles.logoIcon} size={24} />
          <span className={styles.logoText}>Impact<span style={{color: 'var(--primary)'}}>Golf</span></span>
        </Link>
        <button className={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}>
            <Heart className={styles.logoIcon} size={28} />
            <span className={styles.logoText}>Impact<span style={{color: 'var(--primary)'}}>Golf</span></span>
          </Link>
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`${styles.navItem} ${pathname === item.href ? styles.activeNav : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/subscribe" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem', padding: '10px' }}>
            Join the Club
          </Link>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {children}
      </main>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}
