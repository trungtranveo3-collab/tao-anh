import React from 'react';
import type { Style } from '../types';
import { STYLE_TABS, STYLES } from '../constants';
import { Panel } from './Panel';

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
}

export const StyleSelector: React.FC<StyleSelectorProps> = (props) => {
    const { 
        activeTab, onTabChange, selectedStyle, onStyleSelect, 
        stylePrompt, onStylePromptChange,
        celebrityPrompt, onCelebrityPromptChange,
        travelPrompt, onTravelPromptChange,
        panoramaPrompt, onPanoramaPromptChange
     } = props;
    
    const stylesForTab = STYLES.filter(s => s.category === activeTab);
    
    const renderCustomPromptTab = (
        label: string, 
        placeholder: string, 
        promptValue: string, 
        onPromptChange: (value: string) => void
    ) => (
        <div className="flex flex-col space-y-4 h-full">
            <div>
                <label htmlFor="custom-prompt" className="block text-sm font-medium text-slate-300 mb-2">
                    {label}
                </label>
                <input
                    type="text"
                    id="custom-prompt"
                    value={promptValue}
                    onChange={(e) => onPromptChange(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    placeholder={placeholder}
                    aria-label="Custom prompt input"
                />
            </div>

            <div className="relative flex items-center text-center">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-sm">hoặc chọn gợi ý</span>
                <div className="flex-grow border-t border-slate-700"></div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 max-h-[300px]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {stylesForTab.map(style => {
                        const isSelected = selectedStyle.id === style.id;
                        const isStyleTab = activeTab === 'style';
                        return (
                            <button
                                key={style.id}
                                onClick={() => onStyleSelect(style)}
                                className={`flex items-center p-3 bg-slate-800 rounded-lg transition-all duration-200 transform hover:bg-slate-700 min-h-[50px] text-left ring-2 ${
                                    isStyleTab ? 'justify-start space-x-3' : 'justify-center text-center'
                                } ${
                                    isSelected ? 'ring-cyan-500' : 'ring-transparent hover:ring-slate-600'
                                }`}
                            >
                                {isStyleTab && (
                                    <div className="text-cyan-400 flex-shrink-0">
                                        <style.icon className="w-6 h-6" />
                                    </div>
                                )}
                                <span className="text-xs sm:text-sm font-medium text-slate-200">{style.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
        
    const propsMap: { [key: string]: Parameters<typeof renderCustomPromptTab> } = {
        style: [
            'Nhập prompt phong cách tùy chỉnh hoặc chọn gợi ý:',
            'VD: Tranh sơn dầu, nghệ thuật pixel, anime thập niên 90...',
            stylePrompt,
            onStylePromptChange,
        ],
        celebrity: [
            'Nhập tên người nổi tiếng, nhân vật, hoặc prompt tùy chỉnh:',
            'VD: Taylor Swift, Iron Man, phi hành gia...',
            celebrityPrompt,
            onCelebrityPromptChange,
        ],
        travel: [
            'Nhập địa điểm du lịch bạn muốn đến:',
            'VD: Paris, Bãi biển Hawaii, Đỉnh Everest...',
            travelPrompt,
            onTravelPromptChange,
        ],
        panorama: [
            'Nhập bối cảnh toàn cảnh bạn muốn:',
            'VD: Dải ngân hà, Rừng rậm Amazon, Thành phố Cyberpunk...',
            panoramaPrompt,
            onPanoramaPromptChange,
        ],
    };
    
    return (
        <Panel>
            <div className="flex flex-col space-y-4 w-full h-full">
                <div className="text-left">
                    <h2 className="text-lg font-bold text-slate-200">Bước 2: Chọn Phong cách & Gợi ý</h2>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 p-1 bg-slate-900 rounded-lg">
                    {STYLE_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md flex-1 transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-cyan-500 text-white'
                                    : 'text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                
                <div className="flex-grow relative">
                    { renderCustomPromptTab(...propsMap[activeTab]) }
                </div>

            </div>
        </Panel>
    );
};