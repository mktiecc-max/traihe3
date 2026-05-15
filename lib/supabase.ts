import { createClient } from '@supabase/supabase-js'

// Browser-safe client (uses anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Lead = {
  id: string
  child_name: string
  phone: string
  birth_year: number
  session: string
  address: string
  notes: string
  source: string
  utm: Record<string, string> | null
  user_agent: string
  ip: string
  status: 'NEW' | 'CALLED' | 'PENDING' | 'CLOSED' | 'LOST'
  assigned_to: string | null
  created_at: string
  updated_at: string
}
