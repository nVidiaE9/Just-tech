import React, { useEffect, useRef, useState } from 'react';
import { animationUtils, soundUtils } from '../utils/animations';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const HeroSection = ({ soundEnabled }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded && titleRef.current && subtitleRef.current && ctaRef.current) {
      // Animate title with stagger
      animationUtils.textReveal(titleRef.current, 1.2, 0.2);
      animationUtils.slideUp(subtitleRef.current, 0.8, 0.6);
      animationUtils.scaleUp(ctaRef.current, 0.6, 1.0);
    }
  }, [isLoaded]);

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
      ref={elementRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-dark-900/60 to-dark-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-dark-900/40" />
      </div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="particles-container w-full h-full opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1
            ref={titleRef}
            className={`hero-title mb-6 ${glitchActive ? 'glitch' : ''}`}
            data-text="ELITE DESIGNER"
          >
            ELITE DESIGNER
          </h1>
          
          <div ref={subtitleRef} className="subtitle max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-light text-silver mb-4">
              Creating <span className="text-gold">state-of-the-art</span> digital experiences
            </p>
            <p className="text-lg md:text-xl text-silver/80">
              Luxury • Innovation • Precision
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button
            onClick={handleCTAClick}
            className="btn-primary cursor-hover group"
          >
            <span>Explore Portfolio</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
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
            <span>Get In Touch</span>
            <svg
              className="w-5 h-5 transform group-hover:scale-110 transition-transform"
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
            className="flex flex-col items-center gap-2 cursor-hover group"
          >
            <span className="text-sm font-mono text-gold uppercase tracking-wider">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent relative">
              <div className="absolute top-0 left-0 w-full h-3 bg-gold animate-pulse"></div>
            </div>
            <svg
              className="w-6 h-6 text-gold animate-bounce-subtle group-hover:text-white transition-colors"
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

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-10 w-20 h-20 border border-gold/20 rotate-45 animate-rotate-slow" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-electric-blue/20 animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-uv-violet rounded-full animate-float" />
      </div>
    </section>
  );
};

export default HeroSection;