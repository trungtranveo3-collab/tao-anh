import React from 'react';
import { Panel } from './Panel';

interface VeoApiKeyInfoModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export const VeoApiKeyInfoModal: React.FC<VeoApiKeyInfoModalProps> = ({ onClose, onConfirm }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="veo-modal-title"
        >
            <style>
                {`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
            </style>
            <div 
                className="w-full max-w-lg" 
                onClick={(e) => e.stopPropagation()}
            >
                <Panel>
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 id="veo-modal-title" className="text-xl font-bold text-white">Yêu cầu API Key cho Video Veo</h2>
                            <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                        </div>
                        
                        <p className="text-slate-300">
                            Tính năng tạo video sử dụng công nghệ <strong>Google Veo</strong>, một mô hình AI cao cấp.
                            Để tiếp tục, bạn cần chọn một API Key được liên kết với dự án Google Cloud <strong>đã bật tính năng thanh toán</strong>.
                        </p>

                        <p className="text-sm text-slate-400">
                            Key bạn đang sử dụng để tạo ảnh có thể không tương thích. Vui lòng đảm bảo bạn chọn đúng key có quyền truy cập Veo.
                        </p>
                        
                        <a 
                            href="https://ai.google.dev/gemini-api/docs/billing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline text-sm"
                        >
                            Tìm hiểu thêm về cách bật thanh toán
                        </a>

                        <div className="flex justify-end items-center gap-4 pt-4 border-t border-emerald-400/20">
                            <button 
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-semibold bg-slate-700/80 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md"
                            >
                                Hủy bỏ
                            </button>
                            <button 
                                onClick={onConfirm}
                                className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
                            >
                                Tiếp tục & Chọn Key
                            </button>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    );
};