import { createClient } from '@supabase/supabase-js';

// These are the *publishable* client-side values — safe to ship in the built bundle.
// Row Level Security on every table is what actually protects the data (see
// 08_Supabase_백엔드_설정.md). Never put the secret/service key here.
const SUPABASE_URL = 'https://nbrfabujooitvmsmkawr.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_bxtiaaNfwliORyVfee9RwA_QXRDjrK2';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type ReservationRow = {
  id: string;
  user_id: string;
  campaign_id: string;
  status: string;
  shipping: { recipient: string; phone: string; zip: string; address: string } | null;
  created_at: string;
  updated_at: string;
};
