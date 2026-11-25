// Optional public Supabase settings for static deployments. Leave empty to use localStorage.
// Configure the reviews table with a public anonymous key and suitable RLS policies.
window.GADWAY_CONFIG = Object.assign({
  supabaseUrl: window.SUPABASE_URL || "",
  supabaseAnonKey: window.SUPABASE_ANON_KEY || ""
}, window.GADWAY_CONFIG || {});
