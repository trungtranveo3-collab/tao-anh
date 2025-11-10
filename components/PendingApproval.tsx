import React from 'react';
import { Panel } from './Panel';

interface PendingApprovalProps {
    email: string | null;
    onLogout: () => void;
}

export const PendingApproval: React.FC<PendingApprovalProps> = ({ email, onLogout }) => {
    return (
        <div className="min-h-screen text-slate-300 flex items-center justify-center p-4">
            <main className="max-w-md w-full text-center">
                 <style>
                    {`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
                </style>
                <Panel className="animate-fade-in">
                    <div className="flex flex-col space-y-6">
                         <h1 className="led-text-effect text-3xl sm:text-4xl font-black tracking-wider uppercase" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.4)' }}>
                            Xác thực thành công!
                        </h1>
                        <p className="text-slate-400">
                            Bạn đã đăng nhập thành công với tài khoản <strong className="text-emerald-400">{email}</strong>. Bước tiếp theo là chờ quản trị viên phê duyệt để kích hoạt tài khoản.
                        </p>
                        <p className="text-slate-400">
                           Quá trình này có thể mất một chút thời gian. Vui lòng thử đăng nhập lại sau. Cảm ơn sự kiên nhẫn của bạn!
                        </p>
                        <button 
                            onClick={onLogout} 
                            className="w-full px-4 py-2 text-sm font-semibold bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </Panel>
            </main>
        </div>
    );
};