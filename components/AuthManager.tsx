
import React, { useState, useRef, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebaseConfig';
import { Panel } from './Panel';

const UploadIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


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
    const [isEmailInUse, setIsEmailInUse] = useState(false);


    const avatarInputRef = useRef<HTMLInputElement>(null);

    // This effect handles the user returning from email verification.
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('fromVerification') === 'true') {
            const userEmail = urlParams.get('email');
            setIsLogin(true); // Switch to login tab
            if (userEmail) {
                setEmail(userEmail);
            }
            // Show the pending approval message
            setPendingInfoMessage("Email của bạn đã được xác thực thành công! Tài khoản của bạn hiện đang chờ quản trị viên phê duyệt.");
            setIsEmailInUse(false); 
            setShowPendingInfo(true);

            // Clean up URL to prevent the modal from showing up on refresh
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, []);

    // Clean up the object URL to prevent memory leaks
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
            // Validate file size (max 5MB)
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
        // Clear registration-specific fields when switching tabs
        setDisplayName('');
        setAvatarFile(null);
        setAvatarPreview(null);
    };
    
    const handleClosePendingInfo = () => {
        setShowPendingInfo(false);
        setPendingInfoMessage('');
        setIsEmailInUse(false);
        // Reset form and switch to login
        setIsLogin(true); 
        // Keep email for convenience, clear password
        setPassword('');
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
            setIsEmailInUse(false);
            setError("Vui lòng nhập mật khẩu của bạn trên form đăng ký để thử lại.");
            return;
        }
    
        setIsLoading(true);
        setMessage(null);
        setError(null);
        setShowPendingInfo(false); 
        setIsEmailInUse(false);
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
                await sendEmailVerification(userCredential.user, { url: continueUrl });
                setMessage("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư đến (và cả mục spam) rồi đăng nhập.");
            } else {
                setMessage("Tài khoản của bạn đã được xác thực. Vui lòng đăng nhập.");
            }
            setIsLogin(true);
        } catch (err: any) {
            console.error("Resend from register error:", err);
            if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                 setError("Mật khẩu bạn đã nhập không khớp với tài khoản đã đăng ký. Vui lòng thử đăng nhập hoặc sử dụng chức năng 'Quên mật khẩu'.");
            } else {
                 setError("Đã xảy ra lỗi khi cố gắng gửi lại email. Vui lòng thử lại sau.");
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
            // === LOGIN LOGIC ===
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                if (!userCredential.user.emailVerified) {
                    // Nếu chưa xác thực, hiển thị thông báo và option gửi lại
                    const resendVerification = async () => {
                        setIsLoading(true);
                        setMessage(null);
                        setError(null);
                        try {
                            const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
                            await sendEmailVerification(userCredential.user, { url: continueUrl });
                            setMessage("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư đến và cả mục spam.");
                        } catch (e) {
                            setError(<><strong>Gửi lại thất bại.</strong><p className="mt-1">Vui lòng chờ một lát trước khi thử lại.</p></>);
                        } finally {
                            setIsLoading(false);
                        }
                    };

                    setError(
                        <>
                            <p className="font-bold">Cần xác thực Email</p>
                            <p className="mt-1">Tài khoản của bạn chưa được xác thực. Vui lòng kiểm tra email chúng tôi đã gửi để tiếp tục.</p>
                            <p className="mt-2">
                                Không tìm thấy email?{' '}
                                <button
                                    type="button"
                                    className="font-semibold underline hover:text-white transition-colors disabled:text-slate-400 disabled:no-underline"
                                    onClick={resendVerification}
                                    disabled={isLoading}
                                >
                                    Gửi lại email xác thực
                                </button>
                            </p>
                        </>
                    );
                    setIsLoading(false);
                    return;
                }
                // Thành công -> App.tsx sẽ tự động xử lý chuyển trang
            } catch (err: any) {
                console.error("Login error:", err);
                const errorCode = err.code;
                if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
                    setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
                } else if (errorCode === 'auth/too-many-requests') {
                    setError('Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau.');
                } else if (errorCode === 'auth/network-request-failed') {
                    setError('Lỗi kết nối mạng. Vui lòng kiểm tra internet.');
                } else {
                    setError(`Đăng nhập không thành công (${errorCode}).`);
                }
            }
        } else {
            // === REGISTER LOGIC ===
            if (password.length < 6) {
                setError("Mật khẩu phải chứa ít nhất 6 ký tự.");
                setIsLoading(false);
                return;
            }
             if (!displayName.trim()) {
                setError("Vui lòng nhập tên hiển thị.");
                setIsLoading(false);
                return;
            }

            try {
                // BƯỚC 1: Tạo User Auth trước. 
                // Nếu email trùng, nó sẽ throw lỗi ngay tại đây -> nhảy xuống catch.
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // BƯỚC 2: Cập nhật Profile Auth cơ bản
                await updateProfile(user, {
                    displayName: displayName
                }).catch(e => console.warn("Update profile failed", e));

                // BƯỚC 3: Tạo Firestore Document (QUAN TRỌNG NHẤT)
                // Dùng setDoc với merge: true để đảm bảo an toàn
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: displayName,
                    photoURL: null, // Sẽ cập nhật sau nếu upload thành công
                    role: 'user',
                    status: 'pending',
                    createdAt: serverTimestamp()
                }, { merge: true });
                
                // BƯỚC 4: Upload Avatar (Nếu có)
                // Chúng ta bọc trong try/catch riêng để nếu upload lỗi thì user vẫn được tạo thành công
                if (avatarFile) {
                    try {
                        const avatarRef = ref(storage, `avatars/${user.uid}`);
                        await uploadBytes(avatarRef, avatarFile);
                        const photoURL = await getDownloadURL(avatarRef);
                        
                        // Cập nhật lại Firestore và Auth Profile
                        await updateDoc(doc(db, "users", user.uid), { photoURL: photoURL });
                        await updateProfile(user, { photoURL: photoURL });
                    } catch (uploadErr) {
                        console.error("Avatar upload failed, continuing registration:", uploadErr);
                        // Không return lỗi ở đây, cho phép quy trình hoàn tất
                    }
                }

                // BƯỚC 5: Gửi Email Xác thực
                try {
                    const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
                    await sendEmailVerification(user, { url: continueUrl });
                } catch (emailError) {
                     console.warn("Sending verification email warning:", emailError);
                }

                // BƯỚC 6: Hiển thị thành công
                setPendingInfoMessage("Đăng ký thành công! Một email xác thực đã được gửi đến bạn. Vui lòng xác thực và chờ quản trị viên phê duyệt tài khoản.");
                setIsEmailInUse(false);
                setShowPendingInfo(true);

            } catch (err: any) {
                console.error("Registration error:", err);
                const errorCode = err.code;
                
                if (errorCode === 'auth/email-already-in-use') {
                    // Đây là nơi bắt lỗi nếu email đã tồn tại
                    setPendingInfoMessage("Email này đã được đăng ký. Vui lòng kiểm tra hộp thư để xác thực hoặc đăng nhập.");
                    setIsEmailInUse(true);
                    setShowPendingInfo(true);
                } else if (errorCode === 'auth/invalid-email') {
                    setError('Địa chỉ email không hợp lệ.');
                } else if (errorCode === 'auth/weak-password') {
                    setError('Mật khẩu quá yếu.');
                } else if (errorCode === 'auth/network-request-failed') {
                     setError('Lỗi kết nối mạng. Không thể liên hệ máy chủ.');
                } else {
                    setError(`Đăng ký thất bại (${errorCode}). Vui lòng thử lại.`);
                }
            }
        }

        setIsLoading(false);
    };
    
    const handlePasswordReset = async () => {
        if (!email) {
            setError("Vui lòng nhập email của bạn để tiến hành đặt lại mật khẩu.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setMessage(null);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
        } catch (err: any) {
            console.error("Password reset error:", err);
             if (err.code === 'auth/user-not-found') {
                setError('Không tìm thấy tài khoản nào với địa chỉ email này.');
            } else {
                setError("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.");
            }
        }
        setIsLoading(false);
    }

    return (
         <div className="min-h-screen text-slate-300 flex items-center justify-center p-4">
            {showPendingInfo && (
                <div 
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
                    role="dialog"
                    aria-modal="true"
                >
                    <style>
                        {`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
                    </style>
                    <div className="w-full max-w-md">
                        <Panel>
                            <div className="flex flex-col space-y-4 text-center">
                                <h2 className="text-xl font-bold text-white">Thông báo</h2>
                                <p className="text-slate-300">
                                    {pendingInfoMessage}
                                </p>
                                <div className="pt-4">
                                    {isEmailInUse ? (
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button 
                                                onClick={handleResendFromRegister}
                                                disabled={isLoading}
                                                className="flex-1 px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                                            >
                                                Gửi lại email xác thực
                                            </button>
                                            <button 
                                                onClick={handleClosePendingInfo}
                                                className="flex-1 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
                                            >
                                                Đã hiểu
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={handleClosePendingInfo}
                                            className="w-full px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
                                        >
                                            Đã hiểu
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
            )}
            <main className="max-w-md w-full">
                <style>
                    {`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
                </style>
                <div className="text-center mb-8">
                    <h1 className="led-text-effect text-3xl sm:text-4xl font-black tracking-wider uppercase" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.4)' }}>
                        AI Photoshoot
                    </h1>
                    <h2 className="text-xl font-bold text-slate-100 mt-4">Biến Ý Tưởng Thành Tuyệt Tác</h2>
                    <p className="mt-2 text-slate-400 text-sm">Đăng nhập hoặc đăng ký để bắt đầu tạo ảnh chuyên nghiệp với AI.</p>
                </div>
                <Panel className="animate-fade-in">
                     <div className="p-1 bg-slate-900 rounded-lg flex space-x-2 shadow-lg mb-6">
                        <button 
                            onClick={() => handleTabChange(true)}
                            className={`flex-1 px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${isLogin ? 'bg-emerald-500 text-white shadow-glow-green' : 'text-slate-300 hover:bg-slate-700'}`}
                            aria-pressed={isLogin}
                        >
                            Đăng nhập
                        </button>
                        <button 
                            onClick={() => handleTabChange(false)}
                            className={`flex-1 px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${!isLogin ? 'bg-emerald-500 text-white shadow-glow-green' : 'text-slate-300 hover:bg-slate-700'}`}
                            aria-pressed={!isLogin}
                        >
                            Đăng ký
                        </button>
                    </div>
                    <form onSubmit={handleAuthAction} className="flex flex-col space-y-6">
                        
                        {error && (
                             <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm" role="alert">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="bg-blue-900/50 border border-blue-700 text-blue-200 px-4 py-3 rounded-lg text-sm" role="alert">
                                {message}
                            </div>
                        )}

                        {!isLogin && (
                             <>
                                <div>
                                    <label htmlFor="avatar-upload" className="block text-sm font-medium text-slate-300 mb-2">Ảnh đại diện (Tùy chọn)</label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors" onClick={() => avatarInputRef.current?.click()}>
                                                {avatarPreview ? (
                                                    <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover rounded-full"/>
                                                ) : (
                                                    <UploadIcon className="text-slate-500" />
                                                )}
                                            </div>
                                             <input
                                                id="avatar-upload"
                                                type="file"
                                                ref={avatarInputRef}
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                                accept="image/png, image/jpeg, image/webp"
                                            />
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => avatarInputRef.current?.click()} className="px-4 py-2 text-sm font-semibold bg-slate-700/80 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md">
                                                Chọn ảnh
                                            </button>
                                            {avatarFile && (
                                                <button type="button" onClick={handleRemoveAvatar} className="ml-2 text-xs text-slate-400 hover:text-red-400 transition-colors">
                                                    Xóa ảnh
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="displayName-input" className="block text-sm font-medium text-slate-300 mb-2">
                                        Tên hiển thị
                                    </label>
                                    <input
                                        id="displayName-input"
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="Tên của bạn"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                             </>
                        )}


                        <div>
                            <label htmlFor="email-input" className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                id="email-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                placeholder="email@example.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                         <div>
                            <label htmlFor="password-input" className="block text-sm font-medium text-slate-300 mb-2">
                                Mật khẩu
                            </label>
                            <input
                                id="password-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        {isLogin && (
                             <div className="text-right text-sm -mt-2">
                                <button type="button" onClick={handlePasswordReset} className="text-emerald-400 hover:underline" disabled={isLoading}>
                                    Quên mật khẩu?
                                </button>
                            </div>
                        )}

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
                            {isLoading ? 'Đang xử lý...' : (isLogin ? 'Tiếp tục Sáng tạo' : 'Bắt đầu Miễn phí')}
                        </button>
                    </form>
                </Panel>
            </main>
        </div>
    );
};
