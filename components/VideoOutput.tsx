import React, { useState } from 'react';
import { Icon } from './Icon';

interface VideoOutputProps {
  videoUrl: string | null;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
}

const Loader: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    {/* Animated loading circle */}
    <div className="relative mb-8">
      <div className="w-24 h-24 border-4 border-purple-300/30 rounded-full"></div>
      <div className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name="sparkles" className="text-purple-400 animate-pulse" size={8} />
      </div>
    </div>

    {/* Loading text */}
    <div className="space-y-4">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Creating Your Video
      </h3>
      <p className="text-lg opacity-80 max-w-md">{message}</p>

      {/* Progress indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6 overflow-visible">
    {/* Animated video icon */}
    <div className="relative mb-6">
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center animate-float">
        <Icon name="video" size={12} className="text-purple-400" />
      </div>
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
        <span className="text-white text-sm">✨</span>
      </div>
    </div>

    <div className="space-y-4 w-full max-w-lg px-4">
      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        AI Video Studio
      </h3>
      <p className="text-base opacity-70 leading-relaxed">
        Enter your API key and describe your vision to generate stunning AI videos
      </p>
    </div>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mb-6 animate-pulse">
        <Icon name="error" size={12} className="text-red-400"/>
      </div>
      <h3 className="text-2xl font-bold text-red-300 mb-4">Something Went Wrong</h3>
      <p className="text-red-400/80 mb-6 max-w-md">{message}</p>
      <div className="glass rounded-xl p-4 max-w-sm">
        <p className="text-sm opacity-70">
          💡 Try adjusting your prompt or check your connection
        </p>
      </div>
    </div>
);


export const VideoOutput: React.FC<VideoOutputProps> = ({ videoUrl, isLoading, loadingMessage, error }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Your Masterpiece
        </h2>
        <p className="opacity-70">AI-generated video will appear below</p>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10">
        {isLoading && <Loader message={loadingMessage} />}
        {!isLoading && error && <ErrorDisplay message={error} />}
        {!isLoading && !error && !videoUrl && <Placeholder />}
        {!isLoading && !error && videoUrl && (
          <div
            className="w-full h-full relative group cursor-pointer"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              src={videoUrl}
              controls={showControls}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-all duration-300"
              onLoadedData={() => setIsVideoLoaded(true)}
              onError={() => setIsVideoLoaded(false)}
            >
              Your browser does not support the video tag.
            </video>

            {/* Video overlay */}
            <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              showControls ? 'opacity-0' : 'opacity-100'
            }`} />

            {/* Floating action buttons */}
            <div className={`absolute top-4 right-4 flex space-x-2 transition-all duration-300 ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}>
              <a
                href={videoUrl}
                download="veo-generated-video.mp4"
                className="bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 btn-hover"
                title="Download video"
              >
                <Icon name="download" size={5} />
              </a>
            </div>

            {/* Video info overlay */}
            <div className={`absolute bottom-4 left-4 glass rounded-xl p-3 transition-all duration-300 ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI Generated</span>
                <span className="opacity-60">•</span>
                <span className="opacity-60">Ready</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success message */}
      {!isLoading && !error && videoUrl && isVideoLoaded && (
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm font-medium">Video generated successfully!</span>
          </div>
          <p className="text-xs opacity-60">
            Hover over the video to reveal controls and download options
          </p>
        </div>
      )}
    </div>
  );
};
