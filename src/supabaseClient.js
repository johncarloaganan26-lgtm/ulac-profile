import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  console.warn('Supabase credentials missing. Please set them in your .env file.');
}

export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id')) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      auth: { 
        getSession: () => Promise.resolve({ data: { session: null } }), 
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase keys not configured in .env' } }),
        signOut: () => Promise.resolve()
      },
      from: (table) => ({
        select: () => ({ order: () => Promise.resolve({ data: [], error: { message: `Supabase not connected. Could not fetch from ${table}.` } }) }),
        update: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not connected.' } }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not connected.' } }) }),
        insert: () => Promise.resolve({ error: { message: 'Supabase not connected. Check your .env file and RESTART your terminal.' } })
      })
    };
