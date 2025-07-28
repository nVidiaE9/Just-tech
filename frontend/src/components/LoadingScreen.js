import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');

  const loadingTexts = [
    'Inițializarea experienței...',
    'Încărcarea portofoliului...',
    'Pregătirea animațiilor...',
    'Finalizarea detaliilor...',
    'Gata de lansare!'
  ];

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeText = () => {
      const currentWord = loadingTexts[textIndex];
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % loadingTexts.length;
          setTimeout(typeText, 500);
          return;
        }
      } else {
        setCurrentText(currentWord.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentWord.length) {
          setTimeout(() => {
            isDeleting = true;
            typeText();
          }, 1500);
          return;
        }
      }
      
      setTimeout(typeText, isDeleting ? 50 : 100);
    };

    typeText();

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 120);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-12">
          <div className="relative">
            <h1 className="text-8xl font-display font-black gradient-text mb-4 animate-pulse">
              ELITE
            </h1>
            <div className="absolute inset-0 text-8xl font-display font-black text-gold opacity-20 animate-pulse"
                 style={{ animationDelay: '0.5s' }}>
              ELITE
            </div>
          </div>
          <div className="h-8 flex items-center justify-center">
            <p className="text-2xl font-mono text-silver">
              {currentText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gold rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold via-electric-blue to-uv-violet rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="flex justify-between items-center w-80 mx-auto">
          <span className="text-sm font-mono text-silver">
            {Math.round(progress)}%
          </span>
          <span className="text-sm font-mono text-gold">
            Designer de Elită
          </span>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;