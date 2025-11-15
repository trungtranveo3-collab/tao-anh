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
    isCustomPromptActive: boolean;
    onToggle: (isActive: boolean) => void;
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
    isCustomPromptActive,
    onToggle
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

            <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-medium transition-colors ${!isCustomPromptActive ? 'text-emerald-400' : 'text-slate-500'}`}>Gợi ý</span>
                <label htmlFor={`custom-prompt-toggle-${label.substring(0,5)}`} className="flex items-center cursor-pointer select-none">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id={`custom-prompt-toggle-${label.substring(0,5)}`}
                            className="sr-only peer"
                            checked={isCustomPromptActive}
                            onChange={() => onToggle(!isCustomPromptActive)}
                        />
                        <div className="block bg-slate-900 border border-slate-700 w-14 h-8 rounded-full peer-checked:bg-emerald-500/50 peer-checked:border-emerald-500 transition-colors"></div>
                        <div className={`dot absolute left-1 top-1 bg-slate-500 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-full peer-checked:bg-emerald-400`}></div>
                    </div>
                </label>
                <span className={`text-sm font-medium transition-colors ${isCustomPromptActive ? 'text-emerald-400' : 'text-slate-500'}`}>Tùy chỉnh</span>
            </div>
            
            {!isCustomPromptActive && (
                <>
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
                </>
            )}
        </div>
    );
};
