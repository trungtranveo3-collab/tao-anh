
import React, { useState } from 'react';
import { Panel } from './Panel';

interface ApiKeyManagerProps {
    onApiKeySubmit: (key: string) => void;
    error?: string | null;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeySubmit, error }) => {
    const [apiKeyInput, setApiKeyInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKeyInput.trim()) {
            onApiKeySubmit(apiKeyInput.trim());
        }
    };

    return (
        <div className="bg-slate-950 min-h-screen text-slate-300 flex items-center justify-center p-4">
            <Panel className="max-w-md w-full animate-fade-in">
                 <style>
                    {`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
                </style>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                           AI Photoshoot
                        </h1>
                        <h2 className="text-xl font-bold text-slate-100 mt-4">Yêu cầu API Key</h2>
                        <p className="mt-2 text-slate-400">
                            Để sử dụng ứng dụng này, bạn cần cung cấp Gemini API Key của riêng mình.
                        </p>
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
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                            placeholder="••••••••••••••••••••••••••"
                            required
                        />
                    </div>
                    <div className="text-center text-xs text-slate-500">
                        API Key sẽ được lưu trong session của trình duyệt.
                        <a 
                            href="https://aistudio.google.com/app/apikey" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline ml-1"
                        >
                            Lấy API Key ở đây
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-lg shadow-lg hover:bg-cyan-400 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
                    >
                        Lưu & Tiếp tục
                    </button>
                </form>
            </Panel>
        </div>
    );
};
