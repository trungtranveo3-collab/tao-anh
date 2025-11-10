import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// HƯỚNG DẪN:
// 1. Truy cập https://console.firebase.google.com/
// 2. Tạo một dự án Firebase mới (hoặc chọn dự án đã có).
// 3. Đi tới Cài đặt dự án (Project Settings) > tab Chung (General).
// 4. Trong phần "Ứng dụng của bạn" (Your apps), tạo một ứng dụng web mới.
// 5. Sao chép đối tượng cấu hình (firebaseConfig) và dán vào đây.
// 6. QUAN TRỌNG: Vào mục Authentication -> Sign-in method và BẬT phương thức "Email/Password".
// 7. QUAN TRỌNG: Vào mục Firestore Database, tạo cơ sở dữ liệu và thiết lập Rules.
const firebaseConfig = {
  apiKey: "AIzaSyAROqhDGKi8zhSyReVTVlmy0eXVQSq1cHc",
  authDomain: "ai-photo-b93e1.firebaseapp.com",
  projectId: "ai-photo-b93e1",
  storageBucket: "ai-photo-b93e1.firebasestorage.app",
  messagingSenderId: "132271026945",
  appId: "1:132271026945:web:b37146289c4aee1e64e100",
  measurementId: "G-6Q2XT032SB"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Authentication và lấy tham chiếu đến dịch vụ
export const auth = getAuth(app);

// Khởi tạo Firestore Database
export const db = getFirestore(app);