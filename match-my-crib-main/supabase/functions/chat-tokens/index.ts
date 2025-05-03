/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = "https://zoahrthruljrxniasldg.supabase.co";
// @ts-ignore: Deno namespace
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, user_id, chat_id, property_id, profile_id, feature, amount } = await req.json();
    const supabase = createClient(supabaseUrl, supabaseKey);

    switch (action) {
      case "get_tokens": {
        const { data, error } = await supabase
          .from("user_tokens")
          .select("tokens, total_earned")
          .eq("user_id", user_id)
          .single();
        if (error && error.code !== "PGRST116") throw error;

        return new Response(
          JSON.stringify({
            tokens: data?.tokens ?? 0,
            total_earned: data?.total_earned ?? 0,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }

      case "add_message_token": {
        const { data: _chatData, error: chatError } = await supabase
          .from("chats")
          .select("*")
          .eq("id", chat_id)
          .single();
        if (chatError) throw chatError;

        // Simplified reply check
        const hasReplies = true;
        if (hasReplies) {
          const { error: tokenError } = await supabase
            .from("user_tokens")
            .upsert(
              {
                user_id,
                tokens: supabase.rpc("increment", { num: 1 }),
                total_earned: supabase.rpc("increment", { num: 1 }),
                updated_at: new Date().toISOString(),
              },
              { onConflict: "user_id" }
            );
          if (tokenError) throw tokenError;

          return new Response(
            JSON.stringify({ success: true, message: "Token added for message" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            }
          );
        } else {
          return new Response(
            JSON.stringify({ success: false, message: "No reply detected, token not added" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            }
          );
        }
      }

      case "unlock_chat": {
        const { error: tokenError } = await supabase
          .from("user_tokens")
          .upsert(
            {
              user_id,
              tokens: supabase.rpc("increment", { num: 5 }),
              total_earned: supabase.rpc("increment", { num: 5 }),
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
        if (tokenError) throw tokenError;

        return new Response(
          JSON.stringify({ success: true, message: "Chat unlocked and 5 tokens awarded" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }

      case "use_tokens": {
        if (amount == null || !feature) {
          return new Response(
            JSON.stringify({ success: false, message: "Missing amount or feature" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            }
          );
        }

        const { data: userData, error: userError } = await supabase
          .from("user_tokens")
          .select("tokens")
          .eq("user_id", user_id)
          .single();
        if (userError) throw userError;

        if (!userData || userData.tokens < amount) {
          return new Response(
            JSON.stringify({ success: false, message: "Not enough tokens" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            }
          );
        }

        const { error: updateError } = await supabase
          .from("user_tokens")
          .update({ tokens: userData.tokens - amount })
          .eq("user_id", user_id);
        if (updateError) throw updateError;

        const { error: featureError } = await supabase
          .from("unlocked_features")
          .insert({
            user_id,
            property_id,
            profile_id,
            feature,
            tokens_used: amount,
          });
        if (featureError) throw featureError;

        return new Response(
          JSON.stringify({
            success: true,
            message: `Feature "${feature}" unlocked for ${amount} tokens`,
            remaining_tokens: userData.tokens - amount,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
    }
  } catch (error: unknown) {
    let msg = "Unknown error";
    if (error instanceof Error) {
      msg = error.message;
    } else {
      msg = String(error);
    }
    console.error("Error in chat‑tokens function:", error);
    return new Response(
      JSON.stringify({ error: msg }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
