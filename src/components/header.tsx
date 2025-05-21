'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg border-b-4 border-green-600 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo and Menu Button */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-1"
            aria-label="OddsSite Homepage"
          >
            <i className="bx bx-money text-green-700 text-2xl"></i>
            <span className="text-xl font-bold text-green-800 hidden sm:inline">
              OddsSite
            </span>
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block lg:hidden text-green-700 hover:text-yellow-500 focus:outline-none"
            aria-label="Menu"
          >
            <i className="bx bx-menu text-2xl"></i>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex space-x-6 text-green-700 font-medium"
          aria-label="Main navigation"
        >
          <a href="#" title="Sports results in real time">
            Results
          </a>
          <a href="#" title="Odds from the best bookmakers">
            Odds
          </a>
          <a href="/soccer-prediction" title="Expert sports predictions">
            Predictions
          </a>
          <a href="#" title="Reviews of the best bookmakers">
            Bookmakers
          </a>
          <a href="#" title="Exclusive promotions and bonuses">
            Promos
          </a>
          <a href="#" title="Tools for bettors">
            Tools
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Promo Button */}
          <button
            className="hidden lg:block animate-pulse bg-green-100 hover:bg-green-200 p-2 rounded-full border border-green-600 focus:outline-none"
            aria-label="Exclusive promotions"
          >
            <i className="bx bx-gift text-yellow-400 text-xl"></i>
          </button>
          {/* Login Button */}
          <button className="hidden lg:block bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md font-medium focus:outline-none border-2 border-yellow-400 text-sm">
            Login
          </button>
          {/* Favorites Button */}
          <button
            className="hidden lg:block text-green-700 hover:text-yellow-500 focus:outline-none"
            title="Add to favorites"
            aria-label="Add to favorites"
          >
            <i className="bx bx-heart text-xl"></i>
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button
              className="flex items-center text-green-700 hover:text-yellow-500 focus:outline-none text-sm"
              aria-label="Change language"
            >
              <Image
                src="https://flagcdn.com/gb.svg"
                alt="English"
                width={20}
                height={14}
                className="mr-1"
              />
              <span className="hidden sm:inline">EN</span>
              <i className="bx bx-chevron-down ml-1 text-lg"></i>
            </button>
            <ul className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none group-hover:pointer-events-auto">
              <li>
                <a
                  href="https://www.oddssite.it/"
                  hrefLang="it"
                  className="block px-3 py-1 text-green-700 hover:bg-green-50 text-sm"
                >
                  IT
                </a>
              </li>
              <li>
                <a
                  href="https://www.oddssite.com/en/"
                  hrefLang="en"
                  className="block px-3 py-1 text-green-700 hover:bg-green-50 text-sm"
                >
                  EN
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`${mobileMenuOpen ? 'max-h-[300px]' : 'max-h-0'} overflow-hidden transition-max-height duration-300 bg-white border-t border-green-600 lg:hidden`}
        aria-label="Mobile menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          <a
            href="/news"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            Results
          </a>
          <a
            href="#"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            Odds
          </a>
          <a
            href="/soccer-prediction"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            Predictions
          </a>
          <a
            href="#"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            Bookmakers
          </a>
          <a
            href="#"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            Promos
          </a>
          <a
            href="#"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            Tools
          </a>
        </div>
      </nav>
    </header>
  );
}
