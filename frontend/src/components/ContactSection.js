import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { soundUtils } from '../utils/animations';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ContactSection = ({ soundEnabled }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      if (soundEnabled) {
        soundUtils.playClick();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await contactAPI.submit(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      if (soundEnabled) {
        soundUtils.playSuccess();
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      info: 'hello@eliteportfolio.com',
      link: 'mailto:hello@eliteportfolio.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      info: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Location',
      info: 'San Francisco, CA',
      link: null
    }
  ];

  return (
    <section id="contact" ref={elementRef} className="section bg-dark-900">
      <div className="section-content">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <p className="subtitle max-w-3xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project and create 
            something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Send a Message
              </h3>
              <p className="text-silver">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-dark-700 border ${
                      errors.name ? 'border-red-500' : 'border-dark-600'
                    } rounded-lg text-white placeholder-silver focus:outline-none focus:border-gold transition-colors`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-dark-700 border ${
                      errors.email ? 'border-red-500' : 'border-dark-600'
                    } rounded-lg text-white placeholder-silver focus:outline-none focus:border-gold transition-colors`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-silver focus:outline-none focus:border-gold transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-dark-700 border ${
                      errors.subject ? 'border-red-500' : 'border-dark-600'
                    } rounded-lg text-white placeholder-silver focus:outline-none focus:border-gold transition-colors`}
                    placeholder="Project inquiry"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-dark-700 border ${
                    errors.message ? 'border-red-500' : 'border-dark-600'
                  } rounded-lg text-white placeholder-silver focus:outline-none focus:border-gold transition-colors resize-none`}
                  placeholder="Tell me about your project, goals, and timeline..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full cursor-hover ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400">
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400">
                    Sorry, there was an error sending your message. Please try again or contact me directly.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Let's Connect
              </h3>
              <p className="text-silver">
                I'm always excited to discuss new projects and opportunities. 
                Here are the best ways to reach me:
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="card">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gold/20 rounded-lg text-gold">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{method.title}</h4>
                      {method.link ? (
                        <a
                          href={method.link}
                          className="text-silver hover:text-gold transition-colors cursor-hover"
                        >
                          {method.info}
                        </a>
                      ) : (
                        <p className="text-silver">{method.info}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="card">
              <h4 className="text-white font-display font-bold mb-3">Availability</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-silver">Response Time</span>
                  <span className="text-gold">< 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-silver">Project Booking</span>
                  <span className="text-emerald">Available</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-silver">Consultation</span>
                  <span className="text-emerald">Free Initial Call</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card">
              <h4 className="text-white font-display font-bold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { name: 'Dribbble', url: 'https://dribbble.com', icon: 'M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.273 5.698-.653-.126-7.512-1.526-7.512-1.526s-.669-1.502-1.502-3.339c2.428-1.003 4.645-1.081 6.741.167z' },
                  { name: 'GitHub', url: 'https://github.com', icon: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-dark-700 rounded-lg text-silver hover:text-gold hover:bg-gold/10 transition-all cursor-hover"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;