'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { supabase } from '@/lib/supabase/client';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const pathname = usePathname() || '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check active session to dynamically change Log In -> Dashboard
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Heart className={styles.logoIcon} strokeWidth={2.5} size={28} />
          <span className={styles.logoText}>Impact<span className={styles.logoHighlight}>Golf</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <Link href="/charities" className={styles.navLink}>Charities</Link>
          <Link href="/draws" className={styles.navLink}>Monthly Draw</Link>
          <Link href="/how-it-works" className={styles.navLink}>How it Works</Link>
        </nav>

        <div className={styles.authActions}>
          {session ? (
            <Link href="/dashboard" className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Log In</Link>
              <Link href="/subscribe" className="btn-primary">Join the Club</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/charities" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Charities</Link>
          <Link href="/draws" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Monthly Draw</Link>
          <Link href="/how-it-works" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>How it Works</Link>
          <Link href="/login" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Log In</Link>
          <Link href="/subscribe" className={styles.mobileNavBtn} onClick={() => setMobileMenuOpen(false)}>Join the Club</Link>
        </div>
      )}
    </header>
  );
}
