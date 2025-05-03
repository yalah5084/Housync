/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zoahrthruljrxniasldg.supabase.co";
// @ts-ignore: Deno namespace
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all matches
    const { data, error } = await supabase
      .from("matches")
      .select("*");

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ data }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error: unknown) {
    // Narrow unknown → string
    let msg = "Unknown error";
    if (error instanceof Error) {
      msg = error.message;
    } else {
      msg = String(error);
    }

    console.error("Error fetching matches:", error);

    return new Response(
      JSON.stringify({ error: msg }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
