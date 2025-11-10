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
        prompt: "trong một studio ảnh cưới cao cấp, lãng mạn. Bối cảnh là một phông nền tối giản, thanh lịch với các tông màu trung tính hoặc pastel. Ánh sáng được dàn dựng chuyên nghiệp, sử dụng ánh sáng softbox mềm mại để tôn lên vẻ đẹp tự nhiên và tạo không khí ấm cúng, thân mật. Bố cục ảnh tập trung vào sự kết nối tình cảm và biểu cảm hạnh phúc của cặp đôi." 
    },
    { 
        id: 'wedding_outdoor', 
        name: 'Ngoại cảnh Thiên nhiên', 
        icon: NatureIcon, 
        category: 'wedding', 
        prompt: "giữa một khung cảnh thiên nhiên hùng vĩ hoặc thơ mộng, chẳng hạn như trên một bãi biển lúc hoàng hôn, trong một khu rừng xanh mát, hoặc trên một ngọn đồi lộng gió. Ánh sáng tự nhiên được tận dụng tối đa để tạo ra những bức ảnh trong trẻo, sống động. Trang phục của cặp đôi hài hòa với thiên nhiên, có thể là váy cưới thướt tha và bộ suit màu sáng." 
    },
    { 
        id: 'wedding_classic', 
        name: 'Cổ điển & Hoài niệm', 
        icon: CameraIcon, 
        category: 'wedding', 
        prompt: "theo phong cách cổ điển, vượt thời gian. Bối cảnh có thể là một tòa nhà kiến trúc cổ, một thư viện sang trọng, hoặc một khu vườn kiểu châu Âu. Tông màu ảnh có thể là đen trắng hoặc màu film vintage, mang lại cảm giác hoài niệm và sang trọng. Trang phục của cặp đôi mang hơi hướng cổ điển, lịch lãm."
    },
    { 
        id: 'wedding_modern', 
        name: 'Thành thị & Hiện đại', 
        icon: CityIcon, 
        category: 'wedding', 
        prompt: "trong bối cảnh thành phố hiện đại và năng động. Cặp đôi có thể đứng trên sân thượng của một tòa nhà chọc trời với view toàn cảnh thành phố về đêm, hoặc đi dạo trên một con phố sầm uất. Phong cách ảnh táo bạo, thời trang và đầy cá tính, thể hiện sự năng động của tình yêu đô thị."
    },
];


const REGULAR_STYLES: Style[] = [
    { id: 'businessman', name: 'Doanh nhân Hiện đại', icon: UserTieIcon, category: 'style', prompt: 'một bức chân dung doanh nhân chuyên nghiệp và hiện đại. Người trong ảnh mặc một bộ vest công sở lịch lãm. Bối cảnh là một văn phòng hiện đại, sang trọng với ánh sáng studio.' },
    { id: 'artist', name: 'Nghệ sĩ Sáng tạo', icon: PaletteIcon, category: 'style', prompt: 'một bức chân dung nghệ thuật đầy sáng tạo. Trang phục có thể phá cách và nghệ thuật. Bối cảnh là một studio nghệ thuật hoặc một không gian đầy màu sắc, với ánh sáng ấn tượng.' },
    { id: 'classic', name: 'Cổ điển Đen trắng', icon: CameraIcon, category: 'style', prompt: 'một bức chân dung đen trắng cổ điển, vượt thời gian. Tập trung vào sự tương phản, sắc thái và kết cấu, với ánh sáng mềm mại, tinh tế.' },
    { id: 'future', name: 'Công nghệ Tương lai', icon: RobotIcon, category: 'style', prompt: "phong cách công nghệ tương lai (cyberpunk/sci-fi), với các yếu tố như ánh sáng neon, giao diện голографічна trong một thành phố tương lai." },
    { id: 'natural', name: 'Tự nhiên & Thân thiện', icon: LeafIcon, category: 'style', prompt: 'một bức chân dung tự nhiên trong bối cảnh ngoài trời tươi sáng như công viên, khu vườn. Ánh sáng ấm áp và tự nhiên, trang phục đơn giản, thoải mái.' },
    { id: 'cinematic', name: 'Phong cách Điện ảnh', icon: FilmIcon, category: 'style', prompt: 'một cảnh phim điện ảnh với tỷ lệ khung hình rộng, màu sắc đậm chất điện ảnh (color grading), và ánh sáng kịch tính để tạo cảm giác có câu chuyện.' },
    { id: 'magazine', name: 'Tạp chí Nổi tiếng', icon: StarIcon, category: 'style', prompt: 'ảnh bìa một tạp chí thời trang nổi tiếng. Trang phục thời thượng, phong cách. Ánh sáng hoàn hảo như trong studio.' },
    { id: 'newspaper', name: 'Giang hồ Hồ báo', icon: NewspaperIcon, category: 'style', prompt: "phong cách 'giang hồ' cổ điển, giống như trong các bộ phim xã hội đen Hồng Kông, với tông màu cũ, hơi ngả vàng và ánh sáng kịch tính." },
];

const generateProductStyles = (basePrompt: string, items: string[]): Style[] => {
    return items.map(item => {
        const id = `product_${basePrompt}_${item.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
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
        styles: generateProductStyles('được trình bày bởi {item}', [
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
        styles: generateProductStyles('trưng bày trên kệ tại nhà thuốc {item}', [
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
        styles: generateProductStyles('đặt trong bối cảnh {item}', [
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
        styles: generateProductStyles('đặt trên {item}', [
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
    prompt: `Ghép mặt của người trong ảnh gốc vào một bức ảnh của ${name}.`
}));

const TRAVEL_STYLES: Style[] = TRAVEL_SUGGESTIONS.map(name => ({
    id: `travel-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: name,
    icon: StarIcon, 
    category: 'travel',
    prompt: `Đưa người trong ảnh gốc đến ${name}.`
}));

const PANORAMA_STYLES: Style[] = PANORAMA_SUGGESTIONS.map(name => ({
    id: `panorama-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: name,
    icon: StarIcon,
    category: 'panorama',
    prompt: `Đặt người trong ảnh gốc vào bối cảnh toàn cảnh ${name}.`
}));

export const STYLES: Style[] = [
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