export type AspectRatio = '16:9' | '9:16';
export type Resolution = '720p' | '1080p';

export interface ImageFile {
  dataUrl: string; // base64 data URL for preview
  mimeType: string;
}

export interface VideoGenerationOptions {
  prompt: string;
  image: ImageFile | null;
  aspectRatio: AspectRatio;
  enableSound: boolean;
  resolution: Resolution;
  apiKey: string;
  onProgress: (message: string) => void;
}
