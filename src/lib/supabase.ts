import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Call Supabase Edge Function to scrape job posting
 */
export async function scrapeJobPosting(url: string) {
  const { data, error } = await supabase.functions.invoke('scrape-job', {
    body: { url },
  });

  if (error) {
    throw new Error(`Failed to scrape job posting: ${error.message}`);
  }

  return data;
}
