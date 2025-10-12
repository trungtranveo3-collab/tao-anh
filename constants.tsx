import React from 'react';
// FIX: Added 'Accessory' to the type imports to be used for BASE_ACCESSORY_DEFAULTS.
import type { Style, StyleTab, ImageType, AccessorySuggestions, AccessoryDefaults, Accessory } from './types';

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
    { id: 'celebrity', name: 'Ghép với Sao' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'panorama', name: 'Toàn cảnh' },
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

export const STYLES: Style[] = [...REGULAR_STYLES, ...CELEBRITY_STYLES, ...TRAVEL_STYLES, ...PANORAMA_STYLES];

export const IMAGE_TYPES: ImageType[] = [
    { id: 'portrait', name: 'Chân dung', icon: PortraitIllustrationIcon },
    { id: 'half_body', name: 'Nửa người', icon: HalfBodyIllustrationIcon },
    { id: 'full_body', name: 'Toàn thân', icon: FullBodyIllustrationIcon },
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

// FIX: Corrected the type for BASE_ACCESSORY_DEFAULTS from AccessoryDefaults to Record<string, Accessory>.
// The previous type was incorrect for this data structure and caused the 'Type 'string' is not assignable to type 'Accessory'' error.
export const BASE_ACCESSORY_DEFAULTS: Record<string, Accessory> = {
    outfit: { item: 'Áo thun', color: 'trắng' },
    footwear: { item: 'Giày thể thao (sneakers)', color: 'trắng' },
};