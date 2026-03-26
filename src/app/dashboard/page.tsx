import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import DashboardOverviewClient from '@/components/dashboard/DashboardOverviewClient';

export default async function DashboardOverview({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const payment = resolvedParams.payment as string | undefined;
  const plan = resolvedParams.plan as string | undefined;

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
  const rawEmail = user?.email || 'Golfer';
  
  // Clean dynamic email splitting
  const displayName = rawEmail.includes('@') ? rawEmail.split('@')[0] : rawEmail;

  return (
    <DashboardOverviewClient 
      displayName={displayName} 
      paymentStatus={payment} 
      paymentPlan={plan} 
    />
  );
}
