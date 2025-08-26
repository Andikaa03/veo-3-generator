
import React, { useState, useCallback, useEffect } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { VideoOutput } from './components/VideoOutput';
import { Header } from './components/Header';
import { generateVideo } from './services/geminiService';
import type { AspectRatio, Resolution, ImageFile } from './types';
import { LOADING_MESSAGES } from './constants';

export default function App(): React.ReactNode {
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<ImageFile | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [enableSound, setEnableSound] = useState<boolean>(true);
  const [resolution, setResolution] = useState<Resolution>('1080p');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleGenerateVideo = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
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
        onProgress: setLoadingMessage,
      });
      setVideoUrl(generatedUrl);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, image, aspectRatio, enableSound, resolution]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
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
        <div className="flex flex-col">
          <VideoOutput
            videoUrl={videoUrl}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
            error={error}
          />
        </div>
      </main>
    </div>
  );
}