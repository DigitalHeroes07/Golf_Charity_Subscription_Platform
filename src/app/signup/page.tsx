'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import styles from '@/components/auth/Auth.module.css';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        throw error;
      }

      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError('This email is already registered. Please sign in instead.');
        return;
      }

      // Automatically create a user record in our DB using a trigger or via app logic.
      // Ideally, hook this user creation payload to a Postgres trigger downstream
      // but if email confirmation is disabled, user session is available instantly.
      
      if (data.session) {
        router.push('/dashboard');
      } else {
        setSuccess('Check your email to confirm your account and continue.');
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to sign up.');
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
          <h1 className={styles.title}>Join the Club</h1>
          <p className={styles.subtitle}>Start making a difference with every round.</p>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}
        {success && <div className={styles.successBox}>{success}</div>}

        {!success && (
          <form onSubmit={handleSignup}>
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
              <label className={styles.label} htmlFor="password">Password</label>
              <input 
                className={styles.input}
                id="password"
                type="password" 
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
              <input 
                className={styles.input}
                id="confirmPassword"
                type="password" 
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`btn-primary ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Create Account'}
            </button>
          </form>
        )}

        <div className={styles.footer}>
          Already have an account? <Link href="/login" className={styles.link}>Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}
