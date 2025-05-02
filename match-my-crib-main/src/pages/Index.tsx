import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UserTypeSelect from '@/components/UserTypeSelect';
import { Button } from '@/components/ui/button';
import { MessageCircle, Home, Users, Check, User, Heart, Coins, Calendar, Medal } from 'lucide-react';

const Index = () => {
  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-match-dark leading-tight mb-6">
                Find the <span className="text-match-primary">perfect match</span> for your home journey
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our intelligent platform connects renters and landlords based on lifestyle, preferences, and property needs for the perfect housing match.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/onboarding">
                  <Button size="lg" className="bg-match-primary hover:bg-match-primary/90 w-full sm:w-auto gap-2">
                    <Home className="h-5 w-5" />
                    Find My Match
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto gap-2"
                  onClick={scrollToHowItWorks}
                >
                  <MessageCircle className="h-5 w-5" />
                  Learn More
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-match-primary" />
                  Smart Matching
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-match-primary" />
                  Private Messaging
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-match-primary" />
                  Secure Process
                </span>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-match-primary/5 rounded-lg p-8">
                  <img 
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="Apartment interior" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-match-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-match-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">95% Match</h3>
                      <p className="text-sm text-gray-500">Perfect for your preferences</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-match-dark mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our intelligent matching system connects renters and landlords based on compatibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-match-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-match-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
              <p className="text-gray-600">
                Build your detailed profile with preferences, lifestyle, and housing needs to earn your first 5 tokens
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-match-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-match-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Our AI algorithm finds your perfect matches based on compatibility and preferences
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-match-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-match-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Tour</h3>
              <p className="text-gray-600">
                Unlock direct messaging to schedule viewings and find your perfect home
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Token System Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-match-dark mb-4">Earn Tokens, Unlock Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our token system rewards meaningful interactions and unlocks premium features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-match-primary/10 rounded-full flex items-center justify-center mb-4">
                <Coins className="h-6 w-6 text-match-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Complete Profile</h3>
              <p className="text-gray-600 mb-2">
                Fill your preferences to unlock chat and earn your first 5 tokens
              </p>
              <div className="text-sm font-medium text-match-primary">+5 tokens</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-match-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-match-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Engage in Conversations</h3>
              <p className="text-gray-600 mb-2">
                Earn tokens for meaningful chat interactions when users reply
              </p>
              <div className="text-sm font-medium text-match-primary">+1 token per reply</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-match-primary/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-match-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Schedule Visits</h3>
              <p className="text-gray-600 mb-2">
                Use tokens to unlock the ability to schedule property viewings
              </p>
              <div className="text-sm font-medium text-match-primary">Costs 10 tokens</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-match-primary/10 rounded-full flex items-center justify-center mb-4">
                <Medal className="h-6 w-6 text-match-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Priority Matching</h3>
              <p className="text-gray-600 mb-2">
                Get boosted in search results and matching algorithms
              </p>
              <div className="text-sm font-medium text-match-primary">Costs 20 tokens</div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/onboarding">
              <Button size="lg" className="bg-match-primary hover:bg-match-primary/90 gap-2">
                <Coins className="h-5 w-5" />
                Start Earning Tokens
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* User Type Selection Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-match-dark mb-4">Get Started Today</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're looking for a place to call home or seeking the perfect tenant, we've got you covered
            </p>
          </div>
          
          <UserTypeSelect />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-match-dark text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2 text-match-primary" />
                Housync
              </h3>
              <p className="text-gray-400">
                Connecting renters and landlords for the perfect match.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Housync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
