import React from 'react';
import type { Style } from '../types';
import { STYLE_TABS, STYLES } from '../constants';
import { WeddingStylesTab } from './WeddingStylesTab';
import { ProductStylesTab } from './ProductStylesTab';
import { CustomPromptTab } from './CustomPromptTab';

interface StyleSelectorProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
    stylePrompt: string;
    onStylePromptChange: (prompt: string) => void;
    productPrompt: string;
    onProductPromptChange: (prompt: string) => void;
    celebrityPrompt: string;
    onCelebrityPromptChange: (prompt: string) => void;
    travelPrompt: string;
    onTravelPromptChange: (prompt: string) => void;
    panoramaPrompt: string;
    onPanoramaPromptChange: (prompt: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = (props) => {
    const { activeTab, onTabChange, selectedStyle, onStyleSelect } = props;
    
    const stylesForTab = STYLES.filter(s => s.category === activeTab);

    // Defines the unique properties for each tab that uses the CustomPromptTab component
    const propsMap: { [key: string]: Omit<React.ComponentProps<typeof CustomPromptTab>, 'styles' | 'selectedStyle' | 'onStyleSelect'> } = {
        style: {
            label: 'Nhập prompt phong cách tùy chỉnh hoặc chọn gợi ý:',
            placeholder: 'VD: Tranh sơn dầu, nghệ thuật pixel, anime thập niên 90...',
            promptValue: props.stylePrompt,
            onPromptChange: props.onStylePromptChange,
            isStyleTab: true,
        },
        celebrity: {
            label: 'Nhập tên người nổi tiếng, nhân vật, hoặc prompt tùy chỉnh:',
            placeholder: 'VD: Taylor Swift, Iron Man, phi hành gia...',
            promptValue: props.celebrityPrompt,
            onPromptChange: props.onCelebrityPromptChange,
        },
        travel: {
            label: 'Nhập địa điểm du lịch bạn muốn đến:',
            placeholder: 'VD: Paris, Bãi biển Hawaii, Đỉnh Everest...',
            promptValue: props.travelPrompt,
            onPromptChange: props.onTravelPromptChange,
        },
        panorama: {
            label: 'Nhập bối cảnh toàn cảnh bạn muốn:',
            placeholder: 'VD: Dải ngân hà, Rừng rậm Amazon, Thành phố Cyberpunk...',
            promptValue: props.panoramaPrompt,
            onPromptChange: props.onPanoramaPromptChange,
        },
    };

    /**
     * Renders the appropriate content component based on the active tab.
     */
    const renderTabContent = () => {
        switch (activeTab) {
            case 'wedding':
                return <WeddingStylesTab styles={stylesForTab} selectedStyle={selectedStyle} onStyleSelect={onStyleSelect} />;
            case 'product':
                return <ProductStylesTab 
                            selectedStyle={selectedStyle} 
                            onStyleSelect={onStyleSelect} 
                            productPrompt={props.productPrompt} 
                            onProductPromptChange={props.onProductPromptChange} 
                       />;
            case 'style':
            case 'celebrity':
            case 'travel':
            case 'panorama':
                return <CustomPromptTab 
                            {...propsMap[activeTab]}
                            styles={stylesForTab}
                            selectedStyle={selectedStyle}
                            onStyleSelect={onStyleSelect}
                       />;
            default:
                return null;
        }
    };
    
    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <div className="flex items-center space-x-1 sm:space-x-2 p-1 bg-slate-900 rounded-lg">
                {STYLE_TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md flex-1 transition-all duration-300 ${
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
