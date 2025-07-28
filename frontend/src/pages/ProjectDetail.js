import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import { soundUtils } from '../utils/animations';

const ProjectDetail = ({ soundEnabled }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectsAPI.getById(id);
        setProject(response.data);
      } catch (err) {
        setError('Project not found');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleImageClick = (index) => {
    setActiveImage(index);
    if (soundEnabled) {
      soundUtils.playClick();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-silver mt-4">Loading Project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-silver mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [project.hero_image, ...project.gallery_images];

  return (
    <div className="min-h-screen bg-dark-900 pt-24">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={project.hero_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-dark-900/60 to-dark-900/90" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-gold font-mono text-sm uppercase tracking-wider">
              {project.category}
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          
          <h1 className="hero-title mb-4">{project.title}</h1>
          <p className="text-2xl text-silver mb-8">{project.subtitle}</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-dark-900/50 text-gold font-mono text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary cursor-hover"
              >
                <span>View Live Site</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary cursor-hover"
              >
                <span>View Code</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section">
        <div className="section-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Project Description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  Project Overview
                </h2>
                <p className="text-silver text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  The Challenge
                </h3>
                <p className="text-silver leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  The Solution
                </h3>
                <p className="text-silver leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Project Stats */}
            <div className="space-y-8">
              <div className="card">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-silver">Category</span>
                    <span className="text-gold">{project.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-silver">Year</span>
                    <span className="text-gold">
                      {new Date(project.created_at).getFullYear()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-silver">Status</span>
                    <span className="text-emerald">Completed</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-700 text-gold text-sm font-mono rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Results
                </h3>
                <p className="text-silver leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-center text-white mb-8">
              Development Process
            </h2>
            <div className="card">
              <p className="text-silver text-lg leading-relaxed">
                {project.process}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-center text-white mb-8">
              Project Gallery
            </h2>
            
            {/* Main Image */}
            <div className="mb-8">
              <img
                src={allImages[activeImage]}
                alt={`${project.title} - Image ${activeImage + 1}`}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`relative aspect-video rounded-lg overflow-hidden cursor-hover transition-all ${
                    activeImage === index ? 'ring-2 ring-gold' : 'hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {activeImage === index && (
                    <div className="absolute inset-0 bg-gold/20" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="btn-secondary cursor-hover"
              onClick={() => soundEnabled && soundUtils.playClick()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;