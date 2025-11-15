import React, { useMemo } from 'react';
import type { Style } from '../types';
import { STYLE_TABS, STYLES } from '../constants';
import { WeddingStylesTab } from './WeddingStylesTab';
import { CustomPromptTab } from './CustomPromptTab';
import { TrendingStylesTab } from './TrendingStylesTab';

interface StyleSelectorProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
    stylePrompt: string;
    onStylePromptChange: (prompt: string) => void;
    celebrityPrompt: string;
    onCelebrityPromptChange: (prompt: string) => void;
    travelPrompt: string;
    onTravelPromptChange: (prompt: string) => void;
    panoramaPrompt: string;
    onPanoramaPromptChange: (prompt: string) => void;
    productPrompt: string;
    onProductPromptChange: (prompt: string) => void;
    isCustomPromptActive: boolean;
    onToggleCustomPrompt: (isActive: boolean) => void;
}

const ProductStylesTab: React.FC<{
    styles: Style[];
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
    productPrompt: string;
    onProductPromptChange: (prompt: string) => void;
    isCustomPromptActive: boolean;
    onToggleCustomPrompt: (isActive: boolean) => void;
}> = ({ styles, selectedStyle, onStyleSelect, productPrompt, onProductPromptChange, isCustomPromptActive, onToggleCustomPrompt }) => {

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
        nature: 'Thiên nhiên',
        lifestyle: 'Phong cách sống',
        vietnam: 'Bối cảnh Việt Nam',
        creative: 'Sáng tạo & Trừu tượng'
    };

    return (
        <div className="flex flex-col space-y-4 h-full">
            <div>
                <label htmlFor="custom-product-prompt" className="block text-sm font-medium text-slate-300 mb-2">
                    Nhập bối cảnh sản phẩm tùy chỉnh hoặc chọn gợi ý:
                </label>
                <input
                    type="text"
                    id="custom-product-prompt"
                    value={productPrompt}
                    onChange={(e) => onProductPromptChange(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="VD: Sản phẩm đặt trên một tảng băng..."
                    aria-label="Custom product prompt input"
                />
            </div>

            <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-medium transition-colors ${!isCustomPromptActive ? 'text-emerald-400' : 'text-slate-500'}`}>Gợi ý</span>
                <label htmlFor="product-prompt-toggle" className="flex items-center cursor-pointer select-none">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="product-prompt-toggle"
                            className="sr-only peer"
                            checked={isCustomPromptActive}
                            onChange={() => onToggleCustomPrompt(!isCustomPromptActive)}
                        />
                        <div className="block bg-slate-900 border border-slate-700 w-14 h-8 rounded-full peer-checked:bg-emerald-500/50 peer-checked:border-emerald-500 transition-colors"></div>
                        <div className={`dot absolute left-1 top-1 bg-slate-500 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-full peer-checked:bg-emerald-400`}></div>
                    </div>
                </label>
                <span className={`text-sm font-medium transition-colors ${isCustomPromptActive ? 'text-emerald-400' : 'text-slate-500'}`}>Tùy chỉnh</span>
            </div>

            {!isCustomPromptActive && (
                <div className="flex-grow overflow-y-auto pr-2 max-h-[350px] space-y-4">
                    {categories.map(([catKey, catStyles]) => (
                        <div key={catKey}>
                            <h3 className="text-sm font-semibold text-emerald-400 mb-2">{catNames[catKey] || 'Khác'}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {catStyles.map(style => {
                                    const isSelected = selectedStyle.id === style.id && !productPrompt;
                                    return (
                                        <button
                                            key={style.id}
                                            onClick={() => {
                                                onStyleSelect(style);
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
                    ))}
                </div>
            )}
        </div>
    );
};


export const StyleSelector: React.FC<StyleSelectorProps> = (props) => {
    const { activeTab, onTabChange, selectedStyle, onStyleSelect, isCustomPromptActive, onToggleCustomPrompt } = props;
    
    const stylesForTab = STYLES.filter(s => s.category === activeTab);

    const customTabCommonProps = {
        styles: stylesForTab,
        selectedStyle: selectedStyle,
        onStyleSelect: onStyleSelect,
        isCustomPromptActive: isCustomPromptActive,
        onToggle: onToggleCustomPrompt,
    };

    /**
     * Renders the appropriate content component based on the active tab.
     */
    const renderTabContent = () => {
        switch (activeTab) {
            case 'trends':
                 return <TrendingStylesTab styles={stylesForTab} selectedStyle={selectedStyle} onStyleSelect={onStyleSelect} />;
            case 'product':
                return <ProductStylesTab 
                            styles={stylesForTab} 
                            selectedStyle={selectedStyle} 
                            onStyleSelect={onStyleSelect} 
                            productPrompt={props.productPrompt}
                            onProductPromptChange={props.onProductPromptChange}
                            isCustomPromptActive={isCustomPromptActive}
                            onToggleCustomPrompt={onToggleCustomPrompt}
                        />;
            case 'id_photo':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4m-9 6h.01M15 12h.01M10 15h.01M15 15h.01" />
                        </svg>
                        <p className="font-semibold text-slate-300">Tùy chỉnh ảnh thẻ</p>
                        <p className="text-sm">Vui lòng sử dụng các tùy chọn trong Bước 3 để thiết lập kích thước, phông nền và trang phục.</p>
                    </div>
                );
            case 'wedding':
                return <WeddingStylesTab styles={stylesForTab} selectedStyle={selectedStyle} onStyleSelect={onStyleSelect} />;
            case 'style':
                return <CustomPromptTab 
                            {...customTabCommonProps}
                            label="Nhập prompt phong cách tùy chỉnh hoặc chọn gợi ý:"
                            placeholder="VD: Tranh sơn dầu, nghệ thuật pixel, anime thập niên 90..."
                            promptValue={props.stylePrompt}
                            onPromptChange={props.onStylePromptChange}
                            isStyleTab={true}
                       />;
            case 'celebrity':
                 return <CustomPromptTab 
                            {...customTabCommonProps}
                            label="Nhập tên người nổi tiếng, nhân vật, hoặc prompt tùy chỉnh:"
                            placeholder="VD: Taylor Swift, Iron Man, phi hành gia..."
                            promptValue={props.celebrityPrompt}
                            onPromptChange={props.onCelebrityPromptChange}
                       />;
            case 'travel':
                return <CustomPromptTab 
                            {...customTabCommonProps}
                            label="Nhập địa điểm du lịch bạn muốn đến:"
                            placeholder="VD: Paris, Bãi biển Hawaii, Đỉnh Everest..."
                            promptValue={props.travelPrompt}
                            onPromptChange={props.onTravelPromptChange}
                       />;
            case 'panorama':
                return <CustomPromptTab 
                            {...customTabCommonProps}
                            label="Nhập bối cảnh toàn cảnh bạn muốn:"
                            placeholder="VD: Dải ngân hà, Rừng rậm Amazon, Thành phố Cyberpunk..."
                            promptValue={props.panoramaPrompt}
                            onPromptChange={props.onPanoramaPromptChange}
                       />;
            default:
                return null;
        }
    };
    
    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <div className="flex items-center space-x-1 sm:space-x-2 p-1 bg-slate-900 rounded-lg overflow-x-auto">
                {STYLE_TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md flex-shrink-0 transition-all duration-300 ${
                            activeTab === tab.id
                                ? 'bg-emerald-500 text-white shadow-md'
                                : 'text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            
            <div className="flex-grow relative">
                {renderTabContent()}
            </div>
        </div>
    );
};
