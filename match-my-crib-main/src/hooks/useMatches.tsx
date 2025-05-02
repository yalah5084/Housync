
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserType } from '@/hooks/useUserType';
import { 
  PropertyProps, 
  ProfileProps, 
  MatchResult,
  LandlordPreference,
  RenterPreference 
} from '@/types/property';
import { toast } from "sonner";

export const useMatches = () => {
  const { userType } = useUserType();
  const [matches, setMatches] = useState<(PropertyProps | ProfileProps)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runMatchAlgorithm = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://zoahrthruljrxniasldg.supabase.co/functions/v1/match-algorithm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      if (!response.ok) {
        throw new Error('Failed to run matching algorithm');
      }
      
      const result = await response.json();
      toast.success("Match algorithm completed successfully");
      return fetchMatches();
    } catch (err) {
      console.error('Error running match algorithm:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast.error("Failed to run matching algorithm");
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First get the user's preference ID based on user type
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      if (!userId) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }
      
      const preferenceTable = userType === 'renter' ? 'renter_preferences' : 'landlord_preferences';
      const preferenceIdColumn = userType === 'renter' ? 'renter_id' : 'landlord_id';
      const matchIdColumn = userType === 'renter' ? 'landlord_id' : 'renter_id';
      
      // Get the user's preference ID
      const { data: preferenceData, error: preferenceError } = await supabase
        .from(preferenceTable)
        .select('id')
        .eq('user_id', userId)
        .single();
        
      if (preferenceError || !preferenceData) {
        setError(preferenceError?.message || "No preferences found");
        setLoading(false);
        return;
      }
      
      const preferenceId = preferenceData.id;
      
      // Get matches using the edge function instead of direct table query
      const response = await fetch('https://zoahrthruljrxniasldg.supabase.co/functions/v1/get-matches-raw', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch matches from edge function');
      }
      
      const { data } = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('Expected array data from matches API', data);
        setError("Invalid data format received from matches API");
        setLoading(false);
        return;
      }
      
      // Filter matches for this user, ensuring each match has required properties
      const userMatches = data
        .filter(match => 
          match && 
          typeof match === 'object' &&
          preferenceIdColumn in match &&
          matchIdColumn in match &&
          'compatibility_score' in match &&
          match[preferenceIdColumn] === preferenceId
        )
        .sort((a, b) => b.compatibility_score - a.compatibility_score);
      
      // If no matches found, set empty array and exit
      if (!userMatches || userMatches.length === 0) {
        setMatches([]);
        setLoading(false);
        return;
      }
      
      // Extract the IDs of the matched profiles/properties
      const matchedIds = userMatches.map(match => match[matchIdColumn]);
      
      // Get the details of matched profiles/properties
      const targetTable = userType === 'renter' ? 'landlord_preferences' : 'renter_preferences';
      
      const { data: matchedItems, error: itemsError } = await supabase
        .from(targetTable)
        .select('*')
        .in('id', matchedIds);
        
      if (itemsError) {
        setError(itemsError.message);
        setLoading(false);
        return;
      }
      
      // Transform match data into what the UI expects
      const transformedMatches = (matchedItems || []).map(item => {
        const match = userMatches.find(m => m[matchIdColumn] === item.id);
        
        const compatibilityScore = match ? Math.floor(match.compatibility_score) : 0;
        
        // Transform data based on user type
        if (userType === 'renter') {
          const landlordItem = item as LandlordPreference;
          return {
            id: landlordItem.id,
            title: landlordItem.property_name || 'Property Listing',
            price: 2000, // Default price since min_income was removed
            location: landlordItem.location || 'Unknown',
            bedrooms: 2, // Mockup data
            bathrooms: 1, // Mockup data
            squareFeet: 800, // Mockup data
            imageUrl: '/placeholder.svg',
            matchPercentage: compatibilityScore
          } as PropertyProps;
        } else {
          const renterItem = item as RenterPreference;
          return {
            id: renterItem.id,
            name: "Potential Tenant", // Mockup data
            location: renterItem.locations ? renterItem.locations.join(', ') : 'Unknown',
            occupation: "Professional", // Mockup data
            moveInDate: renterItem.move_in_date || 'Flexible',
            preferences: renterItem.preferences || [],
            avatarUrl: '/placeholder.svg',
            matchPercentage: compatibilityScore
          } as ProfileProps;
        }
      });
      
      // Sort by match percentage (descending)
      const sortedMatches = transformedMatches.sort((a, b) => 
        b.matchPercentage - a.matchPercentage
      );
      
      setMatches(sortedMatches);
      
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [userType]);

  return { 
    matches, 
    loading, 
    error, 
    refreshMatches: fetchMatches,
    runMatchAlgorithm
  };
};
