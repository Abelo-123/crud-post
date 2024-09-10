import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your Supabase URL and Key
const supabaseUrl = 'https://gfgpqcpbamukvojnptpf.supabase.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZ3BxY3BiYW11a3Zvam5wdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMTQ1MTUsImV4cCI6MjA0MDc5MDUxNX0.6vqGM6hohOQr-Tvlx9f4KmX-zCypFuHtibRMtVPPYns';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
