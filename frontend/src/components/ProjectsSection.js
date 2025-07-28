import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import { soundUtils } from '../utils/animations';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ProjectsSection = ({ soundEnabled }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getFeatured();
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects');
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

  if (loading) {
    return (
      <section id="projects" className="section bg-dark-800">
        <div className="section-content">
          <div className="text-center">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="text-silver mt-4">Loading Projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section bg-dark-800">
        <div className="section-content">
          <div className="text-center">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={elementRef} className="section bg-dark-800">
      <div className="section-content">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p className="subtitle max-w-2xl mx-auto">
            A curated selection of my most impactful work, showcasing innovative solutions 
            and cutting-edge design thinking.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative group cursor-pointer ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link
                to={`/project/${project.id}`}
                onClick={() => handleProjectClick(project.id)}
                className="block"
              >
                <div className="relative overflow-hidden bg-dark-700 rounded-lg">
                  {/* Project Image */}
                  <div className="relative aspect-video lg:aspect-[16/10]">
                    <img
                      src={project.hero_image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                    
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gold/20 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>

                  {/* Project Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gold uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="w-8 h-px bg-gold" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-lg text-silver mb-4">
                      {project.subtitle}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-dark-900/50 text-silver rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="px-3 py-1 text-xs font-mono bg-dark-900/50 text-silver rounded-full">
                          +{project.tech_stack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* View Project Link */}
                    <div className="flex items-center gap-2 text-gold group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">View Project</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
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
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center">
                    <span className="text-gold text-sm font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Link
            to="/projects"
            className="btn-primary cursor-hover group"
            onClick={() => soundEnabled && soundUtils.playClick()}
          >
            <span>View All Projects</span>
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
          </Link>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-electric-blue/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default ProjectsSection;