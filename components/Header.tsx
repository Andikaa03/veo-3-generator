import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  return (
    <header className="relative z-20 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="glass rounded-2xl px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-glow">
                <Icon name="sparkles" className="text-white" size={6} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  VEO Studio
                </h1>
                <p className="text-sm opacity-70">AI-Powered Video Generation</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={onThemeToggle}
                className="p-3 rounded-xl glass hover:bg-white/10 transition-all duration-300 btn-hover focus-ring group"
                aria-label="Toggle theme"
              >
                <div className="relative w-6 h-6">
                  <Icon
                    name={theme === 'dark' ? 'sun' : 'moon'}
                    className={`absolute inset-0 transition-all duration-500 transform ${
                      theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                    }`}
                    size={6}
                  />
                  <Icon
                    name={theme === 'light' ? 'sun' : 'moon'}
                    className={`absolute inset-0 transition-all duration-500 transform ${
                      theme === 'light' ? 'rotate-0 scale-100' : '-rotate-180 scale-0'
                    }`}
                    size={6}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
