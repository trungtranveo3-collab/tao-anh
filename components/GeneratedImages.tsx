import React from 'react';
import { Panel } from './Panel';

interface GeneratedImagesProps {
    images: string[];
    isLoading: boolean;
    onImageClick: (index: number) => void;
    activeTab: string;
    onGenerateVideo: (index: number) => void;
    isVideoLoading: boolean;
    hasSelectedVeoKey: boolean;
    onSelectVeoKey: () => void;
}

const LoadingSkeleton: React.FC = () => (
    <div className="aspect-square bg-slate-800 rounded-lg animate-pulse"></div>
);

const VideoIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);


export const GeneratedImages: React.FC<GeneratedImagesProps> = ({ 
    images, 
    isLoading, 
    onImageClick, 
    activeTab, 
    onGenerateVideo,
    isVideoLoading,
    hasSelectedVeoKey,
    onSelectVeoKey
}) => {
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[40rem] overflow-y-auto pr-2">
                {loadedImages.map((image, index) => (
                    <div key={index} className="aspect-square group relative">
                        <img 
                          src={image} 
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
                        {activeTab === 'product' && (
                            <div className="absolute bottom-2 left-2 right-2">
                                 <button
                                    onClick={() => hasSelectedVeoKey ? onGenerateVideo(index) : onSelectVeoKey()}
                                    disabled={isVideoLoading}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-white bg-emerald-600/80 hover:bg-emerald-600 rounded-md backdrop-blur-sm transition-all disabled:bg-slate-600 disabled:cursor-wait"
                                >
                                    {isVideoLoading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Đang xử lý...</span>
                                        </>
                                    ) : (
                                        <>
                                            <VideoIcon className="w-4 h-4" />
                                            <span>{hasSelectedVeoKey ? 'Tạo Video' : 'Chọn Key & Tạo Video'}</span>
                                        </>
                                    )}
                                </button>
                                 {!hasSelectedVeoKey && <p className="text-center text-white text-[10px] mt-1 p-1 bg-black/50 rounded">Cần chọn API Key để tạo video</p>}

                            </div>
                        )}
                    </div>
                ))}
                {isLoading && Array.from({ length: loadingPlaceholders }).map((_, index) => (
                    <LoadingSkeleton key={`loading-${index}`} />
                ))}
            </div>
        </Panel>
    );
};
