import React from 'react';
// FIX: Added 'Accessory' to the type imports to be used for BASE_ACCESSORY_DEFAULTS.
import type { Style, StyleTab, ImageType, AccessorySuggestions, AccessoryDefaults, Accessory, AspectRatio, ProductCategory } from './types';

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
const ProductIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5z"/></svg>
);
const TrendingIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/></svg>
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
    { id: 'wedding', name: 'Ảnh Cưới' },
    { id: 'product', name: 'Sản Phẩm' },
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

const generateProductStyles = (basePrompt: string, items: string[]): Style[] => {
    return items.map(item => {
        const id = `product_${basePrompt.substring(0,15)}_${item.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        const prompt = basePrompt.replace('{item}', item);
        return {
            id,
            name: item,
            icon: () => null, // No individual icons needed for grid items
            category: 'product',
            prompt: prompt,
        };
    });
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    {
        id: 'product_model',
        name: 'Với Người Mẫu',
        icon: UserTieIcon,
        styles: generateProductStyles("Với tư cách là một nhiếp ảnh gia quảng cáo sản phẩm cao cấp, hãy tạo một hình ảnh 4K siêu thực, chuyên nghiệp. **Sản phẩm**: Sản phẩm trong ảnh tải lên. **Tương tác**: Sản phẩm được trình bày một cách tự nhiên bởi **{item}**. **Bối cảnh & Ánh sáng**: Sử dụng ánh sáng studio mềm mại (softbox) để làm nổi bật chi tiết sản phẩm và người mẫu trên một phông nền sạch sẽ, phù hợp. **Máy ảnh & Hậu kỳ**: Chụp bằng ống kính macro 100mm f/5.6 để sản phẩm siêu nét. Hậu kỳ với màu sắc chuẩn xác, retouch da chuyên nghiệp. **Yêu cầu cốt lõi**: Giữ nguyên hình dạng, chi tiết, và nhãn hiệu của sản phẩm gốc. Người mẫu phải tôn vinh sản phẩm, không làm lu mờ nó.", [
            'Người mẫu nữ châu Á tóc dài', 'Người mẫu nam châu Âu lịch lãm', 'Người mẫu phi giới tính cá tính', 'Người mẫu fitness trong phòng gym', 'Doanh nhân thành đạt tại văn phòng',
            'Gia đình đang sử dụng sản phẩm', 'Nhóm bạn trẻ trong buổi dã ngoại', 'Người mẫu beauty với làn da hoàn hảo', 'Cận cảnh bàn tay người mẫu', 'Người mẫu trong trang phục dạ hội',
            'Người mẫu nam mặc suit', 'Người mẫu nữ mặc váy trắng', 'Người mẫu tương tác với sản phẩm', 'Người mẫu cười rạng rỡ', 'Người mẫu nhìn thẳng vào ống kính',
            'Người mẫu trong bối cảnh tối giản', 'Người mẫu trên đường phố thành thị', 'Người mẫu trong quán cà phê sang trọng', 'Người mẫu lớn tuổi thanh lịch', 'Người mẫu nhí đáng yêu',
            'Người mẫu tóc ngắn năng động', 'Người mẫu nam có râu quai nón', 'Người mẫu nữ với tàn nhang tự nhiên', 'Người mẫu đang tập yoga', 'Đầu bếp chuyên nghiệp trong bếp',
            'Nghệ sĩ trong studio', 'Vận động viên đang hoạt động', 'Người mẫu trong bối cảnh công nghệ', 'Người mẫu với phong cách retro', 'Cặp đôi người mẫu tình cảm',
            'Người mẫu nữ da màu tự tin', 'Người mẫu nam với hình xăm', 'Người mẫu mặc trang phục truyền thống', 'Bóng lưng của người mẫu', 'Người mẫu đang nhảy múa',
            'Người mẫu dưới mưa', 'Người mẫu trong tuyết', 'Người mẫu trên sa mạc', 'Người mẫu dưới nước', 'Người mẫu với thú cưng',
            'Người mẫu phản chiếu trong gương', 'Người mẫu trong bối cảnh công nghiệp', 'Người mẫu với ánh sáng neon', 'Ảnh chụp đen trắng với người mẫu', 'Người mẫu với biểu cảm ấn tượng',
            'Người mẫu trong trang phục bơi', 'Người mẫu trên du thuyền', 'Người mẫu trong thư viện', 'Người mẫu chơi nhạc cụ', 'Người mẫu đọc sách', 'Người mẫu với ly cocktail'
        ])
    },
    {
        id: 'product_pharmacy',
        name: 'Tại Nhà Thuốc',
        icon: ProductIcon,
        styles: generateProductStyles("Với tư cách là một chuyên gia marketing ngành dược, hãy tạo một hình ảnh 4K siêu thực, đáng tin cậy. **Sản phẩm**: Sản phẩm trong ảnh tải lên. **Bối cảnh**: Sản phẩm được trưng bày một cách nổi bật trên kệ của một **{item}**. Không gian sạch sẽ, sáng sủa và được sắp xếp gọn gàng. **Ánh sáng**: Ánh sáng trắng, đều, mô phỏng ánh sáng đèn LED trong các nhà thuốc hiện đại. **Máy ảnh & Hậu kỳ**: Chụp với độ sâu trường ảnh nông (shallow depth-of-field) để sản phẩm sắc nét trong khi các sản phẩm khác ở hậu cảnh hơi mờ đi. Màu sắc trung thực, rõ ràng. **Yêu cầu cốt lõi**: Giữ nguyên hình dạng, chi tiết, và nhãn hiệu của sản phẩm gốc. Hình ảnh phải tạo cảm giác uy tín và chuyên nghiệp.", [
            'FPT Long Châu sáng sủa', 'Pharmacity hiện đại', 'An Khang ngăn nắp', 'Guardian (khu vực VN)', 'Watsons (khu vực VN)', 'Medicare (khu vực VN)',
            'Phano Pharmacy uy tín', 'Trung Sơn Pharma', 'Nhà thuốc ECO Pharmacy', 'Nhà thuốc Glee Pharmacy', 'Vistar Pharmacy',
            'Một nhà thuốc lớn ở Hà Nội', 'Một nhà thuốc ở TP.HCM', 'Quầy thuốc bệnh viện', 'Nhà thuốc theo chuẩn GPP', 'Nhà thuốc truyền thống',
            'Kệ trưng bày sản phẩm nổi bật', 'Phía sau quầy dược sĩ', 'Trên tay dược sĩ đang tư vấn', 'Khách hàng đang xem sản phẩm', 'Tủ kính trưng bày cao cấp',
            'Nhà thuốc Long Châu (view từ ngoài)', 'Bên trong Pharmacity có dược sĩ', 'Kệ sản phẩm chức năng An Khang', 'Góc trưng bày của Guardian', 'Kệ mỹ phẩm tại Watsons',
            'Giá thuốc của Medicare', 'Quầy thanh toán Phano Pharmacy', 'Kệ thuốc cho trẻ em', 'Kệ sản phẩm chăm sóc da', 'Kệ vitamin và khoáng chất',
            'Nhà thuốc có tông màu xanh lá', 'Nhà thuốc có nội thất gỗ', 'Nhà thuốc tối giản, sạch sẽ', 'Nhà thuốc đông khách', 'Nhà thuốc vào ban đêm',
            'Góc nhìn từ dưới lên kệ thuốc', 'Ảnh chụp macro sản phẩm trên kệ', 'Sản phẩm và logo nhà thuốc', 'Dược sĩ mặc áo blouse trắng', 'Kệ thuốc được sắp xếp khoa học',
            'Nhà thuốc trong trung tâm thương mại', 'Nhà thuốc ở góc phố', 'Ánh sáng tự nhiên chiếu vào', 'Bảng hiệu nhà thuốc rõ nét', 'Không gian tư vấn riêng',
            'Kệ sản phẩm khuyến mãi', 'Sản phẩm được xếp thành kim tự tháp', 'Sản phẩm cùng các thương hiệu nổi tiếng khác', 'Tủ thuốc có khóa', 'Nền là các hộp thuốc mờ ảo', 'Sản phẩm trên bàn tư vấn'
        ])
    },
    {
        id: 'product_luxury',
        name: 'Bối Cảnh Sang Trọng',
        icon: StarIcon,
        styles: generateProductStyles("Với tư cách là một nhiếp ảnh gia tĩnh vật cho các thương hiệu xa xỉ, hãy tạo một hình ảnh 4K siêu thực, tinh xảo. **Sản phẩm**: Sản phẩm trong ảnh tải lên. **Bối cảnh**: Sản phẩm được đặt trong bối cảnh **{item}**. Bố cục tối giản, sang trọng, tập trung vào sản phẩm. **Ánh sáng**: Sử dụng ánh sáng studio có độ tương phản nhẹ, tạo bóng đổ mềm mại để làm nổi bật kết cấu và hình khối của sản phẩm. **Máy ảnh & Hậu kỳ**: Chụp bằng ống kính macro để lột tả từng chi tiết nhỏ nhất. Hậu kỳ với màu sắc sâu, tinh tế và độ nét hoàn hảo. **Yêu cầu cốt lõi**: Giữ nguyên hình dạng, chi tiết, và nhãn hiệu của sản phẩm gốc. Toát lên vẻ đẳng cấp và độc quyền.", [
            'Mặt đá cẩm thạch đen vân vàng', 'Nền lụa trắng mềm mại', 'Bệ trưng bày bằng kính', 'Bên cạnh chai rượu whisky', 'Trong hộp quà cao cấp',
            'Trên bàn trang điểm lộng lẫy', 'Trong phòng tắm khách sạn 5 sao', 'Trên đàn piano màu đen bóng', 'Bên cạnh một chiếc đồng hồ Thụy Sĩ', 'Trên một cuốn sách bìa da',
            'Flatlay với các phụ kiện vàng', 'Trên nền vải nhung đỏ', 'Trong một nội thất tối giản', 'Phản chiếu trên mặt nước tĩnh', 'Giữa những viên kim cương',
            'Trên bệ bê tông được đánh bóng', 'Với ánh sáng ấn tượng (spotlight)', 'Bên cạnh một tác phẩm điêu khắc', 'Trong một chiếc xe hơi sang trọng', 'Trên bàn gỗ quý',
            'Nền là kiến trúc tối giản', 'Trong một phòng trưng bày nghệ thuật', 'Bên cạnh dụng cụ pha chế cocktail', 'Trên một khay bạc', 'Với hiệu ứng khói mờ ảo',
            'Trong một vali du lịch cổ điển', 'Trên nền kết cấu kim loại', 'Bên cạnh một cây bút máy', 'Giữa những cánh hoa hồng', 'Trên một chiếc du thuyền',
            'Trong một căn penthouse có view thành phố', 'Bên cạnh hồ bơi vô cực', 'Trên một bậc thang xoắn ốc', 'Nền là một bức tường gạch thô', 'Với ánh sáng hoàng hôn ấm áp',
            'Trong một thư viện tư nhân', 'Trên một lò sưởi bằng đá', 'Bên cạnh một bộ cờ vua', 'Trong một vườn thiền Nhật Bản', 'Trên một tấm da thuộc',
            'Giữa các dụng cụ kaligrafi', 'Nền là bản đồ cổ', 'Bên cạnh các chai nước hoa', 'Trong một hầm rượu vang', 'Trên một khay đá phiến đen',
            'Với hiệu ứng đổ bóng dài', 'Chụp ảnh macro chi tiết', 'Bên cạnh một chiếc máy ảnh film', 'Trong một hộp nhạc cổ', 'Trên một tấm gương', 'Với các hình khối hình học'
        ])
    },
    {
        id: 'product_nature',
        name: 'Hòa mình Thiên Nhiên',
        icon: LeafIcon,
        styles: generateProductStyles("Với tư cách là một nhiếp ảnh gia sản phẩm chuyên về chủ đề tự nhiên, hãy tạo một hình ảnh 4K siêu thực, hài hòa. **Sản phẩm**: Sản phẩm trong ảnh tải lên. **Bối cảnh**: Sản phẩm được đặt một cách tự nhiên trên **{item}**. Bố cục nhấn mạnh sự kết nối giữa sản phẩm và thiên nhiên. **Ánh sáng**: Sử dụng ánh sáng tự nhiên, mềm mại, có thể là ánh nắng buổi sáng sớm hoặc chiều tà. **Máy ảnh & Hậu kỳ**: Chụp với khẩu độ mở lớn (ví dụ f/2.8) để tạo ra hậu cảnh mờ đẹp mắt. Màu sắc được chỉnh sửa theo tông màu đất, tự nhiên, trong trẻo. **Yêu cầu cốt lõi**: Giữ nguyên hình dạng, chi tiết, và nhãn hiệu của sản phẩm gốc. Hình ảnh phải truyền tải được sự tinh khiết và thân thiện với môi trường.", [
            'Tảng đá phủ rêu trong rừng', 'Bãi cát trắng mịn của bãi biển', 'Một chiếc lá nhiệt đới lớn', 'Nền gỗ mộc mạc', 'Bề mặt băng giá',
            'Đám sỏi cuội ở bờ suối', 'Một gốc cây cổ thụ', 'Cánh đồng hoa oải hương', 'Nền là những con sóng biển', 'Một vách đá nhìn ra biển',
            'Giữa vườn thảo mộc xanh tươi', 'Trên một lớp tuyết mới rơi', 'Bên cạnh một dòng dung nham', 'Trong một hang động thạch nhũ', 'Trên một sa mạc cát',
            'Giữa những quả thông trong rừng', 'Trên một cây cầu gỗ', 'Bên cạnh một thác nước', 'Trên một cánh đồng lúa chín', 'Lơ lửng giữa những đám mây',
            'Trên một tảng băng trôi', 'Bên trong một bông hoa lớn', 'Trên một bãi cỏ đẫm sương', 'Giữa một rừng tre', 'Trên một bãi biển đá đen',
            'Nền là bầu trời đầy sao', 'Bên cạnh một tổ chim', 'Trong một khu vườn Nhật Bản', 'Trên một đống lá mùa thu', 'Bên cạnh một cây xương rồng',
            'Phản chiếu trong một vũng nước mưa', 'Trên một cánh đồng hoa hướng dương', 'Giữa những cây nấm phát sáng', 'Trên một rạn san hô', 'Bên trong một vỏ sò lớn',
            'Nền là cực quang phương bắc', 'Trên một thân cây bạch dương', 'Giữa những cây dương xỉ', 'Trên một vách đá sa thạch', 'Bên cạnh một hồ nước trên núi',
            'Giữa những dây leo chằng chịt', 'Trong một vườn cây ăn quả', 'Trên một bãi biển vỏ sò', 'Nền là một cơn bão ở xa', 'Bên cạnh một con suối nước nóng',
            'Trong một cánh đồng chè xanh', 'Trên một tảng đá granite', 'Giữa những bông hoa sen', 'Bên cạnh một tổ ong', 'Trong một khu rừng bị cháy', 'Trên một cồn cát'
        ])
    }
];

const ALL_PRODUCT_STYLES: Style[] = PRODUCT_CATEGORIES.flatMap(category => category.styles);

const baseCompositePrompt = "Với tư cách là một chuyên gia Photoshop và nghệ sĩ kỹ thuật số, hãy tạo một bức ảnh ghép 4K siêu thực, liền mạch. **Nhiệm vụ**: Ghép khuôn mặt của người trong ảnh gốc vào một bối cảnh mới của **{item}**. **Yêu cầu kỹ thuật**: Ánh sáng, bóng đổ, nhiệt độ màu và kết cấu trên khuôn mặt của chủ thể phải khớp một cách hoàn hảo với môi trường xung quanh để tạo ra một kết quả chân thực, đáng tin. **Yêu cầu cốt lõi**: Giữ nguyên vẹn và chính xác tất cả các đặc điểm khuôn mặt độc đáo của chủ thể. TRÁNH tuyệt đối cảm giác 'cắt dán' hoặc không tự nhiên.";

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
    prompt: baseCompositePrompt.replace('{item}', name)
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


export const STYLES: Style[] = [
    ...TRENDING_STYLES,
    ...REGULAR_STYLES, 
    ...WEDDING_STYLES,
    ...ALL_PRODUCT_STYLES,
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