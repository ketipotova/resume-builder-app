import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client if env vars are not set (for UI-only mode)
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Call Supabase Edge Function to scrape job posting
 */
export async function scrapeJobPosting(url: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase.functions.invoke('scrape-job', {
    body: { url },
  });

  if (error) {
    throw new Error(`Failed to scrape job posting: ${error.message}`);
  }

  return data;
}
