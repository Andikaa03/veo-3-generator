
import React, { useRef, useCallback } from 'react';
import type { ImageFile } from '../types';
import { Icon } from './Icon';

interface ImageUploaderProps {
  image: ImageFile | null;
  setImage: (image: ImageFile | null) => void;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setImage, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setImage({ dataUrl, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  }, [setImage]);

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Reference Image (Optional)</label>
      <div
        onClick={handleClick}
        className={`relative group flex justify-center items-center w-full h-40 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          disabled={disabled}
        />
        {image ? (
          <>
            <img src={image.dataUrl} alt="Preview" className="h-full w-full object-contain rounded-lg p-2" />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-red-500 transition-colors z-10"
              aria-label="Remove image"
            >
             <Icon name="close" size={5}/>
            </button>
          </>
        ) : (
          <div className="text-center text-gray-400">
            <Icon name="upload" className="mx-auto mb-2" />
            <p>Click to upload an image</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};