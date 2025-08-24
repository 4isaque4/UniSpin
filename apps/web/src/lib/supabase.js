import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase - URL:", supabaseUrl);
console.log("Supabase - Anon Key:", supabaseAnon ? "Configurado" : "Não configurado");
console.log("Todas as variáveis de ambiente:", import.meta.env);

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
