import React from 'react';
import styles from '@/components/dashboard/Settings.module.css';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import SettingsClient from '@/components/dashboard/SettingsClient';

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';
  
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email || 'test@example.com';
  const name = email.includes('@') ? email.split('@')[0] : email;

  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Profile Settings</h1>
          <p className={styles.pageSubtitle}>Manage your account details and view your history of impact.</p>
        </div>
      </header>

      <SettingsClient initialEmail={email} initialName={name} />
    </div>
  );
}
