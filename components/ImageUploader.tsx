import React, { useRef, useCallback, useState } from 'react';
import type { ImageFile } from '../types';
import { Icon } from './Icon';

interface ImageUploaderProps {
  image: ImageFile | null;
  setImage: (image: ImageFile | null) => void;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setImage, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setImage({ dataUrl, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  }, [setImage]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (!disabled) {
      const file = e.dataTransfer.files[0];
      if (file) {
        processFile(file);
      }
    }
  }, [disabled, processFile]);

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group glass rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
          isDragOver
            ? 'ring-2 ring-purple-400/50 shadow-2xl scale-105'
            : 'hover:shadow-xl hover:scale-102'
        } ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp, image/gif"
          className="hidden"
          disabled={disabled}
        />

        {image ? (
          <div className="relative group">
            <img
              src={image.dataUrl}
              alt="Reference preview"
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
              <div className="flex space-x-3">
                <button
                  onClick={handleRemoveImage}
                  className="bg-red-500/80 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg"
                  aria-label="Remove image"
                >
                  <Icon name="close" size={5}/>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                  className="bg-purple-500/80 text-white rounded-full p-3 hover:bg-purple-600 transition-colors shadow-lg"
                  aria-label="Change image"
                >
                  <Icon name="upload" size={5}/>
                </button>
              </div>
            </div>
            <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              🇮 Reference Image
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center transition-all duration-300 ${
              isDragOver ? 'scale-110 from-purple-500/40 to-pink-500/40' : ''
            }`}>
              <Icon name="upload" className="text-purple-400" size={8} />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragOver ? 'Drop your image here!' : 'Upload Reference Image'}
            </h3>
            <p className="text-sm opacity-70 mb-1">
              {isDragOver ? 'Release to upload' : 'Drag & drop or click to browse'}
            </p>
            <p className="text-xs opacity-50">
              Supports PNG, JPG, WEBP, GIF • Max 10MB
            </p>

            {/* Upload benefits */}
            <div className="mt-6 flex justify-center space-x-6 text-xs opacity-60">
              <div className="flex items-center space-x-1">
                <span>✨</span>
                <span>Better results</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🎯</span>
                <span>Style guidance</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🚀</span>
                <span>Faster generation</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
