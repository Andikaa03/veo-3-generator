
import { GoogleGenAI } from "@google/genai";
import type { VideoGenerationOptions } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// A utility to extract base64 data from a data URL
const getBase64Data = (dataUrl: string): string => {
    const parts = dataUrl.split(',');
    if (parts.length !== 2) {
        throw new Error('Invalid data URL');
    }
    return parts[1];
};

export const generateVideo = async (options: VideoGenerationOptions): Promise<string> => {
    const { prompt, image, onProgress } = options;

    onProgress("Initializing video generation...");

    const generateVideosParams: any = {
        model: 'veo-3.0-generate-preview',
        prompt,
        config: {
            numberOfVideos: 1,
            // Note: Aspect ratio, sound, and resolution are not in the documented API.
            // These would be added here if supported. This is a placeholder for future capabilities.
        },
    };

    if (image) {
        onProgress("Processing reference image...");
        generateVideosParams.image = {
            imageBytes: getBase64Data(image.dataUrl),
            mimeType: image.mimeType,
        };
    }

    try {
        let operation = await ai.models.generateVideos(generateVideosParams);
        onProgress("Video generation started. This may take a few minutes...");

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
            onProgress("Checking generation status...");
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        onProgress("Generation complete! Fetching your video...");

        if (operation.response?.generatedVideos && operation.response.generatedVideos.length > 0) {
            const videoData = operation.response.generatedVideos[0];
            const downloadLink = videoData?.video?.uri;

            if (!downloadLink) {
                throw new Error("Video URI not found in API response.");
            }
            
            // The API Key needs to be appended to the download URI
            const authenticatedUrl = `${downloadLink}&key=${process.env.API_KEY}`;
            const videoResponse = await fetch(authenticatedUrl);

            if (!videoResponse.ok) {
                throw new Error(`Failed to download video. Status: ${videoResponse.statusText}`);
            }

            onProgress("Creating video blob...");
            const videoBlob = await videoResponse.blob();
            return URL.createObjectURL(videoBlob);
        } else {
            throw new Error("No video was generated. The response was empty.");
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        if(error instanceof Error && error.message.includes('API key not valid')){
             throw new Error("API Key is invalid. Please check your configuration.");
        }
        throw new Error("Failed to generate video. Please try again.");
    }
};