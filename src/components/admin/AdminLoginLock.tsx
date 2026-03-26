'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Lock, LogIn, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginLock() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      
      // Refresh the router so the Server Component Layout can re-evaluate the auth session
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || 'Verification failed. Only the master administrator may enter.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', padding: '24px', background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)'
    }}>
      
      <Link href="/" style={{ position: 'absolute', top: 32, left: 32, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <ArrowLeft size={16} /> Return to Homepage
      </Link>

      <div style={{
        background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '420px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            color: '#38bdf8'
          }}>
            <Lock size={32} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>Restricted Access</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>Superuser authentication required.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '24px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px' }}>Administrator Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                color: '#fff', fontSize: '1rem', outline: 'none'
              }}
              placeholder="admin@impactgolf.org"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px' }}>Master Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                color: '#fff', fontSize: '1rem', outline: 'none'
              }}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%', padding: '14px', background: '#38bdf8', color: '#0f172a',
              border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              marginTop: '8px'
            }}
          >
            {loading ? 'Validating Key...' : <><LogIn size={18} /> Authenticate Session</>}
          </button>
        </form>
      </div>
    </div>
  );
}
