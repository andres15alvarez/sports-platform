'use client';
import { useState, useEffect } from 'react';

// Tipos
interface Slide {
  id: number;
  bgImage: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonStyle: string;
}

interface HeroSlideProps {
  slide: Slide;
  isActive: boolean;
}

interface HeroControlsProps {
  slides: Slide[];
  currentSlide: number;
  prevSlide: () => void;
  nextSlide: () => void;
  goToSlide: (index: number) => void;
}

// Datos
const slides: Slide[] = [
  {
    id: 1,
    bgImage: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tag: 'SPECIAL OFFER',
    tagColor: 'bg-yellow-500 text-black',
    title: 'Welcome Bonus',
    description: 'Up to €100 on your first deposit',
    buttonText: 'REGISTER NOW',
    buttonLink: '#',
    buttonStyle: 'bg-green-600 hover:bg-green-700 text-white',
  },
  {
    id: 2,
    bgImage: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tag: 'NEW',
    tagColor: 'bg-green-600 text-white',
    title: 'Milan Derby',
    description: 'Predictions and enhanced odds',
    buttonText: 'LEARN MORE',
    buttonLink: '#',
    buttonStyle: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  },
  {
    id: 3,
    bgImage: 'https://images.unsplash.com/photo-1561280626-c9ef00e4b221?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tag: 'LIVE',
    tagColor: 'bg-red-600 text-white',
    title: 'Betting Contest',
    description: 'Guess results & win Champions League VIP',
    buttonText: 'PARTICIPATE',
    buttonLink: '#',
    buttonStyle: 'bg-white hover:bg-gray-100 text-green-700',
  },
];

// Componente principal
export default function HeroCarousel() {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrent(index);

  return (
    <div className="hero-carousel-container w-full relative overflow-hidden mb-6 rounded-lg">
      <div className="hero-carousel relative h-[300px] md:h-[250px]">
        {slides.map((slide, index) => (
          <HeroSlide key={slide.id} slide={slide} isActive={index === current} />
        ))}
      </div>

      <HeroControls
        slides={slides}
        currentSlide={current}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        goToSlide={goToSlide}
      />
    </div>
  );
}

// Componente Slide
function HeroSlide({ slide, isActive }: HeroSlideProps) {
  return (
    <div
      className={`slide w-full h-full absolute transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundImage: `url(${slide.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="slide-content absolute bottom-0 left-0 p-4 md:p-6 text-white bg-black/50 max-w-full w-full">
        <span className={`${slide.tagColor} font-bold px-2 py-1 mb-2 inline-block text-sm`}>
          {slide.tag}
        </span>
        <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{slide.title}</h2>
        <p className="mb-2 md:mb-4 text-sm md:text-base">{slide.description}</p>
        <a
          href={slide.buttonLink}
          className={`${slide.buttonStyle} py-1 px-3 md:py-2 md:px-4 rounded-md font-bold inline-block transition-colors text-sm md:text-base`}
        >
          {slide.buttonText}
        </a>
      </div>
    </div>
  );
}

// Componente de controles
function HeroControls({ slides, currentSlide, prevSlide, nextSlide, goToSlide }: HeroControlsProps) {
  return (
    <>
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 md:p-3 hover:bg-opacity-70 focus:outline-none z-10"
      >
        <i className="bx bx-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 md:p-3 hover:bg-opacity-70 focus:outline-none z-10"
      >
        <i className="bx bx-chevron-right"></i>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`hero-indicator w-2 md:w-3 h-2 md:h-3 bg-white rounded-full cursor-pointer transition-opacity ${
              currentSlide === index ? 'opacity-100' : 'opacity-50'
            }`}
          />
        ))}
      </div>
    </>
  );
}
