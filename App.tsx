

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
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
import { UserMenu } from './components/UserMenu';
import { UsageGuide } from './components/UsageGuide';


// Constants and Types
import { STYLES, IMAGE_TYPES, STYLE_ACCESSORY_DEFAULTS, BASE_ACCESSORY_DEFAULTS, ID_PHOTO_BACKGROUNDS, ID_PHOTO_ATTIRES, ID_PHOTO_SIZES } from './constants';
import type { Style, ImageType, Accessory, IdPhotoAttire, IdPhotoBackground, IdPhotoSize } from './types';

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
    expiresAt?: Timestamp;
}

interface GenerationSettings {
  activeTab: string;
  mode: 'single' | 'group';
  selectedStyle: Style;
  stylePrompt: string;
  celebrityPrompt: string;
  travelPrompt: string;
  panoramaPrompt: string;
  productPrompt: string;
  isAccessoryEnabled: boolean;
  accessories: Record<string, Accessory>;
  selectedImageType: ImageType;
  selectedAspectRatio: string;
  customWidth: number | '';
  customHeight: number | '';
  idPhotoSize: IdPhotoSize;
  idPhotoBackground: IdPhotoBackground;
  idPhotoAttire: IdPhotoAttire;
}

interface GeneratedImage {
    url: string;
    settings: GenerationSettings;
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
  const [hasSelectedVeoKey, setHasSelectedVeoKey] = useState(false);

  // UI State
  const [showGuide, setShowGuide] = useState(false);

  // State management
  const [mode, setMode] = useState<'single' | 'group'>('single');
  const [sourceImages, setSourceImages] = useState<File[]>([]);
  const [coupleSourceImages, setCoupleSourceImages] = useState<(File|null)[]>([null, null]);

  const [previews, setPreviews] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<Array<string | GeneratedImage>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('trends');
  const [selectedStyle, setSelectedStyle] = useState<Style>(STYLES.find(s => s.category === 'trends') || STYLES[0]);
  
  // Custom prompts per tab
  const [stylePrompt, setStylePrompt] = useState('');
  const [celebrityPrompt, setCelebrityPrompt] = useState('');
  const [travelPrompt, setTravelPrompt] = useState('');
  const [panoramaPrompt, setPanoramaPrompt] = useState('');
  const [productPrompt, setProductPrompt] = useState('');
  const [isCustomPromptActive, setIsCustomPromptActive] = useState(false);


  const [isAccessoryEnabled, setIsAccessoryEnabled] = useState(false);
  const [accessories, setAccessories] = useState<Record<string, Accessory>>({});

  const [selectedImageType, setSelectedImageType] = useState<ImageType>(IMAGE_TYPES[0]);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('square');
  const [customWidth, setCustomWidth] = useState<number | ''>(1024);
  const [customHeight, setCustomHeight] = useState<number | ''>(1024);
  
  // ID Photo State
  const [idPhotoSize, setIdPhotoSize] = useState<IdPhotoSize>(ID_PHOTO_SIZES[0]);
  const [idPhotoBackground, setIdPhotoBackground] = useState<IdPhotoBackground>(ID_PHOTO_BACKGROUNDS[0]);
  const [idPhotoAttire, setIdPhotoAttire] = useState<IdPhotoAttire>(ID_PHOTO_ATTIRES[0]);

  // Video Generation State
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoLoadingMessage, setVideoLoadingMessage] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);


  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  // Check if guide should be shown on mount
  useEffect(() => {
    const guideHidden = localStorage.getItem('hideUsageGuide');
    if (guideHidden !== 'true') {
        setShowGuide(true);
    }
  }, []);

  // Firebase Auth listener with Firestore integration
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser && currentUser.emailVerified) {
            setUser(currentUser);
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const profile = userDocSnap.data() as UserProfile;

                // Check for account expiration
                if (profile.status === 'approved' && profile.expiresAt) {
                    const expirationDate = profile.expiresAt.toDate();
                    if (expirationDate < new Date()) {
                        // Account has expired, revert status to pending
                        await updateDoc(userDocRef, { status: 'pending' });
                        setUserProfile(null);
                        setIsPendingApproval(true);
                        setIsAuthLoading(false);
                        return; // Stop further execution
                    }
                }
                
                // Continue with normal status check
                if (profile.status === 'approved') {
                    setUserProfile(profile);
                    setIsPendingApproval(false);
                } else {
                    setUserProfile(null);
                    setIsPendingApproval(true);
                }
            } else {
                console.error("User data not found in Firestore.");
                setUserProfile(null);
                setIsPendingApproval(true);
            }
        } else {
            setUser(null);
            setUserProfile(null);
            setIsPendingApproval(false);
        }
        setIsAuthLoading(false);
    });

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
  
  useEffect(() => {
    if (userProfile && (window as any).aistudio) {
        const checkKey = async () => {
            if (await (window as any).aistudio.hasSelectedApiKey()) {
                setHasSelectedVeoKey(true);
            }
        };
        checkKey();
    }
  }, [userProfile]);

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
        activeTab === 'wedding' ? coupleSourceImages.filter(Boolean) : sourceImages
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
  }, [sourceImages, coupleSourceImages, activeTab]);


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
    return sourceImages;
  }, [activeTab, coupleSourceImages, sourceImages]);
  
  // Determine if ready to generate
  const isReady = useMemo(() => {
    const weddingReady = activeTab === 'wedding' && coupleSourceImages.every(img => img !== null);
    const otherReady = activeTab !== 'wedding' && sourceImages.length > 0;
    return (weddingReady || otherReady) && !!ai;
  }, [sourceImages, coupleSourceImages, activeTab, ai]);

  const disabledTooltip = useMemo(() => {
      if (isReady) return '';
      if (!ai) return 'Vui lòng cung cấp API Key hợp lệ và nhấn "Lưu & Bắt đầu".';
      if (activeTab === 'wedding' && !coupleSourceImages.every(img => img !== null)) {
          return 'Vui lòng tải lên đủ hai ảnh cho cặp đôi.';
      }
      if (activeTab !== 'wedding' && sourceImages.length === 0) {
          return 'Vui lòng tải lên ít nhất một ảnh gốc.';
      }
      return 'Vui lòng hoàn thành các bước trên để bắt đầu.'; // A generic fallback
  }, [isReady, ai, activeTab, coupleSourceImages, sourceImages]);

  // Construct the final prompt for the API
  const constructPrompt = useCallback((): string => {
    let coreContent = '';
    
    if (activeTab === 'id_photo') {
        coreContent = `**Nhiệm vụ**: Tạo một ảnh thẻ chuyên nghiệp, chất lượng studio từ ảnh gốc. **Yêu cầu nghiêm ngặt**:
        1.  **Phông nền**: Phải là một màu ${idPhotoBackground.name} đồng nhất, phẳng và không có chi tiết.
        2.  **Trang phục**: ${idPhotoAttire.prompt}. Đảm bảo sự chuyển đổi ở cổ và vai liền mạch, tự nhiên.
        3.  **Tư thế & Biểu cảm**: Người trong ảnh phải nhìn thẳng vào máy ảnh, biểu cảm trung tính, chuyên nghiệp.
        4.  **Ánh sáng**: Ánh sáng studio mềm mại, không có bóng gắt trên khuôn mặt.
        5.  **Bảo toàn khuôn mặt**: TUYỆT ĐỐI giữ nguyên 100% các đặc điểm khuôn mặt, tóc, màu da của người trong ảnh gốc. Không được thay đổi hay làm đẹp khuôn mặt.
        6.  **Bố cục**: Cắt ảnh theo bố cục ảnh thẻ tiêu chuẩn, thấy rõ khuôn mặt và vai. Kích thước theo tỷ lệ ${idPhotoSize.name}.`;
        return coreContent;
    }

    if (activeTab === 'wedding') {
        coreContent = selectedStyle.prompt;
    } else if (['style', 'celebrity', 'travel', 'panorama', 'product'].includes(activeTab)) {
        let customPrompt = '';
        switch (activeTab) {
            case 'style': customPrompt = stylePrompt; break;
            case 'celebrity': customPrompt = celebrityPrompt; break;
            case 'travel': customPrompt = travelPrompt; break;
            case 'panorama': customPrompt = panoramaPrompt; break;
            case 'product': customPrompt = productPrompt; break;
        }

        if (customPrompt) {
            // Logic for custom prompts with expert personas
            if (activeTab === 'style') {
                coreContent = `Với tư cách là một đạo diễn nghệ thuật bậc thầy, hãy tạo ra một hình ảnh 4K siêu thực, chất lượng cao theo phong cách sau: ${customPrompt}.`;
            } else if (activeTab === 'product') {
                coreContent = `Với tư cách là một giám đốc sáng tạo quảng cáo, hãy tạo ra một hình ảnh sản phẩm 4K siêu thực, hấp dẫn. **Nhiệm vụ**: Đặt sản phẩm trong ảnh gốc vào bối cảnh sau: **${customPrompt}**. **Yêu cầu kỹ thuật**: Ánh sáng, bóng đổ, và phản chiếu trên sản phẩm phải khớp một cách hoàn hảo với môi trường xung quanh. **Yêu cầu cốt lõi**: Giữ nguyên hình dạng, chi tiết và nhãn hiệu của sản phẩm.`;
            } else { // Celebrity, Travel, Panorama
                 coreContent = `Với tư cách là một chuyên gia Photoshop và nghệ sĩ kỹ thuật số, hãy tạo một bức ảnh ghép 4K siêu thực, liền mạch. **Nhiệm vụ**: Đặt người trong ảnh gốc vào bối cảnh của **${customPrompt}**. **Yêu cầu kỹ thuật**: Ánh sáng, bóng đổ, nhiệt độ màu và kết cấu trên người của chủ thể phải khớp một cách hoàn hảo với môi trường xung quanh để tạo ra một kết quả chân thực, đáng tin. **Yêu cầu cốt lõi**: Giữ nguyên vẹn và chính xác tất cả các đặc điểm khuôn mặt độc đáo của chủ thể. TRÁNH tuyệt đối cảm giác 'cắt dán' hoặc không tự nhiên.`;
            }
        } else {
            coreContent = selectedStyle.prompt;
        }
    } else {
        coreContent = selectedStyle.prompt;
    }

    if (activeTab !== 'wedding' && activeTab !== 'product' && activeTab !== 'id_photo' && mode === 'single' && isAccessoryEnabled) {
        const accessoryDescriptions = Object.values(accessories)
            .filter(acc => acc && (acc as Accessory).item)
            .map(acc => `${(acc as Accessory).color} ${(acc as Accessory).item}`.trim())
            .join(', ');

        if (accessoryDescriptions) {
            coreContent += ` **Phụ kiện**: Chủ thể đeo các phụ kiện sau: ${accessoryDescriptions}.`;
        }
    }

    if (mode === 'group' && !['wedding', 'product', 'id_photo'].includes(activeTab)) {
        coreContent += " **Yêu cầu cho ảnh nhóm**: Tạo một hình ảnh duy nhất có tất cả những người từ các bức ảnh đã tải lên trong một bối cảnh liền mạch. Giữ nguyên các đặc điểm khuôn mặt và ngoại hình của mỗi người từ ảnh gốc tương ứng của họ."
    }
    
    // Image type and aspect ratio instructions (not for ID photos)
    if (activeTab !== 'id_photo') {
        if (selectedImageType.id === 'portrait') {
            coreContent += " **Bố cục**: Ảnh chụp là một bức chân dung cận cảnh, tập trung vào khuôn mặt và vai.";
        } else if (selectedImageType.id === 'half_body') {
            coreContent += " **Bố cục**: Ảnh chụp nửa người, từ đầu đến eo.";
        } else {
            coreContent += " **Bố cục**: Ảnh chụp toàn thân, thấy rõ cả người và trang phục.";
        }

        if (selectedAspectRatio === 'custom' && customWidth && customHeight) {
            coreContent += ` **Kích thước**: Kích thước ảnh phải là ${customWidth}x${customHeight} pixels.`;
        } else if (selectedAspectRatio === 'portrait') {
            coreContent += " **Tỷ lệ**: Ảnh phải có tỷ lệ khung hình dọc (ví dụ 9:16).";
        } else if (selectedAspectRatio === 'landscape') {
            coreContent += " **Tỷ lệ**: Ảnh phải có tỷ lệ khung hình ngang (ví dụ 16:9).";
        } else { // default to square
            coreContent += " **Tỷ lệ**: Ảnh phải có tỷ lệ khung hình vuông (1:1).";
        }
    }

    return coreContent;

}, [selectedStyle, selectedImageType, accessories, isAccessoryEnabled, activeTab, stylePrompt, celebrityPrompt, travelPrompt, panoramaPrompt, productPrompt, mode, selectedAspectRatio, customWidth, customHeight, idPhotoSize, idPhotoBackground, idPhotoAttire]);

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
    
    const currentSettings: GenerationSettings = {
      activeTab, mode, selectedStyle, stylePrompt, celebrityPrompt, travelPrompt,
      panoramaPrompt, productPrompt, isAccessoryEnabled, accessories, selectedImageType,
      selectedAspectRatio, customWidth, customHeight, idPhotoSize, idPhotoBackground, idPhotoAttire
    };

    setIsLoading(true);
    setError(null);
    setGeneratedImages(Array(numberOfImages).fill('loading'));
    setGeneratedVideoUrl(null); // Clear previous video
    setVideoError(null);

    try {
      const prompt = constructPrompt();
      console.log("Final Prompt:", prompt); // For debugging
      const imageParts = await Promise.all(currentSourceImages.map(file => fileToGenerativePart(file)));
      
      const contents = {
        parts: [...imageParts, { text: prompt }],
      };
      
      const generateImage = () => ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents,
        config: {
            responseModalities: [Modality.IMAGE],
        },
      });

      const generationPromises = Array(numberOfImages).fill(null).map(() => generateImage());
      const responses = await Promise.all(generationPromises);
      
      const newImages: GeneratedImage[] = [];
      responses.forEach(response => {
        const imagePartFound = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
        if (imagePartFound?.inlineData) {
          const base64ImageBytes = imagePartFound.inlineData.data;
          const mimeType = imagePartFound.inlineData.mimeType;
          newImages.push({
            url: `data:${mimeType};base64,${base64ImageBytes}`,
            settings: currentSettings,
          });
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
      } else if (errorMessage.includes('safety')) {
        setError('Nội dung không phù hợp. Hình ảnh hoặc yêu cầu của bạn có thể đã vi phạm chính sách an toàn. Vui lòng thử một ảnh hoặc ý tưởng khác.');
      } else if (errorMessage.includes('quota')) {
        setError('Bạn đã hết lượt sử dụng miễn phí cho hôm nay. Vui lòng kiểm tra hạn ngạch trên tài khoản Google AI của bạn.');
      } else if (errorMessage.includes('fetch')) {
         setError('Lỗi kết nối mạng. Vui lòng kiểm tra đường truyền internet và thử lại.');
      } else {
        setError('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau một lát.');
      }
      setGeneratedImages([]);
    } finally {
      setIsLoading(false);
    }
  }, [ai, currentSourceImages, constructPrompt, numberOfImages, activeTab, setApiKeyError, accessories, celebrityPrompt, customHeight, customWidth, idPhotoAttire, idPhotoBackground, idPhotoSize, isAccessoryEnabled, mode, panoramaPrompt, productPrompt, selectedAspectRatio, selectedImageType, selectedStyle, stylePrompt, travelPrompt]);
  
  const handleGenerateVideo = useCallback(async (imageIndex: number) => {
    const sourceImageObj = generatedImages[imageIndex];
    if (!sourceImageObj || typeof sourceImageObj === 'string') {
        setVideoError("Ảnh nguồn để tạo video không tồn tại.");
        return;
    }
    const sourceImage = sourceImageObj.url;


    setIsVideoLoading(true);
    setVideoError(null);
    setGeneratedVideoUrl(null);

    const loadingMessages = [
        "AI đang đọc kịch bản...",
        "Chuẩn bị máy quay và ánh sáng...",
        "Bắt đầu cảnh quay đầu tiên...",
        "AI đang chỉ đạo diễn xuất...",
        "Thêm hiệu ứng đặc biệt...",
        "Dựng phim và xử lý hậu kỳ...",
        "Sắp có bản final cut, vui lòng chờ...",
    ];

    let messageIndex = 0;
    setVideoLoadingMessage(loadingMessages[messageIndex]);
    const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setVideoLoadingMessage(loadingMessages[messageIndex]);
    }, 5000);

    try {
        if ((window as any).aistudio && !(await (window as any).aistudio.hasSelectedApiKey())) {
            await (window as any).aistudio.openSelectKey();
            setHasSelectedVeoKey(true);
        }

        const videoAi = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const base64Image = sourceImage.split(',')[1];
        const videoPrompt = `Tạo một video quảng cáo ngắn (khoảng 5-7 giây) cho sản phẩm trong ảnh. Video cần có chuyển động mượt mà, chuyên nghiệp, có thể là máy quay lia chậm quanh sản phẩm, hoặc zoom vào các chi tiết nổi bật. Giữ nguyên bối cảnh và phong cách của ảnh.`;
        
        let operation = await videoAi.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: videoPrompt,
            image: {
                imageBytes: base64Image,
                mimeType: 'image/png',
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await videoAi.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
             const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
             const videoBlob = await response.blob();
             const videoUrl = URL.createObjectURL(videoBlob);
             setGeneratedVideoUrl(videoUrl);
        } else {
             throw new Error("Không nhận được link video từ API.");
        }

    } catch (e: any) {
        console.error("Video generation failed:", e);
        const errorMessage = e?.message?.toLowerCase() || '';
        if (errorMessage.includes("requested entity was not found")) {
            setVideoError("API Key không hợp lệ cho việc tạo video. Vui lòng chọn lại Key và thử lại.");
            setHasSelectedVeoKey(false);
        } else {
             setVideoError("Tạo video thất bại. Vui lòng thử lại sau.");
        }
    } finally {
        setIsVideoLoading(false);
        clearInterval(messageInterval);
        setVideoLoadingMessage('');
    }
  }, [generatedImages]);

  const createPromptChangeHandler = (setter: React.Dispatch<React.SetStateAction<string>>) => {
      return (value: string) => {
          setter(value);
          setIsCustomPromptActive(!!value);
      };
  };

  const handleStyleSelect = (style: Style) => {
      setSelectedStyle(style);
      // Clear all custom prompts and deactivate custom mode
      setStylePrompt('');
      setCelebrityPrompt('');
      setTravelPrompt('');
      setPanoramaPrompt('');
      setProductPrompt('');
      setIsCustomPromptActive(false);
  };

  const handleTabChange = useCallback((tabId: string) => {
      setActiveTab(tabId);
      const firstStyleForTab = STYLES.find(s => s.category === tabId);
      if (firstStyleForTab) {
        setSelectedStyle(firstStyleForTab);
      }
      // Reset states on tab change for a clean slate
      setStylePrompt('');
      setCelebrityPrompt('');
      setTravelPrompt('');
      setPanoramaPrompt('');
      setProductPrompt('');
      setSourceImages([]);
      setCoupleSourceImages([null, null]);
      setGeneratedImages([]);
      setGeneratedVideoUrl(null);
      setVideoError(null);
      setIsCustomPromptActive(false);
  }, []);

  const openViewer = useCallback((index: number) => setViewerIndex(index), []);
  const closeViewer = useCallback(() => setViewerIndex(null), []);
  const navigateViewer = useCallback((newIndex: number) => {
      const totalImages = generatedImages.filter(img => typeof img === 'object').length;
      if (newIndex >= 0 && newIndex < totalImages) {
          setViewerIndex(newIndex);
      }
  }, [generatedImages]);

  const handleDismissGuide = useCallback(() => {
    setShowGuide(false);
    localStorage.setItem('hideUsageGuide', 'true');
  }, []);
  
  const handleReuseSettings = useCallback((settings: GenerationSettings) => {
    setActiveTab(settings.activeTab);
    setMode(settings.mode);
    setSelectedStyle(settings.selectedStyle);
    setStylePrompt(settings.stylePrompt);
    setCelebrityPrompt(settings.celebrityPrompt);
    setTravelPrompt(settings.travelPrompt);
    setPanoramaPrompt(settings.panoramaPrompt);
    setProductPrompt(settings.productPrompt);
    setIsAccessoryEnabled(settings.isAccessoryEnabled);
    setAccessories(settings.accessories);
    setSelectedImageType(settings.selectedImageType);
    setSelectedAspectRatio(settings.selectedAspectRatio);
    setCustomWidth(settings.customWidth);
    setCustomHeight(settings.customHeight);
    setIdPhotoSize(settings.idPhotoSize);
    setIdPhotoBackground(settings.idPhotoBackground);
    setIdPhotoAttire(settings.idPhotoAttire);

    // Activate custom prompt mode if any custom prompt has value
    setIsCustomPromptActive(
      !!settings.stylePrompt || !!settings.celebrityPrompt || !!settings.travelPrompt ||
      !!settings.panoramaPrompt || !!settings.productPrompt
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
  
  const uploaderDescription = "Ảnh gốc càng rõ nét, AI càng 'ảo diệu'!";

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
      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        {showAdminPanel && userProfile.role === 'admin' && (
            <AdminPanel onClose={() => setShowAdminPanel(false)} currentUserProfile={userProfile} />
        )}

        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-emerald-400/20">
            {/* Title and Subtitle */}
            <div className="text-center sm:text-left">
                <h1 className="led-text-effect text-5xl sm:text-6xl font-black tracking-wider uppercase" style={{ textShadow: '0 0 15px rgba(52, 211, 153, 0.5), 0 0 25px rgba(52, 211, 153, 0.3)' }}>
                    AI Photoshoot
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto sm:mx-0 tracking-wide">
                    Biến mọi bức ảnh thành kiệt tác chuyên nghiệp chỉ trong vài giây.
                </p>
            </div>

            {/* User Controls */}
            <div className="flex-shrink-0">
                <UserMenu
                    user={user}
                    userProfile={userProfile}
                    onLogout={handleLogout}
                    onChangeApiKey={handleChangeApiKey}
                    onShowAdminPanel={() => setShowAdminPanel(true)}
                />
            </div>
        </header>

        {showGuide && <UsageGuide onDismiss={handleDismissGuide} />}
        
        {activeTab !== 'wedding' && activeTab !== 'product' && activeTab !== 'id_photo' && (
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Step 1: Customize */}
                <div className="w-full">
                    <Panel className="flex flex-col space-y-8">
                         <h2 className="text-lg font-bold text-slate-200 text-left">Bước 1: Lựa Chọn Sáng Tạo</h2>
                         <StyleSelector 
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                            selectedStyle={selectedStyle}
                            onStyleSelect={handleStyleSelect}
                            stylePrompt={stylePrompt}
                            onStylePromptChange={createPromptChangeHandler(setStylePrompt)}
                            celebrityPrompt={celebrityPrompt}
                            onCelebrityPromptChange={createPromptChangeHandler(setCelebrityPrompt)}
                            travelPrompt={travelPrompt}
                            onTravelPromptChange={createPromptChangeHandler(setTravelPrompt)}
                            panoramaPrompt={panoramaPrompt}
                            onPanoramaPromptChange={createPromptChangeHandler(setPanoramaPrompt)}
                            productPrompt={productPrompt}
                            onProductPromptChange={createPromptChangeHandler(setProductPrompt)}
                            isCustomPromptActive={isCustomPromptActive}
                        />
                        {mode === 'single' && !['wedding', 'product', 'id_photo'].includes(activeTab) && (
                            <AccessorySelector 
                                accessories={accessories}
                                onAccessoryChange={handleAccessoryChange}
                                isEnabled={isAccessoryEnabled}
                                onToggleEnabled={setIsAccessoryEnabled}
                            />
                        )}
                    </Panel>
                </div>
                
                {/* Step 2: Upload */}
                 <div className="w-full lg:sticky top-8">
                    {activeTab === 'wedding' ? (
                        <CoupleImageUploader
                            title="Bước 2: Cung Cấp 'Nguyên Liệu'"
                            description={uploaderDescription}
                            onImageChange={handleCoupleImageChange}
                            previews={[previews[0], coupleSourceImages[0] && coupleSourceImages[1] ? previews[1] : undefined]}
                        />
                    ) : (mode === 'single' || ['product', 'id_photo'].includes(activeTab)) ? (
                        <ImageUploader 
                            title="Bước 2: Cung Cấp 'Nguyên Liệu'"
                            description={uploaderDescription}
                            onImagesChange={handleImagesChange} 
                            preview={previews[0]} 
                        />
                    ) : (
                        <MultiImageUploader 
                            title="Bước 2: Cung Cấp 'Nguyên Liệu'"
                            description={uploaderDescription}
                            onFilesChange={handleImagesChange}
                            previews={previews}
                            files={sourceImages}
                        />
                    )}
                </div>
            </div>

            {/* Step 3: Generate */}
            <div>
                 <Panel>
                    <GenerationControls 
                        activeTab={activeTab}
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
                        idPhotoSize={idPhotoSize}
                        onIdPhotoSizeChange={setIdPhotoSize}
                        idPhotoBackground={idPhotoBackground}
                        onIdPhotoBackgroundChange={setIdPhotoBackground}
                        idPhotoAttire={idPhotoAttire}
                        onIdPhotoAttireChange={setIdPhotoAttire}
                    />
                </Panel>
            </div>

            {/* Results */}
            <div>
                <GeneratedImages 
                  activeTab={activeTab}
                  images={generatedImages} 
                  isLoading={isLoading}
                  onImageClick={openViewer}
                  onGenerateVideo={handleGenerateVideo}
                  isVideoLoading={isVideoLoading}
                  hasSelectedVeoKey={hasSelectedVeoKey}
                  onSelectVeoKey={() => (window as any).aistudio?.openSelectKey()}
                  onReuseSettings={handleReuseSettings}
                />
            </div>
            
            {/* Video Results */}
            {(isVideoLoading || generatedVideoUrl || videoError) && (
                <div className="mt-8">
                    <Panel>
                        <h2 className="text-lg font-bold text-slate-200 mb-4 text-left">Video Quảng Cáo</h2>
                        {isVideoLoading && (
                            <div className="flex flex-col items-center justify-center h-60 bg-slate-800 rounded-lg text-center">
                                 <svg className="animate-spin h-8 w-8 text-emerald-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="text-lg font-semibold text-white">Đang tạo video của bạn...</p>
                                <p className="text-slate-400 mt-2">{videoLoadingMessage}</p>
                                <p className="text-xs text-slate-500 mt-4">(Quá trình này có thể mất vài phút)</p>
                            </div>
                        )}
                        {videoError && (
                            <div className="flex items-center justify-center h-60 bg-red-900/30 rounded-lg text-red-300 text-center p-4">
                                {videoError}
                            </div>
                        )}
                        {generatedVideoUrl && (
                             <div className="aspect-video bg-black rounded-lg">
                                <video src={generatedVideoUrl} controls autoPlay className="w-full h-full rounded-lg" />
                            </div>
                        )}
                    </Panel>
                </div>
            )}
        </div>
      </main>

      {viewerIndex !== null && (
        <ImageViewer 
          images={generatedImages
            .map(img => (typeof img === 'object' ? img.url : null))
            .filter((url): url is string => !!url)
          }
          currentIndex={viewerIndex}
          onClose={closeViewer}
          onNavigate={navigateViewer}
        />
      )}
    </div>
  );
}

export default App;