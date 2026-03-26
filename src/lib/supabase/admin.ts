import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
// The Service Role Key bypasses Row Level Security and is ONLY safe to use in Server Components/API Routes!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
