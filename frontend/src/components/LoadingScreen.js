import React, { useEffect, useState } from 'react';
import { animationUtils } from '../utils/animations';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo or Brand */}
        <div className="mb-8">
          <h1 className="text-6xl font-display font-bold gradient-text">
            PORTFOLIO
          </h1>
          <p className="text-xl font-mono text-gold mt-2">
            Loading Experience...
          </p>
        </div>

        {/* Loading Animation */}
        <div className="loading-dots mb-8">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-dark-700 rounded-full mx-auto mb-4">
          <div
            className="h-full bg-gradient-to-r from-gold to-electric-blue rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-sm font-mono text-silver">
          {Math.round(progress)}% Complete
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;