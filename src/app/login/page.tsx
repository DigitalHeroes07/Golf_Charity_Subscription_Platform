'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import styles from '@/components/auth/Auth.module.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.bgElements}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
      </div>

      <motion.div 
        className={`glass-panel ${styles.authCard}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            <Heart className={styles.logoIcon} strokeWidth={2.5} size={28} />
            <span className={styles.logoText}>Impact<span style={{color: 'var(--primary)'}}>Golf</span></span>
          </Link>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to track your scores and impact.</p>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <input 
              className={styles.input}
              id="email"
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className={styles.label} htmlFor="password">Password</label>
              <Link href="/forgot-password" className={styles.link} style={{ fontSize: '0.85rem' }}>
                Forgot?
              </Link>
            </div>
            <input 
              className={styles.input}
              id="password"
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`btn-primary ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <div className={styles.footer}>
          Don't have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}
