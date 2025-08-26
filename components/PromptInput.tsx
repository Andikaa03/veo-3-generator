import React, { useState, useRef, useEffect } from 'react';

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    disabled: boolean;
}

const EXAMPLE_PROMPTS = [
  "A majestic dragon soaring through a neon-lit cyberpunk city at night",
  "A cozy coffee shop on a rainy day with steam rising from cups",
  "An astronaut floating in space with Earth in the background",
  "A magical forest with glowing mushrooms and fairy lights",
  "A vintage car driving along a coastal highway at sunset"
];

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, disabled }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [prompt]);

    const handlePromptSelect = (selectedPrompt: string) => {
        setPrompt(selectedPrompt);
        setShowSuggestions(false);
        textareaRef.current?.focus();
    };

    const characterCount = prompt.length;
    const maxCharacters = 500;

    return (
        <div className="space-y-4">
            <div className="relative">
                <div className={`glass rounded-2xl p-6 transition-all duration-300 ${
                    isFocused ? 'ring-2 ring-purple-400/50 shadow-2xl' : ''
                }`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">✨</span>
                            <span className="font-medium">Your Creative Vision</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowSuggestions(!showSuggestions)}
                            className="text-sm px-3 py-1 rounded-lg glass hover:bg-white/10 transition-all duration-200"
                            disabled={disabled}
                        >
                            💡 Ideas
                        </button>
                    </div>
                    
                    <textarea
                        ref={textareaRef}
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        disabled={disabled}
                        placeholder="Describe the video you want to create... Be as creative and detailed as you like!"
                        className="w-full bg-transparent resize-none outline-none text-lg leading-relaxed placeholder-opacity-60 min-h-[120px] disabled:opacity-50"
                        style={{ height: 'auto' }}
                        maxLength={maxCharacters}
                    />
                    
                    {/* Character counter */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                        <div className="text-xs opacity-60">
                            💭 Let your imagination run wild
                        </div>
                        <div className={`text-xs ${
                            characterCount > maxCharacters * 0.9 ? 'text-orange-400' : 'opacity-60'
                        }`}>
                            {characterCount}/{maxCharacters}
                        </div>
                    </div>
                </div>
                
                {/* Suggestions dropdown */}
                {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-4 z-20 space-y-2">
                        <div className="text-sm font-medium mb-3 flex items-center space-x-2">
                            <span>🎬</span>
                            <span>Try these creative prompts:</span>
                        </div>
                        {EXAMPLE_PROMPTS.map((examplePrompt, index) => (
                            <button
                                key={index}
                                onClick={() => handlePromptSelect(examplePrompt)}
                                className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-all duration-200 text-sm leading-relaxed"
                                disabled={disabled}
                            >
                                {examplePrompt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
