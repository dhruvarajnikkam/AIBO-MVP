import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

if (!isSupabaseConfigured) {
	console.warn(
		'[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Running without database sync.'
	)
}

// Use safe fallbacks so app render never crashes when env values are missing.
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl || fallbackUrl, supabaseKey || fallbackKey)