
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const OnboardingNav = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');
  const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');

  useEffect(() => {
    if (!userType || !preferences) {
      navigate('/onboarding');
    }
  }, [userType, preferences, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Sign in to save your preferences and start {userType === 'renter' ? 'finding homes' : 'finding tenants'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Your preferences have been saved temporarily. Sign in to:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
            <li>Save your preferences permanently</li>
            <li>Access personalized recommendations</li>
            <li>Connect with {userType === 'renter' ? 'landlords' : 'potential tenants'}</li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full bg-match-primary hover:bg-match-primary/90"
            onClick={() => navigate('/auth')}
          >
            Continue to Sign In
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/onboarding')}
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingNav;
