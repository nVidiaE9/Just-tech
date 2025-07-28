import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectDetail from './pages/ProjectDetail';
import SoundToggle from './components/SoundToggle';
import ThemeToggle from './components/ThemeToggle';
import LoadingScreen from './components/LoadingScreen';
import ParticleSystem from './components/ParticleSystem';

// Hooks
import useCustomCursor from './hooks/useCustomCursor';
import useScrollDirection from './hooks/useScrollDirection';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  
  const { cursorPosition, isHovering, isClicking } = useCustomCursor();
  const { scrollDirection } = useScrollDirection();

  // Initialize app
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Prevent scroll when navigation is open
  useEffect(() => {
    if (navigationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [navigationOpen]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        {/* Custom Cursor */}
        <CustomCursor
          position={cursorPosition}
          isHovering={isHovering}
          isClicking={isClicking}
        />

        {/* Particle System */}
        <ParticleSystem />

        {/* Navigation */}
        <Navigation
          isOpen={navigationOpen}
          onToggle={setNavigationOpen}
          scrollDirection={scrollDirection}
          soundEnabled={soundEnabled}
        />

        {/* Theme & Sound Controls */}
        <div className="fixed top-6 right-6 z-40 flex gap-4">
          <SoundToggle
            enabled={soundEnabled}
            onToggle={setSoundEnabled}
          />
          <ThemeToggle
            darkMode={darkMode}
            onToggle={setDarkMode}
          />
        </div>

        {/* Main Content */}
        <main className="relative">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={
              <>
                <HeroSection soundEnabled={soundEnabled} />
                <ProjectsSection soundEnabled={soundEnabled} />
                <AboutSection soundEnabled={soundEnabled} />
                <ServicesSection soundEnabled={soundEnabled} />
                <ContactSection soundEnabled={soundEnabled} />
              </>
            } />
            
            {/* Project Detail Page */}
            <Route path="/project/:id" element={
              <ProjectDetail soundEnabled={soundEnabled} />
            } />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;