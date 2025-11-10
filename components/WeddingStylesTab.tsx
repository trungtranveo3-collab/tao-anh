import React from 'react';
import type { Style } from '../types';

interface WeddingStylesTabProps {
    styles: Style[];
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
}

export const WeddingStylesTab: React.FC<WeddingStylesTabProps> = ({ styles, selectedStyle, onStyleSelect }) => {
    return (
        <div className="flex-grow overflow-y-auto pr-2 max-h-[400px]">
            <div className="grid grid-cols-2 gap-4">
                {styles.map(style => {
                    const isSelected = selectedStyle.id === style.id;
                    return (
                        <button
                            key={style.id}
                            onClick={() => onStyleSelect(style)}
                            className={`flex flex-col items-center justify-center p-4 bg-slate-800 rounded-lg transition-all duration-200 transform hover:bg-slate-700 min-h-[100px] text-center ring-2 space-y-2 ${
                                isSelected ? 'ring-emerald-400 scale-105' : 'ring-transparent hover:ring-slate-600'
                            }`}
                        >
                            <div className="text-emerald-400 flex-shrink-0">
                                <style.icon className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-medium text-slate-200">{style.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
