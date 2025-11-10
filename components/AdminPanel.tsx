

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Panel } from './Panel';

interface UserData {
    id: string;
    email: string;
    role: 'admin' | 'user';
    status: 'pending' | 'approved';
    createdAt: any;
    expiresAt?: Timestamp;
}

interface AdminPanelProps {
    onClose: () => void;
    currentUserProfile: { uid: string };
}

const DURATION_OPTIONS = [
    { label: '7 ngày', value: 7 },
    { label: '30 ngày', value: 30 },
    { label: '1 năm', value: 365 },
    { label: 'Vĩnh viễn', value: -1 },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, currentUserProfile }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [approvingUser, setApprovingUser] = useState<{ id: string, duration: number } | null>(null);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<{ role: 'user' | 'admin', duration: number }>({ role: 'user', duration: 30 });


    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, orderBy('createdAt', 'desc'));
            const userSnapshot = await getDocs(q);
            const userList = userSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as UserData));
            setUsers(userList);
        } catch (err) {
            console.error("Error fetching users: ", err);
            setError("Không thể tải danh sách người dùng.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleConfirmApproval = async () => {
        if (!approvingUser) return;

        try {
            const { id, duration } = approvingUser;
            const userDocRef = doc(db, 'users', id);
            
            let expirationDate: Date | null = null;
            if (duration > 0) {
                expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + duration);
            }

            await updateDoc(userDocRef, {
                status: 'approved',
                approvedAt: serverTimestamp(),
                expiresAt: expirationDate ? Timestamp.fromDate(expirationDate) : null,
            });
            
            setApprovingUser(null);
            fetchUsers(); // Refresh the list
        } catch (err) {
            console.error("Error approving user: ", err);
            setError("Đã xảy ra lỗi khi phê duyệt người dùng.");
        }
    };

    const handleEditStart = (user: UserData) => {
        setEditingUserId(user.id);
        setEditFormData({ role: user.role, duration: 30 });
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
    };

    const handleUpdateUser = async () => {
        if (!editingUserId) return;

        try {
            const userDocRef = doc(db, 'users', editingUserId);
            const { role, duration } = editFormData;

            let expirationDate: Date | null = null;
            if (duration > 0) {
                expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + duration);
            }

            await updateDoc(userDocRef, {
                role: role,
                expiresAt: expirationDate ? Timestamp.fromDate(expirationDate) : null,
            });

            setEditingUserId(null);
            fetchUsers();
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Lỗi khi cập nhật người dùng.");
        }
    };

    const handleLockUser = async (userId: string) => {
        if (window.confirm("Bạn có chắc muốn khóa tài khoản này? Người dùng sẽ không thể đăng nhập cho đến khi được duyệt lại.")) {
            try {
                const userDocRef = doc(db, 'users', userId);
                await updateDoc(userDocRef, { status: 'pending' });
                fetchUsers();
            } catch (err) {
                console.error("Error locking user:", err);
                setError("Lỗi khi khóa tài khoản.");
            }
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <Panel className="flex flex-col space-y-4 max-h-[90vh]">
                     <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Bảng Quản trị Người dùng</h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                    </div>
                    
                    {error && <div className="text-red-400">{error}</div>}

                    <div className="overflow-y-auto flex-grow">
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="text-xs text-emerald-400 uppercase bg-slate-800/50 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Vai trò</th>
                                    <th scope="col" className="px-6 py-3">Trạng thái</th>
                                    <th scope="col" className="px-6 py-3">Ngày hết hạn</th>
                                    <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan={5} className="text-center p-4">Đang tải...</td></tr>
                                ) : (
                                    users.map(user => {
                                        const isCurrentUser = user.id === currentUserProfile.uid;
                                        if (editingUserId === user.id) {
                                            // INLINE EDITING VIEW
                                            return (
                                                <tr key={user.id} className="bg-slate-700/50">
                                                    <td className="px-6 py-4 font-medium text-white">{user.email}</td>
                                                    <td className="px-6 py-4">
                                                        <select
                                                            value={editFormData.role}
                                                            onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as 'user' | 'admin' })}
                                                            className="w-full bg-slate-600 border border-slate-500 rounded-md px-2 py-1 text-white text-xs focus:ring-emerald-500 focus:border-emerald-500"
                                                        >
                                                            <option value="user">User</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                         <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-600 text-green-100">
                                                            Đã duyệt
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <select
                                                            value={editFormData.duration}
                                                            onChange={(e) => setEditFormData({ ...editFormData, duration: Number(e.target.value) })}
                                                            className="w-full bg-slate-600 border border-slate-500 rounded-md px-2 py-1 text-white text-xs focus:ring-emerald-500 focus:border-emerald-500"
                                                        >
                                                            {DURATION_OPTIONS.map(opt => (
                                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-4">
                                                            <button onClick={handleUpdateUser} className="font-medium text-emerald-400 hover:underline">Lưu</button>
                                                            <button onClick={handleCancelEdit} className="font-medium text-slate-400 hover:underline">Hủy</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            // NORMAL VIEW
                                            return (
                                                <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800/30">
                                                    <td className="px-6 py-4 font-medium text-white">{user.email}</td>
                                                    <td className="px-6 py-4">{user.role}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                            user.status === 'approved' ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
                                                        }`}>
                                                            {user.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user.status === 'approved' 
                                                            ? (user.expiresAt ? user.expiresAt.toDate().toLocaleDateString('vi-VN') : 'Vĩnh viễn')
                                                            : 'N/A'
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {user.status === 'pending' && (
                                                            approvingUser?.id === user.id ? (
                                                                <div className="flex items-center gap-2">
                                                                    <select
                                                                        value={approvingUser.duration}
                                                                        onChange={(e) => setApprovingUser({ ...approvingUser, duration: Number(e.target.value) })}
                                                                        className="w-full bg-slate-700 border border-slate-600 rounded-md px-2 py-1 text-white text-xs focus:ring-emerald-500 focus:border-emerald-500"
                                                                    >
                                                                        {DURATION_OPTIONS.map(opt => (
                                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                        ))}
                                                                    </select>
                                                                    <button onClick={handleConfirmApproval} className="px-2 py-1 text-xs bg-emerald-600 rounded">OK</button>
                                                                    <button onClick={() => setApprovingUser(null)} className="px-2 py-1 text-xs bg-slate-600 rounded">Hủy</button>
                                                                </div>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => setApprovingUser({ id: user.id, duration: 30 })}
                                                                    className="font-medium text-emerald-400 hover:underline"
                                                                >
                                                                    Duyệt
                                                                </button>
                                                            )
                                                        )}
                                                        {user.status === 'approved' && !isCurrentUser && (
                                                            <div className="flex items-center justify-center gap-4">
                                                                <button onClick={() => handleEditStart(user)} className="font-medium text-sky-400 hover:underline">Sửa</button>
                                                                <button onClick={() => handleLockUser(user.id)} className="font-medium text-red-400 hover:underline">Khóa</button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </Panel>
            </div>
        </div>
    );
};