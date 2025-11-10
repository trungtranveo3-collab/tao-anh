
import React, { useCallback, useRef } from 'react';
import { Panel } from './Panel';

const UploadIcon: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface ImageUploaderProps {
    onImagesChange: (files: File[]) => void;
    preview?: string;
    label: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange, preview, label }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImagesChange([file]);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onImagesChange([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const handleContainerClick = () => {
        inputRef.current?.click();
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onImagesChange([file]);
        }
    }, [onImagesChange]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Panel>
            <h2 className="text-lg font-bold text-slate-200 mb-4 text-left">{label}</h2>
            <div
                className="relative w-full h-80 bg-slate-800 rounded-lg border-2 border-dashed border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer flex items-center justify-center"
                onClick={handleContainerClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
                {preview ? (
                    <>
                        <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-md p-2" />
                        <button
                            onClick={handleClear}
                            className="absolute top-2 right-2 bg-slate-900/70 hover:bg-red-600 rounded-full p-2 text-white transition-colors"
                            aria-label="Remove image"
                        >
                            <CloseIcon />
                        </button>
                    </>
                ) : (
                    <div className="text-center text-slate-500">
                        <UploadIcon className="mx-auto text-slate-600" />
                        <p className="mt-2 font-semibold">Kéo & thả hoặc Nhấn để tải lên</p>
                        <p className="text-sm">PNG, JPG, WEBP. Tối đa 5MB.</p>
                    </div>
                )}
            </div>
        </Panel>
    );
};
