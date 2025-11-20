
import React from 'react';
import { Panel } from './Panel';

interface GeneratedImage {
    url: string;
    settings: any; // Can't import from App.tsx, so using any
}

interface GeneratedImagesProps {
    images: GeneratedImage[];
    isLoading: boolean;
    onImageClick: (index: number) => void;
    activeTab: string;
    onReuseSettings: (settings: any) => void;
}

const LoadingSkeleton: React.FC = () => (
    <div className="aspect-square bg-slate-800 rounded-lg animate-pulse"></div>
);

const MagicWandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v1.046a1 1 0 01-1.414.954l-.822-.822a1 1 0 01.954-1.414zM12 18v1.046a1 1 0 01-1.414.954l-.822-.822a1 1 0 01.954-1.414V18zM4.929 4.929a1 1 0 011.414 0l.822.822a1 1 0 01-1.414 1.414l-.822-.822a1 1 0 010-1.414zM15.071 15.071a1 1 0 011.414 0l.822.822a1 1 0 01-1.414 1.414l-.822-.822a1 1 0 010-1.414zM2 11.046a1 1 0 011-1h1.046a1 1 0 010 2H3a1 1 0 01-1-1zM18 11.046a1 1 0 011-1h1.046a1 1 0 110 2H19a1 1 0 01-1-1zM4.929 15.071a1 1 0 010-1.414l.822-.822a1 1 0 011.414 1.414l-.822.822a1 1 0 01-1.414 0zM15.071 4.929a1 1 0 010-1.414l.822-.822a1 1 0 111.414 1.414l-.822.822a1 1 0 01-1.414 0zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
    </svg>
);


export const GeneratedImages: React.FC<GeneratedImagesProps> = ({ 
    images, 
    isLoading, 
    onImageClick, 
    activeTab, 
    onReuseSettings
}) => {
    
    const placeholderCount = isLoading ? (images.length > 0 ? images.length : 1) : 0;

    return (
        <Panel>
            <h2 className="text-lg font-bold text-slate-200 mb-4 text-left">Thành quả của bạn</h2>
            {images.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-80 bg-slate-800/50 rounded-lg border border-dashed border-slate-700">
                    <div className="text-emerald-500 mb-3">
                        <MagicWandIcon className="w-10 h-10" />
                    </div>
                    <p className="text-slate-400 font-medium">Chưa có tác phẩm nào.</p>
                    <p className="text-slate-500 text-sm mt-1">Hãy nhấn "Tạo Tác Phẩm Ngay" để bắt đầu!</p>
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[40rem] overflow-y-auto pr-2">
                {images.map((image, index) => (
                    <div key={index} className="aspect-square group relative">
                        <img 
                          src={image.url} 
                          alt={`Generated image ${index + 1}`} 
                          className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" 
                        />
                        <div 
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg cursor-pointer"
                          onClick={() => onImageClick(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <button
                            title="Sử dụng lại phong cách này"
                            className="absolute top-2 left-2 p-2 bg-slate-800/70 rounded-full text-white hover:bg-emerald-500 transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                            onClick={(e) => { e.stopPropagation(); onReuseSettings(image.settings); }}
                            aria-label="Sử dụng lại phong cách này"
                        >
                            <MagicWandIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))}
                {isLoading && Array.from({ length: placeholderCount }).map((_, index) => (
                    <LoadingSkeleton key={`loading-${index}`} />
                ))}
            </div>
        </Panel>
    );
};
