
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
        <div className="flex flex-col space-y-6 h-full">
             {/* Custom Input Area */}
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                     <label htmlFor="custom-prompt" className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                        {label}
                    </label>
                     <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium ${!isCustomPromptActive ? 'text-slate-400' : 'text-slate-600'}`}>Gợi ý</span>
                        <label htmlFor="custom-prompt-toggle" className="flex items-center cursor-pointer select-none">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="custom-prompt-toggle"
                                    className="sr-only peer"
                                    checked={isCustomPromptActive}
                                    onChange={() => onToggle(!isCustomPromptActive)}
                                />
                                <div className="block bg-slate-800 border border-slate-600 w-10 h-6 rounded-full peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-full`}></div>
                            </div>
                        </label>
                        <span className={`text-xs font-medium ${isCustomPromptActive ? 'text-emerald-400' : 'text-slate-600'}`}>Tùy chỉnh</span>
                    </div>
                </div>

                {isCustomPromptActive ? (
                     <div className="relative">
                        <input
                            type="text"
                            id="custom-prompt"
                            value={promptValue}
                            onChange={(e) => onPromptChange(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                            placeholder={placeholder}
                            autoFocus
                        />
                         <div className="absolute right-3 top-3 text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                    </div>
                ) : (
                     <p className="text-xs text-slate-500 italic">Chọn một trong các gợi ý bên dưới để có kết quả tốt nhất.</p>
                )}
            </div>
            
            {!isCustomPromptActive && (
                <div className="flex-grow overflow-y-auto pr-2 max-h-[400px]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {styles.map(style => {
                            const isSelected = selectedStyle.id === style.id && !promptValue;
                            return (
                                <button
                                    key={style.id}
                                    onClick={() => onStyleSelect(style)}
                                    className={`group relative aspect-video rounded-lg overflow-hidden transition-all duration-200 text-left ${
                                        isSelected ? 'ring-2 ring-emerald-500 scale-[1.02]' : 'hover:scale-[1.02] ring-1 ring-slate-700/50'
                                    }`}
                                >
                                     {/* Image Background */}
                                     <img 
                                        src={style.thumbnail} 
                                        alt={style.name}
                                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                        loading="lazy"
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                                        <span className={`text-sm font-bold block truncate ${isSelected ? 'text-emerald-300' : 'text-white group-hover:text-emerald-200'}`}>
                                            {style.name}
                                        </span>
                                        {isStyleTab && (
                                             <span className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5 block">Phong cách</span>
                                        )}
                                    </div>

                                    {/* Selection Indicator */}
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1 shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
