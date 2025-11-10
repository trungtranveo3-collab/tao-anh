
import React, { useState } from 'react';
import { Panel } from './Panel';

// SVG Icon for the security message
const ShieldIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a1 1 0 100 2 1 1 0 000-2z" />
        <path fillRule="evenodd" d="M.464 9.043a1 1 0 011.072-.523l1.341.268A.75.75 0 003.75 8V6.116a3.5 3.5 0 012.01-3.2l1.072-.536a1 1 0 01.936 0l1.072.536a3.5 3.5 0 012.01 3.2V8a.75.75 0 00.873.788l1.341-.268a1 1 0 011.072.523l.808 1.616a1 1 0 01-.22 1.17l-1.036 1.036a.75.75 0 000 1.06l1.036 1.036a1 1 0 01.22 1.17l-.808 1.616a1 1 0 01-1.072.523l-1.341-.268A.75.75 0 0016.25 16v1.884a3.5 3.5 0 01-2.01 3.2l-1.072.536a1 1 0 01-.936 0l-1.072-.536a3.5 3.5 0 01-2.01-3.2V16a.75.75 0 00-.873-.788l-1.341.268a1 1 0 01-1.072-.523l-.808-1.616a1 1 0 01.22-1.17l1.036-1.036a.75.75 0 000-1.06L.244 11.83a1 1 0 01-.22-1.17l.808-1.616zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);


interface ApiKeyManagerProps {
    onApiKeySubmit: (key: string, remember: boolean) => void;
    error?: string | null;
    isLoading?: boolean;
    canClose?: boolean;
    onClose?: () => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeySubmit, error, isLoading, canClose = false, onClose }) => {
    const [apiKeyInput, setApiKeyInput] = useState('');
    const [rememberKey, setRememberKey] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKeyInput.trim() && !isLoading) {
            onApiKeySubmit(apiKeyInput.trim(), rememberKey);
        }
    };

    return (
        <div className="min-h-screen text-slate-300 flex items-center justify-center p-4">
            <main className="max-w-md w-full">
                 <style>
                    {`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
                </style>
                <Panel className="animate-fade-in relative">
                    {canClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"
                            aria-label="Đóng"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <div className="text-center">
                            <h1 className="led-text-effect text-3xl sm:text-4xl font-black tracking-wider uppercase" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.4)' }}>
                                AI Photoshoot
                            </h1>
                            <h2 className="text-xl font-bold text-slate-100 mt-4">Kết nối tới Sức mạnh Sáng tạo của AI</h2>
                            <p className="mt-3 text-slate-400 text-sm">
                                Để bắt đầu, bạn cần cung cấp API Key từ Google Gemini.
                            </p>
                        </div>

                        {error && (
                             <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm" role="alert">
                                {error}
                            </div>
                        )}
                        
                        {/* Step 1 */}
                        <div className="space-y-2">
                             <label className="block text-base font-bold text-slate-100">
                                Bước 1: Lấy API Key của bạn
                            </label>
                            <a 
                                href="https://aistudio.google.com/app/apikey" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full block px-6 py-3 bg-sky-600/80 hover:bg-sky-600 text-white font-bold rounded-lg shadow-md transition-colors text-center"
                            >
                                Nhận Key miễn phí tại Google AI Studio
                            </a>
                        </div>
                        
                        <div className="relative flex items-center text-center">
                            <div className="flex-grow border-t border-slate-700"></div>
                            <span className="flex-shrink mx-4 text-slate-500 text-sm">và</span>
                            <div className="flex-grow border-t border-slate-700"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-4">
                             <label htmlFor="api-key-input" className="block text-base font-bold text-slate-100">
                                Bước 2: Dán vào đây và bắt đầu
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

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember-key"
                                checked={rememberKey}
                                onChange={(e) => setRememberKey(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                                disabled={isLoading}
                            />
                            <label htmlFor="remember-key" className="text-sm text-slate-400 cursor-pointer">
                                Ghi nhớ Key cho lần sau (Tiện lợi hơn)
                            </label>
                        </div>
                        <p className="text-xs text-slate-500 -mt-4 px-1">
                            Không khuyến nghị cho thiết bị công cộng.
                        </p>
                        
                        <div className="flex items-center justify-center space-x-2 text-emerald-400/80 text-sm text-center">
                            <ShieldIcon className="w-5 h-5 flex-shrink-0"/>
                            <span>Bảo mật tuyệt đối: Key của bạn không bao giờ rời khỏi trình duyệt.</span>
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
