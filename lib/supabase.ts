import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase' // ← très important

export const supabase = createClientComponentClient<Database>()