
import React, { useState } from 'react';
import { Panel } from './Panel';

interface ApiKeyManagerProps {
    onApiKeySubmit: (key: string) => void;
    error?: string | null;
    isLoading?: boolean;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeySubmit, error, isLoading }) => {
    const [apiKeyInput, setApiKeyInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKeyInput.trim() && !isLoading) {
            onApiKeySubmit(apiKeyInput.trim());
        }
    };

    return (
        <div className="min-h-screen text-slate-300 flex items-center justify-center p-4">
            <main className="max-w-md w-full">
                 <style>
                    {`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
                </style>
                <Panel className="animate-fade-in">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <div className="text-center">
                            <h1 className="led-text-effect text-3xl sm:text-4xl font-black tracking-wider uppercase" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.4)' }}>
                                AI Photoshoot
                            </h1>
                            <h2 className="text-xl font-bold text-slate-100 mt-4">Kết nối tới Sức mạnh Sáng tạo của AI</h2>
                            <div className="mt-3 text-slate-400 text-sm space-y-2">
                                <p>
                                    AI Photoshoot được vận hành bởi công nghệ Gemini tiên tiến của Google. Để bắt đầu, bạn cần cung cấp API Key của riêng mình.
                                </p>
                                <p>
                                    <strong className="text-emerald-400">Điều này hoàn toàn an toàn</strong> - key của bạn chỉ được lưu tạm thời trên trình duyệt và không được gửi đi bất cứ đâu.
                                </p>
                            </div>
                        </div>

                        {error && (
                             <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm" role="alert">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="api-key-input" className="block text-sm font-medium text-slate-300 mb-2">
                                Gemini API Key
                            </label>
                            <input
                                id="api-key-input"
                                type="password"
                                value={apiKeyInput}
                                onChange={(e) => setApiKeyInput(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                placeholder="••••••••••••••••••••••••••"
                                required
                                aria-describedby="api-key-description"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="text-center text-sm text-slate-400" id="api-key-description">
                            Chưa có key?
                            <a 
                                href="https://aistudio.google.com/app/apikey" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:underline ml-1"
                            >
                                <strong className="font-semibold">Nhận miễn phí</strong> tại Google AI Studio
                            </a>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-glow-green disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-500 transition-all duration-300 flex items-center justify-center"
                        >
                            {isLoading && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {isLoading ? 'Đang kiểm tra...' : 'Lưu & Bắt đầu'}
                        </button>
                    </form>
                </Panel>
            </main>
        </div>
    );
};
