
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = "https://zoahrthruljrxniasldg.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { action, user_id, chat_id, property_id, profile_id, feature, amount } = requestData;
    const supabase = createClient(supabaseUrl, supabaseKey);

    switch (action) {
      case 'get_tokens': {
        // Get tokens for a user
        const { data, error } = await supabase
          .from('user_tokens')
          .select('tokens, total_earned')
          .eq('user_id', user_id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        return new Response(
          JSON.stringify({ 
            tokens: data?.tokens || 0,
            total_earned: data?.total_earned || 0
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }

      case 'add_message_token': {
        // Add a token for sending a message with a reply
        // First get the chat and check if both users have interacted
        const { data: chatData, error: chatError } = await supabase
          .from('chats')
          .select('*')
          .eq('id', chat_id)
          .single();
          
        if (chatError) {
          throw chatError;
        }
        
        // Check if there are replies in the chat (simplified for demo)
        const hasReplies = true; // In a real app, check if there are messages from both users
        
        if (hasReplies) {
          // Add token for the user - upsert pattern
          const { error: tokenError } = await supabase
            .from('user_tokens')
            .upsert({
              user_id,
              tokens: supabase.rpc('increment', { num: 1 }),
              total_earned: supabase.rpc('increment', { num: 1 }),
              updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
          
          if (tokenError) {
            throw tokenError;
          }
          
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
      
      case 'unlock_chat': {
        // Award 5 tokens for completing preferences and unlocking chat
        const { error: tokenError } = await supabase
          .from('user_tokens')
          .upsert({
            user_id,
            tokens: supabase.rpc('increment', { num: 5 }),
            total_earned: supabase.rpc('increment', { num: 5 }),
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });
        
        if (tokenError) {
          throw tokenError;
        }
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Chat unlocked and 5 tokens awarded" 
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }

      case 'use_tokens': {
        // Use tokens to unlock a feature
        if (!amount || !feature) {
          return new Response(
            JSON.stringify({ success: false, message: "Missing amount or feature" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            }
          );
        }
        
        // Check if user has enough tokens
        const { data: userData, error: userError } = await supabase
          .from('user_tokens')
          .select('tokens')
          .eq('user_id', user_id)
          .single();
          
        if (userError) {
          throw userError;
        }
        
        if (!userData || userData.tokens < amount) {
          return new Response(
            JSON.stringify({ success: false, message: "Not enough tokens" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            }
          );
        }
        
        // Deduct tokens
        const { error: updateError } = await supabase
          .from('user_tokens')
          .update({ tokens: userData.tokens - amount })
          .eq('user_id', user_id);
          
        if (updateError) {
          throw updateError;
        }
        
        // Record feature unlock
        const { error: featureError } = await supabase
          .from('unlocked_features')
          .insert({
            user_id,
            property_id,
            profile_id,
            feature,
            tokens_used: amount
          });
          
        if (featureError) {
          throw featureError;
        }
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Feature "${feature}" unlocked for ${amount} tokens`,
            remaining_tokens: userData.tokens - amount 
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
  } catch (error) {
    console.error("Error in chat-tokens function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
