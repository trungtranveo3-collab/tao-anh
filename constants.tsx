import React from 'react';
// FIX: Added 'Accessory' to the type imports to be used for BASE_ACCESSORY_DEFAULTS.
import type { Style, StyleTab, ImageType, AccessorySuggestions, AccessoryDefaults, Accessory, AspectRatio, IdPhotoSize, IdPhotoBackground, IdPhotoAttire } from './types';

// Icons for Styles
const UserTieIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
);
const PaletteIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4c-.83 0-1.5-.67-1.5-1.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
);
const CameraIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 10.5L11 12.82 12.6 11l3.4 4.5H5l4.4-6.5zM20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/></svg>
);
const RobotIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 11h-1.7c0-3.35-2.28-6.24-5.29-7.29l.3-1.71H19V0h-9.5l-.3 1.71C5.88 2.82 4 5.92 4 9.5V11H2v2h2v2H2v2h2v-2h1v2c0 1.65 1.35 3 3 3h8c1.65 0 3-1.35 3-3v-2h1v2h2v-2h-2v-2h2v-2zm-9 6c-1.65 0-3-1.35-3-3V9.5c0-1.65 1.35-3 3-3s3 1.35 3 3V14c0 1.65-1.35 3-3 3zm1-11.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
);
const LeafIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.96 16.17 11 13 17 12V8zM17 3C9 3 4 8 4 13c0 1.66-1.34 3-3 3s-3-1.34-3-3c0-6.39 5.61-12 12-12 1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>
);
const FilmIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
);
const StarIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
);
const NewspaperIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 3h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2-2-2zm0 2v14h16V5H4zm2 2h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2zm10-5h2v6h-2v-6z"/></svg>
);
const WeddingRingIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.34 2.1c-1.17-.35-2.39-.54-3.64-.54-4.22 0-7.88 2.02-10.23 5.03l1.55 1.29c1.9-2.39 4.81-3.82 8.04-3.82.91 0 1.77.13 2.58.37l-1.01 1.01c-.43-.1-.87-.15-1.32-.15-3.31 0-6 2.69-6 6s2.69 6 6 6c.45 0 .89-.05 1.32-.15l-1.01 1.01c-.81.24-1.67.37-2.58.37-3.23 0-6.14-1.43-8.04-3.82L-1.53 17.3c2.35 3.01 6.01 5.03 10.23 5.03 1.25 0 2.47-.19 3.64-.54L20.29 23l1.41-1.41-8.36-8.36z M20 12c0-3.31-2.69-6-6-6-.45 0-.89.05-1.32.15l1.01-1.01c.81-.24 1.67-.37 2.58-.37 3.23 0 6.14 1.43 8.04 3.82l1.55-1.29C22.52 4.31 18.86 2.29 14.64 2.29c-1.25 0-2.47.19-3.64.54L4.12 16H4c-1.1 0-2 .9-2 2s.9 2 2 2h.12l-1.29 1.29 1.41 1.41L21.41 2.59 20 1.18z"/></svg>
);
const NatureIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13 16.12c-3.39 0-6.13-2.73-6.13-6.12 0-3.38 2.74-6.12 6.13-6.12s6.13 2.74 6.13 6.12c0 3.39-2.74 6.12-6.13 6.12zM13 2.88c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zM1 21h12v2H1z"/></svg>
);
const CityIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M15 11V5l-3-3-3 3v6H2v10h11v-5h-2v3H4v-6h9v5h2v-3h2v-2h-4z"/></svg>
);
const TrendingIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/></svg>
);
const ShoppingBagIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/></svg>
);
const IdCardIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9 11H6V9h3v2zm6 0h-3V9h3v2zm3 0h-1.5V9H18v2zm-9 4H6v-2h3v2zm3 0h-1.5v-2H12v2zm3 0h-3v-2h3v2zm3 0h-1.5v-2H18v2z"/></svg>
);

export const CustomPromptIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/></svg>
);


// Illustrations for Image Types
const PortraitIllustrationIcon: React.FC<{ className?: string }> = ({ className = 'h-10 w-10' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12c-3.333 0-6 2.667-6 6v2h12v-2c0-3.333-2.667-6-6-6z" />
    </svg>
);

const HalfBodyIllustrationIcon: React.FC<{ className?: string }> = ({ className = 'h-10 w-10' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="6" r="3" />
        <path d="M12 9c-3.866 0-7 3.134-7 7v4h14v-4c0-3.866-3.134-7-7-7z" />
        <path d="M9 16c0-1.657 1.343-3 3-3s3 1.343 3 3" />
    </svg>
);

const FullBodyIllustrationIcon: React.FC<{ className?: string }> = ({ className = 'h-10 w-10' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v5" />
        <path d="M9 12h6" />
        <path d="M12 12l-2 7" />
        <path d="M12 12l2 7" />
    </svg>
);

// Icons for Aspect Ratios
const LandscapeIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
    </svg>
);
const PortraitIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="3" width="8" height="18" rx="2" />
    </svg>
);
const SquareIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
);


// Icons for Accessories
export const OutfitIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H20.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/><path d="m20.15 10-1.3-7.14"/><path d="M3.85 10 2.55 2.86"/><path d="M12 10v12"/><path d="M6 22h12"/></svg>
);
export const FootwearIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4Z"/><path d="m16 12-3-3"/><path d="M4 12v8h16v-8Z"/><path d="M4 16h16"/></svg>
);
export const BagIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 18a4 4 0 0 0-4 4h16a4 4 0 0 0-4-4Z"/><path d="M12 18V2a4 4 0 0 0-4 4v2"/><path d="M12 2a4 4 0 0 1 4 4v2"/></svg>
);
export const HatIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4-8-10V9a8 8 0 0 1 16 0v3c0 6-8 10-8 10Z"/><path d="M12 22s-4-2-4-5"/><path d="M12 22s4-2 4-5"/></svg>
);
export const GlassesIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/><path d="m21.5 13-2.5-6c-.7-1.3-1.4-2-3-2"/></svg>
);

export const STYLE_TABS: StyleTab[] = [
    { id: 'trends', name: 'Theo Trend' },
    { id: 'style', name: 'Phong Cách' },
    { id: 'product', name: 'Sản Phẩm' },
    { id: 'id_photo', name: 'Ảnh Thẻ' },
    { id: 'wedding', name: 'Ảnh Cưới' },
    { id: 'celebrity', name: 'Ghép với Sao' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'panorama', name: 'Toàn cảnh' },
];

const WEDDING_STYLES: Style[] = [
    { 
        id: 'wedding_studio', 
        name: 'Studio Lãng mạn', 
        icon: WeddingRingIcon, 
        category: 'wedding', 
        prompt: "Với tư cách là một nhiếp ảnh gia cưới cao cấp của tạp chí Junebug Weddings, hãy tạo ra một bức ảnh cưới 4K siêu thực, tinh tế và lãng mạn. **Chủ thể**: Cặp đôi từ ảnh tải lên, thể hiện sự kết nối tình cảm, ánh mắt trìu mến. **Bối cảnh**: Một studio tối giản, sang trọng với phông nền canvas màu xám nhạt hoặc tường trắng tinh. Có thể có một vài chi tiết trang trí nhẹ nhàng như một bình hoa baby trắng. **Ánh sáng**: Sử dụng kỹ thuật ánh sáng Rembrandt với một softbox lớn làm nguồn sáng chính để tạo khối mềm mại trên khuôn mặt và một đèn phụ nhẹ để làm dịu bóng tối. **Máy ảnh & Ống kính**: Chụp bằng máy ảnh medium format Hasselblad với ống kính 80mm f/1.9 để có độ chi tiết đáng kinh ngạc và hiệu ứng bokeh mịn như kem. **Hậu kỳ**: Chỉnh màu theo phong cách fine-art, tông màu ấm, da được retouch một cách tự nhiên, giữ lại kết cấu. **QUAN TRỌNG NHẤT**: Giữ nguyên vẹn và chính xác các đặc điểm khuôn mặt của cặp đôi từ ảnh gốc." 
    },
    { 
        id: 'wedding_outdoor', 
        name: 'Ngoại cảnh Thiên nhiên', 
        icon: NatureIcon, 
        category: 'wedding', 
        prompt: "Với tư cách là một nhiếp ảnh gia chuyên chụp ảnh cưới ngoại cảnh cho Style Me Pretty, hãy tạo ra một bức ảnh cưới 4K đẹp như tranh vẽ. **Chủ thể**: Cặp đôi từ ảnh tải lên, trong trang phục cưới thanh lịch, đang đi dạo hoặc tương tác tự nhiên. **Bối cảnh**: Một khung cảnh thiên nhiên thơ mộng vào 'giờ vàng' (golden hour) - có thể là một cánh đồng hoa oải hương, một bãi biển vắng với cát trắng và sóng nhẹ, hoặc một khu rừng thông với những tia nắng xuyên qua tán lá. **Ánh sáng**: Tận dụng tối đa ánh sáng tự nhiên của hoàng hôn để tạo viền sáng vàng óng quanh cặp đôi (rim light). **Máy ảnh & Ống kính**: Chụp bằng máy ảnh Canon EOS R5 với ống kính 50mm f/1.2L để bắt trọn không khí và tạo ra hậu cảnh mờ ảo mộng mơ. **Hậu kỳ**: Chỉnh màu trong trẻo, tươi sáng, tăng cường các tông màu ấm của hoàng hôn. **QUAN TRỌNG NHẤT**: Giữ nguyên vẹn và chính xác các đặc điểm khuôn mặt của cặp đôi từ ảnh gốc." 
    },
    { 
        id: 'wedding_classic', 
        name: 'Cổ điển & Hoài niệm', 
        icon: CameraIcon, 
        category: 'wedding', 
        prompt: "Với tư cách là một bậc thầy nhiếp ảnh cưới theo phong cách film cổ điển, hãy tạo ra một bức ảnh cưới 4K mang vẻ đẹp vượt thời gian. **Chủ thể**: Cặp đôi từ ảnh tải lên, tạo dáng trang trọng, cổ điển. **Bối cảnh**: Bên trong một công trình kiến trúc cổ kính như một thư viện cũ với kệ sách cao, một tòa lâu đài châu Âu, hoặc trên cầu thang lớn bằng đá cẩm thạch. **Ánh sáng**: Ánh sáng dịu nhẹ từ cửa sổ lớn, tạo ra sự chuyển tiếp mượt mà giữa vùng sáng và vùng tối, gợi cảm giác sâu lắng. **Máy ảnh & Ống kính**: Mô phỏng ảnh chụp từ máy film Contax 645 với ống kính Zeiss 80mm f/2. **Hậu kỳ**: Chuyển thành ảnh đen trắng có độ tương phản cao, hoặc chỉnh màu film cổ điển (như Kodak Portra 400) với tông màu hơi ngả xanh ở vùng tối và thêm một lớp grain film tinh tế. **QUAN TRỌNG NHẤT**: Giữ nguyên vẹn và chính xác các đặc điểm khuôn mặt của cặp đôi từ ảnh gốc."
    },
    { 
        id: 'wedding_modern', 
        name: 'Thành thị & Hiện đại', 
        icon: CityIcon, 
        category: 'wedding', 
        prompt: "Với tư cách là một nhiếp ảnh gia cưới thời trang và táo bạo, hãy tạo ra một bức ảnh cưới 4K độc đáo và hiện đại. **Chủ thể**: Cặp đôi từ ảnh tải lên, mặc trang phục cưới phá cách, thần thái tự tin. **Bối cảnh**: Bối cảnh thành phố về đêm, trên sân thượng một tòa nhà chọc trời với view triệu đô, hoặc giữa một con phố đông đúc với hiệu ứng vệt đèn (light trails) từ xe cộ. **Ánh sáng**: Sử dụng ánh sáng nhân tạo một cách sáng tạo, có thể là đèn flash trực tiếp (direct flash) để tạo phong cách edgy hoặc ánh sáng từ các bảng hiệu neon. **Máy ảnh & Ống kính**: Chụp bằng ống kính góc rộng 24-70mm f/2.8 để bắt trọn sự hùng vĩ của thành phố. **Hậu kỳ**: Chỉnh màu theo tông lạnh, kiểu cinematic, tăng độ tương phản và độ sắc nét. **QUAN TRỌG NHẤT**: Giữ nguyên vẹn và chính xác các đặc điểm khuôn mặt của cặp đôi từ ảnh gốc."
    },
];


const REGULAR_STYLES: Style[] = [
    { id: 'businessman', name: 'Doanh nhân Hiện đại', icon: UserTieIcon, category: 'style', prompt: "Với tư cách là nhiếp ảnh gia hàng đầu của tạp chí Forbes, hãy tạo một bức chân dung 8K siêu thực, mạnh mẽ của chủ thể trong vai trò một nhà lãnh đạo doanh nghiệp hiện đại. **Chủ thể**: Người trong ảnh, mặc một bộ suit được may đo hoàn hảo màu xanh navy hoặc xám than, biểu cảm tự tin nhưng gần gũi. **Bối cảnh**: Một văn phòng tối giản trên cao, nhìn ra cửa sổ lớn với khung cảnh thành phố mờ ảo (bokeh). **Ánh sáng**: Sử dụng kỹ thuật chiếu sáng 3 điểm chuyên nghiệp: đèn chính (key light) mềm mại để tạo khối, đèn phụ (fill light) nhẹ để giảm bóng, và đèn viền (rim light) tinh tế để tách chủ thể khỏi nền. **Máy ảnh & Ống kính**: Chụp bằng ống kính chân dung 85mm f/1.4 để tạo độ sâu trường ảnh nông, làm nổi bật chủ thể. **Hậu kỳ**: Chỉnh màu điện ảnh (cinematic color grading), chi tiết sắc nét, tông da hoàn hảo. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể. TRÁNH vẻ ngoài giả tạo của ảnh stock." },
    { id: 'artist', name: 'Nghệ sĩ Sáng tạo', icon: PaletteIcon, category: 'style', prompt: "Với tư cách là một nhiếp ảnh gia nghệ thuật chuyên chụp chân dung cho các nghệ sĩ, hãy tạo một bức ảnh 8K đầy cảm xúc và kịch tính. **Chủ thể**: Người trong ảnh, trang phục thể hiện cá tính riêng, có thể dính vài vệt sơn. **Bối cảnh**: Một studio nghệ thuật lộn xộn có chủ đích, với giá vẽ, toan, và các vệt sơn xung quanh. **Ánh sáng**: Sử dụng kỹ thuật chiếu sáng Rembrandt, tạo ra một tam giác sáng đặc trưng dưới mắt, mang lại chiều sâu và tâm trạng. **Máy ảnh & Ống kính**: Chụp bằng ống kính 50mm f/1.8 để có góc nhìn tự nhiên. **Hậu kỳ**: Tăng cường độ tương phản và kết cấu (texture), màu sắc có thể bão hòa hoặc giảm nhẹ để tạo không khí. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'classic', name: 'Cổ điển Đen trắng', icon: CameraIcon, category: 'style', prompt: "Với tư cách là một bậc thầy nhiếp ảnh đen trắng theo phong cách của Ansel Adams, hãy tạo một bức chân dung 8K đen trắng vượt thời gian. **Chủ thể**: Người trong ảnh. **Bối cảnh**: Phông nền đơn giản, tập trung hoàn toàn vào chủ thể. **Ánh sáng**: Ánh sáng mềm mại, khuếch tán từ một phía để điêu khắc các đường nét trên khuôn mặt. **Máy ảnh & Ống kính**: Mô phỏng máy ảnh Leica M với ống kính 35mm Summicron. **Hậu kỳ**: Độ tương phản cao, dải tông màu (tonal range) rộng từ đen sâu đến trắng sáng. Thêm một lớp nhiễu hạt (film grain) tinh tế để tăng cảm giác chân thực. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'future', name: 'Công nghệ Tương lai', icon: RobotIcon, category: 'style', prompt: "Với tư cách là đạo diễn hình ảnh của bộ phim Blade Runner, hãy tạo một bức ảnh 8K theo phong cách cyberpunk. **Chủ thể**: Người trong ảnh, có thể có các chi tiết công nghệ cao trên trang phục. **Bối cảnh**: Một con phố đêm ở thành phố tương lai, với các bảng hiệu neon rực rỡ, trời mưa nhẹ và các hình ảnh hologram. **Ánh sáng**: Ánh sáng neon phản chiếu trên da và quần áo, tạo ra các mảng màu xanh dương, hồng và tím. **Máy ảnh & Ống kính**: Sử dụng ống kính anamorphic để tạo hiệu ứng bokeh hình oval và lóa sáng (lens flare) đặc trưng. **Hậu kỳ**: Chỉnh màu với tông xanh và tím làm chủ đạo, độ tương phản cao và vùng tối sâu. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'natural', name: 'Tự nhiên & Thân thiện', icon: LeafIcon, category: 'style', prompt: "Với tư cách là nhiếp ảnh gia phong cách sống, hãy tạo một bức chân dung 8K tự nhiên và ấm áp. **Chủ thể**: Người trong ảnh, mặc trang phục đơn giản, thoải mái, tươi cười. **Bối cảnh**: Một công viên xanh mát hoặc khu vườn vào 'giờ vàng' (golden hour) cuối buổi chiều. **Ánh sáng**: Ánh sáng mặt trời tự nhiên, ấm áp, chiếu xiên. **Máy ảnh & Ống kính**: Chụp bằng ống kính 50mm f/1.8 để có góc nhìn tự nhiên và xóa phông nhẹ nhàng. **Hậu kỳ**: Chỉnh màu ấm áp, tươi sáng, giữ lại vẻ đẹp tự nhiên. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'cinematic', name: 'Phong cách Điện ảnh', icon: FilmIcon, category: 'style', prompt: "Với tư cách là đạo diễn hình ảnh (Cinematographer), hãy tạo một khung hình phim điện ảnh 8K. **Chủ thể**: Người trong ảnh, biểu cảm có chiều sâu, như đang ở giữa một câu chuyện. **Bối cảnh**: Một bối cảnh có tính kể chuyện, ví dụ như một quán cà phê vắng, một sân ga cũ. **Ánh sáng**: Ánh sáng kịch tính, có thể là ánh sáng le lói qua cửa sổ hoặc ánh đèn đường. **Máy ảnh & Ống kính**: Tỷ lệ khung hình siêu rộng (2.35:1). **Hậu kỳ**: Chỉnh màu theo phong cách Hollywood (ví dụ: tông màu cam và xanh mòng két - teal and orange), tạo viền đen trên dưới. **Yêu cầu cốt lõl**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'magazine', name: 'Tạp chí Nổi tiếng', icon: StarIcon, category: 'style', prompt: "Với tư cách là nhiếp ảnh gia thời trang của tạp chí Vogue, hãy tạo một bức ảnh bìa 8K đầy phong cách. **Chủ thể**: Người trong ảnh, trang phục thời thượng, thần thái đỉnh cao. **Bối cảnh**: Phông nền studio màu sắc hoặc một địa điểm kiến trúc độc đáo. **Ánh sáng**: Ánh sáng studio hoàn hảo, có thể sử dụng 'beauty dish' để làm nổi bật làn da và xương gò má. **Máy ảnh & Ống kính**: Chụp bằng ống kính 105mm f/1.4 để nén hậu cảnh và tập trung vào chủ thể. **Hậu kỳ**: Retouch da chuyên nghiệp, màu sắc rực rỡ, sống động. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'newspaper', name: 'Giang hồ Cũ', icon: NewspaperIcon, category: 'style', prompt: "Với tư cách là đạo diễn phim xã hội đen Hồng Kông thập niên 90, hãy tạo một bức ảnh 8K đậm chất 'giang hồ'. **Chủ thể**: Người trong ảnh, trang phục kiểu retro (sơ mi hoa, áo khoác da). **Bối cảnh**: Một con hẻm nhỏ ở Hồng Kông về đêm, hoặc một quán mạt chược. **Ánh sáng**: Ánh sáng kịch tính từ các nguồn sáng đơn lẻ, tạo bóng đổ mạnh. **Máy ảnh & Ống kính**: Mô phỏng máy quay phim cũ. **Hậu kỳ**: Chỉnh màu theo tông phim cũ, ngả vàng hoặc xanh, thêm hiệu ứng nhiễu hạt và có thể có vệt sáng mờ. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
];

const baseCompositePrompt = "Với tư cách là một chuyên gia Photoshop và nghệ sĩ kỹ thuật số, hãy tạo một bức ảnh ghép 4K siêu thực, liền mạch. **Nhiệm vụ**: Đặt người trong ảnh gốc vào bối cảnh của **{item}**. **Yêu cầu kỹ thuật**: Ánh sáng, bóng đổ, nhiệt độ màu và kết cấu trên người của chủ thể phải khớp một cách hoàn hảo với môi trường xung quanh để tạo ra một kết quả chân thực, đáng tin. **Yêu cầu cốt lõi**: Giữ nguyên vẹn và chính xác tất cả các đặc điểm khuôn mặt độc đáo của chủ thể. TRÁNH tuyệt đối cảm giác 'cắt dán' hoặc không tự nhiên.";
const CELEBRITY_PROMPT_TEMPLATE = "Với tư cách là một chuyên gia Photoshop và đạo diễn hình ảnh, hãy tạo một bức ảnh 4K siêu thực, liền mạch. **Nhiệm vụ**: Tạo một bức ảnh trong đó người từ ảnh gốc đang đứng cạnh và chụp ảnh chung với **{item}**. Hãy tưởng tượng đây là một khoảnh khắc được bắt gặp tự nhiên, ví dụ như tại một sự kiện, buổi ra mắt phim, hoặc một cuộc gặp gỡ tình cờ. **Yêu cầu kỹ thuật**: 1. **Chủ thể**: Phải có hai người trong ảnh: người từ ảnh gốc và **{item}**. 2. **Tương tác**: Hai người nên có tương tác tự nhiên, như thể họ đang thực sự ở cùng nhau. 3. **Bối cảnh & Ánh sáng**: Bối cảnh, ánh sáng, bóng đổ, và tông màu phải đồng nhất và nhất quán cho cả hai người, tạo ra một kết quả chân thực và đáng tin. **Yêu cầu cốt lõi**: Giữ nguyên vẹn 100% các đặc điểm khuôn mặt độc đáo của người trong ảnh gốc. TRÁNH tuyệt đối cảm giác 'cắt dán' hoặc không tự nhiên.";


const CELEBRITY_SUGGESTIONS: string[] = [
    // Vietnamese
    'Sơn Tùng M-TP', 'Trấn Thành', 'Mỹ Tâm', 'Hồ Ngọc Hà', 'Noo Phước Thịnh',
    'Jack (J97)', 'Đen Vâu', 'Hari Won', 'Chi Pu', 'Ngô Thanh Vân',
    // International - Male Actors
    'Keanu Reeves', 'Dwayne Johnson', 'Tom Cruise', 'Leonardo DiCaprio', 'Chris Hemsworth',
    'Robert Downey Jr.', 'Johnny Depp', 'Brad Pitt', 'Ryan Reynolds', 'Tom Holland',
    // International - Female Actors
    'Scarlett Johansson', 'Zendaya', 'Emma Watson', 'Gal Gadot', 'Angelina Jolie',
    'Margot Robbie', 'Jennifer Lawrence', 'Anne Hathaway', 'Emilia Clarke', 'Ana de Armas',
    // Music Artists
    'Taylor Swift', 'Beyoncé', 'BLACKPINK', 'BTS', 'Justin Bieber',
    'Ariana Grande', 'Billie Eilish', 'G-Dragon', 'The Weeknd', 'IU',
    // Fictional Characters
    'Iron Man', 'Spider-Man', 'Captain America', 'Wonder Woman', 'Elsa (Frozen)',
    'Harry Potter', 'Thám tử lừng danh Conan', 'Thủy thủ Mặt Trăng', 'Naruto', 'Luffy (One Piece)',
];

const TRAVEL_SUGGESTIONS: string[] = [
    // Vietnam
    'Vịnh Hạ Long', 'Phố cổ Hội An', 'Ruộng bậc thang Sapa', 'Cầu Vàng, Đà Nẵng', 'Bãi biển Phú Quốc',
    'Hồ Gươm, Hà Nội', 'Chợ Bến Thành, TP.HCM', 'Vịnh Nha Trang', 'Cố đô Huế', 'Hang Sơn Đoòng',
    'Mũi Né, Phan Thiết', 'Đảo Lý Sơn', 'Gành Đá Đĩa, Phú Yên', 'Côn Đảo', 'Hà Giang',
    // Asia
    'Tokyo, Nhật Bản', 'Kyoto, Nhật Bản', 'Seoul, Hàn Quốc', 'Bali, Indonesia', 'Bangkok, Thái Lan',
    'Singapore', 'Vạn Lý Trường Thành', 'Đền Angkor Wat', 'Taj Mahal, Ấn Độ', 'Đỉnh Everest, Nepal',
    'Phượng Hoàng Cổ Trấn', 'Làng chài Cửu Phần, Đài Loan', 'Tháp Namsan, Seoul',
    // Europe
    'Tháp Eiffel, Paris', 'Đấu trường La Mã, Rome', 'Cầu Tháp London', 'Santorini, Hy Lạp', 'Đi thuyền ở Venice, Ý',
    'Dãy Alps, Thụy Sĩ', 'Amsterdam, Hà Lan', 'Prague, Cộng hòa Séc', 'Barcelona, Tây Ban Nha', 'Ngắm Bắc Cực Quang',
    // Americas
    'Quảng trường Thời đại, New York', 'Grand Canyon, Mỹ', 'Machu Picchu, Peru', 'Tượng Chúa Cứu Thế, Brazil', 'Thác Niagara',
    'Hollywood, Los Angeles', 'Kim Tự Tháp Chichen Itza, Mexico',
    // Rest of world
    'Kim Tự Tháp Giza, Ai Cập', 'Nhà hát Opera Sydney, Úc', 'Dubai, UAE', 'Khinh khí cầu ở Cappadocia', 'Bãi biển Maldives',
    'Làng Hobbit, New Zealand', 'Thành phố Petra, Jordan'
];

const PANORAMA_SUGGESTIONS: string[] = [
    // Natural Landscapes
    'Bãi biển nhiệt đới hoàng hôn', 'Dãy núi hùng vĩ phủ tuyết', 'Rừng rậm Amazon bí ẩn', 'Hoang mạc Sahara vô tận', 'Cánh đồng hoa oải hương',
    'Dải ngân hà trên trời đêm', 'Thế giới san hô dưới đại dương', 'Cảnh quan băng giá Nam Cực', 'Miệng núi lửa đang hoạt động', 'Rừng tre Arashiyama, Nhật Bản',
    'Thảo nguyên châu Phi', 'Hồ gương phản chiếu trời', 'Cánh đồng hoa tulip Hà Lan', 'Thác nước Iguazu hùng vĩ', 'Bầu trời đêm đầy cực quang',
    'Hẻm núi Antelope, Mỹ', 'Cánh đồng muối Salar de Uyuni', 'Rừng cây bao báp ở Madagascar', 'Thác Victoria, Zambia', 'Vườn hoa anh đào Nhật Bản',
    // Cityscapes & Architectural
    'Thành phố về đêm lung linh', 'Thành phố Cyberpunk tương lai', 'Đường phố Tokyo đèn neon', 'Ngõ nhỏ cổ kính ở châu Âu', 'Thành phố trên mây',
    'Khu chợ đêm sầm uất', 'New York nhìn từ trên cao', 'Dubai và các tòa nhà chọc trời', 'Thành phố Steampunk', 'Phố đèn lồng Hội An',
    'Bến cảng Victoria, Hồng Kông', 'Khu vườn bên vịnh, Singapore',
    // Fantasy & Sci-Fi
    'Lâu đài cổ tích trong mây', 'Cảnh quan hành tinh Sao Hỏa', 'Vương quốc dưới lòng đất', 'Thành phố Atlantis dưới biển', 'Thế giới trong chai',
    'Khu rừng phép thuật phát sáng', 'Đảo bay lơ lửng trên trời', 'Hang ổ của một con rồng', 'Cảnh quan hành tinh xa lạ', 'Trạm không gian nhìn về Trái Đất',
    'Tàn tích văn minh cổ đại', 'Thế giới kẹo ngọt', 'Chiến trường thời trung cổ', 'Tàu cướp biển trên biển bão', 'Vùng đất của người khổng lồ',
    'Thư viện vô tận', 'Bên trong một chiếc đồng hồ cơ', 'Vườn thiền Nhật Bản', 'Thế giới trong tranh'
];

const CELEBRITY_STYLES: Style[] = CELEBRITY_SUGGESTIONS.map(name => ({
    id: `celebrity-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: name,
    icon: StarIcon, 
    category: 'celebrity',
    prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', name)
}));

const TRAVEL_STYLES: Style[] = TRAVEL_SUGGESTIONS.map(name => ({
    id: `travel-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: name,
    icon: StarIcon, 
    category: 'travel',
    prompt: baseCompositePrompt.replace('{item}', `một bức ảnh chụp tại ${name}`)
}));

const PANORAMA_STYLES: Style[] = PANORAMA_SUGGESTIONS.map(name => ({
    id: `panorama-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: name,
    icon: StarIcon,
    category: 'panorama',
    prompt: baseCompositePrompt.replace('{item}', `một bối cảnh toàn cảnh của ${name}`)
}));

const TRENDING_STYLES: Style[] = [
     {
        id: 'trend_back_to_school_2024',
        name: 'Tựu Trường 2024',
        icon: TrendingIcon,
        category: 'trends',
        prompt: "Với tư cách là nhiếp ảnh gia cho một bộ phim thanh xuân vườn trường, hãy tạo một bức ảnh tựu trường 4K trong trẻo và đầy hoài niệm. **Chủ thể**: Người trong ảnh, mặc đồng phục học sinh hoặc trang phục năng động, trẻ trung, có thể đeo balo. **Bối cảnh**: Sân trường ngập nắng với cây phượng, hành lang lớp học, hoặc thư viện. **Ánh sáng**: Ánh sáng tự nhiên, trong trẻo của buổi sáng. **Máy ảnh & Hậu kỳ**: Chỉnh màu theo phong cách film Nhật Bản, tông màu nhẹ nhàng, tươi sáng, có chút hoài niệm. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-08-15',
        endDate: '2024-09-05',
    },
    {
        id: 'trend_mid_autumn_2024',
        name: 'Trung Thu 2024',
        icon: TrendingIcon,
        category: 'trends',
        prompt: "Với tư cách là một nghệ sĩ kể chuyện bằng hình ảnh, hãy tạo một bức ảnh Tết Trung Thu 4K huyền ảo, đầy thơ mộng. **Chủ thể**: Người trong ảnh, có thể mặc trang phục cổ trang hoặc hiện đại, tay cầm một chiếc đèn lồng truyền thống (đèn ông sao, đèn cá chép). **Bối cảnh**: Đứng dưới ánh trăng tròn vành vạnh của đêm rằm tháng Tám. Xung quanh là phố phường được trang trí đèn lồng nhiều màu sắc. **Ánh sáng**: Ánh sáng chính phát ra từ mặt trăng và chiếc đèn lồng chủ thể cầm, tạo ra một không gian lung linh, huyền ảo. **Máy ảnh & Hậu kỳ**: Chụp ở khẩu độ lớn để thu nhiều ánh sáng và tạo hiệu ứng bokeh từ những chiếc đèn lồng ở hậu cảnh. Màu sắc nên có độ bão hòa cao, đặc biệt là màu đỏ và vàng, để thể hiện không khí lễ hội. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-09-10',
        endDate: '2024-09-25',
    },
    {
        id: 'trend_halloween_2024',
        name: 'Halloween 2024',
        icon: TrendingIcon,
        category: 'trends',
        prompt: "Với tư cách là một đạo diễn phim kinh dị, hãy tạo một bức ảnh Halloween 4K ma mị và ấn tượng. **Chủ thể**: Người trong ảnh, hóa trang thành một nhân vật kinh dị (ma cà rồng, zombie, phù thủy...) với biểu cảm bí ẩn. **Bối cảnh**: Một khu rừng đầy sương mù vào ban đêm, một ngôi nhà hoang, hoặc một nghĩa địa cũ. Ánh trăng mờ ảo chiếu qua cành cây. **Ánh sáng**: Sử dụng kỹ thuật chiếu sáng từ dưới lên (uplighting) để tạo hiệu ứng rùng rợn. Có thể có ánh sáng lập lòe từ một quả bí ngô khoét rỗng (Jack-o'-lantern). **Máy ảnh & Hậu kỳ**: Chỉnh màu theo tông lạnh, xanh lá cây hoặc xanh dương, tăng độ tương phản để làm nổi bật bóng tối. Thêm hiệu ứng sương mù. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-10-20',
        endDate: '2024-11-02',
    },
    {
        id: 'trend_black_friday_2024',
        name: 'Black Friday 2024',
        icon: TrendingIcon,
        category: 'trends',
        prompt: "Với tư cách là một giám đốc sáng tạo cho chiến dịch quảng cáo Black Friday, hãy tạo một hình ảnh 4K đầy năng lượng và phong cách. **Chủ thể**: Người trong ảnh, mặc trang phục thời trang, sành điệu, đang cầm những chiếc túi mua sắm hàng hiệu. **Bối cảnh**: Một con phố mua sắm sang trọng với các cửa hàng được trang trí lộng lẫy, hoặc một studio với phông nền đen và các chữ 'SALE', 'BLACK FRIDAY' bằng neon. **Ánh sáng**: Ánh sáng mạnh, tương phản cao, làm nổi bật sự phấn khích và tốc độ. **Máy ảnh & Hậu kỳ**: Chỉnh màu sắc nét, rực rỡ. Có thể thêm hiệu ứng chuyển động mờ (motion blur) để tạo cảm giác năng động. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-11-25',
        endDate: '2024-12-02',
    },
    {
        id: 'trend_christmas_2024',
        name: 'Giáng Sinh 2024',
        icon: TrendingIcon,
        category: 'trends',
        prompt: "Với tư cách là nhiếp ảnh gia của tạp chí Hallmark, hãy tạo một bức ảnh Giáng Sinh 4K ấm cúng, huyền ảo. **Chủ thể**: Người trong ảnh, mặc đồ len ấm áp (áo len, mũ len) màu đỏ hoặc xanh lá. **Bối cảnh**: Bên cạnh một cây thông Noel được trang trí lộng lẫy, có lò sưởi đang cháy và những hộp quà xung quanh. Ngoài cửa sổ tuyết đang rơi nhẹ. **Ánh sáng**: Ánh sáng ấm từ lò sưởi và đèn trang trí trên cây thông, tạo ra hiệu ứng bokeh lấp lánh. **Máy ảnh & Hậu kỳ**: Chụp bằng ống kính 85mm f/1.8 để tập trung vào chủ thể và tạo bokeh đẹp. Chỉnh màu ấm áp, tăng cường màu đỏ và xanh, tạo cảm giác ấm cúng, thân mật. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-12-01',
        endDate: '2024-12-31',
    },
    {
        id: 'trend_new_year_2025',
        name: 'Năm Mới 2025',
        icon: TrendingIcon,
        category: 'trends',
        prompt: "Với tư cách là một nhiếp ảnh gia sự kiện quốc tế, hãy bắt trọn khoảnh khắc giao thừa 4K đầy hy vọng và lấp lánh. **Chủ thể**: Người trong ảnh, mặc trang phục dạ hội lộng lẫy, nâng ly chúc mừng. **Bối cảnh**: Đứng trên ban công nhìn ra cảnh pháo hoa rực rỡ trên bầu trời đêm của một thành phố lớn (như Sydney, New York, London). **Ánh sáng**: Ánh sáng đa sắc từ pháo hoa phản chiếu lên chủ thể, tạo nên một khung cảnh huyền ảo. **Máy ảnh & Hậu kỳ**: Sử dụng tốc độ màn trập chậm để bắt được vệt pháo hoa. Màu sắc sống động, độ tương phản cao. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-12-28',
        endDate: '2025-01-05',
    },
    {
        id: 'trend_tet_2025',
        name: 'Ảnh Tết 2025',
        icon: TrendingIcon,
        category: 'trends',
        prompt: "Với tư cách là nhiếp ảnh gia chuyên về lễ hội văn hóa Việt Nam, hãy tạo một bức ảnh 4K rực rỡ, siêu chi tiết về chủ thể đang đón Tết Nguyên Đán 2025. **Chủ thể**: Người trong ảnh, mặc Áo Dài truyền thống thanh lịch (ưu tiên màu đỏ hoặc vàng để may mắn), biểu cảm vui tươi, hân hoan. **Bối cảnh**: Một khung cảnh đậm chất Tết Việt Nam, ví dụ như trước một ngôi chùa cổ được trang trí Tết, hoặc trong nhà có cây quất, cành đào, bánh chưng. Hậu cảnh có đèn lồng đỏ và câu đối. **Ánh sáng**: Ánh sáng ấm áp của 'giờ vàng', tôn lên không khí lễ hội và hạnh phúc. **Máy ảnh & Hậu kỳ**: Chụp bằng ống kính 50mm f/1.8 cho góc nhìn tự nhiên, hậu cảnh xóa phông nhẹ. Ảnh phải rực rỡ, sống động, với tông màu đỏ và vàng chủ đạo. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể. Đảm bảo tính chân thực văn hóa.",
        startDate: '2025-01-20',
        endDate: '2025-02-10',
    },
    {
        id: 'trend_valentine_2025',
        name: 'Valentine 2025',
        icon: TrendingIcon,
        category: 'trends',
        prompt: "Với tư cách là một nhiếp ảnh gia chuyên chụp ảnh cặp đôi lãng mạn, hãy tạo một bức ảnh Valentine 4K ngọt ngào và tình cảm. **Chủ thể**: Người trong ảnh (nếu là ảnh đơn thì tạo biểu cảm mơ mộng), tay cầm một bông hồng đỏ hoặc một hộp sô cô la. **Bối cảnh**: Một quán cà phê kiểu Pháp lãng mạn, một khu vườn đầy hoa hồng, hoặc một con phố với ánh đèn vàng ấm áp. **Ánh sáng**: Ánh sáng mềm mại, ấm áp, tạo không khí thân mật. **Máy ảnh & Hậu kỳ**: Chụp bằng ống kính chân dung 85mm f/1.4 để có hiệu ứng bokeh mịn màng. Chỉnh màu theo tông hồng và đỏ, tạo cảm giác ngọt ngào. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2025-02-07',
        endDate: '2025-02-16',
    },
];

const baseProductPrompt = "Với tư cách là một nhiếp ảnh gia quảng cáo và giám đốc sáng tạo, hãy tạo một hình ảnh 4K siêu thực, chất lượng cao và hấp dẫn cho sản phẩm. **Yêu cầu cốt lõi**: Giữ nguyên hình dạng, chi tiết, logo và nhãn hiệu của sản phẩm từ ảnh gốc. **Bối cảnh & Ánh sáng**: {description}";

const PRODUCT_STYLES: Style[] = [
    // Studio
    { id: 'prod_studio_white', name: 'Nền trắng tối giản', icon: ShoppingBagIcon, category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên nền trắng hoàn hảo, vô cực. Sử dụng ánh sáng studio mềm mại, khuếch tán để loại bỏ bóng gắt, làm nổi bật chi tiết sản phẩm.') },
    { id: 'prod_studio_dark', name: 'Nền đen huyền bí', icon: ShoppingBagIcon, category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm nổi bật trên nền đen hoặc xám đậm. Sử dụng kỹ thuật chiếu sáng viền (rim light) để tạo ra một đường viền sáng tinh tế, nhấn mạnh hình khối của sản phẩm.') },
    { id: 'prod_studio_color', name: 'Nền màu sắc năng động', icon: ShoppingBagIcon, category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm trên một phông nền màu sắc rực rỡ (ví dụ: màu vàng, xanh dương, hồng). Ánh sáng mạnh, tương phản cao để tạo cảm giác vui tươi, năng động.') },
    { id: 'prod_studio_gradient', name: 'Nền Gradient', icon: ShoppingBagIcon, category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một bối cảnh có hiệu ứng chuyển màu (gradient) mượt mà, tạo cảm giác hiện đại và tinh tế.') },
    { id: 'prod_studio_floating', name: 'Sản phẩm bay lơ lửng', icon: ShoppingBagIcon, category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được chụp như đang bay lơ lửng giữa không trung trên nền màu đơn sắc. Có thể thêm một bóng đổ mềm mại bên dưới để tạo cảm giác về không gian.') },
    { id: 'prod_studio_geometric', name: 'Bục & Khối hình học', icon: ShoppingBagIcon, category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được trưng bày trên các bục hoặc khối hình học (tròn, vuông, tam giác) cùng màu hoặc tương phản, tạo bố cục kiến trúc và hiện đại.') },
    // Thiên nhiên
    { id: 'prod_nature_stream', name: 'Bên bờ suối', icon: ShoppingBagIcon, category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đặt trên một tảng đá phủ rêu xanh mát bên cạnh một dòng suối trong vắt đang chảy. Ánh nắng nhẹ nhàng xuyên qua tán lá cây.') },
    { id: 'prod_nature_beach', name: 'Bãi biển nhiệt đới', icon: ShoppingBagIcon, category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm nằm trên bãi cát trắng mịn, phía sau là làn nước biển trong xanh và những con sóng nhỏ. Chụp vào giờ vàng để có ánh sáng ấm áp.') },
    { id: 'prod_nature_forest', name: 'Trong rừng sâu', icon: ShoppingBagIcon, category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một gốc cây cổ thụ hoặc giữa thảm lá cây trong một khu rừng xanh tươi. Ánh sáng tự nhiên tạo ra những vệt nắng đẹp mắt.') },
    { id: 'prod_nature_mountain', name: 'Đỉnh núi hùng vĩ', icon: ShoppingBagIcon, category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đứng vững trên một mỏm đá, nhìn ra quang cảnh núi non hùng vĩ và bầu trời trong xanh.') },
    { id: 'prod_nature_flowers', name: 'Giữa vườn hoa', icon: ShoppingBagIcon, category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được bao quanh bởi những bông hoa đầy màu sắc đang nở rộ, tạo cảm giác tươi mới và lãng mạn.') },
    { id: 'prod_nature_ice', name: 'Trên băng tuyết', icon: ShoppingBagIcon, category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một tảng băng trong suốt hoặc nền tuyết trắng xóa, gợi cảm giác mát lạnh và tinh khiết.') },
    { id: 'prod_nature_desert', name: 'Hoang mạc cát', icon: ShoppingBagIcon, category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm trên cồn cát vàng của hoang mạc, dưới ánh nắng chói chang, tạo nên hình ảnh mạnh mẽ và ấn tượng.') },
    // Phong cách sống
    { id: 'prod_lifestyle_model', name: 'Người mẫu sử dụng', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Một người mẫu đang vui vẻ tương tác hoặc sử dụng sản phẩm trong một bối cảnh đời thường. Tập trung vào biểu cảm và sự kết nối với sản phẩm.') },
    { id: 'prod_lifestyle_hand', name: 'Cầm trên tay', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Ảnh chụp cận cảnh một bàn tay đẹp, sạch sẽ đang cầm, mở hoặc sử dụng sản phẩm một cách tinh tế.') },
    { id: 'prod_lifestyle_home', name: 'Bối cảnh tại nhà', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt một cách tự nhiên trong một ngôi nhà hiện đại, có thể trên bàn khách, kệ sách hoặc bàn trang điểm.') },
    { id: 'prod_lifestyle_cafe', name: 'Tại quán cafe', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đặt trên bàn gỗ của một quán cà phê ấm cúng, bên cạnh một tách cappuccino và một cuốn sách.') },
    { id: 'prod_lifestyle_flatlay', name: 'Chụp flatlay', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được sắp xếp một cách nghệ thuật trên một mặt phẳng cùng với các phụ kiện liên quan, chụp từ trên xuống.') },
    { id: 'prod_lifestyle_workspace', name: 'Trên bàn làm việc', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một bàn làm việc gọn gàng, bên cạnh laptop, sổ tay và cây cảnh nhỏ.') },
    { id: 'prod_lifestyle_hotel', name: 'Trong phòng khách sạn', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt tinh tế trên một chiếc giường khách sạn 5 sao với ga giường bằng lụa trắng. Ánh sáng dịu nhẹ từ cửa sổ hắt vào, tạo cảm giác sang trọng và thư thái.') },
    { id: 'prod_lifestyle_car', name: 'Trên xe hơi sang trọng', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đặt trên ghế da của một chiếc xe hơi sang trọng. Ánh sáng nội thất xe và ánh đèn thành phố bên ngoài tạo nên một khung cảnh đẳng cấp.') },
    { id: 'prod_lifestyle_gym', name: 'Tại phòng gym', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm (ví dụ: đồ uống thể thao, quần áo) được đặt trên sàn hoặc băng ghế trong một phòng gym hiện đại, với các thiết bị tập luyện làm nền.') },
    { id: 'prod_lifestyle_picnic', name: 'Đi picnic ngoài trời', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được bày trên một tấm thảm picnic kẻ sọc trong công viên, bên cạnh giỏ mây, trái cây và bánh mì.') },
    { id: 'prod_lifestyle_balcony', name: 'Ban công view thành phố', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đặt trên một chiếc bàn nhỏ ngoài ban công, phía sau là khung cảnh thành phố lung linh về đêm hoặc rực rỡ lúc hoàng hôn.') },
    { id: 'prod_lifestyle_pool', name: 'Bên cạnh hồ bơi', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đặt trên thành của một hồ bơi sang trọng, mặt nước trong xanh phản chiếu ánh nắng, tạo cảm giác mát mẻ và thư giãn.') },
    { id: 'prod_lifestyle_bathroom', name: 'Trong phòng tắm spa', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm (mỹ phẩm, sữa tắm) được đặt bên cạnh bồn tắm, có nến thơm và khăn bông trắng, tạo không gian như một spa tại gia.') },
    { id: 'prod_lifestyle_bed', name: 'Trên giường lụa trắng', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên tấm ga giường bằng lụa hoặc satin trắng, bên cạnh một khay bữa sáng, tạo cảm giác tinh tế và nuông chiều bản thân.') },
    { id: 'prod_lifestyle_suitcase', name: 'Trong vali du lịch', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được xếp gọn gàng trong một chiếc vali mở, cùng với quần áo, hộ chiếu và các vật dụng du lịch khác, gợi cảm hứng xê dịch.') },
    { id: 'prod_lifestyle_yoga', name: 'Trong studio yoga', icon: ShoppingBagIcon, category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt cạnh một tấm thảm yoga trong một studio yên tĩnh, ngập tràn ánh sáng tự nhiên.') },
    // Bối cảnh Việt Nam
    { id: 'prod_vn_pharmacy', name: 'Tại nhà thuốc lớn', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được trưng bày trên kệ kính sạch sẽ của một nhà thuốc hiện đại ở Việt Nam (phong cách Pharmacity, Long Châu). Ánh sáng trắng, rõ ràng.') },
    { id: 'prod_vn_saigon_coffee', name: 'Quán cafe Sài Gòn', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm trên bàn của một quán cà phê cóc vỉa hè đặc trưng của Sài Gòn, với phin cà phê và ly trà đá.') },
    { id: 'prod_vn_hanoi_old', name: 'Góc phố cổ Hà Nội', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một bệ cửa sổ cũ, nhìn ra một con phố cổ Hà Nội với những bức tường vàng và mái ngói rêu phong.') },
    { id: 'prod_vn_tet_holiday', name: 'Không khí Tết', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt bên cạnh cành hoa đào, bánh chưng hoặc khay mứt Tết, trong không khí ấm cúng của ngày Tết Nguyên Đán.') },
    { id: 'prod_vn_halong_bay', name: 'Cảnh Vịnh Hạ Long', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm trên mạn một chiếc du thuyền, phía sau là khung cảnh kỳ vĩ của Vịnh Hạ Long với những hòn đảo đá vôi đặc trưng.') },
    { id: 'prod_vn_sapa', name: 'Ruộng bậc thang Sapa', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một mỏm đất, nhìn ra những thửa ruộng bậc thang xanh mướt hoặc vàng óng mùa lúa chín ở Sapa.') },
    { id: 'prod_vn_floating_market', name: 'Chợ nổi Cái Răng', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm trên một chiếc ghe chở đầy trái cây ở chợ nổi Cái Răng, Cần Thơ, tái hiện không khí mua bán tấp nập trên sông nước Miền Tây.') },
    { id: 'prod_vn_sand_dunes', name: 'Đồi cát Mũi Né', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm nổi bật trên đồi cát trắng hoặc đỏ của Mũi Né, Phan Thiết, dưới ánh nắng vàng rực rỡ.') },
    { id: 'prod_vn_hoian', name: 'Phố lồng đèn Hội An', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một chiếc bàn gỗ nhỏ, hậu cảnh là con phố Hội An về đêm lung linh với hàng trăm chiếc đèn lồng đủ màu sắc.') },
    { id: 'prod_vn_family_meal', name: 'Mâm cơm gia đình', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm (ví dụ: gia vị, thực phẩm) được đặt cạnh một mâm cơm gia đình Việt Nam truyền thống, ấm cúng.') },
    { id: 'prod_vn_motorbike', name: 'Đi phượt xe máy', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm (ví dụ: balo, chai nước) được đặt trên yên một chiếc xe máy, dừng chân trên một cung đường đèo hùng vĩ ở Hà Giang.') },
    { id: 'prod_vn_street_vendor', name: 'Bên gánh hàng rong', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đặt bên cạnh một gánh hàng rong bán hoa hoặc quà vặt trên đường phố Hà Nội, tái hiện một nét văn hóa đường phố đặc trưng.') },
    { id: 'prod_vn_coffee_farm', name: 'Vườn cà phê Tây Nguyên', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt giữa những cây cà phê trĩu quả ở một nông trường tại Tây Nguyên, dưới ánh nắng cao nguyên.') },
    { id: 'prod_vn_danang_beach', name: 'Bãi biển Đà Nẵng', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm trên bãi biển Mỹ Khê, Đà Nẵng, phía xa là chùa Linh Ứng và bán đảo Sơn Trà.') },
    { id: 'prod_vn_dalat_station', name: 'Ga xe lửa Đà Lạt', icon: ShoppingBagIcon, category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một băng ghế gỗ cũ tại ga xe lửa cổ kính của Đà Lạt, mang đậm kiến trúc Pháp.') },
    // Sáng tạo & Trừu tượng
    { id: 'prod_creative_water', name: 'Tung tóe trong nước', icon: ShoppingBagIcon, category: 'product', subCategory: 'creative', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đang chìm hoặc nổi lên từ một làn nước trong vắt, tạo ra những gợn sóng và tia nước đẹp mắt. Chụp với tốc độ cao để bắt trọn khoảnh khắc.') },
    { id: 'prod_creative_smoke', name: 'Khói màu huyền ảo', icon: ShoppingBagIcon, category: 'product', subCategory: 'creative', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được bao quanh bởi những làn khói màu sắc huyền ảo, tạo cảm giác bí ẩn và nghệ thuật.') },
    { id: 'prod_creative_reflection', name: 'Phản chiếu mặt gương', icon: ShoppingBagIcon, category: 'product', subCategory: 'creative', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm và hình ảnh phản chiếu của nó trên một bề mặt gương hoặc mặt nước tĩnh lặng.') },
    { id: 'prod_creative_light', name: 'Vẽ bằng ánh sáng', icon: ShoppingBagIcon, category: 'product', subCategory: 'creative', prompt: baseProductPrompt.replace('{description}', 'Chụp phơi sáng dài với các vệt sáng (light painting) uốn lượn xung quanh sản phẩm trong một không gian tối.') },
    { id: 'prod_creative_ingredients', name: 'Cùng với thành phần', icon: ShoppingBagIcon, category: 'product', subCategory: 'creative', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt cạnh các thành phần tự nhiên chính tạo nên nó (ví dụ: mỹ phẩm với hoa, trái cây; thực phẩm với nguyên liệu tươi).') },
    { id: 'prod_creative_texture', name: 'Trên nền chất liệu', icon: ShoppingBagIcon, category: 'product', subCategory: 'creative', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên các bề mặt có kết cấu độc đáo như vải lụa, đá cẩm thạch, gỗ thô, hoặc kim loại.') },
];


export const STYLES: Style[] = [
    ...TRENDING_STYLES,
    ...REGULAR_STYLES, 
    ...PRODUCT_STYLES,
    ...WEDDING_STYLES,
    ...CELEBRITY_STYLES, 
    ...TRAVEL_STYLES, 
    ...PANORAMA_STYLES
];

export const IMAGE_TYPES: ImageType[] = [
    { id: 'portrait', name: 'Chân dung', icon: PortraitIllustrationIcon },
    { id: 'half_body', name: 'Nửa người', icon: HalfBodyIllustrationIcon },
    { id: 'full_body', name: 'Toàn thân', icon: FullBodyIllustrationIcon },
];

export const ASPECT_RATIOS: AspectRatio[] = [
    { id: 'landscape', name: 'Ngang', icon: LandscapeIcon },
    { id: 'portrait', name: 'Dọc', icon: PortraitIcon },
    { id: 'square', name: 'Vuông', icon: SquareIcon },
    { id: 'custom', name: 'Tùy chỉnh', icon: CustomPromptIcon },
];

export const ACCESSORY_CATEGORIES = [
    { id: 'outfit', name: 'Trang phục', icon: OutfitIcon },
    { id: 'footwear', name: 'Giày dép', icon: FootwearIcon },
    { id: 'bag', name: 'Túi xách', icon: BagIcon },
    { id: 'hat', name: 'Nón', icon: HatIcon },
    { id: 'glasses', name: 'Kính', icon: GlassesIcon },
];

export const ACCESSORY_SUGGESTIONS: AccessorySuggestions = {
    outfit: {
        'Nữ': ['Váy dạ hội', 'Đầm công sở', 'Áo dài truyền thống', 'Áo croptop', 'Chân váy tennis', 'Đầm maxi đi biển'],
        'Nam': ['Bộ suit lịch lãm', 'Áo sơ mi', 'Áo polo', 'Quần jeans', 'Áo khoác da', 'Đồ thể thao'],
        'Unisex': ['Áo thun', 'Áo hoodie', 'Áo khoác bomber', 'Quần jogger']
    },
    footwear: {
        'Nữ': ['Giày cao gót', 'Bốt cao cổ', 'Giày sandal', 'Guốc mộc'],
        'Nam': ['Giày tây', 'Giày lười', 'Bốt da'],
        'Unisex': ['Giày thể thao (sneakers)', 'Dép lê']
    },
    bag: {
        'Nữ': ['Túi xách Chanel', 'Túi tote', 'Ví cầm tay (clutch)'],
        'Nam': ['Cặp xách da', 'Túi đeo chéo'],
        'Unisex': ['Balo', 'Túi tote vải']
    },
    hat: {
        'Gợi ý': ['Mũ lưỡi trai', 'Nón lá', 'Mũ fedora', 'Mũ bucket', 'Mũ len beanie']
    },
    glasses: {
        'Gợi ý': ['Kính râm Ray-Ban', 'Kính phi công', 'Kính mắt mèo', 'Kính gọng tròn', 'Kính không gọng']
    }
};


export const COLOR_PALETTE = [
    { name: 'Trắng', value: 'trắng' },
    { name: 'Đen', value: 'đen' },
    { name: 'Xám', value: 'xám' },
    { name: 'Đỏ', value: 'đỏ' },
    { name: 'Xanh dương', value: 'xanh dương' },
    { name: 'Xanh lá', value: 'xanh lá' },
    { name: 'Vàng', value: 'vàng' },
    { name: 'Cam', value: 'cam' },
    { name: 'Tím', value: 'tím' },
    { name: 'Hồng', value: 'hồng' },
    { name: 'Nâu', value: 'nâu' },
    { name: 'Be', value: 'be' },
];

export const STYLE_ACCESSORY_DEFAULTS: AccessoryDefaults = {
    'businessman': {
        outfit: { item: 'Bộ suit lịch lãm', color: 'đen' },
        footwear: { item: 'Giày tây', color: 'đen' },
    },
    'artist': {
        outfit: { item: 'Áo hoodie', color: 'xám' },
        hat: { item: 'Mũ len beanie', color: 'đen' },
        footwear: { item: 'Giày thể thao (sneakers)', color: 'trắng' },
    },
    'natural': {
        outfit: { item: 'Đầm maxi đi biển', color: 'trắng' },
        hat: { item: 'Nón lá', color: '' },
    },
    'magazine': {
        outfit: { item: 'Váy dạ hội', color: 'đỏ' },
        footwear: { item: 'Giày cao gót', color: 'đen' },
        glasses: { item: 'Kính mắt mèo', color: 'đen' },
    },
     'cinematic': {
        outfit: { item: 'Áo khoác da', color: 'đen' },
        footwear: { item: 'Bốt da', color: 'nâu' },
    },
    'newspaper': {
        outfit: { item: 'Áo sơ mi', color: 'trắng' },
        footwear: { item: 'Giày lười', color: 'nâu' },
        hat: { item: 'Mũ fedora', color: 'xám'}
    }
};

// FIX: Corrected the type for BASE_ACCESSORY_DEFAULTS to Partial<Record<string, Accessory>>.
// This makes it consistent with STYLE_ACCESSORY_DEFAULTS and resolves potential type conflicts.
export const BASE_ACCESSORY_DEFAULTS: Partial<Record<string, Accessory>> = {
    outfit: { item: 'Áo thun', color: 'trắng' },
    footwear: { item: 'Giày thể thao (sneakers)', color: 'trắng' },
};


// Constants for ID Photo Generation
export const ID_PHOTO_SIZES: IdPhotoSize[] = [
    { id: '3x4', name: '3x4 cm' },
    { id: '4x6', name: '4x6 cm' },
    { id: 'passport', name: 'Hộ chiếu (4x6 nền trắng)' },
];

export const ID_PHOTO_BACKGROUNDS: IdPhotoBackground[] = [
    { id: 'white', name: 'Trắng', className: 'bg-white' },
    { id: 'blue', name: 'Xanh', className: 'bg-blue-500' },
    { id: 'gray', name: 'Xám', className: 'bg-gray-400' },
];

export const ID_PHOTO_ATTIRES: IdPhotoAttire[] = [
    { id: 'keep', name: 'Giữ nguyên', prompt: 'Giữ nguyên trang phục gốc của người trong ảnh.' },
    { id: 'shirt', name: 'Áo sơ mi trắng', prompt: 'Thay thế trang phục của người trong ảnh bằng một chiếc áo sơ mi trắng công sở, có cổ.' },
    { id: 'suit', name: 'Áo vest & Sơ mi', prompt: 'Thay thế trang phục của người trong ảnh bằng một bộ vest công sở màu tối, áo sơ mi trắng và cà vạt (nếu là nam).' },
];