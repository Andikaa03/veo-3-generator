import React, { useState, useCallback, useEffect } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { VideoOutput } from './components/VideoOutput';
import { Header } from './components/Header';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { generateVideo } from './services/geminiService';
import type { AspectRatio, Resolution, ImageFile } from './types';
import { LOADING_MESSAGES } from './constants';

export default function App(): React.ReactNode {
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<ImageFile | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [enableSound, setEnableSound] = useState<boolean>(true);
  const [resolution, setResolution] = useState<Resolution>('1080p');
  const [apiKey, setApiKey] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isLoading) {
      setLoadingMessage(LOADING_MESSAGES[0]);
      let messageIndex = 0;
      const intervalId = setInterval(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[messageIndex]);
      }, 4000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isLoading]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleGenerateVideo = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }

    if (!apiKey.trim()) {
      setError('API Key is required. Please enter your Google AI API key.');
      return;
    }

    setIsLoading(true);
    setVideoUrl(null);
    setError(null);

    try {
      const generatedUrl = await generateVideo({
        prompt,
        image,
        aspectRatio,
        enableSound, // Note: enableSound and resolution are for UI demonstration
        resolution,  // as the documented API does not support them yet.
        apiKey,
        onProgress: setLoadingMessage,
      });
      setVideoUrl(generatedUrl);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, image, aspectRatio, enableSound, resolution, apiKey]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header theme={theme} onThemeToggle={toggleTheme} />

        <main className="flex-grow container mx-auto p-4 md:p-8 max-w-7xl">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            {/* Settings Panel */}
            <div className="space-y-6">
              <div className="glass rounded-3xl p-8 interactive-card">
                <SettingsPanel
                  prompt={prompt}
                  setPrompt={setPrompt}
                  image={image}
                  setImage={setImage}
                  aspectRatio={aspectRatio}
                  setAspectRatio={setAspectRatio}
                  enableSound={enableSound}
                  setEnableSound={setEnableSound}
                  resolution={resolution}
                  setResolution={setResolution}
                  isLoading={isLoading}
                  onGenerate={handleGenerateVideo}
                />
              </div>
            </div>

            {/* Video Output */}
            <div className="space-y-6">
              <div className="glass rounded-3xl p-8 interactive-card min-h-[600px]">
                <VideoOutput
                  videoUrl={videoUrl}
                  isLoading={isLoading}
                  loadingMessage={loadingMessage}
                  error={error}
                />
              </div>
            </div>
          </div>

          {/* Floating Stats Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 text-center animate-float" style={{animationDelay: '0s'}}>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                4K
              </div>
              <div className="text-sm opacity-80 mt-1">Ultra HD Quality</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center animate-float" style={{animationDelay: '1s'}}>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI
              </div>
              <div className="text-sm opacity-80 mt-1">Powered Generation</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center animate-float" style={{animationDelay: '2s'}}>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-sm opacity-80 mt-1">Unlimited Creativity</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
