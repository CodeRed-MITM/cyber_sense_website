"use client";

import Link from 'next/link';
import { LayoutGrid, MapPin, Ticket, Image as ImageIcon, HelpCircle, Users, Home, Info } from 'lucide-react';
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
  { href: '#details', label: 'Details', icon: Info, id: 'details' },
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

        for (const navItem of navItemsData) {
          if (!navItem.id) continue; 

          const entry = entries.find(e => e.target.id === navItem.id);
          if (entry && entry.isIntersecting) {
            currentTopSectionId = navItem.id;
            break; 
          }
        }
      
        const isScrolledToVeryTop = window.scrollY < 50; 

        if (currentTopSectionId) {
          setActiveId(currentTopSectionId);
        } else {
          if (isScrolledToVeryTop) {
            setActiveId(''); 
          }
          // ELSE: Do nothing, activeId remains the same
        }
      };
      
      // Calculate the numeric values for margins first
      const numericRootMarginTop = -(topActivationOffset -1);
      const numericRootMarginBottom = -(window.innerHeight - topActivationOffset - activationBandHeight);
      
      // Construct the rootMargin string using the numeric values
      // This avoids issues like "-(-X)px" which can cause errors
      const rootMarginString = `${numericRootMarginTop}px 0px ${numericRootMarginBottom}px 0px`;

      observerRef.current = new IntersectionObserver(observerCallback, {
        rootMargin: rootMarginString,
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-press-start-2p text-primary uppercase tracking-wider">
            Cyber Sense
          </div>
          <div className="flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
            {navItemsData.map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-muted/10 invisible">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl sm:text-2xl font-press-start-2p text-primary uppercase tracking-wider">
          Cyber Sense
        </div>
        <TooltipProvider delayDuration={100}>
          <div className="relative flex-1 ml-4">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <ul className="flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 overflow-x-auto no-scrollbar pl-2 pr-2">
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
          </div>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navbar;
