
import React, { useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Panel } from './Panel';

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
    
    const [error, setError] = useState<React.ReactNode | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    const [showPendingInfo, setShowPendingInfo] = useState(false);
    const [pendingInfoMessage, setPendingInfoMessage] = useState('');
    // State riêng để biết có cần hiện nút gửi lại trong modal không
    const [showResendInModal, setShowResendInModal] = useState(false);
    
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
            setShowResendInModal(false);

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

    const handleTabChange = (loginState: boolean) => {
        setIsLogin(loginState);
        setError(null);
        setMessage(null);
    };
    
    const handleClosePendingInfo = () => {
        setShowPendingInfo(false);
        setPendingInfoMessage('');
        setShowResendInModal(false);
        // Đảm bảo đăng xuất nếu chưa xác thực xong để bảo mật
        signOut(auth).catch(() => {});
        setIsLogin(true); 
        // Giữ lại email, chỉ xóa password để user tiện nhập lại
        setPassword('');
    };

    // Hàm xử lý gửi lại email xác thực (Dùng cho cả đăng ký và đăng nhập)
    const handleResendVerification = async () => {
        if (!email || !password) {
            setError("Vui lòng nhập đầy đủ Email và Mật khẩu để gửi lại mã xác thực.");
            setShowPendingInfo(false);
            return;
        }

        setIsLoading(true);
        setMessage(null);
        setError(null);
        
        try {
            // 1. Cố gắng đăng nhập lại để lấy user object mới nhất (Silent Re-auth)
            // Điều này cực kỳ quan trọng vì user object cũ có thể đã bị signout hoặc hết hạn token
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                setPendingInfoMessage("Tài khoản này đã được xác thực rồi! Bạn có thể đăng nhập ngay.");
                setShowResendInModal(false);
                setShowPendingInfo(true);
                setIsLoading(false);
                return;
            }

            // 2. Gửi email
            const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
            await sendEmailVerification(user, { 
                url: continueUrl,
                handleCodeInApp: true
            });

            // 3. Thông báo
            setPendingInfoMessage(`Đã gửi lại email xác thực tới ${email}. Vui lòng kiểm tra hộp thư đến và cả mục Spam.`);
            setShowResendInModal(true); // Vẫn hiện nút để gửi lại nếu cần
            setShowPendingInfo(true);

        } catch (err: any) {
            console.error("Resend error:", err);
            setShowPendingInfo(false); // Tắt modal để hiện lỗi trên form chính
            
            if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                 setError("Mật khẩu không đúng. Vui lòng nhập lại mật khẩu để gửi lại mã.");
            } else if (err.code === 'auth/too-many-requests') {
                 setError("Bạn đã gửi yêu cầu quá liên tục. Vui lòng đợi vài phút rồi thử lại.");
            } else if (err.code === 'auth/user-not-found') {
                 setError("Không tìm thấy tài khoản với email này.");
            } else {
                 setError("Không thể gửi email. Vui lòng thử lại sau.");
            }
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
                    // Nếu chưa xác thực -> Hiện Modal yêu cầu xác thực
                    setPendingInfoMessage("Tài khoản chưa được xác thực. Vui lòng kiểm tra email để kích hoạt.");
                    setShowResendInModal(true); // Cho phép gửi lại
                    setShowPendingInfo(true);
                    
                    // Lưu ý: Chúng ta KHÔNG gọi signOut() ngay ở đây để giữ phiên làm việc
                    // giúp nút "Gửi lại" hoạt động được. App.tsx sẽ tự handle việc không cho vào trong.
                }
                // Nếu đã xác thực -> App.tsx tự động chuyển vào trong
            } catch (err: any) {
                console.error("Login error:", err);
                if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                    setError("Email hoặc mật khẩu không chính xác.");
                } else if (err.code === 'auth/too-many-requests') {
                    setError("Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau.");
                } else {
                    setError("Đăng nhập thất bại. Vui lòng kiểm tra kết nối mạng.");
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            // === LOGIC ĐĂNG KÝ ===
            try {
                // 1. Tạo User Auth
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Tự động tạo tên hiển thị từ email
                const defaultDisplayName = email.split('@')[0];

                // 2. Tạo User trong Firestore
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: email,
                    displayName: defaultDisplayName,
                    photoURL: null,
                    role: 'user',
                    status: 'pending',
                    createdAt: serverTimestamp(),
                });

                // 3. Gửi Email xác thực
                const continueUrl = `${window.location.origin}${window.location.pathname}?fromVerification=true&email=${encodeURIComponent(email)}`;
                await sendEmailVerification(user, { 
                    url: continueUrl,
                    handleCodeInApp: true 
                });

                // 4. Hiển thị popup thành công
                setPendingInfoMessage(`Đăng ký thành công! Email xác thực đã được gửi tới ${email}.`);
                setShowResendInModal(true);
                setShowPendingInfo(true);
                
            } catch (err: any) {
                console.error("Registration error:", err);
                if (err.code === 'auth/email-already-in-use') {
                    // Nếu email đã tồn tại, gợi ý đăng nhập hoặc gửi lại mã
                    setPendingInfoMessage("Email này đã được đăng ký. Nếu bạn chưa nhận được mã, hãy nhấn nút gửi lại bên dưới.");
                    setShowResendInModal(true);
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
                                {showResendInModal && (
                                     <button 
                                        onClick={handleResendVerification}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/30"
                                    >
                                        {isLoading ? 'Đang gửi lại...' : 'Gửi lại Email xác thực'}
                                    </button>
                                )}
                                <button 
                                    onClick={handleClosePendingInfo}
                                    className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-colors border border-slate-500"
                                >
                                    Đóng & Đăng nhập lại
                                </button>
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
                        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm mb-4 break-words shadow-inner animate-pulse" role="alert">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg text-sm mb-4 break-words shadow-inner" role="alert">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleAuthAction} className="space-y-4">
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
