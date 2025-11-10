
import React, { useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Panel } from './Panel';

export const AuthManager: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<React.ReactNode | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        if (isLogin) {
            // Handle Login
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                if (!userCredential.user.emailVerified) {
                    const resendVerification = async () => {
                        setIsLoading(true);
                        setMessage(null);
                        setError(null);
                        try {
                            await sendEmailVerification(userCredential.user);
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
                // onAuthStateChanged in App.tsx will handle the rest
            } catch (err: any) {
                console.error("Login error:", err);
                if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                    setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
                } else {
                    setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
                }
            }
        } else {
            // Handle Register
            if (password.length < 6) {
                setError("Mật khẩu phải chứa ít nhất 6 ký tự.");
                setIsLoading(false);
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Send verification email
                await sendEmailVerification(user);

                // Create user profile in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: user.email,
                    role: 'user',
                    status: 'pending',
                    createdAt: serverTimestamp()
                });

                setMessage("Đăng ký thành công! Một email xác thực đã được gửi đến bạn. Vui lòng xác thực và chờ quản trị viên phê duyệt tài khoản.");
                setIsLogin(true); // Switch to login view after registration
                setEmail('');
                setPassword('');
            } catch (err: any) {
                console.error("Registration error:", err);
                if (err.code === 'auth/email-already-in-use') {
                    setError(
                         <>
                            <p className="font-bold">Email này đã được sử dụng</p>
                            <p className="mt-1">
                                Có vẻ như bạn đã có tài khoản. Hãy thử{' '}
                                <button
                                    type="button"
                                    className="font-semibold underline hover:text-white transition-colors"
                                    onClick={() => {
                                        setIsLogin(true);
                                        setError(null);
                                        setMessage(null);
                                    }}
                                >
                                    đăng nhập
                                </button>
                                .
                            </p>
                        </>
                    );
                } else if (err.code === 'auth/invalid-email') {
                    setError('Địa chỉ email không hợp lệ.');
                } else {
                    setError('Đăng ký không thành công do có lỗi xảy ra. Vui lòng thử lại.');
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
            <main className="max-w-md w-full">
                <style>
                    {`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}
                </style>
                <Panel className="animate-fade-in">
                    <form onSubmit={handleAuthAction} className="flex flex-col space-y-6">
                        <div className="text-center">
                             <h1 className="led-text-effect text-3xl sm:text-4xl font-black tracking-wider uppercase" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.4)' }}>
                                AI Photoshoot
                            </h1>
                            <h2 className="text-xl font-bold text-slate-100 mt-4">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
                        </div>
                        
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
                             <div className="text-right text-sm">
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
                            {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
                        </button>
                        
                        <div className="text-center text-sm text-slate-400">
                           {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                            <button 
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError(null);
                                    setMessage(null);
                                }}
                                className="text-emerald-400 hover:underline ml-1 font-semibold"
                                disabled={isLoading}
                            >
                                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                            </button>
                        </div>
                    </form>
                </Panel>
            </main>
        </div>
    );
};
