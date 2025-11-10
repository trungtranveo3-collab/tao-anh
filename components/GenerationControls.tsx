
import React from 'react';
import type { ImageType, AspectRatio } from '../types';
import { IMAGE_TYPES, ASPECT_RATIOS } from '../constants';
// Removed Panel import as it's now handled by the parent in App.tsx

interface GenerationControlsProps {
    selectedImageType: ImageType;
    onImageTypeChange: (imageType: ImageType) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isReady: boolean;
    numberOfImages: number;
    onNumberOfImagesChange: (num: number) => void;
    selectedAspectRatio: string;
    onAspectRatioChange: (ratio: string) => void;
    customWidth: number | '';
    onCustomWidthChange: (width: number | '') => void;
    customHeight: number | '';
    onCustomHeightChange: (height: number | '') => void;
    isProductMode?: boolean;
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
    onNumberOfImagesChange,
    selectedAspectRatio,
    onAspectRatioChange,
    customWidth,
    onCustomWidthChange,
    customHeight,
    onCustomHeightChange,
    isProductMode = false
}) => {
    const isCustomSizeEnabled = selectedAspectRatio === 'custom';
    
    const handleToggleCustomSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        onAspectRatioChange(e.target.checked ? 'custom' : 'square');
    };

    const handleCustomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onAspectRatioChange('custom');
        onCustomWidthChange(e.target.value === '' ? '' : Number(e.target.value));
    };
    const handleCustomHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onAspectRatioChange('custom');
        onCustomHeightChange(e.target.value === '' ? '' : Number(e.target.value));
    };
    
    return (
        <div className="flex flex-col space-y-6">
             <div>
                <h2 className="text-lg font-bold text-slate-200">Bước 3: Hoàn Thiện & Tạo Ảnh</h2>
                <p className="text-slate-400 text-sm mt-1">Chọn loại ảnh, kích thước, số lượng và bắt đầu sáng tạo</p>
            </div>

            {!isProductMode && (
                <div className="grid grid-cols-3 gap-3">
                    {IMAGE_TYPES.map(type => {
                        const isSelected = selectedImageType.id === type.id;
                        return (
                            <button
                                key={type.id}
                                onClick={() => onImageTypeChange(type)}
                                className={`flex flex-col items-center justify-center text-center p-3 space-y-2 bg-slate-800 rounded-lg h-28 transition-all duration-200 transform hover:bg-slate-700 ring-2 ${
                                    isSelected ? 'ring-emerald-400 scale-105' : 'ring-transparent hover:ring-slate-600'
                                }`}
                            >
                                <div className="text-emerald-400">
                                    <type.icon className="h-10 w-10" />
                                </div>
                                <span className="text-xs font-medium text-slate-200">{type.name}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            <div>
                <h3 className="text-sm font-medium text-slate-300 mb-3">Kích thước & Tỷ lệ</h3>
                <div className="grid grid-cols-3 gap-3">
                    {ASPECT_RATIOS.map(ratio => {
                    const isSelected = selectedAspectRatio === ratio.id;
                    return (
                        <button
                        key={ratio.id}
                        onClick={() => onAspectRatioChange(ratio.id)}
                        className={`flex flex-col items-center justify-center text-center p-2 space-y-1 bg-slate-800 rounded-lg h-20 transition-all duration-200 transform hover:bg-slate-700 ring-2 ${
                            isSelected ? 'ring-emerald-400 scale-105' : 'ring-transparent hover:ring-slate-600'
                        }`}
                        >
                        <div className="text-emerald-400"><ratio.icon className="h-6 w-6" /></div>
                        <span className="text-xs font-medium text-slate-200">{ratio.name}</span>
                        </button>
                    );
                    })}
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                        <label id="custom-size-label" className="text-sm font-medium text-slate-400 flex-shrink-0">
                            Tùy chỉnh (px)
                        </label>
                        <label htmlFor="custom-size-toggle" className="flex items-center cursor-pointer select-none">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="custom-size-toggle"
                                    className="sr-only peer"
                                    checked={isCustomSizeEnabled}
                                    onChange={handleToggleCustomSize}
                                    aria-labelledby="custom-size-label"
                                />
                                <div className="block bg-slate-800 border border-slate-700 w-14 h-8 rounded-full peer-checked:bg-emerald-500/50 peer-checked:border-emerald-500 transition-colors"></div>
                                <div className={`dot absolute left-1 top-1 bg-slate-500 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-full peer-checked:bg-emerald-400`}></div>
                            </div>
                        </label>
                    </div>
                    <div className={`flex items-center gap-2 w-full transition-opacity duration-300 ${!isCustomSizeEnabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <input 
                            type="number" 
                            placeholder="Rộng" 
                            value={customWidth} 
                            onChange={handleCustomWidthChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white text-center focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            disabled={!isCustomSizeEnabled}
                        />
                        <span className="text-slate-500">×</span>
                        <input 
                            type="number" 
                            placeholder="Cao" 
                            value={customHeight} 
                            onChange={handleCustomHeightChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white text-center focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            disabled={!isCustomSizeEnabled}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <label htmlFor="image-count" className="text-sm font-medium text-slate-300 flex-shrink-0">Số lượng:</label>
                    <select
                        id="image-count"
                        value={numberOfImages}
                        onChange={(e) => onNumberOfImagesChange(Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer"
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
                    className="flex items-center justify-center space-x-3 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-glow-green disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-500 disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <MagicWandIcon />
                    )}
                    <span>{isLoading ? 'Đang xử lý...' : '✨ Bắt Đầu Phép Màu!'}</span>
                </button>
            </div>
        </div>
    );
};
