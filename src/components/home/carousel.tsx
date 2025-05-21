'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Slide {
  title: string;
  subtitle: string;
  odds: string;
  link: string;
  logo: string;
}

export default function Carousel() {
  const slides: Slide[] = [
    {
      title: 'Team A vs Team B',
      subtitle: 'Champions League',
      odds: '1.85',
      link: '/event/teamA-vs-teamB',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bet365_Logo.svg/442px-Bet365_Logo.svg.png',
    },
    {
      title: 'Player X vs Player Y',
      subtitle: 'Wimbledon',
      odds: '2.10',
      link: '/event/playerX-vs-playerY',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/William_Hill_logo.png/250px-William_Hill_logo.png',
    },
    {
      title: 'Club C vs Club D',
      subtitle: 'Premier League',
      odds: '1.95',
      link: '/event/clubC-vs-clubD',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Unibet-Logo-white.jpg/250px-Unibet-Logo-white.jpg',
    },
  ];

  const [current, setCurrent] = useState<number>(0);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-64 overflow-hidden">
      <div className="slides relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide absolute inset-0 transition-opacity duration-700 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-xl p-6 h-full hover:shadow-2xl">
              <a
                href={slide.link}
                className="text-gray-800 font-bold text-lg text-center hover:text-green-600"
              >
                {slide.title}
              </a>
              <p className="text-xs text-gray-500 text-center">
                {slide.subtitle}
              </p>
              <div className="flex items-center justify-between bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors duration-300">
                <span className="text-base font-semibold text-green-800">
                  {slide.odds}
                </span>
                <Image
                  src={slide.logo}
                  alt="bookmaker"
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                  loading="lazy"
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white rounded-full p-2 hover:bg-green-700"
      >
        <i className="bx bx-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white rounded-full p-2 hover:bg-green-700"
      >
        <i className="bx bx-chevron-right"></i>
      </button>
    </div>
  );
}
