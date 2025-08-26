
import React from 'react';
import { Icon } from './Icon';

interface VideoOutputProps {
  videoUrl: string | null;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
}

const Loader: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <Icon name="spinner" className="animate-spin mb-4" size={10} />
    <p className="text-lg font-semibold text-indigo-300">Generating Video</p>
    <p className="text-gray-400 mt-2">{message}</p>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <Icon name="video" size={12} className="text-gray-600 mb-4" />
    <h3 className="text-xl font-semibold text-gray-400">Your video will appear here</h3>
    <p className="text-gray-500 mt-1">Fill in the details and click "Generate Video" to start.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-red-900/20 border border-red-500 rounded-lg">
      <Icon name="error" size={10} className="text-red-400 mb-4"/>
      <h3 className="text-xl font-semibold text-red-300">An Error Occurred</h3>
      <p className="text-red-400 mt-2">{message}</p>
    </div>
);


export const VideoOutput: React.FC<VideoOutputProps> = ({ videoUrl, isLoading, loadingMessage, error }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 aspect-video flex items-center justify-center w-full h-full overflow-hidden">
      {isLoading && <Loader message={loadingMessage} />}
      {!isLoading && error && <ErrorDisplay message={error} />}
      {!isLoading && !error && !videoUrl && <Placeholder />}
      {!isLoading && !error && videoUrl && (
        <div className="w-full h-full flex flex-col items-center justify-center relative group">
          <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain">
            Your browser does not support the video tag.
          </video>
           <a
              href={videoUrl}
              download="generated-video.mp4"
              className="absolute bottom-4 right-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center"
            >
              <Icon name="download" className="mr-2" />
              Download
            </a>
        </div>
      )}
    </div>
  );
};