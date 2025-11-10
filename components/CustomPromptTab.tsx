import React from 'react';
import type { Style } from '../types';

interface CustomPromptTabProps {
    label: string;
    placeholder: string;
    promptValue: string;
    onPromptChange: (value: string) => void;
    styles: Style[];
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
    isStyleTab?: boolean;
}

export const CustomPromptTab: React.FC<CustomPromptTabProps> = ({
    label,
    placeholder,
    promptValue,
    onPromptChange,
    styles,
    selectedStyle,
    onStyleSelect,
    isStyleTab = false,
}) => {
    return (
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
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
                    {styles.map(style => {
                        const isSelected = selectedStyle.id === style.id && !promptValue;
                        return (
                            <button
                                key={style.id}
                                onClick={() => {
                                    onStyleSelect(style);
                                    onPromptChange('');
                                }}
                                className={`flex items-center p-3 bg-slate-800 rounded-lg transition-all duration-200 transform hover:bg-slate-700 min-h-[50px] text-left ring-2 ${
                                    isStyleTab ? 'justify-start space-x-3' : 'justify-center text-center'
                                } ${
                                    isSelected ? 'ring-emerald-400 scale-105' : 'ring-transparent hover:ring-slate-600'
                                }`}
                            >
                                {isStyleTab && (
                                    <div className="text-emerald-400 flex-shrink-0">
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
};
