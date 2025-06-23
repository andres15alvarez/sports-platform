'use client';
import { Link } from '../i18n/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(
    null,
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const lang = 'en';

  const tHeader = useTranslations('Header');
  const tSports = useTranslations('Sports');

  const navItemKeys = [
    'results',
    'odds',
    'predictions',
    'bookmarkers',
    'calendars',
  ];
  const navItems = navItemKeys.map((key) => ({
    name: key,
    label: tHeader(key),
  }));

  const sportKeys = ['football', 'basketball', 'baseball'];
  const sports = sportKeys.map((key) => ({ name: tSports(key), path: key }));

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
          className="hidden lg:flex space-x-1 text-green-700 font-medium"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              <button
                className="px-4 py-2 flex items-center hover:text-yellow-500 focus:outline-none"
                onClick={() =>
                  setOpenDropdown(openDropdown === item.name ? null : item.name)
                }
                aria-expanded={openDropdown === item.name}
                aria-controls={`dropdown-${item.name}`}
                type="button"
              >
                <span className="capitalize">{item.label}</span>
                <i className="bx bx-chevron-down ml-1"></i>
              </button>
              {openDropdown === item.name && (
                <ul
                  id={`dropdown-${item.name}`}
                  className="absolute left-0 top-full mt-4 w-48 bg-white border border-t-0 border-green-600 rounded-b shadow-none z-50"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {sports.map((sport) => (
                    <li key={sport.name}>
                      <Link
                        href={
                          item.name === 'predictions' &&
                          sport.path === 'football'
                            ? '/soccer-prediction'
                            : `/${sport.path}/${item.name}`
                        }
                        className="block px-4 py-2 text-green-700 hover:bg-green-50"
                      >
                        {sport.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
          mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'
        } overflow-y-auto transition-max-height duration-500 ease-in-out bg-white border-t border-green-600 lg:hidden`}
        aria-label="Mobile menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() =>
                  setOpenMobileSubMenu(
                    openMobileSubMenu === item.name ? null : item.name,
                  )
                }
                className="w-full flex justify-between items-center text-green-700 hover:text-yellow-500 font-medium py-2"
              >
                <span className="capitalize">{item.label}</span>
                <i
                  className={`bx bx-chevron-down transition-transform ${
                    openMobileSubMenu === item.name ? 'rotate-180' : ''
                  }`}
                ></i>
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                  openMobileSubMenu === item.name ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="pl-4 pt-2 pb-2 space-y-2">
                  {sports.map((sport) => (
                    <Link
                      key={sport.name}
                      href={
                        item.name === 'predictions' && sport.path === 'football'
                          ? '/soccer-prediction'
                          : `/${sport.path}/${item.name}`
                      }
                      className="block text-green-700 hover:text-yellow-500"
                    >
                      {sport.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
