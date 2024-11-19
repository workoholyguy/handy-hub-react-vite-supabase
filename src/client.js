// Imports the createClient function from Supabase, used to connect to the Supabase database
import { createClient } from "@supabase/supabase-js";

// Retrieves the Supabase URL and API Key from environment variables
let URL = import.meta.env.VITE_SUPABASE_URL;
let API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Checks if either URL or API_KEY is missing and logs an error if so
if (!URL || !API_KEY) {
  console.error("Supabase URL or API Key is missing.");
}

// Initializes a new Supabase client using the provided URL and API Key
export const supabase = createClient(URL, API_KEY);
