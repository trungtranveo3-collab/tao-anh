

import React, { useState, useEffect, useRef } from 'react';
import type { User } from 'firebase/auth';

interface UserProfile {
    uid: string;
    email: string;
    role: 'user' | 'admin';
    status: 'pending' | 'approved';
}

interface UserMenuProps {
    user: User;
    userProfile: UserProfile;
    onLogout: () => void;
    onChangeApiKey: () => void;
    onShowAdminPanel: () => void;
}

// Icons
const AdminIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-sky-400' }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);
const KeyIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-yellow-400' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
);
const LogoutIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-red-400' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);


export const UserMenu: React.FC<UserMenuProps> = ({ user, userProfile, onLogout, onChangeApiKey, onShowAdminPanel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuAction = (action: () => void) => {
        action();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 flex items-center justify-center"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="User menu"
                title={user.displayName || user.email || 'User Menu'}
            >
                 {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || 'User Avatar'}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <span className="text-xl font-bold text-slate-200">
                        {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                )}
            </button>

            {isOpen && (
                <div 
                    className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl z-20 origin-top-right animate-fade-in-down"
                    role="menu"
                    aria-orientation="vertical"
                >
                    <style>
                        {`@keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } } .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }`}
                    </style>
                    <div className="p-4 border-b border-slate-700">
                        <p className="font-semibold text-white truncate">{user.displayName || user.email}</p>
                        <p className="text-sm text-slate-400">{userProfile.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}</p>
                    </div>
                    <div className="py-2" role="none">
                        {userProfile.role === 'admin' && (
                            <button
                                onClick={() => handleMenuAction(onShowAdminPanel)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-3"
                                role="menuitem"
                            >
                                <AdminIcon />
                                <span>Bảng Quản trị</span>
                            </button>
                        )}
                        <button
                            onClick={() => handleMenuAction(onChangeApiKey)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-3"
                            role="menuitem"
                        >
                            <KeyIcon />
                            <span>Đổi API Key</span>
                        </button>
                        <div className="border-t border-slate-700 my-1 mx-2"></div>
                         <button
                            onClick={() => handleMenuAction(onLogout)}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-colors flex items-center gap-3"
                            role="menuitem"
                        >
                            <LogoutIcon />
                            <span>Đăng xuất</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
