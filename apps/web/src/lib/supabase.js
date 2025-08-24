import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase - URL:", supabaseUrl);
console.log("Supabase - Anon Key:", supabaseAnon ? "Configurado" : "Não configurado");

if (!supabaseUrl || !supabaseAnon) {
  console.error("Supabase - Variáveis de ambiente não configuradas!");
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
