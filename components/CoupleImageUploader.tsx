
import React, { useRef } from 'react';
import { Panel } from './Panel';

const UploadIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface ImageBoxProps {
  onImageChange: (file: File) => void;
  onClear: () => void;
  preview?: string;
  label: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ onImageChange, onClear, preview, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };
  
  const handleContainerClick = () => {
      inputRef.current?.click();
  };

  return (
    <div className="flex-1 flex flex-col items-center space-y-2 w-full">
       <div
          className="relative w-full h-72 bg-slate-800 rounded-lg border-2 border-dashed border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer flex items-center justify-center"
          onClick={handleContainerClick}
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
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute top-2 right-2 bg-slate-900/70 hover:bg-red-600 rounded-full p-2 text-white transition-colors"
              aria-label="Remove image"
            >
              <CloseIcon />
            </button>
          </>
        ) : (
          <div className="text-center text-slate-500">
            <UploadIcon className="mx-auto text-slate-600" />
            <p className="mt-2 text-sm font-semibold">Tải ảnh lên</p>
          </div>
        )}
      </div>
      <p className="text-slate-400 font-semibold">{label}</p>
    </div>
  );
};

interface CoupleImageUploaderProps {
  onImageChange: (file: File | null, index: 0 | 1) => void;
  previews: (string | undefined)[];
}

export const CoupleImageUploader: React.FC<CoupleImageUploaderProps> = ({ onImageChange, previews }) => {
  return (
    <Panel>
      <h2 className="text-lg font-bold text-slate-200 mb-4 text-left">Bước 1: Tải Ảnh Gốc</h2>
      <div className="flex flex-col sm:flex-row items-start justify-center gap-4 sm:gap-8">
        <ImageBox 
          onImageChange={(file) => onImageChange(file, 0)} 
          onClear={() => onImageChange(null, 0)}
          preview={previews[0]}
          label="Người 1"
        />
        <ImageBox 
          onImageChange={(file) => onImageChange(file, 1)} 
          onClear={() => onImageChange(null, 1)}
          preview={previews[1]}
          label="Người 2"
        />
      </div>
    </Panel>
  );
};
