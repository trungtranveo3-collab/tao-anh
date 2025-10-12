
import React from 'react';
import type { ImageType } from '../types';
import { IMAGE_TYPES } from '../constants';
import { Panel } from './Panel';

interface GenerationControlsProps {
    selectedImageType: ImageType;
    onImageTypeChange: (imageType: ImageType) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isReady: boolean;
    numberOfImages: number;
    onNumberOfImagesChange: (num: number) => void;
}

const MagicWandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547a.5.5 0 01-.708 0l-4.242-4.242a.5.5 0 010-.708l.547-.548z" />
    </svg>
);


export const GenerationControls: React.FC<GenerationControlsProps> = ({ 
    selectedImageType, 
    onImageTypeChange, 
    onGenerate, 
    isLoading, 
    isReady,
    numberOfImages,
    onNumberOfImagesChange 
}) => {
    return (
        <Panel>
            <div className="flex flex-col space-y-6">
                 <div>
                    <h2 className="text-lg font-bold text-slate-200">Bước 4: Tùy chỉnh & Tạo ảnh</h2>
                    <p className="text-slate-400 text-sm mt-1">Chọn loại ảnh, số lượng và bắt đầu sáng tạo</p>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3">
                    {IMAGE_TYPES.map(type => {
                        const isSelected = selectedImageType.id === type.id;
                        return (
                            <button
                                key={type.id}
                                onClick={() => onImageTypeChange(type)}
                                className={`flex flex-col items-center justify-center text-center p-3 space-y-2 bg-slate-800 rounded-lg flex-1 h-28 transition-all duration-200 transform hover:bg-slate-700 ring-2 ${
                                    isSelected ? 'ring-cyan-500' : 'ring-transparent hover:ring-slate-600'
                                }`}
                            >
                                <div className="text-cyan-400">
                                    <type.icon className="h-10 w-10" />
                                </div>
                                <span className="text-xs font-medium text-slate-200">{type.name}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <label htmlFor="image-count" className="text-sm font-medium text-slate-300 flex-shrink-0">Số lượng:</label>
                        <select
                            id="image-count"
                            value={numberOfImages}
                            onChange={(e) => onNumberOfImagesChange(Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors cursor-pointer"
                            disabled={isLoading}
                        >
                            <option value={1}>1 ảnh</option>
                            <option value={2}>2 ảnh</option>
                            <option value={3}>3 ảnh</option>
                            <option value={4}>4 ảnh</option>
                        </select>
                    </div>

                    <button
                        onClick={onGenerate}
                        disabled={isLoading || !isReady}
                        className="flex items-center justify-center space-x-3 w-full sm:w-auto px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-lg shadow-lg hover:bg-cyan-400 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-500 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <MagicWandIcon />
                        )}
                        <span>{isLoading ? 'Đang xử lý...' : `Tạo ${numberOfImages} ảnh`}</span>
                    </button>
                </div>
            </div>
        </Panel>
    );
};
