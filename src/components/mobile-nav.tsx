'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SportsMenuPanel from './sports-menu-panel';

const MobileNav = () => {
  const [isSportsMenuOpen, setIsSportsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isSportsMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isSportsMenuOpen]);

  // Get current sport from URL
  const getCurrentSport = () => {
    if (!pathname) return 'football';
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return 'football';

    const sport = pathSegments[0];
    if (sport === 'basketball') return 'basketball';
    if (sport === 'baseball') return 'baseball';
    return 'football';
  };

  const currentSport = getCurrentSport();

  // Get sport icon
  const getSportIcon = () => {
    switch (currentSport) {
      case 'basketball':
        return 'bx bx-basketball';
      case 'baseball':
        return 'bx bx-baseball';
      default:
        return 'bx bx-football';
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-[#064e3b] lg:hidden z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-between items-center px-2 py-2">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-white px-2 py-1"
        >
          <i className="bx bx-home-alt text-xl"></i>
          <span className="text-xs mt-1">Home</span>
        </Link>

        <button
          onClick={() => setIsSportsMenuOpen((prev) => !prev)}
          className="flex flex-col items-center justify-center text-white px-2 py-1"
        >
          <i className={`${getSportIcon()} text-xl`}></i>
          <span className="text-xs mt-1">Sports</span>
        </button>

        <button className="flex flex-col items-center justify-center text-white px-2 py-1">
          <i className="bx bx-user text-xl"></i>
          <span className="text-xs mt-1">Login</span>
        </button>

        <button className="flex flex-col items-center justify-center text-white px-2 py-1">
          <i className="bx bx-heart text-xl"></i>
          <span className="text-xs mt-1">Favorites</span>
        </button>
      </nav>

      <SportsMenuPanel isOpen={isSportsMenuOpen} />
    </>
  );
};

export default MobileNav;
