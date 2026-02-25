import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

interface HeaderProps {
  isAuthenticated?: boolean;
  userType?: 'student' | 'teacher';
  onLogout?: () => void;
}

export const Header = ({ isAuthenticated = false, userType, onLogout }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // TODO: Integrate with backend logout API
    // Call API: POST /api/auth/logout
    if (onLogout) onLogout();
    setMobileMenuOpen(false);
    navigate('/landingpage');
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { path: '/landingpage', label: 'Home' },
        { path: '/login', label: 'Student Login' },
        { path: '/teacherlogin', label: 'Teacher Login' },
      ];
    }

    if (userType === 'student') {
      return [
        { path: '/homepage', label: 'Browse Courses' },
        { path: '/enrolled', label: 'My Courses' },
        { path: '/doubts', label: 'Ask Doubts' },
      ];
    }

    if (userType === 'teacher') {
      return [
        { path: '/teacher/dashboard', label: 'Dashboard' },
        { path: '/teacher/courses', label: 'My Courses' },
        { path: '/teacher/upload', label: 'Upload Content' },
        { path: '/teacher/doubts', label: 'Student Doubts' },
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div>I am the Contributer And My name is chirag</div>  
    <div>Heloo </div>

    <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={isAuthenticated ? (userType === 'student' ? '/homepage' : '/teacher/dashboard') : '/landingpage'} className="flex items-center space-x-2">
          <div className="rounded-lg bg-gradient-primary p-2">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Gyanify
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hidden md:flex"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
