import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import { soundUtils } from '../utils/animations';

const ProjectsSection = ({ soundEnabled }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filter, setFilter] = useState('toate');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getFeatured();
        setProjects(response.data);
      } catch (err) {
        setError('Nu s-au putut încărca proiectele');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectHover = (projectId) => {
    setHoveredProject(projectId);
    if (soundEnabled) {
      soundUtils.playHover();
    }
  };

  const handleProjectClick = (projectId) => {
    if (soundEnabled) {
      soundUtils.playClick();
    }
  };

  const categories = ['toate', 'E-commerce', 'Vizualizare Date', 'Mobile Banking', 'Real Estate', 'Enterprise Software'];

  const filteredProjects = filter === 'toate' 
    ? projects 
    : projects.filter(project => project.category === filter);

  if (loading) {
    return (
      <section id="projects" className="section bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="section-content">
          <div className="text-center">
            <div className="loading-dots mb-6">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="text-silver text-xl">Se încarcă portofoliul...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="section-content">
          <div className="text-center">
            <p className="text-red-400 text-xl">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary mt-6"
            >
              Încearcă Din Nou
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section bg-gradient-to-br from-dark-800 to-dark-900">
      <div className="section-content">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="section-title gradient-text mb-8">Proiecte Premium</h2>
          <p className="subtitle max-w-3xl mx-auto mb-12">
            O selecție curatoriată a celor mai impactante lucrări, demonstrând soluții inovatoare 
            și gândire de design de ultimă generație.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setFilter(category);
                  if (soundEnabled) soundUtils.playClick();
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-hover ${
                  filter === category
                    ? 'bg-gradient-to-r from-gold to-electric-blue text-dark-900 shadow-glow-gold'
                    : 'bg-dark-700/50 text-silver hover:bg-gold/20 hover:text-gold'
                }`}
              >
                {category === 'toate' ? 'Toate Proiectele' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12 mb-20">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`relative group cursor-pointer ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex items-center gap-12`}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link
                to={`/project/${project.id}`}
                onClick={() => handleProjectClick(project.id)}
                className="block lg:w-1/2"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-2xl bg-dark-700 aspect-video group-hover:shadow-luxury-lg transition-all duration-700">
                  <img
                    src={project.hero_image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-gold/30 to-electric-blue/30 transition-opacity duration-500 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Project Number */}
                  <div className="absolute top-6 right-6 w-16 h-16 border-2 border-gold/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-gold font-mono font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* View Project Indicator */}
                  <div className={`absolute bottom-6 left-6 right-6 transform transition-all duration-500 ${
                    hoveredProject === project.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Vezi Proiectul</span>
                      <svg
                        className="w-6 h-6 text-gold transform group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project Info */}
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-mono text-gold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="w-12 h-px bg-gradient-to-r from-gold to-electric-blue" />
                </div>

                <div>
                  <h3 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gold group-hover:to-electric-blue transition-all duration-500">
                    {project.title}
                  </h3>
                  <p className="text-2xl text-silver mb-6">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-silver text-lg leading-relaxed mb-8">
                  {project.description.substring(0, 200)}...
                </p>
                
                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-white font-medium mb-3">Tehnologii Folosite:</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.tech_stack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-mono bg-dark-700/50 text-electric-blue rounded-lg border border-electric-blue/20 hover:bg-electric-blue/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 6 && (
                      <span className="px-4 py-2 text-sm font-mono bg-dark-700/50 text-silver rounded-lg">
                        +{project.tech_stack.length - 6} altele
                      </span>
                    )}
                  </div>
                </div>

                {/* Results Preview */}
                <div className="space-y-3 text-sm text-silver">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-emerald rounded-full"></span>
                    <span>Performanță îmbunătățită semnificativ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    <span>Experiență utilizator premium</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                    <span>Tehnologii de ultimă generație</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Link
            to="/proiecte"
            className="btn-secondary cursor-hover group inline-flex items-center gap-3"
            onClick={() => soundEnabled && soundUtils.playClick()}
          >
            <span>Vezi Toate Proiectele</span>
            <div className="w-12 h-px bg-gradient-to-r from-gold to-electric-blue group-hover:w-16 transition-all"></div>
            <svg
              className="w-6 h-6 transform group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-uv-violet/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
};

export default ProjectsSection;