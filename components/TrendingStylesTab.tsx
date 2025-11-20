
import React from 'react';
import type { Style } from '../types';

interface TrendingStylesTabProps {
    styles: Style[];
    selectedStyle: Style;
    onStyleSelect: (style: Style) => void;
}

// Helper to parse date strings as UTC dates to avoid timezone issues.
const parseDate = (dateString: string) => new Date(`${dateString}T00:00:00Z`);

export const TrendingStylesTab: React.FC<TrendingStylesTabProps> = ({ styles, selectedStyle, onStyleSelect }) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const timeBasedTrends = styles.filter(trend => trend.startDate && trend.endDate);

    // 1. Find active trends
    const activeTrends = timeBasedTrends.filter(trend => {
        const startDate = parseDate(trend.startDate!);
        const endDate = parseDate(trend.endDate!);
        return today >= startDate && today <= endDate;
    });

    // 2. Find upcoming trends
    const upcomingTrends = timeBasedTrends
        .filter(trend => parseDate(trend.startDate!) > today)
        .sort((a, b) => parseDate(a.startDate!).getTime() - parseDate(b.startDate!).getTime());
    
    // 3. Find past trends
    const pastTrends = timeBasedTrends
        .filter(trend => parseDate(trend.endDate!) < today)
        .sort((a, b) => parseDate(b.endDate!).getTime() - parseDate(a.endDate!).getTime());
    
    // 4. Build the final list
    let displayTrends = [...activeTrends];
    if (displayTrends.length < 6) {
        const needed = 6 - displayTrends.length;
        displayTrends.push(...upcomingTrends.slice(0, needed));
    }
    if (displayTrends.length < 6) {
        const needed = 6 - displayTrends.length;
        displayTrends.push(...pastTrends.slice(0, needed));
    }

    // Fallback
    if (displayTrends.length === 0 && styles.length > 0) {
        displayTrends = styles.slice(0, 6);
    }
    
    if (displayTrends.length === 0) {
        return (
            <div className="flex items-center justify-center h-[300px] text-center text-slate-400">
                <p>Không tìm thấy trend nào.</p>
            </div>
        );
    }

    return (
        <div className="flex-grow overflow-y-auto pr-2 max-h-[450px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {displayTrends.map(style => {
                    const isSelected = selectedStyle.id === style.id;
                    return (
                        <button
                            key={style.id}
                            onClick={() => onStyleSelect(style)}
                            className={`group relative aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 ${
                                isSelected ? 'ring-4 ring-emerald-500 shadow-lg shadow-emerald-500/30 scale-[1.02]' : 'hover:scale-[1.02] hover:ring-2 hover:ring-slate-500'
                            }`}
                        >
                            {/* Thumbnail Image */}
                            <img 
                                src={style.thumbnail} 
                                alt={style.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 ${isSelected ? 'opacity-90' : 'group-hover:opacity-90'}`} />

                            {/* Checkmark Badge for Selected State */}
                            {isSelected && (
                                <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full p-1 shadow-md animate-fade-in">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-left transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                                <h3 className={`font-bold text-white leading-tight ${isSelected ? 'text-emerald-300' : ''}`}>
                                    {style.name}
                                </h3>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
