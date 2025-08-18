export const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS ||
    'https://uni-spin-web.vercel.app,http://localhost:5173'
  ).split(',');
  
  export const SUPABASE_URL = process.env.SUPABASE_URL;
  export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // << usar no back apenas
  