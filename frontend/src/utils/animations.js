import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation utilities
export const animationUtils = {
  // Fade in animation
  fadeIn: (element, duration = 0.6, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
    );
  },

  // Slide up animation
  slideUp: (element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(
      element,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration, delay, ease: 'power3.out' }
    );
  },

  // Slide in from left
  slideInLeft: (element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(
      element,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration, delay, ease: 'power3.out' }
    );
  },

  // Slide in from right
  slideInRight: (element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(
      element,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration, delay, ease: 'power3.out' }
    );
  },

  // Scale up animation
  scaleUp: (element, duration = 0.6, delay = 0) => {
    return gsap.fromTo(
      element,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration, delay, ease: 'back.out(1.7)' }
    );
  },

  // Text reveal animation
  textReveal: (element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(
      element,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration, delay, ease: 'power3.out' }
    );
  },

  // Stagger animation for multiple elements
  staggerAnimation: (elements, animation = 'fadeIn', stagger = 0.1) => {
    const animationFunction = animationUtils[animation];
    elements.forEach((element, index) => {
      animationFunction(element, 0.6, index * stagger);
    });
  },

  // Parallax effect
  parallax: (element, speed = 0.5) => {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  },

  // Glitch effect
  glitch: (element, duration = 0.3) => {
    const tl = gsap.timeline({ repeat: 1, yoyo: true });
    
    tl.to(element, {
      duration: duration / 6,
      x: -2,
      y: 2,
      ease: 'power2.inOut',
    })
    .to(element, {
      duration: duration / 6,
      x: -2,
      y: -2,
      ease: 'power2.inOut',
    })
    .to(element, {
      duration: duration / 6,
      x: 2,
      y: 2,
      ease: 'power2.inOut',
    })
    .to(element, {
      duration: duration / 6,
      x: 2,
      y: -2,
      ease: 'power2.inOut',
    })
    .to(element, {
      duration: duration / 6,
      x: 0,
      y: 0,
      ease: 'power2.inOut',
    });

    return tl;
  },

  // Hover glow effect
  hoverGlow: (element, color = '#00ffff') => {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(element, {
      duration: 0.3,
      boxShadow: `0 0 20px ${color}`,
      scale: 1.05,
      ease: 'power2.out',
    });

    element.addEventListener('mouseenter', () => tl.play());
    element.addEventListener('mouseleave', () => tl.reverse());
    
    return tl;
  },

  // Scroll-triggered animations
  scrollTrigger: (element, animation = {}) => {
    const defaultAnimation = {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    };

    const finalAnimation = { ...defaultAnimation, ...animation };

    return gsap.fromTo(
      element,
      { y: 50, opacity: 0 },
      {
        ...finalAnimation,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },

  // Magnetic effect for buttons
  magnetic: (element, strength = 0.3) => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        duration: 0.3,
        x: x * strength,
        y: y * strength,
        ease: 'power2.out',
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'power2.out',
      });
    });
  },

  // Loading animation
  loading: (element) => {
    return gsap.to(element, {
      duration: 1,
      rotation: 360,
      repeat: -1,
      ease: 'none',
    });
  },

  // Page transition
  pageTransition: (entering, leaving) => {
    const tl = gsap.timeline();
    
    if (leaving) {
      tl.to(leaving, {
        duration: 0.5,
        y: -50,
        opacity: 0,
        ease: 'power2.in',
      });
    }
    
    if (entering) {
      tl.fromTo(
        entering,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
    
    return tl;
  },
};

// Sound effects utility
export const soundUtils = {
  // Create audio context
  audioContext: null,
  
  // Initialize audio context
  init: () => {
    if (!soundUtils.audioContext) {
      soundUtils.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  // Play hover sound
  playHover: () => {
    soundUtils.init();
    const oscillator = soundUtils.audioContext.createOscillator();
    const gainNode = soundUtils.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(soundUtils.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, soundUtils.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, soundUtils.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, soundUtils.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, soundUtils.audioContext.currentTime + 0.1);
    
    oscillator.start(soundUtils.audioContext.currentTime);
    oscillator.stop(soundUtils.audioContext.currentTime + 0.1);
  },

  // Play click sound
  playClick: () => {
    soundUtils.init();
    const oscillator = soundUtils.audioContext.createOscillator();
    const gainNode = soundUtils.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(soundUtils.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, soundUtils.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, soundUtils.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, soundUtils.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, soundUtils.audioContext.currentTime + 0.2);
    
    oscillator.start(soundUtils.audioContext.currentTime);
    oscillator.stop(soundUtils.audioContext.currentTime + 0.2);
  },

  // Play success sound
  playSuccess: () => {
    soundUtils.init();
    const oscillator = soundUtils.audioContext.createOscillator();
    const gainNode = soundUtils.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(soundUtils.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, soundUtils.audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, soundUtils.audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, soundUtils.audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0, soundUtils.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, soundUtils.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, soundUtils.audioContext.currentTime + 0.4);
    
    oscillator.start(soundUtils.audioContext.currentTime);
    oscillator.stop(soundUtils.audioContext.currentTime + 0.4);
  },
};

export default animationUtils;