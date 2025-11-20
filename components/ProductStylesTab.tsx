
import React, { useMemo } from 'react';
import type { Style } from '../types';

interface ProductStylesTabProps {
    styles: Style[];
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
    productPrompt: string;
    onProductPromptChange: (prompt: string) => void;
    isCustomPromptActive: boolean;
    onToggleCustomPrompt: (isActive: boolean) => void;
}

export const ProductStylesTab: React.FC<ProductStylesTabProps> = ({ 
    styles, 
    selectedStyle, 
    onStyleSelect, 
    productPrompt, 
    onProductPromptChange,
    isCustomPromptActive,
    onToggleCustomPrompt
}) => {

    // Group styles by subCategory
    const categories = useMemo(() => {
        const cats = styles.reduce((acc, style) => {
            const cat = style.subCategory || 'other';
            if (!acc[cat]) {
                acc[cat] = [];
            }
            acc[cat].push(style);
            return acc;
        }, {} as Record<string, Style[]>);
        return Object.entries(cats);
    }, [styles]);
    
    const catNames: Record<string, string> = {
        studio: 'Studio & Tối giản',
        nature: 'Thiên nhiên & Ngoài trời',
        lifestyle: 'Phong cách sống (Lifestyle)',
        vietnam: 'Bối cảnh Việt Nam',
        creative: 'Sáng tạo & Trừu tượng',
        other: 'Khác'
    };

    return (
        <div className="flex flex-col space-y-6 h-full">
            {/* Custom Input Area */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                     <label htmlFor="custom-product-prompt" className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                        Tùy chỉnh bối cảnh
                    </label>
                     <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium ${!isCustomPromptActive ? 'text-slate-400' : 'text-slate-600'}`}>Chọn mẫu</span>
                        <label htmlFor="product-prompt-toggle" className="flex items-center cursor-pointer select-none">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="product-prompt-toggle"
                                    className="sr-only peer"
                                    checked={isCustomPromptActive}
                                    onChange={() => onToggleCustomPrompt(!isCustomPromptActive)}
                                />
                                <div className="block bg-slate-800 border border-slate-600 w-10 h-6 rounded-full peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-full`}></div>
                            </div>
                        </label>
                        <span className={`text-xs font-medium ${isCustomPromptActive ? 'text-emerald-400' : 'text-slate-600'}`}>Tự nhập</span>
                    </div>
                </div>

                {isCustomPromptActive ? (
                    <textarea
                        id="custom-product-prompt"
                        value={productPrompt}
                        onChange={(e) => onProductPromptChange(e.target.value)}
                        className="w-full h-24 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none text-sm"
                        placeholder="Mô tả chi tiết bối cảnh bạn muốn. Ví dụ: Sản phẩm đặt trên một tảng băng trôi giữa đại dương..."
                    />
                ) : (
                     <p className="text-xs text-slate-500 italic">Chọn một mẫu bên dưới để áp dụng nhanh.</p>
                )}
            </div>

            {/* Style Selection Grid */}
            {!isCustomPromptActive && (
                <div className="flex-grow overflow-y-auto pr-2 max-h-[400px] space-y-8">
                    {categories.map(([catKey, catStyles]) => (
                        <div key={catKey}>
                            <h3 className="text-md font-bold text-white mb-3 pl-1 border-l-4 border-emerald-500 leading-none">
                                {catNames[catKey] || 'Khác'}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {catStyles.map(style => {
                                    const isSelected = selectedStyle.id === style.id;
                                    return (
                                        <button
                                            key={style.id}
                                            onClick={() => onStyleSelect(style)}
                                            className={`group relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                                                isSelected ? 'ring-2 ring-emerald-500 scale-[1.02]' : 'hover:scale-[1.02] ring-1 ring-slate-700/50'
                                            }`}
                                        >
                                             <img 
                                                src={style.thumbnail} 
                                                alt={style.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 ${isSelected ? 'opacity-90' : ''}`} />
                                            
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 bg-emerald-500 w-2 h-2 rounded-full shadow-glow-green"></div>
                                            )}

                                            <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
                                                <span className={`text-xs font-bold block truncate ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                                                    {style.name}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
