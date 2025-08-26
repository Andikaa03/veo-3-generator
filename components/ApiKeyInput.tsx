import React, { useState } from 'react';
import { Icon } from './Icon';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  disabled: boolean;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey, disabled }) => {
  const [showKey, setShowKey] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isValidKey = apiKey.length > 20; // Basic validation

  return (
    <div className="space-y-4">
      <div className={`glass rounded-2xl p-6 transition-all duration-300 ${
        isFocused ? 'ring-2 ring-purple-400/50 shadow-2xl' : ''
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-xl">🔑</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Google AI API Key</h3>
              <p className="text-sm opacity-60">Required for video generation</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isValidKey 
              ? 'bg-green-500/20 text-green-400' 
              : apiKey.length > 0 
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
          }`}>
            {isValidKey ? '✓ Valid' : apiKey.length > 0 ? '⚠ Check' : '✗ Required'}
          </div>
        </div>
        
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder="AIzaSyC..."
            className="w-full bg-transparent outline-none text-lg font-mono placeholder-opacity-60 disabled:opacity-50 pr-12"
          />
          
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors"
            disabled={disabled}
            title={showKey ? 'Hide API key' : 'Show API key'}
          >
            <Icon name={showKey ? 'eye-off' : 'eye'} size={5} />
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-60">🔒 Stored locally, never shared</span>
            {apiKey && (
              <span className="opacity-60">{apiKey.length} characters</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-xs">
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1"
            >
              <span>🚀</span>
              <span>Get free API key</span>
            </a>
            <a 
              href="https://ai.google.dev/gemini-api/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
            >
              <span>📚</span>
              <span>Documentation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
