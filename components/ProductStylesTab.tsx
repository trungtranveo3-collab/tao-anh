import React, { useState } from 'react';
import type { Style } from '../types';
import { PRODUCT_CATEGORIES, CustomPromptIcon } from '../constants';

interface ProductStylesTabProps {
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
    productPrompt: string;
    onProductPromptChange: (prompt: string) => void;
}

export const ProductStylesTab: React.FC<ProductStylesTabProps> = ({ 
    selectedStyle, 
    onStyleSelect, 
    productPrompt, 
    onProductPromptChange 
}) => {
    const [activeProductCat, setActiveProductCat] = useState(PRODUCT_CATEGORIES[0].id);

    const stylesForProductCat = PRODUCT_CATEGORIES.find(cat => cat.id === activeProductCat)?.styles || [];

    return (
        <div className="flex flex-col space-y-4 h-full">
            {/* Sub-categories */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[...PRODUCT_CATEGORIES, { id: 'custom', name: 'Tùy chỉnh', icon: CustomPromptIcon }].map(cat => {
                    const isSelected = activeProductCat === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveProductCat(cat.id)}
                            className={`flex flex-col items-center justify-center p-2 bg-slate-800 rounded-lg transition-all duration-200 transform hover:bg-slate-700 h-20 text-center ring-2 space-y-1 ${
                                isSelected ? 'ring-emerald-400 scale-105' : 'ring-transparent hover:ring-slate-600'
                            }`}
                        >
                             <div className="text-emerald-400 flex-shrink-0">
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-slate-200">{cat.name}</span>
                        </button>
                    )
                })}
            </div>

            {/* Content for sub-category */}
            {activeProductCat === 'custom' ? (
                <div className="pt-2">
                    <label htmlFor="custom-product-prompt" className="block text-sm font-medium text-slate-300 mb-2">
                        Nhập bối cảnh sản phẩm tùy chỉnh của bạn:
                    </label>
                    <textarea
                        id="custom-product-prompt"
                        value={productPrompt}
                        onChange={(e) => {
                            onProductPromptChange(e.target.value)
                        }}
                        className="w-full h-32 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="VD: Sản phẩm đặt trên một tảng băng trong suốt, phía sau là cực quang..."
                        aria-label="Custom product prompt input"
                    />
                </div>
            ) : (
                <div className="flex-grow overflow-y-auto pr-2 max-h-[350px]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {stylesForProductCat.map(style => {
                            const isSelected = selectedStyle.id === style.id && !productPrompt;
                            return (
                                <button
                                    key={style.id}
                                    onClick={() => {
                                        onStyleSelect(style);
                                        onProductPromptChange(''); // Clear custom prompt when a style is selected
                                    }}
                                    className={`flex items-center justify-center text-center p-3 bg-slate-800 rounded-lg transition-all duration-200 transform hover:bg-slate-700 min-h-[50px] ring-2 ${
                                        isSelected ? 'ring-emerald-400 scale-105' : 'ring-transparent hover:ring-slate-600'
                                    }`}
                                >
                                    <span className="text-xs sm:text-sm font-medium text-slate-200">{style.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
