
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Menu, X, User, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-match-primary" />
          <span className="text-xl font-bold text-match-dark">Housync</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-match-primary transition-colors">
            Find Matches
          </Link>
          <Link to="/messages" className="text-gray-600 hover:text-match-primary transition-colors">
            Messages
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-match-primary transition-colors">
            My Profile
          </Link>
          <Button className="bg-match-primary hover:bg-match-primary/90">
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-x-0 top-[72px] bg-white shadow-lg md:hidden transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex flex-col space-y-4 px-6 py-4">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 py-2 text-gray-600 hover:text-match-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>Find Matches</span>
          </Link>
          <Link 
            to="/messages" 
            className="flex items-center space-x-2 py-2 text-gray-600 hover:text-match-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <MessageCircle className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 py-2 text-gray-600 hover:text-match-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="h-5 w-5" />
            <span>My Profile</span>
          </Link>
          <Button 
            className="w-full bg-match-primary hover:bg-match-primary/90"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
