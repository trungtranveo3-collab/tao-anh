
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
    
    // Removed isEmailInUse state as we handle it directly in catch block now

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
            setError("Vui lòng nhập mật khẩu của bạn trên form đăng ký để thử lại.");
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
                    // Sign out immediately to prevent access
                    auth.signOut(); 
                }
                // If verified, App.tsx listener will handle the rest
            } catch (err: any) {
                console.error("Login error:", err);
                if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                    setError("Email hoặc mật khẩu không chính xác.");
                } else if (err.code === 'auth/too-many-requests') {
                    setError("Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau.");
                } else {
                    setError("Đăng nhập thất bại. Vui lòng thử lại.");
                }
                setIsLoading(false);
            }
        } else {
            // === REGISTER LOGIC ===
            // FIX: Removed fetchSignInMethodsForEmail as it causes issues on custom domains/production
            // due to Google's email enumeration protection.
            
            try {
                // 1. Create Authentication User first
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // 2. Upload Avatar (Fail-safe: If upload fails, we still proceed)
                let photoURL = null;
                if (avatarFile) {
                    try {
                        const storageRef = ref(storage, `avatars/${user.uid}`);
                        await uploadBytes(storageRef, avatarFile);
                        photoURL = await getDownloadURL(storageRef);
                    } catch (uploadErr) {
                        console.error("Avatar upload failed but continuing registration:", uploadErr);
                        // We silently fail the avatar upload to ensure the user account is still created.
                        // This fixes the issue where network errors during upload leave the user in a broken state.
                    }
                }

                // 3. Update Auth Profile
                await updateProfile(user, {
                    displayName: displayName,
                    photoURL: photoURL
                });

                // 4. Create User Document in Firestore (Crucial step)
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                    role: 'user', // Default role
                    status: 'pending', // Default status
                    createdAt: serverTimestamp(),
                });

                // 5. Send Verification Email
                const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
                await sendEmailVerification(user, { url: continueUrl });

                // 6. Show success message
                setPendingInfoMessage(`Đăng ký thành công! Chúng tôi đã gửi email xác thực tới ${email}. Vui lòng kiểm tra hộp thư.`);
                setShowPendingInfo(true);
                
                // Clear form
                setAvatarFile(null);
                setAvatarPreview(null);

            } catch (err: any) {
                console.error("Registration error:", err);
                if (err.code === 'auth/email-already-in-use') {
                    // This error is now caught here directly instead of using fetchSignInMethodsForEmail
                    setPendingInfoMessage("Email này đã được đăng ký.");
                    setShowPendingInfo(true);
                    // Note: We handle the logic to "resend email" inside the PendingInfo modal via handleResendFromRegister
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
            setError("Vui lòng nhập email để đặt lại mật khẩu.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setMessage(null);
        try {
             // Config URL to redirect back to app after password reset
             const actionCodeSettings = {
                url: `${window.location.origin}${window.location.pathname}`,
                handleCodeInApp: true,
            };
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setMessage("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.");
        } catch (err: any) {
            console.error("Reset password error:", err);
            if (err.code === 'auth/user-not-found') {
                 setError("Không tìm thấy tài khoản với email này.");
            } else {
                 setError("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.");
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
                <Panel className="animate-fade-in">
                    <div className="text-center mb-8">
                        <h1 className="led-text-effect text-4xl font-black tracking-wider uppercase mb-2" style={{ textShadow: '0 0 15px rgba(52, 211, 153, 0.5)' }}>
                            AI Photoshoot
                        </h1>
                        <p className="text-slate-400 text-sm">Sáng tạo hình ảnh chuyên nghiệp với sức mạnh AI</p>
                    </div>

                    {/* Pending Info Modal / Overlay */}
                    {showPendingInfo && (
                         <div className="absolute inset-0 z-20 bg-slate-900/95 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Thông báo</h3>
                            <p className="text-slate-300 mb-6">{pendingInfoMessage}</p>
                            
                            <div className="flex flex-col w-full space-y-3">
                                {pendingInfoMessage.includes("Email này đã được đăng ký") ? (
                                     <button 
                                        onClick={handleResendFromRegister}
                                        disabled={isLoading}
                                        className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                                    >
                                        {isLoading ? 'Đang xử lý...' : 'Gửi lại Email Xác thực & Đăng nhập'}
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleClosePendingInfo}
                                        className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                                    >
                                        Đã hiểu, quay lại Đăng nhập
                                    </button>
                                )}
                                
                                {pendingInfoMessage.includes("Email này đã được đăng ký") && (
                                    <button 
                                        onClick={handleClosePendingInfo}
                                        className="text-sm text-slate-400 hover:text-white"
                                    >
                                        Hủy bỏ
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

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

                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm mb-4 break-words" role="alert">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg text-sm mb-4 break-words" role="alert">
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
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="VD: Minh Tuấn"
                                        required={!isLogin}
                                    />
                                </div>
                                <div className="space-y-1">
                                     <label className="text-sm font-medium text-slate-300">Ảnh đại diện (Tùy chọn)</label>
                                     <div className="flex items-center space-x-4">
                                        <div 
                                            className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors"
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
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
