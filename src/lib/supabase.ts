import { createClient } from '@supabase/supabase-js';

// Check if Supabase environment variables are properly configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that we have proper Supabase configuration
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co') &&
  supabaseUrl.length > 30 && // Basic length check
  supabaseAnonKey.length > 100; // JWT tokens are typically longer

console.log('Supabase Configuration Check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlValid: supabaseUrl?.startsWith('https://') && supabaseUrl?.includes('.supabase.co'),
  keyValid: supabaseAnonKey?.length > 100,
  isConfigured: isSupabaseConfigured
});

if (!isSupabaseConfigured) {
  console.warn('Supabase is not properly configured. Running in demo mode.');
  console.warn('To enable authentication, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

// Use actual values if configured, otherwise use safe placeholder values
const clientUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const clientKey = isSupabaseConfigured ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

export const supabase = createClient(clientUrl, clientKey);

// Export a flag to check if Supabase is properly configured
export const isSupabaseReady = isSupabaseConfigured;

export default supabase;