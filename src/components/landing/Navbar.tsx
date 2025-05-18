
"use client";

import Link from 'next/link';
import { LayoutGrid, MapPin, Ticket, Image as ImageIcon, HelpCircle, Users, Home } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  id: string; // Section ID for matching hash
}

const navItemsData: NavItem[] = [
  { href: '#', label: 'Home', icon: Home, id: '' }, // id is empty for matching hash '#' or no hash
  { href: '#stages', label: 'Stages', icon: LayoutGrid, id: 'stages' },
  { href: '#venue', label: 'Venue', icon: MapPin, id: 'venue' },
  { href: '#register', label: 'Register', icon: Ticket, id: 'register' },
  { href: '#poster', label: 'Poster', icon: ImageIcon, id: 'poster' },
  { href: '#faq', label: 'FAQ', icon: HelpCircle, id: 'faq' },
  { href: '#contact', label: 'Contact Us', icon: Users, id: 'contact' },
];

const Navbar = () => {
  const [activeId, setActiveId] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures window object is available
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const getActiveIdFromHash = () => {
      // Ensure hash is accessed only on client
      return typeof window !== 'undefined' ? window.location.hash.substring(1) || '' : '';
    }

    const handleHashChange = () => {
      setActiveId(getActiveIdFromHash());
    };
    
    setActiveId(getActiveIdFromHash()); // Set initial active ID

    window.addEventListener('hashchange', handleHashChange, { passive: true });
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isClient]);

  // Basic SSR version to prevent hydration errors for window.location.hash
  if (!isClient) { 
    return (
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-md print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
            {navItemsData.map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-muted/10">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <TooltipProvider delayDuration={100}>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-md print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <ul className="flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
              {navItemsData.map((item) => (
                <li key={item.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={() => {
                           // For Home link, ensure it scrolls to top and hash is cleared or set to '#'
                           // Next.js Link will update the hash for other links.
                           // For immediate visual feedback, especially for 'Home', we can update state.
                           if (item.href === '#') {
                             // Clear hash or set to # to indicate top of page
                             window.history.pushState("", document.title, window.location.pathname + window.location.search);
                             setActiveId(''); 
                           }
                           // setActiveId will be updated by hashchange listener for other links
                        }}
                        className={cn(
                          "p-3 rounded-lg transition-all duration-200 ease-in-out flex items-center text-muted-foreground hover:text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          activeId === item.id ? "text-primary bg-primary/20 scale-110 shadow-lg" : "hover:scale-110"
                        )}
                        aria-label={item.label}
                      >
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;
