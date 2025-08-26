
import React from 'react';

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, disabled }) => {
    return (
        <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                Prompt
            </label>
            <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={disabled}
                placeholder='e.g., "A neon hologram of a cat driving a sports car at top speed" or a JSON object for detailed scenes.'
                rows={5}
                className="w-full bg-gray-700/50 text-gray-200 p-3 rounded-lg border-2 border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-400 disabled:opacity-50"
            />
        </div>
    );
}