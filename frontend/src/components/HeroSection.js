import React, { useEffect, useRef, useState } from 'react';
import { animationUtils, soundUtils } from '../utils/animations';

const HeroSection = ({ soundEnabled }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [typedText, setTypedText] = useState('');

  const fullText = "DESIGNER DE ELITĂ";
  const subTexts = [
    "Creez experiențe digitale de ultimă generație",
    "Luxul întâlnește tehnologia avansată",
    "Inovația redefinește designul premium"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Typing animation for title
  useEffect(() => {
    if (isLoaded) {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [isLoaded]);

  // Animate elements after typing is complete
  useEffect(() => {
    if (typedText === fullText) {
      setTimeout(() => {
        if (subtitleRef.current) {
          animationUtils.slideUp(subtitleRef.current, 0.8, 0.2);
        }
        if (ctaRef.current) {
          animationUtils.scaleUp(ctaRef.current, 0.6, 0.4);
        }
      }, 300);
    }
  }, [typedText]);

  const handleCTAClick = () => {
    if (soundEnabled) {
      soundUtils.playClick();
    }
    
    // Trigger glitch effect
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 300);
    
    // Scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    if (soundEnabled) {
      soundUtils.playHover();
    }
    
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Romanian architecture inspiration */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/85 via-dark-900/70 to-dark-900/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-transparent to-dark-900/50" />
      </div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="particles-container w-full h-full opacity-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="mb-8">
            <h1
              ref={titleRef}
              className={`hero-title mb-6 ${glitchActive ? 'glitch' : ''}`}
              data-text={typedText}
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
          </div>
          
          <div ref={subtitleRef} className="subtitle max-w-4xl mx-auto opacity-0">
            <p className="text-2xl md:text-3xl font-light text-silver mb-6">
              {subTexts[0]}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg md:text-xl text-silver/80">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full"></span>
                Lux
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                Inovație
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-uv-violet rounded-full"></span>
                Precizie
              </span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20 opacity-0">
          <button
            onClick={handleCTAClick}
            className="btn-primary cursor-hover group relative overflow-hidden"
          >
            <span className="relative z-10">Explorează Portofoliul</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <svg
              className="w-6 h-6 transform group-hover:translate-x-2 transition-transform relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
          
          <button
            onClick={() => {
              if (soundEnabled) soundUtils.playHover();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-secondary cursor-hover group"
          >
            <span>Să Colaborăm</span>
            <svg
              className="w-6 h-6 transform group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-3 cursor-hover group"
          >
            <span className="text-sm font-mono text-gold uppercase tracking-wider">
              Derulează
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-gold via-electric-blue to-transparent relative">
              <div className="absolute top-0 left-0 w-full h-4 bg-gold animate-pulse"></div>
            </div>
            <svg
              className="w-6 h-6 text-gold animate-bounce-subtle group-hover:text-electric-blue transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-10 w-24 h-24 border border-gold/20 rotate-45 animate-rotate-slow" />
        <div className="absolute bottom-1/4 right-10 w-20 h-20 border border-electric-blue/20 animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-uv-violet rounded-full animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-gold rounded-full animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;