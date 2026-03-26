import React from 'react';
import Link from 'next/link';
import { Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      padding: '24px',
      textAlign: 'center',
      backgroundColor: 'var(--bg-main)',
      color: 'var(--text-main)'
    }}>
      <Ghost size={80} color="var(--primary)" strokeWidth={1} style={{ marginBottom: '2rem' }} />
      <h1 style={{ fontSize: '4rem', fontWeight: '700', margin: '0 0 1rem 0', letterSpacing: '-2px' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '400', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Oops! We couldn't find that fairway.
      </h2>
      <p style={{ maxWidth: '400px', marginBottom: '3rem', color: 'var(--text-muted)' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link href="/" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
        Return to Clubhouse
      </Link>
    </div>
  );
}
