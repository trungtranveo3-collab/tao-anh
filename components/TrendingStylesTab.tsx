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

    // 2. Find upcoming trends and sort them by start date
    const upcomingTrends = timeBasedTrends
        .filter(trend => parseDate(trend.startDate!) > today)
        .sort((a, b) => parseDate(a.startDate!).getTime() - parseDate(b.startDate!).getTime());
    
    // 3. Find past trends and sort them by most recent end date
    const pastTrends = timeBasedTrends
        .filter(trend => parseDate(trend.endDate!) < today)
        .sort((a, b) => parseDate(b.endDate!).getTime() - parseDate(a.endDate!).getTime());
    
    // 4. Build the final list to display, ensuring at least 5 items
    let displayTrends = [...activeTrends];

    // Add upcoming trends if we need more
    if (displayTrends.length < 5) {
        const needed = 5 - displayTrends.length;
        displayTrends.push(...upcomingTrends.slice(0, needed));
    }
    
    // Add past trends if we still need more
    if (displayTrends.length < 5) {
        const needed = 5 - displayTrends.length;
        displayTrends.push(...pastTrends.slice(0, needed));
    }

    // 5. Final fallback if there are no time-based trends at all.
    if (displayTrends.length === 0 && styles.length > 0) {
        // Just show the first 5 styles from the list.
        displayTrends = styles.slice(0, 5);
    }
    
    // The empty state message, should rarely be seen now.
    if (displayTrends.length === 0) {
        return (
            <div className="flex items-center justify-center h-[300px] text-center text-slate-400">
                <p>Không tìm thấy trend nào. <br/> Vui lòng kiểm tra lại cấu hình.</p>
            </div>
        );
    }

    return (
        <div className="flex-grow overflow-y-auto pr-2 max-h-[400px]">
            <div className="grid grid-cols-2 gap-4">
                {displayTrends.map(style => {
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
