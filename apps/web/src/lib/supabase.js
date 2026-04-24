import { createClient } from "@supabase/supabase-js";

// Fallbacks mantêm o frontend funcional mesmo quando o build não injeta VITE_*.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://xiuycdutdnjqpsmoglqz.supabase.co";
const supabaseAnon =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdXljZHV0ZG5qcXBzbW9nbHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NjQ1NDksImV4cCI6MjA3MDQ0MDU0OX0.QTm0MschYK3g6LMkT0hMBT9vOoe_fWKViV0QYb0f21Q";

console.log("Supabase - URL:", supabaseUrl);
console.log("Supabase - Anon Key:", supabaseAnon ? "Configurado" : "Não configurado");

if (!supabaseUrl || !supabaseAnon) {
  console.error("Supabase - Variáveis de ambiente não configuradas!");
  console.error("VITE_SUPABASE_URL:", supabaseUrl);
  console.error("VITE_SUPABASE_ANON_KEY:", supabaseAnon);
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
