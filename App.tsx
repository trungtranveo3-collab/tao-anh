
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';


// Components
import { ImageUploader } from './components/ImageUploader';
import { MultiImageUploader } from './components/MultiImageUploader';
import { CoupleImageUploader } from './components/CoupleImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { AccessorySelector } from './components/AccessorySelector';
import { GenerationControls } from './components/GenerationControls';
import { GeneratedImages } from './components/GeneratedImages';
import { ImageViewer } from './components/ImageViewer';
import { Panel } from './components/Panel';
import { ApiKeyManager } from './components/ApiKeyManager';
import { AuthManager } from './components/AuthManager';
import { AdminPanel } from './components/AdminPanel';
import { PendingApproval } from './components/PendingApproval';


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

interface UserProfile {
    uid: string;
    email: string;
    role: 'user' | 'admin';
    status: 'pending' | 'approved';
}

const SESSION_STORAGE_KEY = 'gemini-api-key-session';
const LOCAL_STORAGE_KEY = 'gemini-api-key-local';

function App() {
  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);


  // API Key Management
  const [ai, setAi] = useState<GoogleGenAI | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [isVerifyingKey, setIsVerifyingKey] = useState(false);


  // State management
  const [mode, setMode] = useState<'single' | 'group'>('single');
  const [sourceImages, setSourceImages] = useState<File[]>([]);
  const [coupleSourceImages, setCoupleSourceImages] = useState<(File|null)[]>([null, null]);
  const [productSourceImage, setProductSourceImage] = useState<File | null>(null);


  const [previews, setPreviews] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('style');
  const [selectedStyle, setSelectedStyle] = useState<Style>(STYLES[0]);
  
  // Custom prompts per tab
  const [stylePrompt, setStylePrompt] = useState('');
  const [productPrompt, setProductPrompt] = useState('');
  const [celebrityPrompt, setCelebrityPrompt] = useState('');
  const [travelPrompt, setTravelPrompt] = useState('');
  const [panoramaPrompt, setPanoramaPrompt] = useState('');

  const [isAccessoryEnabled, setIsAccessoryEnabled] = useState(false);
  const [accessories, setAccessories] = useState<Record<string, Accessory>>({});

  const [selectedImageType, setSelectedImageType] = useState<ImageType>(IMAGE_TYPES[0]);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('square');
  const [customWidth, setCustomWidth] = useState<number | ''>(1024);
  const [customHeight, setCustomHeight] = useState<number | ''>(1024);


  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  // Firebase Auth listener with Firestore integration
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser && currentUser.emailVerified) {
            setUser(currentUser);
            // Fetch user profile from Firestore
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const profile = userDocSnap.data() as UserProfile;
                if (profile.status === 'approved') {
                    setUserProfile(profile);
                    setIsPendingApproval(false);
                } else {
                    // User is logged in but not approved
                    setUserProfile(null);
                    setIsPendingApproval(true);
                }
            } else {
                // User exists in Auth but not in Firestore (edge case)
                console.error("User data not found in Firestore.");
                setUserProfile(null);
                setIsPendingApproval(true); // Treat as pending
            }
        } else {
            // User is not logged in or email not verified
            setUser(null);
            setUserProfile(null);
            setIsPendingApproval(false);
        }
        setIsAuthLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  const initializeAiClient = useCallback((apiKey: string) => {
    try {
      if (typeof GoogleGenAI === 'undefined') {
        setApiKeyError("Lỗi tải thư viện AI. Vui lòng kiểm tra lại kết nối mạng.");
        return;
      }
      const genAI = new GoogleGenAI({ apiKey });
      setAi(genAI);
      setApiKeyError(null);
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI:", e);
      setApiKeyError("Khởi tạo AI client thất bại. API Key có thể không hợp lệ.");
      setAi(null);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  // New function for handling fresh key submission with verification
  const handleApiKeySubmit = useCallback(async (apiKey: string, remember: boolean) => {
      setIsVerifyingKey(true);
      setApiKeyError(null);

      if (typeof GoogleGenAI === 'undefined') {
          setApiKeyError("Lỗi tải thư viện AI. Vui lòng kiểm tra lại kết nối mạng và thử lại.");
          setIsVerifyingKey(false);
          return;
      }

      try {
          const genAI = new GoogleGenAI({ apiKey });
          
          // Perform a lightweight test call to validate the key
          await genAI.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: 'test',
          });

          // If the test call succeeds, finalize setup
          setAi(genAI);
          setApiKeyError(null);

          // Save key based on user's choice
          if (remember) {
              localStorage.setItem(LOCAL_STORAGE_KEY, apiKey);
              sessionStorage.removeItem(SESSION_STORAGE_KEY);
          } else {
              sessionStorage.setItem(SESSION_STORAGE_KEY, apiKey);
              localStorage.removeItem(LOCAL_STORAGE_KEY);
          }

      } catch (e: any) {
          console.error("API Key verification failed:", e);
          const errorMessage = e?.message?.toLowerCase() || '';
          if (errorMessage.includes('api key not valid')) {
              setApiKeyError("API Key không hợp lệ. Vui lòng kiểm tra lại hoặc tạo key mới.");
          } else if (errorMessage.includes('permission denied')) {
              setApiKeyError("API Key này không có quyền truy cập. Vui lòng kiểm tra các giới hạn (ví dụ: giới hạn tên miền).");
          } else if (errorMessage.includes('fetch')) {
              setApiKeyError("Lỗi mạng. Không thể kết nối đến máy chủ AI. Vui lòng kiểm tra kết nối internet của bạn.");
          } else {
              setApiKeyError("Không thể xác thực API Key. Vui lòng thử lại.");
          }
          setAi(null);
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
      } finally {
          setIsVerifyingKey(false);
      }
  }, []);
  
  const handleLogout = async () => {
    try {
        await signOut(auth);
        // The onAuthStateChanged listener will automatically set all user states to null
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setAi(null);
        setApiKeyError(null);
        setShowAdminPanel(false); // Close admin panel on logout
    } catch (error) {
        console.error("Error signing out: ", error);
        setError("Đăng xuất không thành công. Vui lòng thử lại.");
    }
  };

  const handleChangeApiKey = () => {
    setAi(null);
    // Don't remove keys here, so the user can cancel and go back
    setApiKeyError(null); // Clear any previous errors
  };
  
  const handleCancelChangeApiKey = useCallback(() => {
    const storedApiKey = localStorage.getItem(LOCAL_STORAGE_KEY) || sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedApiKey) {
        initializeAiClient(storedApiKey);
    }
  }, [initializeAiClient]);


  // Try to initialize AI client from storage on mount
  useEffect(() => {
    if (userProfile) { // Only initialize if user is approved
        const storedApiKey = localStorage.getItem(LOCAL_STORAGE_KEY) || sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (storedApiKey) {
          initializeAiClient(storedApiKey);
        }
    }
  }, [userProfile, initializeAiClient]);


  // Effect to update accessories when style changes
  useEffect(() => {
    // FIX: Explicitly type `defaults` to resolve ambiguity from the union type.
    const defaults: Partial<Record<string, Accessory>> = STYLE_ACCESSORY_DEFAULTS[selectedStyle.id] || BASE_ACCESSORY_DEFAULTS;
    const initialAccessories: Record<string, Accessory> = {};
    // FIX: Using Object.keys and direct property access for improved type safety,
    // resolving an issue where Object.entries inferred an 'unknown' type for values.
    for (const key of Object.keys(defaults)) {
      // FIX: Cast `accessory` to `Accessory | undefined` to resolve a type inference issue.
      const accessory = defaults[key] as Accessory | undefined;
      if (accessory && accessory.item) {
          initialAccessories[key] = { item: accessory.item, color: accessory.color || '' };
      }
    }
    setAccessories(initialAccessories);
  }, [selectedStyle]);
  
  // Effect to generate previews when source images change
  useEffect(() => {
    const filesToPreview = (
        activeTab === 'wedding' ? coupleSourceImages.filter(Boolean) :
        activeTab === 'product' ? (productSourceImage ? [productSourceImage] : []) :
        sourceImages
    ) as File[];


    if (filesToPreview.length > 0) {
        const filePromises = filesToPreview.map(file => {
            return new Promise<string>(resolve => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result as string);
                };
                reader.readAsDataURL(file);
            });
        });
        Promise.all(filePromises).then(setPreviews);
    } else {
        setPreviews([]);
        if (activeTab !== 'wedding') { // Don't clear generated images when just one of the couple's photos is removed
            setGeneratedImages([]);
        }
    }
  }, [sourceImages, coupleSourceImages, productSourceImage, activeTab]);


  // Handle image upload and preview for single/group modes
    const handleImagesChange = useCallback((files: File[]) => {
        setSourceImages(files);
        if (files.length === 0) {
           setGeneratedImages([]); // Clear generated images when source is removed
        }
  }, []);

    const handleCoupleImageChange = useCallback((file: File | null, index: 0 | 1) => {
        setCoupleSourceImages(prev => {
            const newCoupleImages = [...prev];
            newCoupleImages[index] = file;
            return newCoupleImages;
        });
    }, []);
    
    const handleProductImageChange = useCallback((file: File | null) => {
        setProductSourceImage(file);
        if (!file) {
            setGeneratedImages([]);
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
  
  const currentSourceImages = useMemo(() => {
    if (activeTab === 'wedding') return coupleSourceImages.filter(Boolean) as File[];
    if (activeTab === 'product') return productSourceImage ? [productSourceImage] : [];
    return sourceImages;
  }, [activeTab, coupleSourceImages, sourceImages, productSourceImage]);
  
  // Determine if ready to generate
  const isReady = useMemo(() => {
    const weddingReady = activeTab === 'wedding' && coupleSourceImages.every(img => img !== null);
    const productReady = activeTab === 'product' && productSourceImage !== null && (productPrompt || selectedStyle.category === 'product');
    const otherReady = activeTab !== 'wedding' && activeTab !== 'product' && sourceImages.length > 0;
    return (weddingReady || productReady || otherReady) && !!ai;
  }, [sourceImages, coupleSourceImages, productSourceImage, activeTab, ai, productPrompt, selectedStyle]);

  const disabledTooltip = useMemo(() => {
      if (isReady) return '';
      if (!ai) return 'Vui lòng cung cấp API Key hợp lệ và nhấn "Lưu & Bắt đầu".';
      if (activeTab === 'wedding' && !coupleSourceImages.every(img => img !== null)) {
          return 'Vui lòng tải lên đủ hai ảnh cho cặp đôi.';
      }
      if (activeTab === 'product' && !productSourceImage) {
          return 'Vui lòng tải lên ảnh sản phẩm.';
      }
      if (activeTab === 'product' && !productPrompt && selectedStyle.category !== 'product') {
          return 'Vui lòng nhập mô tả hoặc chọn một bối cảnh cho sản phẩm.';
      }
      if (activeTab !== 'wedding' && activeTab !== 'product' && sourceImages.length === 0) {
          return 'Vui lòng tải lên ít nhất một ảnh gốc.';
      }
      return 'Vui lòng hoàn thành các bước trên để bắt đầu.'; // A generic fallback
  }, [isReady, ai, activeTab, coupleSourceImages, productSourceImage, sourceImages, productPrompt, selectedStyle]);

  // Construct the final prompt for the API
  const constructPrompt = useCallback((): string => {
    let coreContent = '';
    
    if (activeTab === 'product') {
        const productContext = productPrompt || selectedStyle.prompt;
        coreContent = `Tạo một hình ảnh quảng cáo 4K chuyên nghiệp, chất lượng cao cho sản phẩm trong ảnh đã tải lên. Đặt sản phẩm vào bối cảnh sau một cách chân thực: ${productContext}. QUAN TRỌNG: Giữ nguyên hình dạng, nhãn hiệu và chi tiết của sản phẩm gốc. Ánh sáng trong ảnh phải chuyên nghiệp, tự nhiên và phù hợp với bối cảnh để tôn lên vẻ đẹp của sản phẩm.`;
    } else if (activeTab === 'wedding') {
        const baseWeddingPrompt = `Tạo một bức ảnh cưới 4K chất lượng cao, tuyệt đẹp và duy nhất có sự góp mặt của hai người từ hai bức ảnh đã tải lên. Người 1 là từ ảnh đầu tiên và người 2 là từ ảnh thứ hai. Đặt cặp đôi vào một bối cảnh liền mạch ${selectedStyle.prompt}. Họ đang mặc trang phục cưới sang trọng và phù hợp với phong cách đã chọn (chú rể mặc suit/tuxedo, cô dâu mặc váy cưới). QUAN TRỌNG NHẤT: Giữ nguyên các đặc điểm khuôn mặt và ngoại hình đặc trưng của mỗi người từ ảnh gốc tương ứng của họ.`;
        coreContent = baseWeddingPrompt;
    } else if (activeTab === 'style' && stylePrompt) {
        coreContent = `một bức ảnh theo phong cách ${stylePrompt}.`;
    } else if (activeTab === 'celebrity' && celebrityPrompt) {
        let basePrompt = `Ghép mặt của người trong ảnh gốc vào một bức ảnh của ${celebrityPrompt}.`;
        if (mode === 'group') {
             basePrompt = `Tạo một hình ảnh duy nhất có tất cả những người từ các bức ảnh đã tải lên. ${basePrompt.replace('của người trong ảnh gốc', 'của mỗi người vào ảnh')} Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của mỗi người.`;
        } else {
            basePrompt += ' Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của người trong ảnh gốc.'
        }
        coreContent = basePrompt;
    } else if (activeTab === 'travel' && travelPrompt) {
        coreContent = `người trong ảnh gốc đang du lịch tại ${travelPrompt}.`;
    } else if (activeTab === 'panorama' && panoramaPrompt) {
        coreContent = `người trong ảnh gốc trong bối cảnh toàn cảnh của ${panoramaPrompt}.`;
    } else {
        coreContent = selectedStyle.prompt;
    }

    if (activeTab !== 'product' && mode === 'single' && isAccessoryEnabled) {
        const accessoryDescriptions = Object.values(accessories)
            // FIX: Cast `acc` to `Accessory` to fix type inference issue where `acc` was `unknown`.
            .filter(acc => acc && (acc as Accessory).item)
            // FIX: Cast `acc` to `Accessory` to fix type inference issue where `acc` was `unknown`.
            .map(acc => `${(acc as Accessory).color} ${(acc as Accessory).item}`.trim())
            .join(', ');

        if (accessoryDescriptions) {
            coreContent += ` Người trong ảnh mặc các phụ kiện sau: ${accessoryDescriptions}.`;
        }
    } else if (activeTab !== 'wedding' && activeTab !== 'product' && !(activeTab === 'celebrity' && celebrityPrompt)) {
        coreContent += ' Người trong ảnh mặc trang phục được AI thiết kế riêng để cực kỳ phù hợp và thời trang với bối cảnh. Hãy cân nhắc kỹ lưỡng về phong cách, địa điểm và không khí của bức ảnh để tạo ra một bộ đồ thật ấn tượng.';
    }

    if (activeTab !== 'product' && selectedImageType.id === 'portrait') {
        coreContent += " Ảnh chụp là một bức chân dung cận cảnh.";
    } else if (activeTab !== 'product' && selectedImageType.id === 'half_body') {
        coreContent += " Ảnh chụp nửa người, từ đầu đến eo.";
    } else if (activeTab !== 'product') {
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

        let enhancedPrompt = `Tạo một hình ảnh 4K chất lượng cao tuyệt đẹp dựa trên mô tả sau: "${coreContent}".
Chụp toàn cảnh, với ánh sáng cân bằng, màu sắc tự nhiên và độ sâu trường ảnh mạnh.
Phong cách: ${styleNameForPrompt}, tông màu: ${mood}.
Tập trung vào chủ nghĩa hiện thực và sự hài hòa nghệ thuật — kết cấu chi tiết, bố cục năng động và không khí điện ảnh.
Sử dụng hiệu ứng ánh sáng chuyên nghiệp để tăng cường tâm trạng và chiều sâu hình ảnh.
Tỷ lệ khung hình: 16:9, chất lượng siêu chi tiết, quang học, phân loại màu mượt mà, hoàn hảo cho kể chuyện bằng hình ảnh.
QUAN TRỌNG: Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của người trong ảnh gốc.`;

        if (mode === 'group') {
             coreContent = `Tạo một hình ảnh 4K chất lượng cao, tuyệt đẹp và duy nhất, có tất cả những người từ các bức ảnh đã tải lên trong một bối cảnh liền mạch. ${enhancedPrompt.replace(/người trong ảnh gốc/g, 'mỗi người từ ảnh gốc tương ứng')}`;
        } else {
            coreContent = enhancedPrompt;
        }
    } else if (mode === 'group') {
        coreContent = `Tạo một hình ảnh duy nhất có tất cả những người từ các bức ảnh đã tải lên trong một bối cảnh liền mạch. ${coreContent.replace(/người trong ảnh gốc/g, 'những người đó')}. QUAN TRỌNG: Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của mỗi người từ ảnh gốc tương ứng.`;
    } else if(activeTab !== 'wedding' && activeTab !== 'product' && !(activeTab === 'celebrity' && celebrityPrompt)) {
        coreContent = `${coreContent} Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của người trong ảnh gốc.`;
    }

    // Add aspect ratio and custom size instructions to the prompt
    if (selectedAspectRatio === 'custom' && customWidth && customHeight) {
        coreContent += ` Kích thước ảnh phải là ${customWidth} x ${customHeight} pixels.`;
    } else if (selectedAspectRatio === 'portrait') {
        coreContent += " Ảnh phải có tỷ lệ khung hình dọc.";
    } else if (selectedAspectRatio === 'landscape') {
        coreContent += " Ảnh phải có tỷ lệ khung hình ngang.";
    } else { // default to square
        coreContent += " Ảnh phải có tỷ lệ khung hình vuông.";
    }

    return coreContent;

}, [selectedStyle, selectedImageType, accessories, isAccessoryEnabled, activeTab, stylePrompt, celebrityPrompt, travelPrompt, panoramaPrompt, productPrompt, mode, selectedAspectRatio, customWidth, customHeight]);

  const handleGenerate = useCallback(async () => {
    if (!ai) {
        setError('AI client chưa được khởi tạo. Vui lòng kiểm tra API Key.');
        return;
    }
    if (currentSourceImages.length === 0) {
      setError('Vui lòng tải lên ít nhất một hình ảnh.');
      return;
    }
     if (activeTab === 'wedding' && currentSourceImages.length < 2) {
      setError('Vui lòng tải lên đủ hai ảnh cho cặp đôi.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImages(Array(numberOfImages).fill('loading'));

    try {
      const prompt = constructPrompt();
      const imageParts = await Promise.all(currentSourceImages.map(file => fileToGenerativePart(file)));
      
      const contents = {
        parts: [...imageParts, { text: prompt }],
      };

      const generateImage = () => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents,
        config: {
            // FIX: The `responseModalities` array must only contain a single `Modality.IMAGE` element. `Modality.TEXT` is not a valid or necessary value here.
            responseModalities: [Modality.IMAGE],
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
        setApiKeyError('API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra và nhập lại.');
        setAi(null);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } else {
        setError('Đã xảy ra lỗi trong quá trình tạo ảnh. Vui lòng kiểm tra console để biết thêm chi tiết.');
      }
      setGeneratedImages([]);
    } finally {
      setIsLoading(false);
    }
  }, [ai, currentSourceImages, constructPrompt, numberOfImages, activeTab, setApiKeyError]);

  const handleTabChange = useCallback((tabId: string) => {
      setActiveTab(tabId);
      const firstStyleForTab = STYLES.find(s => s.category === tabId);
      if (firstStyleForTab) {
        setSelectedStyle(firstStyleForTab);
      }
      // Reset states on tab change for a clean slate
      setStylePrompt('');
      setProductPrompt('');
      setCelebrityPrompt('');
      setTravelPrompt('');
      setPanoramaPrompt('');
      setSourceImages([]);
      setCoupleSourceImages([null, null]);
      setProductSourceImage(null);
      setGeneratedImages([]);
  }, []);

  const openViewer = useCallback((index: number) => setViewerIndex(index), []);
  const closeViewer = useCallback(() => setViewerIndex(null), []);
  const navigateViewer = useCallback((newIndex: number) => {
      const totalImages = generatedImages.filter(img => img !== 'loading').length;
      if (newIndex >= 0 && newIndex < totalImages) {
          setViewerIndex(newIndex);
      }
  }, [generatedImages]);
  
  const couplePreviews = useMemo(() => {
    return [
        coupleSourceImages[0] ? previews.find(p => p.startsWith('data:image')) : undefined,
        coupleSourceImages[1] ? previews[previews.length -1] : undefined
    ].map((_, i) => {
        const file = coupleSourceImages[i];
        if (!file) return undefined;
        // This is a bit of a hack to find the right preview. A better approach would be to store previews with an ID.
        // For now, let's just find the preview that corresponds to the file.
        // This effect depends on the main preview generation effect.
        return previews[i];
    });

  }, [coupleSourceImages, previews]);

  if (isAuthLoading) {
    return (
        <div className="min-h-screen bg-[#05140D] flex items-center justify-center text-white text-xl">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang tải...
        </div>
    );
  }
  
  if (!user) {
    return <AuthManager />;
  }
  
  if (isPendingApproval) {
    return <PendingApproval email={user.email} onLogout={handleLogout} />;
  }

  if (!userProfile) {
      // This state should ideally not be reached if logic is correct, but it's a safe fallback.
      return <AuthManager />;
  }

  if (!ai) {
    // We determine if the user can close this screen. They can close if they are *changing* a key,
    // which means a key must already exist in storage.
    const canClose = !!(localStorage.getItem(LOCAL_STORAGE_KEY) || sessionStorage.getItem(SESSION_STORAGE_KEY));
    return <ApiKeyManager 
              onApiKeySubmit={handleApiKeySubmit} 
              error={apiKeyError} 
              isLoading={isVerifyingKey} 
              canClose={canClose}
              onClose={handleCancelChangeApiKey}
            />;
  }

  return (
    <div className="min-h-screen text-slate-300">
      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 relative">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 flex items-center space-x-2 sm:space-x-4 z-20">
            <span className="text-sm text-slate-300 hidden sm:block bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full">{user.email}</span>
            {userProfile.role === 'admin' && (
                <button
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="px-4 py-2 text-sm font-semibold bg-sky-600/80 hover:bg-sky-600 backdrop-blur-sm text-white rounded-lg transition-colors shadow-md"
                >
                    Bảng Quản trị
                </button>
            )}
             <button 
                onClick={handleChangeApiKey} 
                className="px-4 py-2 text-sm font-semibold bg-yellow-600/80 hover:bg-yellow-600 backdrop-blur-sm text-white rounded-lg transition-colors shadow-md"
                title="Thay đổi API Key"
            >
                Đổi API Key
            </button>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 text-sm font-semibold bg-red-600/80 hover:bg-red-600 backdrop-blur-sm text-white rounded-lg transition-colors shadow-md"
            >
                Đăng xuất
            </button>
        </div>

        {showAdminPanel && userProfile.role === 'admin' && (
            <AdminPanel onClose={() => setShowAdminPanel(false)} />
        )}


        <header className="text-center mb-12 pb-8 border-b border-emerald-400/20">
          <h1 className="led-text-effect text-5xl sm:text-6xl font-black tracking-wider uppercase" style={{ textShadow: '0 0 15px rgba(52, 211, 153, 0.5), 0 0 25px rgba(52, 211, 153, 0.3)' }}>
            AI Photoshoot
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto tracking-wide">
            Biến mọi bức ảnh thành kiệt tác chuyên nghiệp chỉ trong vài giây.
          </p>
        </header>
        
        {activeTab !== 'wedding' && activeTab !== 'product' && (
            <div className="flex justify-center mb-8">
                <div className="p-1 bg-slate-900 rounded-lg flex space-x-2 shadow-lg">
                    <button 
                        onClick={() => setMode('single')}
                        className={`px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${mode === 'single' ? 'bg-emerald-500 text-white shadow-glow-green' : 'text-slate-300 hover:bg-slate-700'}`}
                        aria-pressed={mode === 'single'}
                    >
                        Chụp ảnh Đơn
                    </button>
                    <button 
                        onClick={() => setMode('group')}
                        className={`px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${mode === 'group' ? 'bg-emerald-500 text-white shadow-glow-green' : 'text-slate-300 hover:bg-slate-700'}`}
                        aria-pressed={mode === 'group'}
                    >
                        Chụp ảnh Nhóm
                    </button>
                </div>
            </div>
        )}

        {error && (
            <div className="max-w-4xl mx-auto bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Lỗi! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Step 1: Upload */}
                <div className="w-full">
                    {activeTab === 'wedding' ? (
                        <CoupleImageUploader
                            onImageChange={handleCoupleImageChange}
                            previews={[previews[0], coupleSourceImages[0] && coupleSourceImages[1] ? previews[1] : undefined]}
                        />
                    ) : activeTab === 'product' ? (
                        <ImageUploader 
                            label="Bước 1: Tải Ảnh Gốc"
                            onImagesChange={(files) => handleProductImageChange(files[0] || null)} 
                            preview={previews[0]} 
                        />
                    ) : mode === 'single' ? (
                        <ImageUploader 
                            label="Bước 1: Tải Ảnh Gốc"
                            onImagesChange={handleImagesChange} 
                            preview={previews[0]} 
                        />
                    ) : (
                        <MultiImageUploader 
                            onFilesChange={handleImagesChange}
                            previews={previews}
                            files={sourceImages}
                        />
                    )}
                </div>
                
                {/* Step 2: Customize */}
                <div className="w-full lg:sticky top-8">
                    <Panel className="flex flex-col space-y-8">
                         <h2 className="text-lg font-bold text-slate-200 text-left">Bước 2: Lựa Chọn Sáng Tạo</h2>
                         <StyleSelector 
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                            selectedStyle={selectedStyle}
                            onStyleSelect={setSelectedStyle}
                            stylePrompt={stylePrompt}
                            onStylePromptChange={setStylePrompt}
                            productPrompt={productPrompt}
                            onProductPromptChange={setProductPrompt}
                            celebrityPrompt={celebrityPrompt}
                            onCelebrityPromptChange={setCelebrityPrompt}
                            travelPrompt={travelPrompt}
                            onTravelPromptChange={setTravelPrompt}
                            panoramaPrompt={panoramaPrompt}
                            onPanoramaPromptChange={setPanoramaPrompt}
                        />
                        {mode === 'single' && activeTab !== 'wedding' && activeTab !== 'product' && (
                            <AccessorySelector 
                                accessories={accessories}
                                onAccessoryChange={handleAccessoryChange}
                                isEnabled={isAccessoryEnabled}
                                onToggleEnabled={setIsAccessoryEnabled}
                            />
                        )}
                    </Panel>
                </div>
            </div>

            {/* Step 3: Generate */}
            <div>
                 <Panel>
                    <GenerationControls 
                        selectedImageType={selectedImageType}
                        onImageTypeChange={setSelectedImageType}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                        isReady={isReady}
                        disabledTooltip={disabledTooltip}
                        numberOfImages={numberOfImages}
                        onNumberOfImagesChange={setNumberOfImages}
                        selectedAspectRatio={selectedAspectRatio}
                        onAspectRatioChange={setSelectedAspectRatio}
                        customWidth={customWidth}
                        onCustomWidthChange={setCustomWidth}
                        customHeight={customHeight}
                        onCustomHeightChange={setCustomHeight}
                        isProductMode={activeTab === 'product'}
                    />
                </Panel>
            </div>

            {/* Results */}
            <div>
                <GeneratedImages 
                  images={generatedImages} 
                  isLoading={isLoading}
                  onImageClick={openViewer}
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
