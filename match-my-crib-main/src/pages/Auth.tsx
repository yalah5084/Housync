
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userType = localStorage.getItem('userType') || 'renter';
  const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');

  useEffect(() => {
    console.log('Auth component mounted - checking for existing session');
    
    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log('Existing session found:', session.user.id);
        savePreferencesAndRedirect(session.user.id);
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in, saving preferences and redirecting to listings');
        await savePreferencesAndRedirect(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const savePreferencesAndRedirect = async (userId: string) => {
    try {
      const table = userType === 'renter' ? 'renter_preferences' : 'landlord_preferences';
      const data = userType === 'renter' ? {
        user_id: userId,
        move_in_date: preferences.moveInDate || 'Flexible',
        budget: preferences.budget || 0,
        locations: preferences.locations || [],
        bedrooms: preferences.bedrooms || 1,
        bathrooms: preferences.bathrooms || 1,
        preferences: preferences.preferences || []
      } : {
        user_id: userId,
        property_name: preferences.propertyName || '',
        property_type: preferences.propertyType || 'Apartment',
        location: preferences.location || '',
        neighborhood_type: preferences.neighborhood?.type || 'Residential',
        neighborhood_description: preferences.neighborhood?.description || '',
        building_features: preferences.buildingFeatures || [],
        pets_allowed: preferences.petsAllowed ?? true,
        min_income: preferences.minIncome || 0,
        preferred_move_in_date: preferences.preferredMoveInDate || 'Flexible',
        lease_length: preferences.leaseLength || '1 year',
        tenant_preferences: preferences.tenantPreferences || []
      };

      const { error } = await supabase.from(table).insert(data);
      
      if (error) {
        console.error('Error saving preferences:', error);
        throw new Error('Failed to save preferences');
      }
      
      // Clear localStorage after saving to database
      localStorage.removeItem('userPreferences');
      localStorage.removeItem('userType');
      
      toast.success('Preferences saved successfully!');
      navigate('/listings'); // Redirect to listings page instead of dashboard
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Error saving preferences. Please try again.');
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      console.log('Starting Google sign-in process');
      
      // Make sure the redirectTo is set to the correct URL with the full origin
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`, // Redirect back to /auth after Google authentication
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) {
        console.error('Google sign-in error:', error);
        throw error;
      }

      // If data.url exists, navigate to it (this is the Google auth page)
      if (data?.url) {
        console.log('Redirecting to Google auth page:', data.url);
        // This redirects to Google's authentication page
        // After authentication, Google will redirect back to /auth
        // and the onAuthStateChange will handle the final redirect to /listings
        window.location.href = data.url;
      } else {
        console.error('No redirect URL returned from Supabase');
        toast.error('Authentication error. Please try again.');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Error signing in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-6">
            <Home className="h-8 w-8 text-match-primary mr-2" />
            <span className="text-2xl font-bold text-match-dark">Housync</span>
          </div>
          <CardTitle className="text-center">Welcome to Housync</CardTitle>
          <CardDescription className="text-center">
            Sign in to save your preferences and find your perfect match
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col space-y-4 pt-4">
          <div className="text-center text-sm text-gray-500 mb-4">
            Continue as a {userType === 'renter' ? 'Renter' : 'Landlord'}
          </div>
          
          <Button 
            onClick={handleGoogleSignIn} 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300"
            variant="outline"
          >
            {loading ? (
              <div className="border-t-2 border-b-2 border-gray-800 rounded-full w-4 h-4 animate-spin mr-2"></div>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}
            Sign in with Google
          </Button>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <Button 
            variant="ghost" 
            className="w-full mt-2"
            onClick={() => navigate('/onboarding')}
          >
            Back to Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
