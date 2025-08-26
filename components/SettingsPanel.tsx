import React from 'react';
import type { AspectRatio, Resolution, ImageFile } from '../types';
import { ImageUploader } from './ImageUploader';
import { OptionSelector } from './OptionSelector';
import { PromptInput } from './PromptInput';
import { Icon } from './Icon';

interface SettingsPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  image: ImageFile | null;
  setImage: (image: ImageFile | null) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  enableSound: boolean;
  setEnableSound: (enabled: boolean) => void;
  resolution: Resolution;
  setResolution: (res: Resolution) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  prompt,
  setPrompt,
  image,
  setImage,
  aspectRatio,
  setAspectRatio,
  enableSound,
  setEnableSound,
  resolution,
  setResolution,
  isLoading,
  onGenerate,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Create Your Video
        </h2>
        <p className="opacity-70">Bring your imagination to life with AI</p>
      </div>

      {/* Prompt Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="sparkles" className="text-purple-400" size={5} />
          <h3 className="text-lg font-semibold">Describe Your Vision</h3>
        </div>
        <PromptInput prompt={prompt} setPrompt={setPrompt} disabled={isLoading} />
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="upload" className="text-blue-400" size={5} />
          <h3 className="text-lg font-semibold">Reference Image</h3>
          <span className="text-xs opacity-60 bg-purple-500/20 px-2 py-1 rounded-full">Optional</span>
        </div>
        <ImageUploader image={image} setImage={setImage} disabled={isLoading} />
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="video" className="text-green-400" size={5} />
          <h3 className="text-lg font-semibold">Video Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OptionSelector
            label="Aspect Ratio"
            options={['16:9', '9:16']}
            selectedValue={aspectRatio}
            onChange={(val) => setAspectRatio(val as AspectRatio)}
            disabled={isLoading}
          />
          <OptionSelector
            label="Resolution"
            options={['720p', '1080p']}
            selectedValue={resolution}
            onChange={(val) => setResolution(val as Resolution)}
            disabled={isLoading}
          />
        </div>

        {/* Sound Toggle */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-lg">🔊</span>
              </div>
              <div>
                <label htmlFor="enableSound" className="font-medium text-lg cursor-pointer">
                  Enable Sound
                </label>
                <p className="text-sm opacity-60">Add audio to your generated video</p>
              </div>
            </div>
            <button
                id="enableSound"
                onClick={() => setEnableSound(!enableSound)}
                disabled={isLoading}
                className={`relative inline-flex items-center h-8 rounded-full w-14 transition-all duration-300 focus-ring btn-hover transform ${
                  enableSound
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
                    : 'bg-gray-400/30'
                }`}
            >
                <span className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 shadow-md ${
                  enableSound ? 'translate-x-7' : 'translate-x-1'
                }`}/>
            </button>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="pt-6">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl btn-hover focus-ring group"
        >
          <div className="flex items-center justify-center relative z-10">
            {isLoading ? (
              <>
                <Icon name="spinner" className="animate-spin mr-3" size={6} />
                <span className="text-lg">Generating Magic...</span>
              </>
            ) : (
              <>
                <Icon name="sparkles" className="mr-3 group-hover:animate-pulse" size={6} />
                <span className="text-lg">Generate Video</span>
              </>
            )}
          </div>

          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700" />
        </button>

        {!prompt.trim() && (
          <p className="text-center text-sm opacity-60 mt-3">
            💡 Enter a creative prompt to start generating
          </p>
        )}
      </div>
    </div>
  );
};
