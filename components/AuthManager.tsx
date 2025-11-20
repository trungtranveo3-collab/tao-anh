
import React, { useState, useRef, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebaseConfig';
import { Panel } from './Panel';

const UploadIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// Component hiển thị thanh thời gian tự động tắt
const ProgressBar: React.FC<{ duration: number }> = ({ duration }) => {
    return (
        <div className="w-full bg-slate-700 h-1 mt-4 rounded-full overflow-hidden">
            <div 
                className="bg-emerald-500 h-full animate-progress origin-left"
                style={{ animationDuration: `${duration}ms` }}
            />
            <style>{`
                @keyframes progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                .animate-progress {
                    animation-name: progress;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                }
            `}</style>
        </div>
    );
};

export const AuthManager: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    
    const [error, setError] = useState<React.ReactNode | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    const [showPendingInfo, setShowPendingInfo] = useState(false);
    const [pendingInfoMessage, setPendingInfoMessage] = useState('');
    
    const avatarInputRef = useRef<HTMLInputElement>(null);

    // Effect xử lý khi người dùng quay lại từ email xác thực
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('fromVerification') === 'true') {
            const userEmail = urlParams.get('email');
            setIsLogin(true); // Chuyển sang tab đăng nhập
            if (userEmail) {
                setEmail(userEmail);
            }
            setPendingInfoMessage("Email của bạn đã được xác thực thành công! Vui lòng đăng nhập để tiếp tục.");
            setShowPendingInfo(true);

            // Xóa params trên URL để tránh hiện lại modal khi refresh
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, []);

    // Effect tự động tắt popup sau 30 giây
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (showPendingInfo) {
            timer = setTimeout(() => {
                handleClosePendingInfo();
            }, 30000); // 30 giây
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [showPendingInfo]);

    // Cleanup object URL avatar
    useEffect(() => {
        return () => {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("Kích thước ảnh quá lớn (Max 5MB).");
                return;
            }
            setAvatarFile(file);
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarFile(null);
        if (avatarPreview) {
            URL.revokeObjectURL(avatarPreview);
        }
        setAvatarPreview(null);
        if (avatarInputRef.current) {
            avatarInputRef.current.value = '';
        }
    };

    const handleTabChange = (loginState: boolean) => {
        setIsLogin(loginState);
        setError(null);
        setMessage(null);
        setDisplayName('');
        setAvatarFile(null);
        setAvatarPreview(null);
    };
    
    const handleClosePendingInfo = () => {
        setShowPendingInfo(false);
        setPendingInfoMessage('');
        setIsLogin(true); 
        setPassword('');
        // Giữ lại email để người dùng tiện đăng nhập
        setDisplayName('');
        setAvatarFile(null);
        setAvatarPreview(null);
        if (avatarInputRef.current) {
            avatarInputRef.current.value = '';
        }
    };

    const handleResendFromRegister = async () => {
        if (!password) {
            setShowPendingInfo(false);
            setError("Vui lòng nhập mật khẩu của bạn trên form để thử lại.");
            return;
        }
    
        setIsLoading(true);
        setMessage(null);
        setError(null);
        setShowPendingInfo(false); 
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
                await sendEmailVerification(userCredential.user, { 
                    url: continueUrl,
                    handleCodeInApp: true
                });
                setMessage("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư đến (và cả mục spam) rồi đăng nhập.");
            } else {
                setMessage("Tài khoản của bạn đã được xác thực. Vui lòng đăng nhập.");
            }
            setIsLogin(true);
        } catch (err: any) {
            console.error("Resend from register error:", err);
            if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                 setError("Mật khẩu không khớp. Vui lòng thử đăng nhập lại.");
            } else if (err.code === 'auth/too-many-requests') {
                 setError("Bạn đã gửi yêu cầu quá nhiều lần. Vui lòng thử lại sau.");
            } else {
                 setError("Lỗi khi gửi lại email. Vui lòng thử lại sau.");
            }
            setIsLogin(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        if (isLogin) {
            // === LOGIC ĐĂNG NHẬP ===
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                if (!userCredential.user.emailVerified) {
                    // Logic gửi lại email khi đăng nhập nhưng chưa xác thực
                    const resendVerification = async () => {
                        setIsLoading(true);
                        setMessage(null);
                        setError(null);
                        try {
                            const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
                            await sendEmailVerification(userCredential.user, { 
                                url: continueUrl,
                                handleCodeInApp: true
                            });
                            setMessage("✅ Đã gửi lại email. Vui lòng kiểm tra hộp thư.");
                        } catch (e: any) {
                            if (e.code === 'auth/too-many-requests') {
                                setError("Vui lòng đợi một lát trước khi gửi lại.");
                            } else {
                                setError(<><strong>Gửi lại thất bại.</strong><p className="mt-1">Vui lòng thử lại sau.</p></>);
                            }
                        } finally {
                            setIsLoading(false);
                        }
                    };

                    setError(
                        <>
                            <p className="font-bold text-yellow-400">⚠️ Tài khoản chưa xác thực</p>
                            <p className="mt-1">Vui lòng kiểm tra email (cả mục Spam) để kích hoạt tài khoản.</p>
                            <div className="mt-3 pt-3 border-t border-red-800/50">
                                <button
                                    type="button"
                                    className="text-sm font-bold bg-red-800/50 hover:bg-red-700 py-1 px-3 rounded transition-colors w-full"
                                    onClick={resendVerification}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Đang gửi...' : 'Gửi lại Email xác thực'}
                                </button>
                            </div>
                        </>
                    );
                    setIsLoading(false);
                    // Đăng xuất ngay để ngăn truy cập
                    auth.signOut(); 
                }
                // Nếu đã xác thực, App.tsx sẽ tự động xử lý
            } catch (err: any) {
                console.error("Login error:", err);
                if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                    setError("Email hoặc mật khẩu không chính xác.");
                } else if (err.code === 'auth/too-many-requests') {
                    setError("Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau.");
                } else {
                    setError("Đăng nhập thất bại. Vui lòng kiểm tra kết nối mạng.");
                }
                setIsLoading(false);
            }
        } else {
            // === LOGIC ĐĂNG KÝ ===
            try {
                // 1. Tạo User Auth
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // 2. Upload Avatar (Fail-safe)
                let photoURL = null;
                if (avatarFile) {
                    try {
                        const storageRef = ref(storage, `avatars/${user.uid}`);
                        await uploadBytes(storageRef, avatarFile);
                        photoURL = await getDownloadURL(storageRef);
                    } catch (uploadErr) {
                        console.warn("Avatar upload failed, continuing registration...", uploadErr);
                    }
                }

                // 3. Cập nhật Profile Auth
                await updateProfile(user, {
                    displayName: displayName,
                    photoURL: photoURL
                });

                // 4. Tạo User trong Firestore
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                    role: 'user',
                    status: 'pending',
                    createdAt: serverTimestamp(),
                });

                // 5. Gửi Email xác thực (Tối ưu hóa)
                const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
                await sendEmailVerification(user, { 
                    url: continueUrl,
                    handleCodeInApp: true 
                });

                // 6. Hiển thị popup thành công
                setPendingInfoMessage(`Đăng ký thành công! Email xác thực đã được gửi tới ${email}.`);
                setShowPendingInfo(true);
                
                // Clear form
                setAvatarFile(null);
                setAvatarPreview(null);

            } catch (err: any) {
                console.error("Registration error:", err);
                if (err.code === 'auth/email-already-in-use') {
                    setPendingInfoMessage("Email này đã được đăng ký trước đó.");
                    setShowPendingInfo(true);
                } else if (err.code === 'auth/weak-password') {
                    setError("Mật khẩu quá yếu. Vui lòng sử dụng ít nhất 6 ký tự.");
                } else if (err.code === 'auth/invalid-email') {
                    setError("Địa chỉ email không hợp lệ.");
                } else {
                    setError(`Đăng ký thất bại: ${err.message || "Lỗi không xác định"}`);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError("Vui lòng nhập email ở trên để đặt lại mật khẩu.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setMessage(null);
        try {
             const actionCodeSettings = {
                url: `${window.location.origin}${window.location.pathname}`,
                handleCodeInApp: true,
            };
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setMessage("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.");
        } catch (err: any) {
            if (err.code === 'auth/user-not-found') {
                 setError("Không tìm thấy tài khoản với email này.");
            } else {
                 setError("Không thể gửi email. Vui lòng thử lại sau.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-slate-300 flex items-center justify-center p-4">
             <main className="max-w-md w-full">
                <style>
                    {`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
                </style>
                <Panel className="animate-fade-in relative">
                    <div className="text-center mb-8">
                        <h1 className="led-text-effect text-4xl font-black tracking-wider uppercase mb-2" style={{ textShadow: '0 0 15px rgba(52, 211, 153, 0.5)' }}>
                            AI Photoshoot
                        </h1>
                        <p className="text-slate-400 text-sm">Sáng tạo hình ảnh chuyên nghiệp với sức mạnh AI</p>
                    </div>

                    {/* POPUP THÔNG BÁO (MODAL) */}
                    {showPendingInfo && (
                         <div className="absolute inset-0 z-30 bg-slate-900/95 backdrop-blur-md rounded-lg flex flex-col items-center justify-center p-6 text-center animate-fade-in border border-emerald-500/30 shadow-2xl">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400 shadow-glow-green">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Kiểm tra Email của bạn</h3>
                            <p className="text-slate-300 mb-6">{pendingInfoMessage}</p>
                            
                            <div className="flex flex-col w-full space-y-3">
                                {pendingInfoMessage.includes("Email này đã được đăng ký") ? (
                                     <button 
                                        onClick={handleResendFromRegister}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/30"
                                    >
                                        {isLoading ? 'Đang xử lý...' : 'Gửi lại Email & Đăng nhập'}
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleClosePendingInfo}
                                        className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-colors border border-slate-500"
                                    >
                                        Đã hiểu, đóng thông báo
                                    </button>
                                )}
                            </div>

                            {/* Nút tắt (X) ở góc */}
                            <button 
                                onClick={handleClosePendingInfo}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                                aria-label="Tắt thông báo"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Thanh tiến trình 30s */}
                            <div className="absolute bottom-0 left-0 w-full">
                                <ProgressBar duration={30000} />
                                <p className="text-xs text-slate-500 mt-1 pb-2">Tự động đóng sau 30 giây</p>
                            </div>
                        </div>
                    )}

                    {/* NÚT CHUYỂN TAB */}
                    <div className="flex mb-6 bg-slate-900/50 p-1 rounded-lg">
                        <button
                            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${isLogin ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            onClick={() => handleTabChange(true)}
                        >
                            Đăng nhập
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${!isLogin ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            onClick={() => handleTabChange(false)}
                        >
                            Đăng ký
                        </button>
                    </div>

                    {/* THÔNG BÁO LỖI / THÀNH CÔNG */}
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm mb-4 break-words shadow-inner" role="alert">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg text-sm mb-4 break-words shadow-inner" role="alert">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleAuthAction} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-300">Tên hiển thị</label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors outline-none"
                                        placeholder="VD: Minh Tuấn"
                                        required={!isLogin}
                                    />
                                </div>
                                <div className="space-y-1">
                                     <label className="text-sm font-medium text-slate-300">Ảnh đại diện (Tùy chọn)</label>
                                     <div className="flex items-center space-x-4">
                                        <div 
                                            className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors shrink-0"
                                            onClick={() => avatarInputRef.current?.click()}
                                        >
                                            {avatarPreview ? (
                                                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <UploadIcon className="text-slate-500" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                ref={avatarInputRef}
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => avatarInputRef.current?.click()}
                                                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium block"
                                            >
                                                Tải ảnh lên
                                            </button>
                                            {avatarPreview && (
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveAvatar}
                                                    className="text-xs text-red-400 hover:text-red-300 mt-1 block"
                                                >
                                                    Xóa ảnh
                                                </button>
                                            )}
                                            <p className="text-xs text-slate-500 mt-1">Tối đa 5MB</p>
                                        </div>
                                     </div>
                                </div>
                            </>
                        )}

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors outline-none"
                                placeholder="example@email.com"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-slate-300">Mật khẩu</label>
                                {isLogin && (
                                    <button 
                                        type="button"
                                        onClick={handleResetPassword}
                                        className="text-xs text-emerald-400 hover:underline"
                                    >
                                        Quên mật khẩu?
                                    </button>
                                )}
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-glow-green disabled:bg-slate-700 disabled:text-slate-500 transition-all duration-300 mt-6"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang xử lý...
                                </span>
                            ) : (
                                isLogin ? 'Đăng nhập' : 'Đăng ký ngay'
                            )}
                        </button>
                    </form>
                </Panel>
            </main>
        </div>
    );
};
