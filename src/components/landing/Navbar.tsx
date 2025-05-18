
"use client";

import Link from 'next/link';
import { LayoutGrid, MapPin, Ticket, Image as ImageIcon, HelpCircle, Users, Home } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  id: string; // Section ID for matching hash and IntersectionObserver
}

const navItemsData: NavItem[] = [
  { href: '#', label: 'Home', icon: Home, id: '' }, // id for 'Home' can be tricky, handled by scroll position
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement | null>>(new Map());

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Function to get active ID from hash, for initial load and hash changes
    const getActiveIdFromHash = () => window.location.hash.substring(1) || '';

    const handleHashChange = () => {
      setActiveId(getActiveIdFromHash());
    };

    // Set initial active ID based on hash
    setActiveId(getActiveIdFromHash());
    window.addEventListener('hashchange', handleHashChange, { passive: true });

    // Intersection Observer logic
    navItemsData.forEach(item => {
      if (item.id) {
        sectionRefs.current.set(item.id, document.getElementById(item.id));
      }
    });

    const sectionsToObserve = Array.from(sectionRefs.current.values()).filter(Boolean) as HTMLElement[];

    if (sectionsToObserve.length > 0) {
      const navbarHeight = 64; // Approximate height of your fixed navbar (h-16)
      const topActivationOffset = navbarHeight + 32; // Start activating 32px below the navbar
      const activationBandHeight = 150; // Consider a section active if its top is within this band from the topActivationOffset

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        let newActiveId = '';

        if (intersectingEntries.length > 0) {
          // Find the topmost section that is intersecting according to DOM order
          for (const navItem of navItemsData) {
            if (navItem.id && intersectingEntries.some(entry => entry.target.id === navItem.id)) {
              newActiveId = navItem.id;
              break;
            }
          }
        }
        
        // If no section is intersecting based on observer, check scroll position for "Home"
        // Or if the determined newActiveId is for a section far down, but we're at top, prefer Home
        if (window.scrollY < window.innerHeight * 0.3 && (newActiveId === '' || document.getElementById(newActiveId)?.getBoundingClientRect().top > window.innerHeight * 0.4)) {
          setActiveId(''); // Set to Home
        } else {
          setActiveId(newActiveId);
        }
      };
      
      // This rootMargin tries to define a band below the navbar.
      // top margin: negative value to pull the top of the observation area up.
      // bottom margin: large negative value to effectively make the observation area a strip from the top.
      const rootMarginTop = `-${topActivationOffset -1}px`;
      const rootMarginBottom = `-${window.innerHeight - topActivationOffset - activationBandHeight}px`;

      observerRef.current = new IntersectionObserver(observerCallback, {
        rootMargin: `${rootMarginTop} 0px ${rootMarginBottom} 0px`,
        threshold: 0.01, // Triggers as soon as a tiny part enters the intersection area
      });

      sectionsToObserve.forEach(section => {
        if (section) observerRef.current!.observe(section);
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (observerRef.current) {
        sectionsToObserve.forEach(section => {
          if (section) observerRef.current!.unobserve(section);
        });
        observerRef.current.disconnect();
      }
    };
  }, [isClient]); // Removed navItemsData from deps as it's constant

  // Basic SSR version to prevent hydration errors if client-specific logic isn't ready
  if (!isClient) { 
    return (
      <div className="flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
        {navItemsData.map((item) => (
          <div key={item.label} className="p-3 rounded-lg bg-muted/10 invisible">
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/30" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={100}>
      <ul className="flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
        {navItemsData.map((item) => (
          <li key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  onClick={(e) => {
                     if (item.href === '#') {
                       e.preventDefault(); // Prevent default hash jump for home
                       window.scrollTo({ top: 0, behavior: 'smooth' });
                       // Manually clear the hash from URL without adding to history
                       if (window.location.hash) {
                         window.history.pushState("", document.title, window.location.pathname + window.location.search);
                       }
                       setActiveId(''); // Set home as active
                     }
                     // For other links, hashchange listener will handle setActiveId
                  }}
                  className={cn(
                    "p-2 sm:p-3 rounded-lg transition-all duration-200 ease-in-out flex items-center text-muted-foreground hover:text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    activeId === item.id ? "text-primary bg-primary/20 scale-110 shadow-lg" : "hover:scale-105 sm:hover:scale-110"
                  )}
                  aria-label={item.label}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
};

export default Navbar;
