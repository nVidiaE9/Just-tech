import React from 'react';
import { soundUtils } from '../utils/animations';

const SoundToggle = ({ enabled, onToggle }) => {
  const handleToggle = () => {
    if (!enabled) {
      soundUtils.playClick();
    }
    onToggle(!enabled);
  };

  return (
    <button
      onClick={handleToggle}
      className="glass p-3 rounded-full transition-all duration-300 hover:bg-white/20 cursor-hover"
      title={enabled ? 'Disable Sound' : 'Enable Sound'}
    >
      {enabled ? (
        <svg
          className="w-6 h-6 text-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-silver"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      )}
    </button>
  );
};

export default SoundToggle;