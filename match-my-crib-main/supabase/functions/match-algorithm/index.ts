
// This edge function implements a Python-inspired matching algorithm
// to pair renters with landlords based on compatibility score
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://zoahrthruljrxniasldg.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RenterPreference {
  id: string;
  user_id: string;
  bedrooms: number;
  bathrooms: number;
  locations: string[];
  move_in_date: string;
  preferences: string[];
}

interface LandlordPreference {
  id: string;
  user_id: string;
  property_name: string;
  property_type: string;
  location: string;
  neighborhood_type: string;
  building_features: string[];
  preferred_move_in_date: string;
  lease_length: string;
  tenant_preferences: string[];
}

interface Match {
  renter_id: string;
  landlord_id: string;
  compatibility_score: number;
}

async function calculateMatchingScores(): Promise<Match[]> {
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log("Fetching renter and landlord preferences...");

  // Get all renter preferences
  const { data: renters, error: renterError } = await supabase
    .from("renter_preferences")
    .select("*");
  
  if (renterError) {
    console.error("Error fetching renter preferences:", renterError);
    throw new Error(`Error fetching renter preferences: ${renterError.message}`);
  }

  // Get all landlord preferences
  const { data: landlords, error: landlordError } = await supabase
    .from("landlord_preferences")
    .select("*");

  if (landlordError) {
    console.error("Error fetching landlord preferences:", landlordError);
    throw new Error(`Error fetching landlord preferences: ${landlordError.message}`);
  }

  console.log(`Found ${renters?.length || 0} renters and ${landlords?.length || 0} landlords`);
  
  // Enhanced matching algorithm with inspiration from dating platforms
  const matches: Match[] = [];

  for (const renter of renters || []) {
    for (const landlord of landlords || []) {
      const score = calculateCompatibilityScore(renter, landlord);
      matches.push({
        renter_id: renter.id,
        landlord_id: landlord.id,
        compatibility_score: score
      });
    }
  }

  // Sort matches in descending order of compatibility
  return matches.sort((a, b) => b.compatibility_score - a.compatibility_score);
}

// Enhanced compatibility scoring algorithm inspired by dating platforms
function calculateCompatibilityScore(
  renter: RenterPreference, 
  landlord: LandlordPreference
): number {
  // Initialize score components
  let locationMatch = 0;
  let featuresMatch = 0;
  let moveInMatch = 0;
  let lifestyleCompatibility = 0;
  
  // Location matching (35% of score) - weighted heavily as in dating apps
  if (renter.locations.includes(landlord.location) || renter.locations.length === 0) {
    locationMatch = 35.0;
  }
  
  // Feature matching (30% of score) - similar to interest matching in dating
  if (renter.preferences.length > 0 && landlord.building_features.length > 0) {
    const matchingFeatures = renter.preferences.filter(pref => 
      landlord.building_features.includes(pref)
    ).length;
    featuresMatch = (matchingFeatures / Math.max(1, renter.preferences.length)) * 30.0;
  } else {
    featuresMatch = 15.0; // Default if no preferences
  }
  
  // Move-in date matching (15% of score)
  if (renter.move_in_date === landlord.preferred_move_in_date || 
      renter.move_in_date === 'Flexible' || 
      landlord.preferred_move_in_date === 'Flexible') {
    moveInMatch = 15.0;
  } else {
    moveInMatch = 7.5; // Partial match
  }
  
  // Lifestyle compatibility (20% of score) - similar to personality matching
  const tenantPrefs = landlord.tenant_preferences || [];
  const renterPrefs = renter.preferences || [];
  
  if (tenantPrefs.length > 0 && renterPrefs.length > 0) {
    // Calculate lifestyle overlap
    const sharedPrefs = tenantPrefs.filter(pref => renterPrefs.includes(pref)).length;
    lifestyleCompatibility = (sharedPrefs / Math.max(1, Math.min(tenantPrefs.length, renterPrefs.length))) * 20.0;
  } else {
    lifestyleCompatibility = 10.0; // Default if no preferences
  }
  
  // Calculate final score (sum of all weighted factors)
  const finalScore = locationMatch + featuresMatch + moveInMatch + lifestyleCompatibility;
  return finalScore;
}

async function storeMatchResults(matches: Match[]): Promise<void> {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // First delete existing matches
  const { error: deleteError } = await supabase
    .from("matches")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all records
  
  if (deleteError) {
    console.error("Error deleting existing matches:", deleteError);
    throw new Error(`Error deleting existing matches: ${deleteError.message}`);
  }
  
  // Insert new matches in batches to avoid hitting limits
  const BATCH_SIZE = 50;
  for (let i = 0; i < matches.length; i += BATCH_SIZE) {
    const batch = matches.slice(i, i + BATCH_SIZE);
    const { error: insertError } = await supabase
      .from("matches")
      .insert(batch);
    
    if (insertError) {
      console.error("Error inserting match batch:", insertError);
      throw new Error(`Error inserting match batch: ${insertError.message}`);
    }
  }
  
  console.log(`Successfully stored ${matches.length} match results`);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Running enhanced match-making algorithm...");
    const matches = await calculateMatchingScores();
    await storeMatchResults(matches);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully generated ${matches.length} matches` 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in match-making algorithm:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
