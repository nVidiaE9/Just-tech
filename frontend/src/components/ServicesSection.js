import React, { useState } from 'react';
import { soundUtils } from '../utils/animations';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ServicesSection = ({ soundEnabled }) => {
  const [activeService, setActiveService] = useState(0);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
  });

  const services = [
    {
      title: 'Web Design & Development',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Custom websites and web applications built with modern technologies and premium design.',
      features: [
        'Responsive Design',
        'Performance Optimization',
        'Modern Tech Stack',
        'SEO Optimization',
        'Cross-browser Compatibility',
        'Accessibility Standards'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      startingPrice: '$5,000',
      timeline: '4-8 weeks',
    },
    {
      title: 'UI/UX Design',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      description: 'User-centered design solutions that prioritize usability and create memorable experiences.',
      features: [
        'User Research',
        'Wireframing & Prototyping',
        'Design Systems',
        'Interaction Design',
        'Usability Testing',
        'Mobile-first Design'
      ],
      technologies: ['Figma', 'Sketch', 'Adobe XD', 'Principle', 'InVision', 'Miro'],
      startingPrice: '$3,000',
      timeline: '3-6 weeks',
    },
    {
      title: 'Brand Identity Design',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      description: 'Comprehensive brand identity solutions that reflect your company\'s values and vision.',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Color Palettes',
        'Typography Selection',
        'Brand Applications',
        'Marketing Materials'
      ],
      technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Figma', 'Sketch'],
      startingPrice: '$2,500',
      timeline: '2-4 weeks',
    },
    {
      title: 'Animation & Motion Design',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Engaging animations and micro-interactions that bring digital experiences to life.',
      features: [
        'Web Animations',
        'Micro-interactions',
        'Loading Animations',
        'Scroll Triggers',
        'Parallax Effects',
        'Performance Optimization'
      ],
      technologies: ['GSAP', 'Framer Motion', 'Lottie', 'Three.js', 'CSS3', 'WebGL'],
      startingPrice: '$1,500',
      timeline: '2-3 weeks',
    },
    {
      title: 'Consultation & Strategy',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: 'Strategic guidance and expert consultation to optimize your digital presence.',
      features: [
        'Digital Strategy',
        'UX Audits',
        'Performance Reviews',
        'Technology Recommendations',
        'Team Training',
        'Best Practices'
      ],
      technologies: ['Analytics', 'Hotjar', 'UserTesting', 'Lighthouse', 'GTMetrix', 'Figma'],
      startingPrice: '$200/hour',
      timeline: '1-2 weeks',
    },
    {
      title: 'E-commerce Solutions',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      description: 'Complete e-commerce platforms designed for optimal conversion and user experience.',
      features: [
        'Custom E-commerce Design',
        'Shopping Cart Optimization',
        'Payment Integration',
        'Inventory Management',
        'Mobile Commerce',
        'Analytics & Reporting'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'React', 'Node.js'],
      startingPrice: '$8,000',
      timeline: '6-12 weeks',
    },
  ];

  const handleServiceClick = (index) => {
    setActiveService(index);
    if (soundEnabled) {
      soundUtils.playClick();
    }
  };

  return (
    <section id="services" ref={elementRef} className="section bg-dark-800">
      <div className="section-content">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title gradient-text">Services</h2>
          <p className="subtitle max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to elevate your brand and 
            create exceptional user experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(index)}
              className={`card cursor-pointer transition-all duration-300 group ${
                activeService === index 
                  ? 'border-gold/50 shadow-glow-gold transform scale-105' 
                  : 'hover:border-gold/30'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg transition-colors ${
                  activeService === index ? 'bg-gold text-dark-900' : 'bg-dark-700 text-gold'
                }`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gold font-mono text-sm">
                    From {service.startingPrice}
                  </p>
                </div>
              </div>
              
              <p className="text-silver text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center justify-between text-xs text-silver">
                <span>⏱ {service.timeline}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Learn More
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Service Details */}
        <div className="card bg-dark-900/50 border-gold/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gold/20 rounded-lg text-gold">
                  {services[activeService].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {services[activeService].title}
                  </h3>
                  <p className="text-gold font-mono">
                    Starting from {services[activeService].startingPrice}
                  </p>
                </div>
              </div>

              <p className="text-silver text-lg leading-relaxed mb-6">
                {services[activeService].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Timeline</h4>
                  <p className="text-gold font-mono text-sm">
                    {services[activeService].timeline}
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Delivery</h4>
                  <p className="text-silver text-sm">
                    Complete source code & assets
                  </p>
                </div>
              </div>
            </div>

            {/* Features & Technologies */}
            <div>
              <div className="mb-6">
                <h4 className="text-white font-display font-bold mb-4">What's Included</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services[activeService].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                      <span className="text-silver text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-display font-bold mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {services[activeService].technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-dark-700 text-gold text-xs font-mono rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (soundEnabled) soundUtils.playClick();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary w-full cursor-hover"
              >
                <span>Get Started</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-silver mb-6">
            Let's discuss how we can bring your vision to life with cutting-edge design and development.
          </p>
          <button
            onClick={() => {
              if (soundEnabled) soundUtils.playClick();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-secondary cursor-hover"
          >
            <span>Schedule a Consultation</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;