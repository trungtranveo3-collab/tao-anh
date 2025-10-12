import React from 'react';
import type { Accessory } from '../types';
import { ACCESSORY_CATEGORIES, COLOR_PALETTE, ACCESSORY_SUGGESTIONS } from '../constants';
import { Panel } from './Panel';

interface AccessorySelectorProps {
    accessories: Record<string, Accessory>;
    onAccessoryChange: (category: string, field: 'item' | 'color', value: string) => void;
    isEnabled: boolean;
    onToggleEnabled: (enabled: boolean) => void;
}

export const AccessorySelector: React.FC<AccessorySelectorProps> = ({ accessories, onAccessoryChange, isEnabled, onToggleEnabled }) => {
    return (
        <Panel>
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-left">
                        <h2 className="text-lg font-bold text-slate-200">Bước 3: Tùy chỉnh Trang phục & Phụ kiện</h2>
                        <p className="text-slate-400 text-sm mt-1">
                            {isEnabled ? 'Chọn từ các gợi ý (không bắt buộc)' : 'AI sẽ tự động chọn trang phục'}
                        </p>
                    </div>
                    <label htmlFor="accessory-toggle" className="flex items-center cursor-pointer select-none">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="accessory-toggle"
                                className="sr-only"
                                checked={isEnabled}
                                onChange={(e) => onToggleEnabled(e.target.checked)}
                                aria-labelledby="accessory-toggle-label"
                            />
                            <div className="block bg-slate-800 border border-slate-700 w-14 h-8 rounded-full"></div>
                            <div className={`dot absolute left-1 top-1 bg-slate-500 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${isEnabled ? 'transform translate-x-full bg-cyan-400' : ''}`}></div>
                        </div>
                    </label>
                </div>

                <fieldset disabled={!isEnabled} className={`space-y-4 transition-opacity duration-300 ${!isEnabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    {ACCESSORY_CATEGORIES.map(category => (
                        <div key={category.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                            {/* Label and Icon */}
                            <div className="flex items-center space-x-3 col-span-1">
                                <div className="text-cyan-400">
                                    <category.icon />
                                </div>
                                <label className="font-medium text-slate-300">{category.name}</label>
                            </div>
                            
                            {/* Dropdowns */}
                            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-3">
                                {/* Item Selector */}
                                <select
                                    value={accessories[category.id]?.item || ''}
                                    onChange={(e) => {
                                        onAccessoryChange(category.id, 'item', e.target.value);
                                        // Reset color if item is deselected
                                        if (!e.target.value) {
                                            onAccessoryChange(category.id, 'color', '');
                                        }
                                    }}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors cursor-pointer"
                                    aria-label={`${category.name} item selection`}
                                >
                                    <option value="">-- Không chọn --</option>
                                    {Object.entries(ACCESSORY_SUGGESTIONS[category.id]).map(([groupName, items]) => (
                                        <optgroup label={groupName} key={groupName}>
                                            {items.map(item => <option key={item} value={item}>{item}</option>)}
                                        </optgroup>
                                    ))}
                                </select>
                                
                                {/* Color Selector */}
                                <select
                                    value={accessories[category.id]?.color || ''}
                                    onChange={(e) => onAccessoryChange(category.id, 'color', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    aria-label={`${category.name} color selection`}
                                    disabled={!accessories[category.id]?.item}
                                >
                                    <option value="">-- Chọn màu --</option>
                                    {COLOR_PALETTE.map(color => (
                                        <option key={color.value} value={color.value}>{color.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </fieldset>
            </div>
        </Panel>
    );
};