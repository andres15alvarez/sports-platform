"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type MenuKey = "football" | "baseball" | "tennis";

export default function SportsMenu() {
  const [open, setOpen] = useState<Record<MenuKey, boolean>>({
    football: false,
    baseball: false,
    tennis: false,
  });

  const toggleMenu = (menu: MenuKey) => {
    setOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div id="sportsMenu">
      {/* Football */}
      <div className="mb-4">
        <button
          onClick={() => toggleMenu("football")}
          className="w-full flex cursor-pointer justify-between items-center text-white font-semibold focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <i className="bx bx-football text-lg"></i>Football
          </span>
          <i className={`bx ${open.football ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
        </button>
        {open.football && (
          <ul className="ml-4 mt-2 space-y-1 text-sm">
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/280px-Premier_League_Logo.svg.png"
                alt="Premier League"
                width={16}
                height={16}
              />
              <Link href="#" title="Premier League Odds">Premier League</Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/261px-Serie_A_logo_2022.svg.png"
                alt="Serie A"
                width={16}
                height={16}
              />
              <Link href="/news" title="Serie A Odds">Serie A</Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/LaLiga_EA_Sports_2023_Vertical_Logo.svg/250px-LaLiga_EA_Sports_2023_Vertical_Logo.svg.png"
                alt="La Liga"
                width={16}
                height={16}
              />
              <Link href="/soccer-prediction" title="La Liga Odds">La Liga</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Baseball */}
      <div className="mb-4">
        <button
          onClick={() => toggleMenu("baseball")}
          className="w-full flex cursor-pointer justify-between items-center text-white font-semibold focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <i className="bx bx-baseball text-lg"></i>Baseball
          </span>
          <i className={`bx ${open.baseball ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
        </button>
        {open.baseball && (
          <ul id="baseballMenu" className="ml-4 mt-2 space-y-1 text-sm">
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/200px-Major_League_Baseball_logo.svg.png"
                alt="MLB"
                width={16}
                height={16}
              />
              <Link href="/baseball-prediction" title="MLB Odds">MLB</Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/NPB_logo.svg/250px-NPB_logo.svg.png"
                alt="NPB"
                width={16}
                height={16}
              />
              <Link href="/basket-prediction" title="NPB Odds">NPB</Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/fr/8/85/MiLB_logo.png?20110810101641"
                alt="MiLB"
                width={16}
                height={16}
              />
              <Link href="#" title="MiLB Odds">MiLB</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Tennis */}
      <div>
        <button
          onClick={() => toggleMenu("tennis")}
          className="w-full flex cursor-pointer justify-between items-center text-white font-semibold focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <i className="bx bx-tennis-ball text-lg"></i>Tennis
          </span>
          <i className={`bx ${open.tennis ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
        </button>
        {open.tennis && (
          <ul id="tennisMenu" className="ml-4 mt-2 space-y-1 text-sm">
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/ATP_Tour_logo.svg/250px-ATP_Tour_logo.svg.png"
                alt="ATP Tour"
                width={16}
                height={16}
              />
              <Link href="#" title="ATP Tour Odds">ATP Tour</Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/WTA_logo_2010.svg/408px-WTA_logo_2010.svg.png"
                alt="WTA Tour"
                width={16}
                height={16}
              />
              <Link href="#" title="WTA Tour Odds">WTA Tour</Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/fr/5/59/Le_Grand_Slam_Logo.png"
                alt="Grand Slams"
                width={16}
                height={16}
              />
              <Link href="#" title="Grand Slams Odds">Grand Slams</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
