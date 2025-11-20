
import React from 'react';
import type { Style } from '../types';
import { STYLE_TABS, STYLES } from '../constants';
import { WeddingStylesTab } from './WeddingStylesTab';
import { CustomPromptTab } from './CustomPromptTab';
import { TrendingStylesTab } from './TrendingStylesTab';
import { ProductStylesTab } from './ProductStylesTab';

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
                    <div className="flex flex-col items-center justify-center h-[300px] text-center text-slate-400 p-4 bg-slate-900/30 rounded-xl border-2 border-dashed border-slate-700/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4m-9 6h.01M15 12h.01M10 15h.01M15 15h.01" />
                        </svg>
                        <p className="font-semibold text-slate-300">Tùy chỉnh ảnh thẻ</p>
                        <p className="text-sm mt-2 max-w-xs">Vui lòng sử dụng các tùy chọn trong <strong>Bước 3</strong> để thiết lập kích thước, phông nền và trang phục.</p>
                    </div>
                );
            case 'wedding':
                return <WeddingStylesTab styles={stylesForTab} selectedStyle={selectedStyle} onStyleSelect={onStyleSelect} />;
            case 'style':
                return <CustomPromptTab 
                            {...customTabCommonProps}
                            label="Bạn muốn phong cách nào?"
                            placeholder="VD: Tranh sơn dầu, nghệ thuật pixel, anime..."
                            promptValue={props.stylePrompt}
                            onPromptChange={props.onStylePromptChange}
                       />;
            case 'celebrity':
                 return <CustomPromptTab 
                            {...customTabCommonProps}
                            label="Bạn muốn chụp cùng ai?"
                            placeholder="VD: Taylor Swift, Iron Man..."
                            promptValue={props.celebrityPrompt}
                            onPromptChange={props.onCelebrityPromptChange}
                       />;
            case 'travel':
                return <CustomPromptTab 
                            {...customTabCommonProps}
                            label="Bạn muốn du lịch ở đâu?"
                            placeholder="VD: Paris, Bãi biển Hawaii..."
                            promptValue={props.travelPrompt}
                            onPromptChange={props.onTravelPromptChange}
                       />;
            case 'panorama':
                return <CustomPromptTab 
                            {...customTabCommonProps}
                            label="Bạn muốn bối cảnh gì?"
                            placeholder="VD: Dải ngân hà, Rừng rậm Amazon..."
                            promptValue={props.panoramaPrompt}
                            onPromptChange={props.onPanoramaPromptChange}
                       />;
            default:
                return null;
        }
    };
    
    return (
        <div className="flex flex-col space-y-6 w-full h-full">
            <div className="flex items-center space-x-2 p-1.5 bg-slate-900/80 backdrop-blur rounded-xl overflow-x-auto scrollbar-hide border border-slate-800 shadow-inner">
                {STYLE_TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-4 py-2.5 text-sm font-semibold rounded-lg flex-shrink-0 transition-all duration-300 ${
                            activeTab === tab.id
                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            
            <div className="flex-grow relative min-h-[300px]">
                {renderTabContent()}
            </div>
        </div>
    );
};
