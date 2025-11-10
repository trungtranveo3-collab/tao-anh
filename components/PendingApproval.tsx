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
                            Yêu cầu đã được gửi!
                        </h1>
                        <p className="text-slate-400">
                            Cảm ơn bạn đã đăng ký! Chúng tôi đang xem xét tài khoản <strong className="text-emerald-400">{email}</strong> của bạn để đảm bảo chất lượng cộng đồng.
                        </p>
                        <p className="text-slate-400">
                           Quá trình này thường mất khoảng vài giờ. <strong>Chúng tôi sẽ gửi email cho bạn ngay khi tài khoản được kích hoạt.</strong>
                        </p>

                        <div className="border-t border-emerald-400/20 pt-6 space-y-4">
                            <p className="text-sm text-slate-500">
                                Trong lúc chờ đợi, bạn có thể xem qua các tác phẩm khác của cộng đồng (sắp ra mắt).
                            </p>
                            <button 
                                onClick={onLogout} 
                                className="w-full px-4 py-2 text-sm font-semibold bg-slate-700/80 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </Panel>
            </main>
        </div>
    );
};