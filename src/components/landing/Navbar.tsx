
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

    const getActiveIdFromHash = () => window.location.hash.substring(1) || '';

    const handleHashChange = () => {
      setActiveId(getActiveIdFromHash());
    };

    setActiveId(getActiveIdFromHash());
    window.addEventListener('hashchange', handleHashChange, { passive: true });

    navItemsData.forEach(item => {
      if (item.id) {
        sectionRefs.current.set(item.id, document.getElementById(item.id));
      }
    });

    const sectionsToObserve = Array.from(sectionRefs.current.values()).filter(Boolean) as HTMLElement[];

    if (sectionsToObserve.length > 0) {
      const navbarHeight = 64; 
      const topActivationOffset = navbarHeight + 32; 
      const activationBandHeight = 150; 

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        let currentTopSectionId: string | null = null;

        // Find the highest section in navItemsData order that is currently intersecting
        for (const navItem of navItemsData) {
          if (!navItem.id) continue; // Skip "Home" or items without an actual section ID

          const entry = entries.find(e => e.target.id === navItem.id);
          if (entry && entry.isIntersecting) {
            currentTopSectionId = navItem.id;
            break; // Found the first one in DOM/navItemsData order, this is our candidate
          }
        }
      
        const isScrolledToVeryTop = window.scrollY < 50; // A small threshold for being at the very top

        if (currentTopSectionId) {
          // A section is intersecting in our band
          setActiveId(currentTopSectionId);
        } else {
          // No section is intersecting in our band
          if (isScrolledToVeryTop) {
            setActiveId(''); // Set to "Home" if at the very top of the page
          }
          // ELSE: Do nothing, activeId remains the same, preserving the last active section icon.
        }
      };
      
      const rootMarginTop = `-${topActivationOffset -1}px`;
      const rootMarginBottom = `-${window.innerHeight - topActivationOffset - activationBandHeight}px`;

      observerRef.current = new IntersectionObserver(observerCallback, {
        rootMargin: `${rootMarginTop} 0px ${rootMarginBottom} 0px`,
        threshold: 0.01, 
      });

      sectionsToObserve.forEach(section => {
        if (section) observerRef.current!.observe(section);
      });
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (observerRef.current) {
        sectionsToObserve.forEach(section => {
          if (section) observerRef.current!.unobserve(section);
        });
        observerRef.current.disconnect();
      }
    };
  }, [isClient]); 

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
                       e.preventDefault(); 
                       window.scrollTo({ top: 0, behavior: 'smooth' });
                       if (window.location.hash) {
                         window.history.pushState("", document.title, window.location.pathname + window.location.search);
                       }
                       setActiveId(''); 
                     }
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
