import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.273 5.698-.653-.126-7.512-1.526-7.512-1.526s-.669-1.502-1.502-3.339c2.428-1.003 4.645-1.081 6.741.167zM12 2.138c2.239 0 4.31.857 5.866 2.28-1.895-1.232-4.086-1.26-6.489-.224-.938-1.707-2.008-3.131-2.971-4.007A9.865 9.865 0 0112 2.138zM8.463 1.669c1.027.952 2.135 2.413 3.074 4.176C9.423 6.706 6.707 7.81 4.187 8.524 5.133 5.759 6.663 3.392 8.463 1.669zm-6.305 8.896c-.038-.327-.058-.656-.058-.989 0-.341.02-.677.058-1.009 2.679-.706 5.783-1.885 8.293-2.739.394.752.753 1.508 1.095 2.264-3.007 1.175-5.598 2.945-7.4 5.133-.63-1.013-1.168-2.1-1.568-3.236-.32-.676-.57-1.364-.732-2.067-.088-.357-.165-.717-.238-1.078-.073-.361-.145-.722-.25-1.279zm1.136 8.951c1.704-2.107 4.042-3.716 6.802-4.76.516 1.36 1.054 2.7 1.581 4.037-2.539 1.027-5.543 1.027-8.383-.277zm10.477 2.761c-.018-1.896-.545-3.653-1.461-5.146 2.426-.382 4.767-.382 7.013.764-.737 1.934-2.131 3.513-3.934 4.382h-.618z"/>
        </svg>
      ),
    },
    {
      name: 'Behance',
      url: 'https://behance.net',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 7.5v9c0 1.381 1.119 2.5 2.5 2.5h19c1.381 0 2.5-1.119 2.5-2.5v-9c0-1.381-1.119-2.5-2.5-2.5h-19C1.119 5 0 6.119 0 7.5zm22 0v9c0 .275-.225.5-.5.5h-19c-.275 0-.5-.225-.5-.5v-9c0-.275.225-.5.5-.5h19c.275 0 .5.225.5.5z"/>
          <path d="M8.5 12c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z"/>
          <path d="M15 9h4v1h-4zM6 9h4v1H6zM6 14h4v1H6zM15 14h4v1h-4z"/>
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="relative bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-display font-bold gradient-text mb-4 block">
              ELITE
            </Link>
            <p className="text-silver text-lg mb-6 max-w-md">
              Creating luxury digital experiences that push the boundaries of design and technology. 
              Every project is a masterpiece of innovation and elegance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-gold/20 transition-all duration-300 cursor-hover group"
                  aria-label={link.name}
                >
                  <span className="text-silver group-hover:text-gold transition-colors">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-silver hover:text-gold transition-colors duration-300 cursor-hover"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-6">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-silver">hello@eliteportfolio.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-silver">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-silver">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-silver text-sm mb-4 md:mb-0">
              © {currentYear} Elite Portfolio. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-silver hover:text-gold transition-colors cursor-hover">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-silver hover:text-gold transition-colors cursor-hover">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-silver hover:text-gold transition-colors cursor-hover">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
    </footer>
  );
};

export default Footer;