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
                <Link href="/sport/football">
                  <p className="hover:text-yellow-300">Football</p>
                </Link>
              </li>
              <li>
                <Link href="/sport/tennis">
                  <p className="hover:text-yellow-300">Tennis</p>
                </Link>
              </li>
              <li>
                <Link href="/sport/basketball">
                  <p className="hover:text-yellow-300">Basketball</p>
                </Link>
              </li>
              <li>
                <Link href="/sport/formula-1">
                  <p className="hover:text-yellow-300">Formula 1</p>
                </Link>
              </li>
              <li>
                <Link href="/sport/volleyball">
                  <p className="hover:text-yellow-300 hidden lg:block">
                    Volleyball
                  </p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Leagues Links */}
          <div>
            <h3 className="text-base lg:text-lg font-bold mb-4">Top Leagues</h3>
            <ul className="space-y-2 text-xs lg:text-sm">
              <li>
                <Link href="/football/serie-a">
                  <p className="hover:text-yellow-300">Serie A</p>
                </Link>
              </li>
              <li>
                <Link href="/football/premier-league">
                  <p className="hover:text-yellow-300">Premier League</p>
                </Link>
              </li>
              <li>
                <Link href="/football/champions-league">
                  <p className="hover:text-yellow-300">Champions League</p>
                </Link>
              </li>
              <li>
                <Link href="/football/bundesliga">
                  <p className="hover:text-yellow-300 hidden lg:block">
                    Bundesliga
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/football/la-liga">
                  <p className="hover:text-yellow-300">La Liga</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us">
                  <p className="hover:text-yellow-300">About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="hover:text-yellow-300">Contact</p>
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions">
                  <p className="hover:text-yellow-300">Terms and Conditions</p>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <p className="hover:text-yellow-300">Privacy Policy</p>
                </Link>
              </li>
              <li>
                <Link href="/responsible-gambling">
                  <p className="hover:text-yellow-300">Responsible Gambling</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Socials on Mobile */}
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
          <Link href="/about-us">
            <p className="cursor-pointer hover:text-yellow-300">About</p>
          </Link>
          <span>|</span>
          <Link href="/terms-conditions">
            <p className="cursor-pointer hover:text-yellow-300">Terms</p>
          </Link>
          <span>|</span>
          <Link href="/privacy-policy">
            <p className="cursor-pointer hover:text-yellow-300">Privacy</p>
          </Link>
          <span>|</span>
          <Link href="/responsible-gambling">
            <p className="cursor-pointer hover:text-yellow-300">
              Responsible Gambling
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
