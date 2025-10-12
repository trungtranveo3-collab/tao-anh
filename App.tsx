
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

// Components
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { AccessorySelector } from './components/AccessorySelector';
import { GenerationControls } from './components/GenerationControls';
import { GeneratedImages } from './components/GeneratedImages';
import { ImageViewer } from './components/ImageViewer';


// Constants and Types
import { STYLES, IMAGE_TYPES, STYLE_ACCESSORY_DEFAULTS, BASE_ACCESSORY_DEFAULTS } from './constants';
import type { Style, ImageType, Accessory } from './types';

// Helper to convert File to a base64 string for the API
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

function App() {
  // API Key Management
  const [ai, setAi] = useState<GoogleGenAI | null>(null);

  // State management
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('style');
  const [selectedStyle, setSelectedStyle] = useState<Style>(STYLES[0]);
  
  // Custom prompts per tab
  const [stylePrompt, setStylePrompt] = useState('');
  const [celebrityPrompt, setCelebrityPrompt] = useState('');
  const [travelPrompt, setTravelPrompt] = useState('');
  const [panoramaPrompt, setPanoramaPrompt] = useState('');

  const [isAccessoryEnabled, setIsAccessoryEnabled] = useState(true);
  const [accessories, setAccessories] = useState<Record<string, Accessory>>({});

  const [selectedImageType, setSelectedImageType] = useState<ImageType>(IMAGE_TYPES[0]);
  const [numberOfImages, setNumberOfImages] = useState(1);

  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  
  // Initialize AI client on mount
  useEffect(() => {
    try {
      // FIX: Initialize GoogleGenAI with API_KEY from environment variables as per guidelines.
      // Assume process.env.API_KEY is available.
      const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      setAi(genAI);
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI:", e);
      setError("Có lỗi khi khởi tạo AI client. API Key có thể không hợp lệ.");
    }
  }, []);

  // Effect to update accessories when style changes
  useEffect(() => {
    const defaults: Partial<Record<string, Accessory>> = STYLE_ACCESSORY_DEFAULTS[selectedStyle.id] || BASE_ACCESSORY_DEFAULTS;
    const initialAccessories: Record<string, Accessory> = {};
    for (const [key, accessory] of Object.entries(defaults)) {
      // FIX: Cast accessory to 'Accessory' to resolve TypeScript error where it was being inferred as 'unknown'.
      const typedAccessory = accessory as Accessory;
      if (typedAccessory && typedAccessory.item) {
          initialAccessories[key] = { item: typedAccessory.item, color: typedAccessory.color || '' };
      }
    }
    setAccessories(initialAccessories);
    setIsAccessoryEnabled(true); // Re-enable customization when style changes
  }, [selectedStyle]);

  // Handle image upload and preview
  const handleImageUpload = useCallback((file: File | null) => {
    setSourceImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setGeneratedImages([]); // Clear generated images when source is removed
    }
  }, []);

  // Handle accessory changes
  const handleAccessoryChange = useCallback((category: string, field: 'item' | 'color', value: string) => {
    setAccessories(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] || { item: '', color: '' }),
        [field]: value,
      },
    }));
  }, []);
  
  // Determine if ready to generate
  const isReady = useMemo(() => !!sourceImage && !!ai, [sourceImage, ai]);

  // Construct the final prompt for the API
  const constructPrompt = useCallback((): string => {
    let coreContent = '';
    
    if (activeTab === 'style' && stylePrompt) {
        coreContent = `một bức ảnh theo phong cách ${stylePrompt}.`;
    } else if (activeTab === 'celebrity' && celebrityPrompt) {
        return `Ghép mặt của người trong ảnh gốc vào một bức ảnh của ${celebrityPrompt}. Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của người trong ảnh gốc.`;
    } else if (activeTab === 'travel' && travelPrompt) {
        coreContent = `người trong ảnh gốc đang du lịch tại ${travelPrompt}.`;
    } else if (activeTab === 'panorama' && panoramaPrompt) {
        coreContent = `người trong ảnh gốc trong bối cảnh toàn cảnh của ${panoramaPrompt}.`;
    } else {
        coreContent = selectedStyle.prompt;
    }

    if (isAccessoryEnabled) {
        const accessoryDescriptions = Object.values(accessories)
            .filter(acc => acc && acc.item)
            .map(acc => `${acc.color} ${acc.item}`.trim())
            .join(', ');

        if (accessoryDescriptions) {
            coreContent += ` Người trong ảnh mặc các phụ kiện sau: ${accessoryDescriptions}.`;
        }
    } else {
        coreContent += ' Người trong ảnh mặc trang phục phù hợp nhất do AI tự động lựa chọn để hợp với bối cảnh và phong cách của ảnh.';
    }

    if (selectedImageType.id === 'portrait') {
        coreContent += " Ảnh chụp là một bức chân dung cận cảnh.";
    } else if (selectedImageType.id === 'half_body') {
        coreContent += " Ảnh chụp nửa người, từ đầu đến eo.";
    } else {
        coreContent += " Ảnh chụp toàn thân, thấy rõ cả người.";
    }
    
    const enhancedPromptStyleIds = new Set(['businessman', 'natural', 'cinematic', 'magazine']);
    
    const shouldUseEnhancedPrompt = 
        (activeTab === 'travel') || 
        (activeTab === 'panorama') || 
        (activeTab === 'style' && (enhancedPromptStyleIds.has(selectedStyle.id) || !!stylePrompt));

    if (shouldUseEnhancedPrompt) {
        const styleNameForPrompt = stylePrompt || selectedStyle.name;
        const mood = styleNameForPrompt.includes('Doanh nhân') ? 'chuyên nghiệp, tự tin' : 
                     styleNameForPrompt.includes('Điện ảnh') ? 'kịch tính, có chiều sâu câu chuyện' : 
                     styleNameForPrompt.includes('Tạp chí') ? 'thanh lịch, thời trang cao cấp' : 
                     'hài hòa, nghệ thuật';

        return `Tạo một hình ảnh 4K chất lượng cao tuyệt đẹp dựa trên mô tả sau: "${coreContent}".
Chụp toàn cảnh, với ánh sáng cân bằng, màu sắc tự nhiên và độ sâu trường ảnh mạnh.
Phong cách: ${styleNameForPrompt}, tông màu: ${mood}.
Tập trung vào chủ nghĩa hiện thực và sự hài hòa nghệ thuật — kết cấu chi tiết, bố cục năng động và không khí điện ảnh.
Sử dụng hiệu ứng ánh sáng chuyên nghiệp để tăng cường tâm trạng và chiều sâu hình ảnh.
Tỷ lệ khung hình: 16:9, chất lượng siêu chi tiết, quang học, phân loại màu mượt mà, hoàn hảo cho kể chuyện bằng hình ảnh.
QUAN TRỌNG: Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của người trong ảnh gốc.`;
    }
    
    return `${coreContent} Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của người trong ảnh gốc.`;

}, [selectedStyle, selectedImageType, accessories, isAccessoryEnabled, activeTab, stylePrompt, celebrityPrompt, travelPrompt, panoramaPrompt]);

  const handleGenerate = useCallback(async () => {
    if (!ai) {
        setError('AI client chưa được khởi tạo. Vui lòng kiểm tra API Key.');
        return;
    }
    if (!sourceImage) {
      setError('Vui lòng tải lên một hình ảnh.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImages(Array(numberOfImages).fill('loading'));

    try {
      const prompt = constructPrompt();
      const imagePart = await fileToGenerativePart(sourceImage);
      
      const contents = {
        parts: [imagePart, { text: prompt }],
      };

      const generateImage = () => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents,
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });

      const generationPromises = Array(numberOfImages).fill(null).map(() => generateImage());
      const responses = await Promise.all(generationPromises);
      
      const newImages: string[] = [];
      responses.forEach(response => {
        const imagePartFound = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
        if (imagePartFound?.inlineData) {
          const base64ImageBytes = imagePartFound.inlineData.data;
          const mimeType = imagePartFound.inlineData.mimeType;
          newImages.push(`data:${mimeType};base64,${base64ImageBytes}`);
        }
      });

      if (newImages.length === 0) {
        setError("Không thể tạo ảnh. API không trả về hình ảnh. Vui lòng thử lại.");
        setGeneratedImages([]);
      } else {
        setGeneratedImages(newImages);
      }

    } catch (e: any) {
      console.error(e);
      const errorMessage = e?.message?.toLowerCase() || '';
      if (errorMessage.includes('permission denied') || errorMessage.includes('api key not valid')) {
        setError('Lỗi xác thực API Key. Vui lòng kiểm tra và nhập lại API Key của bạn.');
      } else {
        setError('Đã xảy ra lỗi trong quá trình tạo ảnh. Vui lòng kiểm tra console để biết thêm chi tiết.');
      }
      setGeneratedImages([]);
    } finally {
      setIsLoading(false);
    }
  }, [ai, sourceImage, constructPrompt, numberOfImages]);

  const handleTabChange = useCallback((tabId: string) => {
      setActiveTab(tabId);
      const firstStyleForTab = STYLES.find(s => s.category === tabId);
      if (firstStyleForTab) {
        setSelectedStyle(firstStyleForTab);
      }
      setStylePrompt('');
      setCelebrityPrompt('');
      setTravelPrompt('');
      setPanoramaPrompt('');
  }, []);

  const openViewer = useCallback((index: number) => setViewerIndex(index), []);
  const closeViewer = useCallback(() => setViewerIndex(null), []);
  const navigateViewer = useCallback((newIndex: number) => {
      const totalImages = generatedImages.filter(img => img !== 'loading').length;
      if (newIndex >= 0 && newIndex < totalImages) {
          setViewerIndex(newIndex);
      }
  }, [generatedImages]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300">
      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
            AI Photoshoot
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Tải ảnh của bạn lên và biến hóa với vô vàn phong cách độc đáo
          </p>
        </header>

        {error && (
            <div className="max-w-4xl mx-auto bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Lỗi! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 flex flex-col space-y-8">
                <ImageUploader onImageUpload={handleImageUpload} preview={preview} />
                <GeneratedImages 
                  images={generatedImages} 
                  isLoading={isLoading}
                  onImageClick={openViewer}
                />
            </div>

            <div className="lg:col-span-2 flex flex-col space-y-8">
                <StyleSelector 
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    selectedStyle={selectedStyle}
                    onStyleSelect={setSelectedStyle}
                    stylePrompt={stylePrompt}
                    onStylePromptChange={setStylePrompt}
                    celebrityPrompt={celebrityPrompt}
                    onCelebrityPromptChange={setCelebrityPrompt}
                    travelPrompt={travelPrompt}
                    onTravelPromptChange={setTravelPrompt}
                    panoramaPrompt={panoramaPrompt}
                    onPanoramaPromptChange={setPanoramaPrompt}
                />
                <AccessorySelector 
                    accessories={accessories}
                    onAccessoryChange={handleAccessoryChange}
                    isEnabled={isAccessoryEnabled}
                    onToggleEnabled={setIsAccessoryEnabled}
                />
                <GenerationControls 
                    selectedImageType={selectedImageType}
                    onImageTypeChange={setSelectedImageType}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    isReady={isReady}
                    numberOfImages={numberOfImages}
                    onNumberOfImagesChange={setNumberOfImages}
                />
            </div>
        </div>
      </main>

      {viewerIndex !== null && (
        <ImageViewer 
          images={generatedImages.filter(img => img !== 'loading')}
          currentIndex={viewerIndex}
          onClose={closeViewer}
          onNavigate={navigateViewer}
        />
      )}
    </div>
  );
}

export default App;
