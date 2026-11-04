import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ljaspbodmxluceeysdqs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_95DRts-irjx3gz6UT3IeFg_vDDe2k-9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
