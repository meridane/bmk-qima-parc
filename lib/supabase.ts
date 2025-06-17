import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'  // adapte ce chemin si besoin

export const supabase = createBrowserClient<Database>()
