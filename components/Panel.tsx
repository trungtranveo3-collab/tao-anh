import React from 'react';

interface PanelProps {
    children: React.ReactNode;
    className?: string;
}

export const Panel: React.FC<PanelProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-slate-900 rounded-lg p-4 sm:p-6 ring-1 ring-slate-800 ${className}`}>
            {children}
        </div>
    );
};
