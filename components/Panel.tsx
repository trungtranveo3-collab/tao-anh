import React from 'react';

interface PanelProps {
    children: React.ReactNode;
    className?: string;
}

export const Panel: React.FC<PanelProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-emerald-950/60 backdrop-blur-sm border border-emerald-400/30 shadow-glow-green rounded-lg p-4 sm:p-6 ${className}`}>
            {children}
        </div>
    );
};