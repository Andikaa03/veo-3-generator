import React from 'react';

interface OptionSelectorProps {
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const getOptionIcon = (option: string) => {
  if (option === '16:9') return '📺';
  if (option === '9:16') return '📱';
  if (option === '720p') return '📹';
  if (option === '1080p') return '🎥';
  return '⚙️';
};

const getOptionDescription = (option: string) => {
  if (option === '16:9') return 'Landscape';
  if (option === '9:16') return 'Portrait';
  if (option === '720p') return 'HD Quality';
  if (option === '1080p') return 'Full HD';
  return option;
};

export const OptionSelector: React.FC<OptionSelectorProps> = ({ label, options, selectedValue, onChange, disabled }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium opacity-80">{label}</label>
      <div className="glass rounded-2xl p-2">
        <div className="flex space-x-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              disabled={disabled}
              className={`flex-1 relative overflow-hidden py-4 px-4 rounded-xl transition-all duration-300 group focus-ring ${
                selectedValue === option
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'hover:bg-white/10 text-current'
              } ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              {/* Background animation */}
              {selectedValue === option && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse" />
              )}

              <div className="relative z-10 text-center">
                <div className="text-2xl mb-1">{getOptionIcon(option)}</div>
                <div className="font-bold text-lg">{option}</div>
                <div className="text-xs opacity-80">{getOptionDescription(option)}</div>
              </div>

              {/* Shine effect for selected option */}
              {selectedValue === option && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
