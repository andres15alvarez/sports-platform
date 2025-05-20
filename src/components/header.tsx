'use client';

import * as React from 'react';
import { useState } from 'react';

export default function Header(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { href: '#', label: 'Results' },
    { href: '#', label: 'Odds' },
    { href: '/soccer-prediction', label: 'Predictions' },
    { href: '#', label: 'Bookmakers' },
    { href: '#', label: 'Promos' },
    { href: '#', label: 'Tools' },
  ];

  const createLink = (link: { href: string; label: string }) =>
    React.createElement(
      'a',
      {
        key: link.label,
        href: link.href,
        className: 'block text-green-700 hover:text-yellow-500 font-medium',
      },
      link.label,
    );

  return React.createElement(
    'header',
    {
      className:
        'fixed top-0 left-0 w-full bg-white shadow-lg border-b-4 border-green-600 z-50',
    },
    React.createElement(
      'div',
      {
        className:
          'container mx-auto flex items-center justify-between px-4 py-2',
      },

      // Logo + menu button
      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement(
          'a',
          {
            href: '/',
            className: 'flex items-center space-x-1',
            'aria-label': 'OddsSite Homepage',
          },
          React.createElement('i', {
            className: 'bx bx-money text-green-700 text-2xl',
          }),
          React.createElement(
            'span',
            { className: 'text-xl font-bold text-green-800 hidden sm:inline' },
            'OddsSite',
          ),
        ),
        React.createElement(
          'button',
          {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className:
              'block lg:hidden text-green-700 hover:text-yellow-500 focus:outline-none',
            'aria-label': 'Menu',
          },
          React.createElement('i', { className: 'bx bx-menu text-2xl' }),
        ),
      ),

      // Desktop nav
      React.createElement(
        'nav',
        {
          className: 'hidden lg:flex space-x-6 text-green-700 font-medium',
          'aria-label': 'Main navigation',
        },
        ...navLinks.map(createLink),
      ),

      // Actions + language dropdown
      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement(
          'button',
          {
            className:
              'hidden lg:block animate-pulse bg-green-100 hover:bg-green-200 p-2 rounded-full border border-green-600 focus:outline-none',
            'aria-label': 'Exclusive promotions',
          },
          React.createElement('i', {
            className: 'bx bx-gift text-yellow-400 text-xl',
          }),
        ),
        React.createElement(
          'button',
          {
            className:
              'hidden lg:block bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md font-medium focus:outline-none border-2 border-yellow-400 text-sm',
          },
          'Login',
        ),
        React.createElement(
          'button',
          {
            className:
              'hidden lg:block text-green-700 hover:text-yellow-500 focus:outline-none',
            title: 'Add to favorites',
            'aria-label': 'Add to favorites',
          },
          React.createElement('i', { className: 'bx bx-heart text-xl' }),
        ),

        // Language selector
        React.createElement(
          'div',
          { className: 'relative group' },
          React.createElement(
            'button',
            {
              className:
                'flex items-center text-green-700 hover:text-yellow-500 focus:outline-none text-sm',
              'aria-label': 'Change language',
            },
            React.createElement('img', {
              src: 'https://flagcdn.com/gb.svg',
              alt: 'English',
              className: 'h-4 w-auto mr-1',
            }),
            React.createElement(
              'span',
              { className: 'hidden sm:inline' },
              'EN',
            ),
            React.createElement('i', {
              className: 'bx bx-chevron-down ml-1 text-lg',
            }),
          ),
          React.createElement(
            'ul',
            {
              className:
                'absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none group-hover:pointer-events-auto',
            },
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                {
                  href: 'https://www.oddssite.it/',
                  hrefLang: 'it',
                  className:
                    'block px-3 py-1 text-green-700 hover:bg-green-50 text-sm',
                },
                'IT',
              ),
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                {
                  href: 'https://www.oddssite.com/en/',
                  hrefLang: 'en',
                  className:
                    'block px-3 py-1 text-green-700 hover:bg-green-50 text-sm',
                },
                'EN',
              ),
            ),
          ),
        ),
      ),
    ),

    // Mobile navigation
    React.createElement(
      'nav',
      {
        className: `${mobileMenuOpen ? 'max-h-[300px]' : 'max-h-0'} overflow-hidden transition-max-height duration-300 bg-white border-t border-green-600 lg:hidden`,
        'aria-label': 'Mobile menu',
      },
      React.createElement(
        'div',
        { className: 'px-4 pt-2 pb-4 space-y-2' },
        ...navLinks.map(createLink),
      ),
    ),
  );
}
