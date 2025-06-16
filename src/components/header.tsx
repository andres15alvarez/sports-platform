'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lang = 'en';
  const results = 'results';
  const odds = 'odds';
  const predictions = 'predictions';
  const bookmarkers = 'bookmarkers';
  const calendars = 'calendars';

  return (
    <header className="fixed top-0 left-0 py-2 w-full bg-white shadow-lg border-b-4 border-green-600 z-50">
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
          <Link href="/football/results" title="Sports results in real time">
            {results}
          </Link>
          <Link href="/football/odds" title="Odds from the best bookmakers">
            {odds}
          </Link>
          <Link href="/soccer-prediction" title="Expert sports predictions">
            {predictions}
          </Link>
          <Link
            href="/football/bookmarkers"
            title="Reviews of the best bookmakers"
          >
            {bookmarkers}
          </Link>
          <Link
            href="/football/calendars"
            title="Exclusive promotions and bonuses"
          >
            {calendars}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <div className="relative group">
            <button
              className="flex items-center text-green-700 hover:text-yellow-500 focus:outline-none text-sm"
              aria-label="Change language"
            >
              <Image
                src={`https://flagcdn.com/${lang == 'en' ? 'gb' : 'es'}.svg`}
                alt="Language flag"
                width={16}
                height={12}
                className="mr-1"
              />
              <span className="hidden sm:inline">EN</span>
              <i className="bx bx-chevron-down ml-1 text-lg"></i>
            </button>
            <ul className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none group-hover:pointer-events-auto">
              <li>
                <Link
                  href="/?lang=es"
                  hrefLang="es"
                  className="flex px-3 py-1 text-green-700 hover:bg-green-50 text-sm"
                >
                  <Image
                    src="https://flagcdn.com/es.svg"
                    alt="Spanish"
                    width={16}
                    height={12}
                    className="mr-1"
                  />
                  ES
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  hrefLang="en"
                  className="flex px-3 py-1 text-green-700 hover:bg-green-50 text-sm"
                >
                  <Image
                    src="https://flagcdn.com/gb.svg"
                    alt="English"
                    width={16}
                    height={12}
                    className="mr-1"
                  />
                  EN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`${
          mobileMenuOpen ? 'max-h-[300px]' : 'max-h-0'
        } overflow-hidden transition-max-height duration-300 bg-white border-t border-green-600 lg:hidden`}
        aria-label="Mobile menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/football/results"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            {results}
          </Link>
          <Link
            href="/football/odds"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            {odds}
          </Link>
          <Link
            href="/soccer-prediction"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            {predictions}
          </Link>
          <Link
            href="/football/bookmarkers"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            {bookmarkers}
          </Link>
          <Link
            href="/football/calendars"
            className="block text-green-700 hover:text-yellow-500 font-medium"
          >
            {calendars}
          </Link>
        </div>
      </nav>
    </header>
  );
}
