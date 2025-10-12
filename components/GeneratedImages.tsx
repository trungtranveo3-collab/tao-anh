
import React from 'react';
import { Panel } from './Panel';

interface GeneratedImagesProps {
    images: string[];
    isLoading: boolean;
    onImageClick: (index: number) => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="aspect-square bg-slate-800/50 rounded-lg flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

export const GeneratedImages: React.FC<GeneratedImagesProps> = ({ images, isLoading, onImageClick }) => {
    let content;
    
    // Show spinners for each image being loaded
    if (isLoading || images.some(img => img === 'loading')) {
        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {images.map((src, index) => 
                    src === 'loading' ? (
                        <LoadingSpinner key={index} />
                    ) : (
                        <div 
                            key={index} 
                            onClick={() => onImageClick(index)}
                            className="aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 group relative cursor-pointer"
                        >
                            <img src={src} alt={`Generated image ${index + 1}`} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-cyan-500/50 transition-all rounded-lg"></div>
                        </div>
                    )
                )}
            </div>
        );
    } else if (images.length > 0) {
        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {images.map((src, index) => (
                     <div 
                        key={index} 
                        onClick={() => onImageClick(index)}
                        className="aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 group relative cursor-pointer"
                     >
                        <img src={src} alt={`Generated image ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-cyan-500/50 transition-all rounded-lg"></div>
                     </div>
                ))}
            </div>
        );
    } else {
        content = (
             <div className="aspect-square bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center text-center text-slate-500 p-4">
                <p>Ảnh đã tạo sẽ xuất hiện ở đây.</p>
             </div>
        );
    }

    return (
        <Panel>
            <h2 className="text-lg font-bold text-slate-200 mb-4">Kết quả</h2>
            {content}
        </Panel>
    );
};
