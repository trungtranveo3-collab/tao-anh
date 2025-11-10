import React from 'react';
import { Panel } from './Panel';

interface GeneratedImagesProps {
    images: string[];
    isLoading: boolean;
    onImageClick: (index: number) => void;
}

const LoadingSkeleton: React.FC = () => (
    <div className="aspect-square bg-slate-800 rounded-lg animate-pulse"></div>
);

export const GeneratedImages: React.FC<GeneratedImagesProps> = ({ images, isLoading, onImageClick }) => {
    const loadingPlaceholders = images.filter(img => img === 'loading').length;
    const loadedImages = images.filter(img => img !== 'loading');

    return (
        <Panel>
            <h2 className="text-lg font-bold text-slate-200 mb-4 text-left">Kết quả</h2>
            {images.length === 0 && !isLoading && (
                <div className="flex items-center justify-center h-80 bg-slate-800 rounded-lg">
                    <p className="text-slate-500">Phép màu AI sẽ hiện ra ở đây!</p>
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-80 overflow-y-auto pr-2">
                {loadedImages.map((image, index) => (
                    <div key={index} className="aspect-square group relative cursor-pointer" onClick={() => onImageClick(index)}>
                        <img src={image} alt={`Generated image ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                ))}
                {isLoading && Array.from({ length: loadingPlaceholders }).map((_, index) => (
                    <LoadingSkeleton key={`loading-${index}`} />
                ))}
            </div>
        </Panel>
    );
};