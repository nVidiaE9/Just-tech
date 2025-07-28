import React, { useState, useEffect } from 'react';
import { soundUtils } from '../utils/animations';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const AboutSection = ({ soundEnabled }) => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
  });

  const timelineData = [
    {
      year: '2024',
      title: 'Senior UI/UX Designer',
      company: 'Tech Innovation Lab',
      description: 'Leading design teams in creating next-generation user experiences for AI-powered applications.',
      achievements: ['Led 5 major product launches', 'Improved user engagement by 200%', 'Mentored 8 junior designers'],
    },
    {
      year: '2022',
      title: 'Lead Web Designer',
      company: 'Digital Luxury Agency',
      description: 'Specialized in creating premium digital experiences for luxury brands and high-end e-commerce.',
      achievements: ['Worked with 15+ luxury brands', 'Increased conversion rates by 150%', 'Won 3 design awards'],
    },
    {
      year: '2020',
      title: 'Full-Stack Developer',
      company: 'Creative Solutions Inc.',
      description: 'Developed and designed custom web applications with focus on performance and user experience.',
      achievements: ['Built 25+ custom applications', 'Reduced loading times by 60%', 'Implemented modern tech stacks'],
    },
    {
      year: '2018',
      title: 'Freelance Designer',
      company: 'Independent',
      description: 'Started freelancing journey, working with startups and established companies on diverse projects.',
      achievements: ['Completed 50+ projects', 'Built strong client relationships', 'Developed unique design style'],
    },
  ];

  const skills = [
    { name: 'UI/UX Design', level: 95 },
    { name: 'Web Development', level: 90 },
    { name: 'Brand Design', level: 85 },
    { name: 'Animation', level: 88 },
    { name: 'Prototyping', level: 92 },
    { name: 'User Research', level: 80 },
  ];

  const handleTimelineClick = (index) => {
    setActiveTimeline(index);
    if (soundEnabled) {
      soundUtils.playClick();
    }
  };

  useEffect(() => {
    if (isIntersecting) {
      const interval = setInterval(() => {
        setActiveTimeline((prev) => (prev + 1) % timelineData.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isIntersecting, timelineData.length]);

  return (
    <section id="about" ref={elementRef} className="section bg-dark-900">
      <div className="section-content">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title gradient-text">About Me</h2>
          <p className="subtitle max-w-3xl mx-auto">
            A passionate designer and developer with over 6 years of experience creating 
            digital experiences that blend innovation with elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Personal Story */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-2xl font-display font-bold text-white mb-4">My Philosophy</h3>
              <p className="text-silver text-lg leading-relaxed mb-4">
                I believe that great design is not just about how something looks, but how it feels 
                and functions. Every pixel, every interaction, every micro-animation should serve 
                a purpose in creating an unforgettable user experience.
              </p>
              <p className="text-silver text-lg leading-relaxed">
                My approach combines <span className="text-gold">technical precision</span> with 
                <span className="text-gold"> creative innovation</span>, resulting in digital 
                products that are both beautiful and functional.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-display font-bold text-white mb-4">What Drives Me</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-silver">Creating solutions that solve real user problems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-silver">Pushing the boundaries of what's possible on the web</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-silver">Continuous learning and adaptation to new technologies</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-silver">Mentoring the next generation of designers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Expertise</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gold font-mono text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold to-electric-blue rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: isIntersecting ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-display font-bold text-white mb-4">Recognition</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-silver">Awwwards Site of the Day (3x)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-silver">CSS Design Awards Winner</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-silver">FWA Site of the Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-display font-bold text-center text-white mb-12">
            Professional Journey
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold via-electric-blue to-gold"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <button
                      onClick={() => handleTimelineClick(index)}
                      className={`w-12 h-12 rounded-full border-4 transition-all duration-300 cursor-hover ${
                        activeTimeline === index
                          ? 'border-gold bg-gold text-dark-900'
                          : 'border-dark-600 bg-dark-800 text-gold hover:border-gold'
                      }`}
                    >
                      <span className="text-sm font-mono font-bold">
                        {item.year.slice(-2)}
                      </span>
                    </button>
                  </div>

                  {/* Timeline Content */}
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                    }`}
                  >
                    <div className={`card transition-all duration-300 ${
                      activeTimeline === index ? 'border-gold/50 shadow-glow-gold' : ''
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gold font-mono text-sm">{item.year}</span>
                        <span className="w-6 h-px bg-gold"></span>
                      </div>
                      <h4 className="text-xl font-display font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-silver font-medium mb-3">{item.company}</p>
                      <p className="text-silver text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      
                      {activeTimeline === index && (
                        <div className="space-y-2">
                          {item.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gold rounded-full"></div>
                              <span className="text-silver text-sm">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;