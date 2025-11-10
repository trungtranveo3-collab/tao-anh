import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Panel } from './Panel';

interface UserData {
    id: string;
    email: string;
    role: 'admin' | 'user';
    status: 'pending' | 'approved';
    createdAt: any;
}

interface AdminPanelProps {
    onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const handleApproveUser = async (userId: string) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, {
                status: 'approved'
            });
            // Refresh user list to show the change
            setUsers(prevUsers => prevUsers.map(user => 
                user.id === userId ? { ...user, status: 'approved' } : user
            ));
        } catch (err) {
            console.error("Error approving user: ", err);
            alert("Đã xảy ra lỗi khi phê duyệt người dùng.");
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
                                    <th scope="col" className="px-6 py-3">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan={4} className="text-center p-4">Đang tải...</td></tr>
                                ) : (
                                    users.map(user => (
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
                                                {user.status === 'pending' && (
                                                    <button 
                                                        onClick={() => handleApproveUser(user.id)}
                                                        className="font-medium text-emerald-400 hover:underline"
                                                    >
                                                        Duyệt
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Panel>
            </div>
        </div>
    );
};
