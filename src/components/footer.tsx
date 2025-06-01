import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* OddsSite Description */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-bold mb-4">OddsSite</h3>
            <p className="text-sm">
              Your complete portal for sports odds, expert predictions, and
              comparison of the best Italian and European bookmakers.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/oddssite"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-facebook text-xl"></i>
              </a>
              <a
                href="https://www.twitter.com/oddssite"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-twitter text-xl"></i>
              </a>
              <a
                href="https://www.instagram.com/oddssite"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Popular Sports Links */}
          <div>
            <h3 className="text-base lg:text-lg font-bold mb-4">
              Popular Sports
            </h3>
            <ul className="space-y-2 text-xs lg:text-sm">
              <li>
                <Link href="/sport/football" className="hover:text-yellow-300">
                  Football
                </Link>
              </li>
              <li>
                <Link
                  href="/sport/basketball"
                  className="hover:text-yellow-300"
                >
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="/sport/baseball" className="hover:text-yellow-300">
                  Baseball
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Leagues Links */}
          <div>
            <h3 className="text-base lg:text-lg font-bold mb-4">Top Leagues</h3>
            <ul className="space-y-2 text-xs lg:text-sm">
              <li>
                <Link
                  href="/football/serie-a"
                  className="hover:text-yellow-300"
                >
                  Serie A
                </Link>
              </li>
              <li>
                <Link
                  href="/football/premier-league"
                  className="hover:text-yellow-300"
                >
                  Premier League
                </Link>
              </li>
              <li>
                <Link
                  href="/football/champions-league"
                  className="hover:text-yellow-300"
                >
                  Champions League
                </Link>
              </li>
              <li>
                <Link
                  href="/football/bundesliga"
                  className="hover:text-yellow-300 hidden lg:block"
                >
                  Bundesliga
                </Link>
              </li>
              <li>
                <Link
                  href="/football/la-liga"
                  className="hover:text-yellow-300"
                >
                  La Liga
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-yellow-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-yellow-300"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-yellow-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/responsible-gambling"
                  className="hover:text-yellow-300"
                >
                  Responsible Gambling
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-4 lg:hidden">
          <a
            href="https://www.facebook.com/oddssite"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-facebook text-xl"></i>
          </a>
          <a
            href="https://www.twitter.com/oddssite"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-twitter text-xl"></i>
          </a>
          <a
            href="https://www.instagram.com/oddssite"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-instagram text-xl"></i>
          </a>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-green-700 mt-6 pt-6 text-center text-xs lg:text-sm">
          <p>
            &copy; 2025 OddsSite. All rights reserved. Gambling is forbidden to
            minors under 18 years of age. Gamble responsibly.
          </p>
          <p className="mt-2 hidden lg:block">
            OddsSite compares odds from ADM (formerly AAMS) authorized
            bookmakers.
          </p>
        </div>
        <div className="flex justify-center text-xs mt-2 mb-12 space-x-2 lg:hidden">
          <Link
            href="/about-us"
            className="cursor-pointer hover:text-yellow-300"
          >
            About
          </Link>
          <span>|</span>
          <Link
            href="/terms-conditions"
            className="cursor-pointer hover:text-yellow-300"
          >
            Terms
          </Link>
          <span>|</span>
          <Link
            href="/privacy-policy"
            className="cursor-pointer hover:text-yellow-300"
          >
            Privacy
          </Link>
          <span>|</span>
          <Link
            href="/responsible-gambling"
            className="cursor-pointer hover:text-yellow-300"
          >
            Responsible Gambling
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
