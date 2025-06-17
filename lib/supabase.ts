import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/supabase'  // le fichier généré

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default supabase