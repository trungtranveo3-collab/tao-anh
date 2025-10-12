
import React, { useEffect, useCallback, useRef, useState } from 'react';

interface ImageViewerProps {
  images: string[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const ArrowLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);
const ArrowRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


export const ImageViewer: React.FC<ImageViewerProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const touchStartX = useRef(0);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // Check for share API support on mount
    if (navigator.share) {
        setCanShare(true);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNavigate((currentIndex ?? 0) - 1);
    if (e.key === 'ArrowRight') onNavigate((currentIndex ?? 0) + 1);
  }, [onClose, onNavigate, currentIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;
    if (swipeDistance > 50) { // Swipe right
        onNavigate((currentIndex ?? 0) - 1);
    } else if (swipeDistance < -50) { // Swipe left
        onNavigate((currentIndex ?? 0) + 1);
    }
  };

  const handleDownload = useCallback(async () => {
    if (currentIndex === null) return;
    const imageUrl = images[currentIndex];
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-photoshoot-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    } catch (error) {
        console.error("Download failed:", error);
        alert("Tải xuống không thành công.");
    }
  }, [currentIndex, images]);

  const handleShare = useCallback(async () => {
    if (currentIndex === null) return;
    const imageUrl = images[currentIndex];
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `ai-photoshoot-${Date.now()}.png`, { type: blob.type });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: 'AI Photoshoot Image',
                text: 'Check out this image I created!',
                files: [file],
            });
        } else {
            alert('Trình duyệt của bạn không hỗ trợ chia sẻ tệp.');
        }
    } catch (error) {
        console.error("Sharing failed:", error);
        alert("Chia sẻ không thành công.");
    }
  }, [currentIndex, images]);

  if (currentIndex === null) return null;
  
  const imageUrl = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate(currentIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate(currentIndex + 1);
  };
  
  return (
    <div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
    >
        <style>
            {`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
        </style>
        
        <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <img 
                src={imageUrl} 
                alt="Enlarged view" 
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 bg-slate-800/70 hover:bg-red-600 rounded-full p-2 text-white transition-all z-20"
                aria-label="Close image viewer"
            >
                <CloseIcon />
            </button>

            {images.length > 1 && (
                <>
                    <button 
                        onClick={handlePrev} 
                        disabled={currentIndex === 0}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/70 hover:bg-slate-700 rounded-full p-2 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Previous image"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={currentIndex === images.length - 1}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/70 hover:bg-slate-700 rounded-full p-2 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Next image"
                    >
                        <ArrowRightIcon />
                    </button>
                </>
            )}

             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/70 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-4">
                <button 
                    onClick={handleDownload}
                    className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors p-2"
                    aria-label="Download image"
                >
                    <DownloadIcon />
                    <span className="hidden sm:inline">Tải xuống</span>
                </button>
                {canShare && (
                     <button 
                        onClick={handleShare}
                        className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors p-2"
                        aria-label="Share image"
                    >
                        <ShareIcon />
                         <span className="hidden sm:inline">Chia sẻ</span>
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};
