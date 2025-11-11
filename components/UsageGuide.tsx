import React, { useState } from 'react';
import { Panel } from './Panel';

interface UsageGuideProps {
    onDismiss: () => void;
}

const CheckIcon: React.FC<{className?: string}> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const content = {
    vi: {
        title: "Chào mừng bạn đến với AI Photoshoot!",
        subtitle: "Trợ lý sáng tạo đa năng của bạn. Bắt đầu chỉ với 3 bước đơn giản:",
        steps: [
            { title: "Bước 1: Tải lên", description: "Tải lên một hoặc nhiều ảnh gốc của bạn. Ảnh càng rõ nét, kết quả càng ấn tượng." },
            { title: "Bước 2: Chọn Tác vụ", description: "Khám phá các tab 'Phong Cách', 'Ảnh Cưới', 'Sản Phẩm'... Mỗi tab là một năng lực khác nhau của AI." },
            { title: "Bước 3: Tùy chỉnh & Sáng tạo", description: "Chọn phong cách chi tiết, thêm phụ kiện, điều chỉnh kích thước và nhấn nút 'Bắt Đầu Phép Màu'!" }
        ],
        button: "Đã hiểu, bắt đầu thôi!",
    },
    en: {
        title: "Welcome to AI Photoshoot!",
        subtitle: "Your versatile creative assistant. Get started in just 3 simple steps:",
        steps: [
            { title: "Step 1: Upload", description: "Upload one or more source photos. Clearer images yield more impressive results." },
            { title: "Step 2: Choose a Task", description: "Explore the 'Style', 'Wedding', 'Product' tabs... Each tab represents a different AI capability." },
            { title: "Step 3: Customize & Create", description: "Select a detailed style, add accessories, adjust dimensions, and hit the 'Start the Magic' button!" }
        ],
        button: "Got it, let's start!",
    }
};

export const UsageGuide: React.FC<UsageGuideProps> = ({ onDismiss }) => {
    const [language, setLanguage] = useState<'vi' | 'en'>('vi');
    const currentContent = content[language];

    return (
        <div className="mb-8">
            <Panel>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-white">{currentContent.title}</h2>
                        <p className="text-slate-300 mt-1">{currentContent.subtitle}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2 p-1 bg-slate-900 rounded-lg">
                         <button 
                            onClick={() => setLanguage('vi')}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${language === 'vi' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                        >
                            Tiếng Việt
                        </button>
                        <button 
                            onClick={() => setLanguage('en')}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${language === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                        >
                            English
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentContent.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <CheckIcon />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-100">{step.title}</h3>
                                <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={onDismiss}
                        className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
                    >
                        {currentContent.button}
                    </button>
                </div>
            </Panel>
        </div>
    );
};
