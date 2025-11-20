
import React from 'react';
import type { Style } from '../types';

interface WeddingStylesTabProps {
    styles: Style[];
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
}

export const WeddingStylesTab: React.FC<WeddingStylesTabProps> = ({ styles, selectedStyle, onStyleSelect }) => {
    return (
        <div className="flex-grow overflow-y-auto pr-2 max-h-[450px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {styles.map(style => {
                    const isSelected = selectedStyle.id === style.id;
                    return (
                        <button
                            key={style.id}
                            onClick={() => onStyleSelect(style)}
                            className={`group relative aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 ${
                                isSelected ? 'ring-4 ring-emerald-500 shadow-lg shadow-emerald-500/30 scale-[1.02]' : 'hover:scale-[1.02] hover:ring-2 hover:ring-slate-500'
                            }`}
                        >
                            <img 
                                src={style.thumbnail} 
                                alt={style.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 transition-opacity duration-300 ${isSelected ? 'opacity-90' : 'group-hover:opacity-80'}`} />

                             {isSelected && (
                                <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full p-1 shadow-md animate-fade-in">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                <h3 className={`font-bold text-white text-lg leading-tight ${isSelected ? 'text-emerald-300' : ''}`}>
                                    {style.name}
                                </h3>
                                <p className="text-xs text-slate-300 mt-1 line-clamp-2 opacity-80">
                                    {style.prompt.substring(0, 60)}...
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
