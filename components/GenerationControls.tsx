
import React from 'react';
import type { ImageType, AspectRatio, IdPhotoSize, IdPhotoBackground, IdPhotoAttire } from '../types';
import { IMAGE_TYPES, ASPECT_RATIOS, ID_PHOTO_SIZES, ID_PHOTO_BACKGROUNDS, ID_PHOTO_ATTIRES } from '../constants';

interface GenerationControlsProps {
    activeTab: string;
    selectedImageType: ImageType;
    onImageTypeChange: (imageType: ImageType) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isReady: boolean;
    disabledTooltip: string;
    numberOfImages: number;
    onNumberOfImagesChange: (num: number) => void;
    selectedAspectRatio: string;
    onAspectRatioChange: (ratio: string) => void;
    customWidth: number | '';
    onCustomWidthChange: (width: number | '') => void;
    customHeight: number | '';
    onCustomHeightChange: (height: number | '') => void;
    idPhotoSize: IdPhotoSize;
    onIdPhotoSizeChange: (size: IdPhotoSize) => void;
    idPhotoBackground: IdPhotoBackground;
    onIdPhotoBackgroundChange: (background: IdPhotoBackground) => void;
    idPhotoAttire: IdPhotoAttire;
    onIdPhotoAttireChange: (attire: IdPhotoAttire) => void;
}

const MagicWandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547a.5.5 0 01-.708 0l-4.242-4.242a.5.5 0 010-.708l.547-.548z" />
    </svg>
);


export const GenerationControls: React.FC<GenerationControlsProps> = ({ 
    activeTab,
    selectedImageType, 
    onImageTypeChange, 
    onGenerate, 
    isLoading, 
    isReady,
    disabledTooltip,
    numberOfImages,
    onNumberOfImagesChange,
    selectedAspectRatio,
    onAspectRatioChange,
    customWidth,
    onCustomWidthChange,
    customHeight,
    onCustomHeightChange,
    idPhotoSize,
    onIdPhotoSizeChange,
    idPhotoBackground,
    onIdPhotoBackgroundChange,
    idPhotoAttire,
    onIdPhotoAttireChange,
}) => {
    const isCustomSizeEnabled = selectedAspectRatio === 'custom';
    const isIdPhotoTab = activeTab === 'id_photo';
    
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
                <h2 className="text-lg font-bold text-slate-200">Bước 3: Tinh chỉnh cuối cùng</h2>
            </div>
            
            {isIdPhotoTab ? (
                <div className="space-y-4">
                    {/* ID Photo Size */}
                    <div>
                         <h3 className="text-sm font-medium text-slate-300 mb-2">Kích thước</h3>
                         <select
                            value={idPhotoSize.id}
                            onChange={(e) => onIdPhotoSizeChange(ID_PHOTO_SIZES.find(s => s.id === e.target.value) || ID_PHOTO_SIZES[0])}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer"
                        >
                            {ID_PHOTO_SIZES.map(size => <option key={size.id} value={size.id}>{size.name}</option>)}
                        </select>
                    </div>
                    {/* ID Photo Background */}
                    <div>
                        <h3 className="text-sm font-medium text-slate-300 mb-2">Phông nền</h3>
                        <div className="grid grid-cols-3 gap-3">
                           {ID_PHOTO_BACKGROUNDS.map(bg => {
                                const isSelected = idPhotoBackground.id === bg.id;
                                return (
                                    <button
                                        key={bg.id}
                                        onClick={() => onIdPhotoBackgroundChange(bg)}
                                        className={`flex items-center justify-center p-3 space-x-2 bg-slate-800 rounded-lg h-14 transition-all duration-200 transform hover:bg-slate-700 ring-2 ${isSelected ? 'ring-emerald-400 scale-105' : 'ring-transparent hover:ring-slate-600'}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border-slate-500 ${bg.className}`}></div>
                                        <span className="text-sm font-medium text-slate-200">{bg.name}</span>
                                    </button>
                                );
                           })}
                        </div>
                    </div>
                    {/* ID Photo Attire */}
                     <div>
                         <h3 className="text-sm font-medium text-slate-300 mb-2">Trang phục</h3>
                         <select
                            value={idPhotoAttire.id}
                            onChange={(e) => onIdPhotoAttireChange(ID_PHOTO_ATTIRES.find(a => a.id === e.target.value) || ID_PHOTO_ATTIRES[0])}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer"
                        >
                            {ID_PHOTO_ATTIRES.map(attire => <option key={attire.id} value={attire.id}>{attire.name}</option>)}
                        </select>
                    </div>
                </div>
            ) : (
                <>
                    {/* Standard Controls */}
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
                </>
            )}

            {/* Action Area - Sticky on Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-emerald-500/20 p-4 z-50 sm:static sm:bg-transparent sm:border-none sm:p-0 sm:z-auto flex items-center gap-4 transition-all duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] sm:shadow-none">
                <div className="flex-shrink-0">
                    <select
                        id="image-count"
                        value={numberOfImages}
                        onChange={(e) => onNumberOfImagesChange(Number(e.target.value))}
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-3 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer text-sm font-bold"
                        disabled={isLoading}
                        title="Số lượng ảnh"
                    >
                        <option value={1}>1 Ảnh</option>
                        <option value={2}>2 Ảnh</option>
                        <option value={3}>3 Ảnh</option>
                        <option value={4}>4 Ảnh</option>
                    </select>
                </div>

                <div className="relative group flex-grow">
                    <button
                        onClick={onGenerate}
                        disabled={isLoading || !isReady}
                        aria-describedby={!isReady ? "generate-tooltip" : undefined}
                        className="flex items-center justify-center space-x-3 w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-glow-green disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-500 disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100 active:scale-95"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <MagicWandIcon />
                        )}
                        <span className="text-base">{isLoading ? 'Đang xử lý...' : '✨ Tạo Tác Phẩm Ngay'}</span>
                    </button>
                    
                     {/* The Tooltip - Positioned ABOVE the button */}
                    {!isReady && disabledTooltip && (
                        <div 
                            id="generate-tooltip"
                            role="tooltip"
                            className="absolute bottom-full mb-3 w-max max-w-[250px] sm:max-w-xs px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-red-500/50 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none left-1/2 -translate-x-1/2 z-50 text-center"
                        >
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-b border-r border-red-500/50 rotate-45"></div>
                            {disabledTooltip}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
