"use client";

import Link from 'next/link';
import { LayoutGrid, MapPin, Ticket, Image as ImageIcon, HelpCircle, Users, Home, Info, Menu, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  id: string;
}

const navItemsData: NavItem[] = [
  { href: '#', label: 'Home', icon: Home, id: '' },
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
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

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

    const sectionsToObserve = navItemsData
      .filter(item => item.id)
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

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
        } else if (isScrolledToVeryTop) {
          setActiveId('');
        }
      };

      const numericRootMarginTop = -(topActivationOffset - 1);
      const numericRootMarginBottom = -(window.innerHeight - topActivationOffset - activationBandHeight);
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') {
      e.preventDefault(); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
      setActiveId(''); 
    }
    setIsOpen(false);
  };

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
        <div className="text-xl sm:text-2xl font-press-start-2p text-primary uppercase tracking-wider shrink-0">
          Cyber Sense
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center justify-end space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
              {navItemsData.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
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
              ))}
            </div>
          </TooltipProvider>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="top" 
              className="h-[80vh] w-full bg-background/95 backdrop-blur-sm border-b border-border/50"
            >
              <SheetHeader className="relative mt-8 flex items-center justify-center">
                <SheetTitle className="text-xl font-press-start-2p text-primary">Navigation</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 h-10 w-10 text-muted-foreground hover:text-primary"
                >
                  <X className="h-6 w-6" />
                </Button>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                {navItemsData.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      activeId === item.id 
                        ? "text-primary bg-primary/20" 
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
