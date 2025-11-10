
import React, { useCallback, useRef } from 'react';
import { Panel } from './Panel';

const UploadIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface MultiImageUploaderProps {
  onFilesChange: (files: File[]) => void;
  previews: string[];
  files: File[];
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ onFilesChange, previews, files }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      onFilesChange([...files, ...newFiles].slice(0, 15)); // Max 15 files
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  };

  const handleContainerClick = () => {
    if (files.length < 15) {
      inputRef.current?.click();
    }
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer.files) {
        // FIX: Explicitly type the 'file' parameter to ensure correct type inference.
        const newFiles = Array.from(event.dataTransfer.files).filter((file: File) => file.type.startsWith('image/'));
        onFilesChange([...files, ...newFiles].slice(0, 15)); // Max 15 files
      }
  }, [files, onFilesChange]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
  };
  
  const canUploadMore = files.length < 15;

  return (
    <Panel>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-200 text-left">Bước 1: Tải Ảnh Gốc</h2>
        <p className="text-sm text-slate-400">{files.length} / 15</p>
      </div>
      <div className="h-80 overflow-y-auto pr-2" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative aspect-square">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-slate-900/70 hover:bg-red-600 rounded-full p-1 text-white transition-colors"
                aria-label={`Remove image ${index + 1}`}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
          {canUploadMore && (
              <div
                className="relative aspect-square bg-slate-800 rounded-lg border-2 border-dashed border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer flex flex-col items-center justify-center text-slate-500"
                onClick={handleContainerClick}
              >
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  multiple
                />
                <UploadIcon />
                <span className="text-sm mt-2 text-center">Thêm ảnh</span>
              </div>
          )}
        </div>
      </div>
    </Panel>
  );
};
