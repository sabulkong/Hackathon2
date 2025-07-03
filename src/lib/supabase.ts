import { createClient } from '@supabase/supabase-js';

// Use placeholder values that are valid URLs to prevent initialization errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_project_url' 
  ? import.meta.env.VITE_SUPABASE_URL 
  : 'https://placeholder.supabase.co';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY && 
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your_supabase_anon_key'
  ? import.meta.env.VITE_SUPABASE_ANON_KEY 
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;