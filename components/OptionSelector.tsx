
import React from 'react';

interface OptionSelectorProps {
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({ label, options, selectedValue, onChange, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="flex bg-gray-700/50 rounded-lg p-1 space-x-1">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            disabled={disabled}
            className={`w-full py-2 px-3 text-sm font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500
              ${selectedValue === option ? 'bg-indigo-600 text-white shadow' : 'bg-transparent text-gray-300 hover:bg-gray-600/50'}
              ${disabled ? 'cursor-not-allowed' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};