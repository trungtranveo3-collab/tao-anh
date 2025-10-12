import React, { useState, useCallback, useRef } from 'react';
import { Panel } from './Panel';

interface ImageUploaderProps {
    onImageUpload: (file: File | null) => void;
    preview: string | null;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15l-4-4m0 0l4-4m-4 4h12" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, preview }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((file: File | null | undefined) => {
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/webp')) {
            onImageUpload(file);
        } else if (file) {
            alert('Vui lòng chọn file ảnh có định dạng PNG, JPG, hoặc WEBP.');
        }
    }, [onImageUpload]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        handleFile(file);
        e.target.value = '';
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Panel>
            <h2 className="text-lg font-bold text-slate-200 mb-4">Bước 1: Tải ảnh của bạn</h2>
            { preview ? (
                <div className="relative group aspect-square">
                    <img src={preview} alt="Xem trước" className="w-full h-full object-cover rounded-lg"/>
                    <button 
                        onClick={() => onImageUpload(null)} 
                        className="absolute top-3 right-3 bg-slate-900/60 backdrop-blur-sm hover:bg-red-600 rounded-full p-2 text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 z-10"
                        aria-label="Remove image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            ) : (
                 <div
                    className={`relative flex flex-col items-center justify-center w-full p-8 text-center cursor-pointer bg-slate-800/50 border-2 border-dashed rounded-lg transition-all duration-300 aspect-square ${isDragging ? 'border-cyan-400 bg-slate-800' : 'border-slate-700'}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileSelect}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4 text-slate-400">
                        <div className="text-cyan-400">
                            <UploadIcon />
                        </div>
                        <p>Kéo và thả ảnh vào đây</p>
                        <p className="text-slate-500 text-sm">hoặc</p>
                        <span className="font-semibold text-cyan-400">Bấm để chọn tệp</span>
                        <p className="text-xs text-slate-500 mt-2">Hỗ trợ PNG, JPG, WEBP</p>
                    </div>
                </div>
            )}
        </Panel>
    );
};
