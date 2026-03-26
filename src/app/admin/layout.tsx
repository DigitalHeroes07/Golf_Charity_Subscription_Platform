// Server Component Layout
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, Users, CheckSquare, Dices, Gift, ArrowLeft } from 'lucide-react';
import styles from '@/components/admin/Admin.module.css';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  
  // Advanced Security Gate: Only the assigned Superuser (Owner) can bypass this layout
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'modeltraining012@gmail.com';
  
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect('/dashboard');
  }

  // To prevent Next 15 Client component errors in a layout, we pass the standard JSX directly
  // Note: we removed usePathname because Server Layouts cannot use client side hooks natively without a wrapper.
  
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
                className={styles.navItem}
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
