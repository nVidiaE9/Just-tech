import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { soundUtils } from '../utils/animations';
import { animationUtils } from '../utils/animations';

const Navigation = ({ isOpen, onToggle, scrollDirection, soundEnabled }) => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(scrollDirection === 'up' || window.scrollY < 100);
  }, [scrollDirection]);

  const menuItems = [
    { name: 'Home', href: '/', section: 'hero' },
    { name: 'Projects', href: '/#projects', section: 'projects' },
    { name: 'About', href: '/#about', section: 'about' },
    { name: 'Services', href: '/#services', section: 'services' },
    { name: 'Contact', href: '/#contact', section: 'contact' },
  ];

  const handleMenuClick = (href) => {
    if (soundEnabled) {
      soundUtils.playClick();
    }
    onToggle(false);
    
    // Smooth scroll to section
    if (href.includes('#')) {
      const sectionId = href.split('#')[1];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBurgerClick = () => {
    if (soundEnabled) {
      soundUtils.playClick();
    }
    onToggle(!isOpen);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="glass-dark backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="text-2xl font-display font-bold gradient-text cursor-hover"
                onClick={() => handleMenuClick('/')}
              >
                ELITE
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-sm font-medium text-white hover:text-gold transition-colors duration-300 cursor-hover relative group"
                    onClick={() => handleMenuClick(item.href)}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={handleBurgerClick}
                className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center cursor-hover"
                aria-label="Toggle menu"
              >
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-0.5' : ''
                }`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${
                  isOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Overlay Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-dark-900/95 backdrop-blur-2xl"
          onClick={() => onToggle(false)}
        />

        {/* Menu Content */}
        <div className="relative z-50 h-full flex items-center justify-center">
          <div className="text-center">
            {/* Main Menu Items */}
            <ul className="space-y-8 mb-16">
              {menuItems.map((item, index) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`text-6xl md:text-8xl font-display font-bold gradient-text hover:text-white transition-all duration-500 cursor-hover block ${
                      isOpen ? 'animate-slide-up' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleMenuClick(item.href)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex justify-center space-x-8 mb-8">
              <a
                href="https://github.com"
                className="text-gold hover:text-white transition-colors duration-300 cursor-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="text-gold hover:text-white transition-colors duration-300 cursor-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://dribbble.com"
                className="text-gold hover:text-white transition-colors duration-300 cursor-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.273 5.698-.653-.126-7.512-1.526-7.512-1.526s-.669-1.502-1.502-3.339c2.428-1.003 4.645-1.081 6.741.167zM12 2.138c2.239 0 4.31.857 5.866 2.28-1.895-1.232-4.086-1.26-6.489-.224-.938-1.707-2.008-3.131-2.971-4.007A9.865 9.865 0 0112 2.138zM8.463 1.669c1.027.952 2.135 2.413 3.074 4.176C9.423 6.706 6.707 7.81 4.187 8.524 5.133 5.759 6.663 3.392 8.463 1.669zm-6.305 8.896c-.038-.327-.058-.656-.058-.989 0-.341.02-.677.058-1.009 2.679-.706 5.783-1.885 8.293-2.739.394.752.753 1.508 1.095 2.264-3.007 1.175-5.598 2.945-7.4 5.133-.63-1.013-1.168-2.1-1.568-3.236-.32-.676-.57-1.364-.732-2.067-.088-.357-.165-.717-.238-1.078-.073-.361-.145-.722-.25-1.279zm1.136 8.951c1.704-2.107 4.042-3.716 6.802-4.76.516 1.36 1.054 2.7 1.581 4.037-2.539 1.027-5.543 1.027-8.383-.277zm10.477 2.761c-.018-1.896-.545-3.653-1.461-5.146 2.426-.382 4.767-.382 7.013.764-.737 1.934-2.131 3.513-3.934 4.382h-.618z"/>
                </svg>
              </a>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <p className="text-lg font-mono text-gold mb-2">Get in Touch</p>
              <p className="text-sm text-silver">hello@eliteportfolio.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;