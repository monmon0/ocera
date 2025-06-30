
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a dummy client for development when env vars are missing
const createDummyClient = () => {
  return {
    from: () => ({
      select: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      insert: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      update: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      delete: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      eq: function() { return this; },
      neq: function() { return this; },
      gt: function() { return this; },
      gte: function() { return this; },
      lt: function() { return this; },
      lte: function() { return this; },
      like: function() { return this; },
      ilike: function() { return this; },
      is: function() { return this; },
      in: function() { return this; },
      order: function() { return this; },
      limit: function() { return this; },
      range: function() { return this; },
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      signUp: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      signOut: () => Promise.resolve({ error: null }),
    }
  };
};

// Initialize clients
let supabaseClient: any;
let supabaseAdminClient: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables missing. Using dummy client for development.");
  const dummyClient = createDummyClient();
  supabaseClient = dummyClient;
  supabaseAdminClient = dummyClient;
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  supabaseAdminClient = supabaseServiceKey 
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    : supabaseClient;
}

export const supabase = supabaseClient;
export const supabaseAdmin = supabaseAdminClient;
