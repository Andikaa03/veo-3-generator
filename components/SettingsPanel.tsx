
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
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6 border border-gray-700">
      <PromptInput prompt={prompt} setPrompt={setPrompt} disabled={isLoading} />
      
      <ImageUploader image={image} setImage={setImage} disabled={isLoading} />
      
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

      <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
          <label htmlFor="enableSound" className="font-medium text-gray-300">Enable Sound</label>
          <button
              id="enableSound"
              onClick={() => setEnableSound(!enableSound)}
              disabled={isLoading}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${enableSound ? 'bg-indigo-600' : 'bg-gray-600'}`}
          >
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${enableSound ? 'translate-x-6' : 'translate-x-1'}`}/>
          </button>
      </div>

      <div className="pt-4">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            <>
              <Icon name="spinner" className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
               <Icon name="sparkles" className="mr-2" />
               Generate Video
            </>
          )}
        </button>
      </div>
    </div>
  );
};