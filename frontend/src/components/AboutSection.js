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
      company: 'Laborator Inovație Tech',
      description: 'Conduc echipe de design în crearea experiențelor utilizator de următoarea generație pentru aplicații alimentate de AI și platforme enterprise.',
      achievements: ['Coordonez 5 lansări majore de produse', 'Îmbunătățesc engagement-ul cu 200%', 'Mentorez 8 designeri juniori'],
    },
    {
      year: '2022',
      title: 'Lead Web Designer',
      company: 'Agenție Luxe Digital',
      description: 'Specializat în crearea experiențelor digitale premium pentru branduri de lux și e-commerce de înaltă clasă. Focus pe eleganță și performanță.',
      achievements: ['Colaborez cu 15+ branduri de lux', 'Cresc ratele de conversie cu 150%', 'Câștig 3 premii de design'],
    },
    {
      year: '2020',
      title: 'Full-Stack Developer',
      company: 'Soluții Creative SRL',
      description: 'Dezvolt și proiectez aplicații web personalizate cu focus pe performanță și experiența utilizatorului. Implementez cele mai noi tehnologii.',
      achievements: ['Construiesc 25+ aplicații personalizate', 'Reduc timpul de încărcare cu 60%', 'Implementez stack-uri tehnologice moderne'],
    },
    {
      year: '2018',
      title: 'Designer Freelance',
      company: 'Independent',
      description: 'Îmi încep călătoria în freelancing, colaborând cu startup-uri și companii etablite pe proiecte diverse și inovatoare.',
      achievements: ['Finalizez 50+ proiecte', 'Construiesc relații solide cu clienții', 'Dezvolt stil de design unic'],
    },
  ];

  const skills = [
    { name: 'Design UI/UX', level: 95, color: 'gold' },
    { name: 'Dezvoltare Web', level: 92, color: 'electric-blue' },
    { name: 'Design de Brand', level: 88, color: 'uv-violet' },
    { name: 'Animații Web', level: 90, color: 'emerald' },
    { name: 'Prototipare', level: 94, color: 'gold' },
    { name: 'Cercetare UX', level: 85, color: 'electric-blue' },
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
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isIntersecting, timelineData.length]);

  return (
    <section id="about" ref={elementRef} className="section bg-gradient-to-br from-dark-900 to-dark-800">
      <div className="section-content">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="section-title gradient-text mb-8">Despre Mine</h2>
          <p className="subtitle max-w-4xl mx-auto">
            Un designer pasionat și dezvoltator cu peste 6 ani de experiență în crearea 
            experiențelor digitale care îmbină inovația cu eleganța și funcționalitatea cu frumusețea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          {/* Personal Story */}
          <div className="space-y-8">
            <div className="card group hover:shadow-luxury transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-gold to-electric-blue rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">Filozofia Mea</h3>
              </div>
              <p className="text-silver text-lg leading-relaxed mb-6">
                Cred că designul excelent nu se referă doar la aspectul unui produs, ci la modul în care 
                se simte și funcționează. Fiecare pixel, fiecare interacțiune, fiecare micro-animație 
                trebuie să servească un scop în crearea unei experiențe de neuitat.
              </p>
              <p className="text-silver text-lg leading-relaxed">
                Abordarea mea combină <span className="text-gold font-semibold">precizia tehnică</span> cu 
                <span className="text-electric-blue font-semibold"> inovația creativă</span>, rezultând 
                produse digitale care sunt atât frumoase, cât și funcționale.
              </p>
            </div>

            <div className="card group hover:shadow-luxury transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-uv-violet rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">Ce Mă Motivează</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Creez soluții care rezolvă probleme reale ale utilizatorilor',
                  'Împing limitele a ceea ce este posibil pe web',
                  'Învățare continuă și adaptare la tehnologii noi',
                  'Mentoratul următoarei generații de designeri'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gold rounded-full mt-3 flex-shrink-0 animate-pulse" />
                    <span className="text-silver text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-8">
            <div className="card group hover:shadow-luxury transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-uv-violet to-gold rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">Expertiza</h3>
              </div>
              <div className="space-y-8">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-lg">{skill.name}</span>
                      <span className={`font-mono text-sm font-bold text-${skill.color}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-${skill.color} to-electric-blue rounded-full transition-all duration-1000 ease-out relative`}
                        style={{ 
                          width: isIntersecting ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.15}s`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card group hover:shadow-luxury transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald to-gold rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">Recunoaștere</h3>
              </div>
              <div className="space-y-4">
                {[
                  'Awwwards Site of the Day (3x)',
                  'CSS Design Awards Câștigător',
                  'FWA Site of the Month',
                  'Dribbble Top Shot (5x)'
                ].map((award, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-gold/20 to-electric-blue/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <span className="text-silver text-lg">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-4xl font-display font-bold text-center text-white mb-16">
            Călătoria Profesională
          </h3>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold via-electric-blue to-uv-violet rounded-full"></div>
            
            {/* Timeline Items */}
            <div className="space-y-20">
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
                      className={`w-16 h-16 rounded-full border-4 transition-all duration-500 cursor-hover group ${
                        activeTimeline === index
                          ? 'border-gold bg-gold text-dark-900 shadow-glow-gold scale-110'
                          : 'border-dark-600 bg-dark-800 text-gold hover:border-gold hover:scale-105'
                      }`}
                    >
                      <span className="text-lg font-mono font-bold">
                        {item.year.slice(-2)}
                      </span>
                    </button>
                  </div>

                  {/* Timeline Content */}
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'
                    }`}
                  >
                    <div className={`card transition-all duration-500 ${
                      activeTimeline === index 
                        ? 'border-gold/50 shadow-glow-gold scale-105' 
                        : 'hover:border-gold/30'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-gold font-mono text-lg font-bold">{item.year}</span>
                        <span className="w-8 h-px bg-gradient-to-r from-gold to-electric-blue"></span>
                      </div>
                      <h4 className="text-2xl font-display font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-electric-blue font-medium mb-4 text-lg">{item.company}</p>
                      <p className="text-silver leading-relaxed mb-6">
                        {item.description}
                      </p>
                      
                      {activeTimeline === index && (
                        <div className="space-y-3 animate-fade-in">
                          <h5 className="text-white font-semibold">Realizări Cheie:</h5>
                          {item.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                              <span className="text-silver">{achievement}</span>
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

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-uv-violet/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
};

export default AboutSection;