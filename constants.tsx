
import React from 'react';
import type { Style, StyleTab, ImageType, AccessorySuggestions, AccessoryDefaults, Accessory, AspectRatio, IdPhotoSize, IdPhotoBackground, IdPhotoAttire } from './types';

// Icons (Giữ lại dùng cho các mục đích phụ hoặc fallback)
const UserTieIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
);
// ... (Các icon khác giữ nguyên để tránh lỗi import ở file khác nếu có, nhưng logic chính sẽ dùng ảnh)
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
    { id: 'trends', name: '🔥 Hot Trend' },
    { id: 'style', name: 'Phong Cách' },
    { id: 'wedding', name: 'Ảnh Cưới' },
    { id: 'product', name: 'Sản Phẩm' },
    { id: 'id_photo', name: 'Ảnh Thẻ' },
    { id: 'celebrity', name: 'Ghép với Sao' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'panorama', name: 'Toàn cảnh' },
];

// --- THUMBNAIL IMAGES (Optimized from Unsplash) ---
// Using 'auto=format&fit=crop&w=500&q=80' for performance

const WEDDING_STYLES: Style[] = [
    { 
        id: 'wedding_studio', 
        name: 'Studio Lãng mạn', 
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80', 
        category: 'wedding', 
        prompt: "Với tư cách là một nhiếp ảnh gia cưới cao cấp của tạp chí Junebug Weddings, hãy tạo ra một bức ảnh cưới 4K siêu thực, tinh tế và lãng mạn. **Chủ thể**: Cặp đôi từ ảnh tải lên, thể hiện sự kết nối tình cảm, ánh mắt trìu mến. **Bối cảnh**: Một studio tối giản, sang trọng với phông nền canvas màu xám nhạt hoặc tường trắng tinh. Có thể có một vài chi tiết trang trí nhẹ nhàng như một bình hoa baby trắng. **Ánh sáng**: Sử dụng kỹ thuật ánh sáng Rembrandt với một softbox lớn làm nguồn sáng chính để tạo khối mềm mại trên khuôn mặt và một đèn phụ nhẹ để làm dịu bóng tối. **Máy ảnh & Ống kính**: Chụp bằng máy ảnh medium format Hasselblad với ống kính 80mm f/1.9 để có độ chi tiết đáng kinh ngạc và hiệu ứng bokeh mịn như kem. **Hậu kỳ**: Chỉnh màu theo phong cách fine-art, tông màu ấm, da được retouch một cách tự nhiên, giữ lại kết cấu. **QUAN TRỌNG NHẤT**: Giữ nguyên vẹn và chính xác các đặc điểm khuôn mặt của cặp đôi từ ảnh gốc." 
    },
    { 
        id: 'wedding_outdoor', 
        name: 'Ngoại cảnh Thiên nhiên', 
        thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=500&q=80', 
        category: 'wedding', 
        prompt: "Với tư cách là một nhiếp ảnh gia chuyên chụp ảnh cưới ngoại cảnh cho Style Me Pretty, hãy tạo ra một bức ảnh cưới 4K đẹp như tranh vẽ. **Chủ thể**: Cặp đôi từ ảnh tải lên, trong trang phục cưới thanh lịch, đang đi dạo hoặc tương tác tự nhiên. **Bối cảnh**: Một khung cảnh thiên nhiên thơ mộng vào 'giờ vàng' (golden hour) - có thể là một cánh đồng hoa oải hương, một bãi biển vắng với cát trắng và sóng nhẹ, hoặc một khu rừng thông với những tia nắng xuyên qua tán lá. **Ánh sáng**: Tận dụng tối đa ánh sáng tự nhiên của hoàng hôn để tạo viền sáng vàng óng quanh cặp đôi (rim light). **Máy ảnh & Ống kính**: Chụp bằng máy ảnh Canon EOS R5 với ống kính 50mm f/1.2L để bắt trọn không khí và tạo ra hậu cảnh mờ ảo mộng mơ. **Hậu kỳ**: Chỉnh màu trong trẻo, tươi sáng, tăng cường các tông màu ấm của hoàng hôn. **QUAN TRỌNG NHẤT**: Giữ nguyên vẹn và chính xác các đặc điểm khuôn mặt của cặp đôi từ ảnh gốc." 
    },
    { 
        id: 'wedding_classic', 
        name: 'Cổ điển & Hoài niệm', 
        thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&w=500&q=80', 
        category: 'wedding', 
        prompt: "Với tư cách là một bậc thầy nhiếp ảnh cưới theo phong cách film cổ điển, hãy tạo ra một bức ảnh cưới 4K mang vẻ đẹp vượt thời gian. **Chủ thể**: Cặp đôi từ ảnh tải lên, tạo dáng trang trọng, cổ điển. **Bối cảnh**: Bên trong một công trình kiến trúc cổ kính như một thư viện cũ với kệ sách cao, một tòa lâu đài châu Âu, hoặc trên cầu thang lớn bằng đá cẩm thạch. **Ánh sáng**: Ánh sáng dịu nhẹ từ cửa sổ lớn, tạo ra sự chuyển tiếp mượt mà giữa vùng sáng và vùng tối, gợi cảm giác sâu lắng. **Máy ảnh & Ống kính**: Mô phỏng ảnh chụp từ máy film Contax 645 với ống kính Zeiss 80mm f/2. **Hậu kỳ**: Chuyển thành ảnh đen trắng có độ tương phản cao, hoặc chỉnh màu film cổ điển (như Kodak Portra 400) với tông màu hơi ngả xanh ở vùng tối và thêm một lớp grain film tinh tế. **QUAN TRỌNG NHẤT**: Giữ nguyên vẹn và chính xác các đặc điểm khuôn mặt của cặp đôi từ ảnh gốc."
    },
    { 
        id: 'wedding_modern', 
        name: 'Thành thị & Hiện đại', 
        thumbnail: 'https://images.unsplash.com/photo-1513273267379-3260b09a2805?auto=format&fit=crop&w=500&q=80', 
        category: 'wedding', 
        prompt: "Với tư cách là một nhiếp ảnh gia cưới thời trang và táo bạo, hãy tạo ra một bức ảnh cưới 4K độc đáo và hiện đại. **Chủ thể**: Cặp đôi từ ảnh tải lên, mặc trang phục cưới phá cách, thần thái tự tin. **Bối cảnh**: Bối cảnh thành phố về đêm, trên sân thượng một tòa nhà chọc trời với view triệu đô, hoặc giữa một con phố đông đúc với hiệu ứng vệt đèn (light trails) từ xe cộ. **Ánh sáng**: Sử dụng ánh sáng nhân tạo một cách sáng tạo, có thể là đèn flash trực tiếp (direct flash) để tạo phong cách edgy hoặc ánh sáng từ các bảng hiệu neon. **Máy ảnh & Ống kính**: Chụp bằng ống kính góc rộng 24-70mm f/2.8 để bắt trọn sự hùng vĩ của thành phố. **Hậu kỳ**: Chỉnh màu theo tông lạnh, kiểu cinematic, tăng độ tương phản và độ sắc nét. **QUAN TRỌG NHẤT**: Giữ nguyên vẹn và chính xác các đặc điểm khuôn mặt của cặp đôi từ ảnh gốc."
    },
];


const REGULAR_STYLES: Style[] = [
    { id: 'businessman', name: 'Doanh nhân Hiện đại', thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80', category: 'style', prompt: "Với tư cách là nhiếp ảnh gia hàng đầu của tạp chí Forbes, hãy tạo một bức chân dung 8K siêu thực, mạnh mẽ của chủ thể trong vai trò một nhà lãnh đạo doanh nghiệp hiện đại. **Chủ thể**: Người trong ảnh, mặc một bộ suit được may đo hoàn hảo màu xanh navy hoặc xám than, biểu cảm tự tin nhưng gần gũi. **Bối cảnh**: Một văn phòng tối giản trên cao, nhìn ra cửa sổ lớn với khung cảnh thành phố mờ ảo (bokeh). **Ánh sáng**: Sử dụng kỹ thuật chiếu sáng 3 điểm chuyên nghiệp: đèn chính (key light) mềm mại để tạo khối, đèn phụ (fill light) nhẹ để giảm bóng, và đèn viền (rim light) tinh tế để tách chủ thể khỏi nền. **Máy ảnh & Ống kính**: Chụp bằng ống kính chân dung 85mm f/1.4 để tạo độ sâu trường ảnh nông, làm nổi bật chủ thể. **Hậu kỳ**: Chỉnh màu điện ảnh (cinematic color grading), chi tiết sắc nét, tông da hoàn hảo. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể. TRÁNH vẻ ngoài giả tạo của ảnh stock." },
    { id: 'artist', name: 'Nghệ sĩ Sáng tạo', thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=500&q=80', category: 'style', prompt: "Với tư cách là một nhiếp ảnh gia nghệ thuật chuyên chụp chân dung cho các nghệ sĩ, hãy tạo một bức ảnh 8K đầy cảm xúc và kịch tính. **Chủ thể**: Người trong ảnh, trang phục thể hiện cá tính riêng, có thể dính vài vệt sơn. **Bối cảnh**: Một studio nghệ thuật lộn xộn có chủ đích, với giá vẽ, toan, và các vệt sơn xung quanh. **Ánh sáng**: Sử dụng kỹ thuật chiếu sáng Rembrandt, tạo ra một tam giác sáng đặc trưng dưới mắt, mang lại chiều sâu và tâm trạng. **Máy ảnh & Ống kính**: Chụp bằng ống kính 50mm f/1.8 để có góc nhìn tự nhiên. **Hậu kỳ**: Tăng cường độ tương phản và kết cấu (texture), màu sắc có thể bão hòa hoặc giảm nhẹ để tạo không khí. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'classic', name: 'Cổ điển Đen trắng', thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80&sat=-100', category: 'style', prompt: "Với tư cách là một bậc thầy nhiếp ảnh đen trắng theo phong cách của Ansel Adams, hãy tạo một bức chân dung 8K đen trắng vượt thời gian. **Chủ thể**: Người trong ảnh. **Bối cảnh**: Phông nền đơn giản, tập trung hoàn toàn vào chủ thể. **Ánh sáng**: Ánh sáng mềm mại, khuếch tán từ một phía để điêu khắc các đường nét trên khuôn mặt. **Máy ảnh & Ống kính**: Mô phỏng máy ảnh Leica M với ống kính 35mm Summicron. **Hậu kỳ**: Độ tương phản cao, dải tông màu (tonal range) rộng từ đen sâu đến trắng sáng. Thêm một lớp nhiễu hạt (film grain) tinh tế để tăng cảm giác chân thực. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'future', name: 'Cyberpunk Tương lai', thumbnail: 'https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=500&q=80', category: 'style', prompt: "Với tư cách là đạo diễn hình ảnh của bộ phim Blade Runner, hãy tạo một bức ảnh 8K theo phong cách cyberpunk. **Chủ thể**: Người trong ảnh, có thể có các chi tiết công nghệ cao trên trang phục. **Bối cảnh**: Một con phố đêm ở thành phố tương lai, với các bảng hiệu neon rực rỡ, trời mưa nhẹ và các hình ảnh hologram. **Ánh sáng**: Ánh sáng neon phản chiếu trên da và quần áo, tạo ra các mảng màu xanh dương, hồng và tím. **Máy ảnh & Ống kính**: Sử dụng ống kính anamorphic để tạo hiệu ứng bokeh hình oval và lóa sáng (lens flare) đặc trưng. **Hậu kỳ**: Chỉnh màu với tông xanh và tím làm chủ đạo, độ tương phản cao và vùng tối sâu. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'natural', name: 'Nàng thơ Tự nhiên', thumbnail: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=500&q=80', category: 'style', prompt: "Với tư cách là nhiếp ảnh gia phong cách sống, hãy tạo một bức chân dung 8K tự nhiên và ấm áp. **Chủ thể**: Người trong ảnh, mặc trang phục đơn giản, thoải mái, tươi cười. **Bối cảnh**: Một công viên xanh mát hoặc khu vườn vào 'giờ vàng' (golden hour) cuối buổi chiều. **Ánh sáng**: Ánh sáng mặt trời tự nhiên, ấm áp, chiếu xiên. **Máy ảnh & Ống kính**: Chụp bằng ống kính 50mm f/1.8 để có góc nhìn tự nhiên và xóa phông nhẹ nhàng. **Hậu kỳ**: Chỉnh màu ấm áp, tươi sáng, giữ lại vẻ đẹp tự nhiên. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'cinematic', name: 'Điện ảnh Moody', thumbnail: 'https://images.unsplash.com/photo-1620643150799-f6586e5c5641?auto=format&fit=crop&w=500&q=80', category: 'style', prompt: "Với tư cách là đạo diễn hình ảnh (Cinematographer), hãy tạo một khung hình phim điện ảnh 8K. **Chủ thể**: Người trong ảnh, biểu cảm có chiều sâu, như đang ở giữa một câu chuyện. **Bối cảnh**: Một bối cảnh có tính kể chuyện, ví dụ như một quán cà phê vắng, một sân ga cũ. **Ánh sáng**: Ánh sáng kịch tính, có thể là ánh sáng le lói qua cửa sổ hoặc ánh đèn đường. **Máy ảnh & Ống kính**: Tỷ lệ khung hình siêu rộng (2.35:1). **Hậu kỳ**: Chỉnh màu theo phong cách Hollywood (ví dụ: tông màu cam và xanh mòng két - teal and orange), tạo viền đen trên dưới. **Yêu cầu cốt lõl**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'magazine', name: 'Bìa Tạp chí Vogue', thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&q=80', category: 'style', prompt: "Với tư cách là nhiếp ảnh gia thời trang của tạp chí Vogue, hãy tạo một bức ảnh bìa 8K đầy phong cách. **Chủ thể**: Người trong ảnh, trang phục thời thượng, thần thái đỉnh cao. **Bối cảnh**: Phông nền studio màu sắc hoặc một địa điểm kiến trúc độc đáo. **Ánh sáng**: Ánh sáng studio hoàn hảo, có thể sử dụng 'beauty dish' để làm nổi bật làn da và xương gò má. **Máy ảnh & Ống kính**: Chụp bằng ống kính 105mm f/1.4 để nén hậu cảnh và tập trung vào chủ thể. **Hậu kỳ**: Retouch da chuyên nghiệp, màu sắc rực rỡ, sống động. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
    { id: 'newspaper', name: 'Hồng Kông Retro', thumbnail: 'https://images.unsplash.com/photo-1556546186-1a6186f2f798?auto=format&fit=crop&w=500&q=80', category: 'style', prompt: "Với tư cách là đạo diễn phim xã hội đen Hồng Kông thập niên 90, hãy tạo một bức ảnh 8K đậm chất 'giang hồ'. **Chủ thể**: Người trong ảnh, trang phục kiểu retro (sơ mi hoa, áo khoác da). **Bối cảnh**: Một con hẻm nhỏ ở Hồng Kông về đêm, hoặc một quán mạt chược. **Ánh sáng**: Ánh sáng kịch tính từ các nguồn sáng đơn lẻ, tạo bóng đổ mạnh. **Máy ảnh & Ống kính**: Mô phỏng máy quay phim cũ. **Hậu kỳ**: Chỉnh màu theo tông phim cũ, ngả vàng hoặc xanh, thêm hiệu ứng nhiễu hạt và có thể có vệt sáng mờ. **Yêu cầu cốt lõi**: Tái tạo chính xác đặc điểm khuôn mặt của chủ thể." },
];

const baseCompositePrompt = "Với tư cách là một chuyên gia Photoshop và nghệ sĩ kỹ thuật số, hãy tạo một bức ảnh ghép 4K siêu thực, liền mạch. **Nhiệm vụ**: Đặt người trong ảnh gốc vào bối cảnh của **{item}**. **Yêu cầu kỹ thuật**: Ánh sáng, bóng đổ, nhiệt độ màu và kết cấu trên người của chủ thể phải khớp một cách hoàn hảo với môi trường xung quanh để tạo ra một kết quả chân thực, đáng tin. **Yêu cầu cốt lõi**: Giữ nguyên vẹn và chính xác tất cả các đặc điểm khuôn mặt độc đáo của chủ thể. TRÁNH tuyệt đối cảm giác 'cắt dán' hoặc không tự nhiên.";
const CELEBRITY_PROMPT_TEMPLATE = "Với tư cách là một chuyên gia Photoshop và đạo diễn hình ảnh, hãy tạo một bức ảnh 4K siêu thực, liền mạch. **Nhiệm vụ**: Tạo một bức ảnh trong đó người từ ảnh gốc đang đứng cạnh và chụp ảnh chung với **{item}**. Hãy tưởng tượng đây là một khoảnh khắc được bắt gặp tự nhiên, ví dụ như tại một sự kiện, buổi ra mắt phim, hoặc một cuộc gặp gỡ tình cờ. **Yêu cầu kỹ thuật**: 1. **Chủ thể**: Phải có hai người trong ảnh: người từ ảnh gốc và **{item}**. 2. **Tương tác**: Hai người nên có tương tác tự nhiên, như thể họ đang thực sự ở cùng nhau. 3. **Bối cảnh & Ánh sáng**: Bối cảnh, ánh sáng, bóng đổ, và tông màu phải đồng nhất và nhất quán cho cả hai người, tạo ra một kết quả chân thực và đáng tin. **Yêu cầu cốt lõi**: Giữ nguyên vẹn 100% các đặc điểm khuôn mặt độc đáo của người trong ảnh gốc. TRÁNH tuyệt đối cảm giác 'cắt dán' hoặc không tự nhiên.";

// --- CELEBRITY STYLES (Thủ công, hình ảnh riêng biệt) ---
const CELEBRITY_STYLES: Style[] = [
    {
        id: 'celeb_sontung',
        name: 'Sơn Tùng M-TP',
        thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=500&q=80', // Male singer on stage
        category: 'celebrity',
        prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', 'ca sĩ Sơn Tùng M-TP phong cách hiện đại, sân khấu sôi động')
    },
    {
        id: 'celeb_taylor',
        name: 'Taylor Swift',
        thumbnail: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=500&q=80', // Female singer with mic
        category: 'celebrity',
        prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', 'Taylor Swift trong tour diễn The Eras Tour')
    },
    {
        id: 'celeb_blackpink',
        name: 'BLACKPINK',
        thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80', // Event/Stage
        category: 'celebrity',
        prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', 'nhóm nhạc BLACKPINK tại một sự kiện thời trang cao cấp')
    },
    {
        id: 'celeb_tranthanh',
        name: 'Trấn Thành',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80', // Man in suit/MC vibe
        category: 'celebrity',
        prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', 'MC Trấn Thành trong bộ vest lịch lãm tại trường quay')
    },
    {
        id: 'celeb_ironman',
        name: 'Iron Man',
        thumbnail: 'https://images.unsplash.com/photo-1623934199716-dc28818a6ec7?auto=format&fit=crop&w=500&q=80', // Robot/Tech
        category: 'celebrity',
        prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', 'Iron Man trong bộ giáp công nghệ cao MK85')
    },
    {
        id: 'celeb_bts',
        name: 'BTS',
        thumbnail: 'https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?auto=format&fit=crop&w=500&q=80', // Group/Kpop vibe
        category: 'celebrity',
        prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', 'nhóm nhạc BTS trong một buổi chụp hình tạp chí')
    },
    {
        id: 'celeb_mytam',
        name: 'Mỹ Tâm',
        thumbnail: 'https://images.unsplash.com/photo-1520809283606-d43226b98f51?auto=format&fit=crop&w=500&q=80', // Elegant singer
        category: 'celebrity',
        prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', 'ca sĩ Mỹ Tâm với phong cách thanh lịch, thân thiện')
    },
     {
        id: 'celeb_keanu',
        name: 'Keanu Reeves',
        thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80', // Moody portrait
        category: 'celebrity',
        prompt: CELEBRITY_PROMPT_TEMPLATE.replace('{item}', 'tài tử Keanu Reeves với phong cách phong trần, đời thường')
    },
];

// --- TRAVEL STYLES (Thủ công, hình ảnh địa danh) ---
const TRAVEL_STYLES: Style[] = [
    {
        id: 'travel_halong',
        name: 'Vịnh Hạ Long',
        thumbnail: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=500&q=80',
        category: 'travel',
        prompt: baseCompositePrompt.replace('{item}', 'du thuyền sang trọng giữa Vịnh Hạ Long với núi đá vôi hùng vĩ')
    },
    {
        id: 'travel_hoian',
        name: 'Phố cổ Hội An',
        thumbnail: 'https://images.unsplash.com/photo-1557750255-c76072a7bb56?auto=format&fit=crop&w=500&q=80',
        category: 'travel',
        prompt: baseCompositePrompt.replace('{item}', 'Phố cổ Hội An lung linh ánh đèn lồng về đêm')
    },
    {
        id: 'travel_paris',
        name: 'Tháp Eiffel, Paris',
        thumbnail: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?auto=format&fit=crop&w=500&q=80',
        category: 'travel',
        prompt: baseCompositePrompt.replace('{item}', 'công viên Champ de Mars với tháp Eiffel lãng mạn phía sau')
    },
    {
        id: 'travel_tokyo',
        name: 'Tokyo, Nhật Bản',
        thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=80',
        category: 'travel',
        prompt: baseCompositePrompt.replace('{item}', 'ngã tư Shibuya sầm uất ở Tokyo với ánh đèn neon rực rỡ')
    },
    {
        id: 'travel_santorini',
        name: 'Đảo Santorini',
        thumbnail: 'https://images.unsplash.com/photo-1613395877344-13d4c79e4284?auto=format&fit=crop&w=500&q=80',
        category: 'travel',
        prompt: baseCompositePrompt.replace('{item}', 'những ngôi nhà trắng mái xanh đặc trưng bên bờ biển Santorini, Hy Lạp')
    },
    {
        id: 'travel_nyc',
        name: 'New York, Mỹ',
        thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=500&q=80',
        category: 'travel',
        prompt: baseCompositePrompt.replace('{item}', 'Quảng trường Thời đại (Times Square) sôi động ở New York')
    },
    {
        id: 'travel_cauvang',
        name: 'Cầu Vàng, Đà Nẵng',
        thumbnail: 'https://images.unsplash.com/photo-1569604466690-2d889273b9b4?auto=format&fit=crop&w=500&q=80', // Generic bridge/mountain vibe as placeholder if exact image unavailable
        category: 'travel',
        prompt: baseCompositePrompt.replace('{item}', 'Cầu Vàng (Cầu bàn tay) nổi tiếng trên đỉnh Bà Nà Hills trong sương mờ')
    },
    {
        id: 'travel_sapa',
        name: 'Ruộng bậc thang Sapa',
        thumbnail: 'https://images.unsplash.com/photo-1565354785692-888d431db0eb?auto=format&fit=crop&w=500&q=80',
        category: 'travel',
        prompt: baseCompositePrompt.replace('{item}', 'những thửa ruộng bậc thang chín vàng óng ả tại Sapa, Việt Nam')
    },
];

// --- PANORAMA STYLES (Thủ công, hình ảnh bối cảnh) ---
const PANORAMA_STYLES: Style[] = [
    {
        id: 'pano_galaxy',
        name: 'Dải Ngân Hà',
        thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80',
        category: 'panorama',
        prompt: baseCompositePrompt.replace('{item}', 'không gian vũ trụ bao la với Dải Ngân Hà rực rỡ sao trời')
    },
    {
        id: 'pano_cybercity',
        name: 'Thành phố Tương lai',
        thumbnail: 'https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=500&q=80',
        category: 'panorama',
        prompt: baseCompositePrompt.replace('{item}', 'một thành phố Cyberpunk tương lai với các tòa nhà chọc trời và xe bay')
    },
    {
        id: 'pano_beach',
        name: 'Bãi biển Nhiệt đới',
        thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
        category: 'panorama',
        prompt: baseCompositePrompt.replace('{item}', 'một bãi biển nhiệt đới hoang sơ với cát trắng, dừa xanh và biển ngọc bích')
    },
    {
        id: 'pano_snow',
        name: 'Dãy núi Tuyết',
        thumbnail: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=500&q=80',
        category: 'panorama',
        prompt: baseCompositePrompt.replace('{item}', 'đỉnh núi tuyết vĩnh cửu hùng vĩ dưới bầu trời xanh thẳm')
    },
    {
        id: 'pano_jungle',
        name: 'Rừng rậm Amazon',
        thumbnail: 'https://images.unsplash.com/photo-1448375240586-dfd8f3793300?auto=format&fit=crop&w=500&q=80',
        category: 'panorama',
        prompt: baseCompositePrompt.replace('{item}', 'trái tim của rừng rậm Amazon xanh thẳm với cây cối rậm rạp và ánh nắng xuyên qua tán lá')
    },
];

const TRENDING_STYLES: Style[] = [
     {
        id: 'trend_back_to_school_2024',
        name: 'Thanh Xuân Vườn Trường',
        thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80',
        category: 'trends',
        prompt: "Với tư cách là nhiếp ảnh gia cho một bộ phim thanh xuân vườn trường, hãy tạo một bức ảnh tựu trường 4K trong trẻo và đầy hoài niệm. **Chủ thể**: Người trong ảnh, mặc đồng phục học sinh hoặc trang phục năng động, trẻ trung, có thể đeo balo. **Bối cảnh**: Sân trường ngập nắng với cây phượng, hành lang lớp học, hoặc thư viện. **Ánh sáng**: Ánh sáng tự nhiên, trong trẻo của buổi sáng. **Máy ảnh & Hậu kỳ**: Chỉnh màu theo phong cách film Nhật Bản, tông màu nhẹ nhàng, tươi sáng, có chút hoài niệm. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-08-15',
        endDate: '2024-09-05',
    },
    {
        id: 'trend_mid_autumn_2024',
        name: 'Trung Thu Cổ Tích',
        thumbnail: 'https://images.unsplash.com/photo-1535526769233-0c9802212b39?auto=format&fit=crop&w=500&q=80',
        category: 'trends',
        prompt: "Với tư cách là một nghệ sĩ kể chuyện bằng hình ảnh, hãy tạo một bức ảnh Tết Trung Thu 4K huyền ảo, đầy thơ mộng. **Chủ thể**: Người trong ảnh, có thể mặc trang phục cổ trang hoặc hiện đại, tay cầm một chiếc đèn lồng truyền thống. **Bối cảnh**: Đứng dưới ánh trăng tròn vành vạnh của đêm rằm. **Ánh sáng**: Ánh sáng chính phát ra từ mặt trăng và chiếc đèn lồng chủ thể cầm, tạo ra một không gian lung linh. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-09-10',
        endDate: '2024-09-25',
    },
    {
        id: 'trend_halloween_2024',
        name: 'Halloween Ma Mị',
        thumbnail: 'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&w=500&q=80',
        category: 'trends',
        prompt: "Tạo một bức ảnh Halloween 4K ma mị. **Chủ thể**: Hóa trang thành nhân vật bí ẩn. **Bối cảnh**: Khu rừng đầy sương mù hoặc ngôi nhà hoang. **Ánh sáng**: Tối, tương phản cao, ánh sáng xanh lạnh. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-10-20',
        endDate: '2024-11-02',
    },
    {
        id: 'trend_christmas_2024',
        name: 'Giáng Sinh Ấm Áp',
        thumbnail: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=500&q=80',
        category: 'trends',
        prompt: "Tạo một bức ảnh Giáng Sinh 4K ấm cúng. **Chủ thể**: Mặc đồ len đỏ/xanh. **Bối cảnh**: Bên cây thông Noel và lò sưởi. **Ánh sáng**: Vàng ấm, bokeh lấp lánh. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2024-12-01',
        endDate: '2024-12-31',
    },
    {
        id: 'trend_tet_2025',
        name: 'Tết Việt Rực Rỡ',
        thumbnail: 'https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?auto=format&fit=crop&w=500&q=80',
        category: 'trends',
        prompt: "Tạo một bức ảnh Tết Nguyên Đán 4K rực rỡ. **Chủ thể**: Mặc Áo Dài. **Bối cảnh**: Vườn đào, mai, hoặc phố ông đồ. **Ánh sáng**: Tươi sáng, nắng vàng. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2025-01-20',
        endDate: '2025-02-10',
    },
    {
        id: 'trend_valentine_2025',
        name: 'Valentine Ngọt Ngào',
        thumbnail: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=500&q=80',
        category: 'trends',
        prompt: "Tạo một bức ảnh Valentine 4K lãng mạn. **Chủ thể**: Cầm hoa hồng hoặc sô cô la. **Bối cảnh**: Quán cafe lãng mạn hoặc vườn hoa. **Ánh sáng**: Hồng dịu ngọt. **Yêu cầu cốt lõi**: Giữ nguyên đặc điểm khuôn mặt của chủ thể.",
        startDate: '2025-02-07',
        endDate: '2025-02-16',
    },
];

const baseProductPrompt = "Với tư cách là một nhiếp ảnh gia quảng cáo và giám đốc sáng tạo, hãy tạo một hình ảnh 4K siêu thực, chất lượng cao và hấp dẫn cho sản phẩm. **Yêu cầu cốt lõi**: Giữ nguyên hình dạng, chi tiết, logo và nhãn hiệu của sản phẩm từ ảnh gốc. **Bối cảnh & Ánh sáng**: {description}";

const PRODUCT_STYLES: Style[] = [
    // Studio
    { id: 'prod_studio_white', name: 'Studio Nền Trắng', thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên nền trắng hoàn hảo, vô cực. Sử dụng ánh sáng studio mềm mại, khuếch tán để loại bỏ bóng gắt, làm nổi bật chi tiết sản phẩm.') },
    { id: 'prod_studio_dark', name: 'Studio Dark Mode', thumbnail: 'https://images.unsplash.com/photo-1550614000-4b9519e0072d?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm nổi bật trên nền đen hoặc xám đậm. Sử dụng kỹ thuật chiếu sáng viền (rim light) để tạo ra một đường viền sáng tinh tế, nhấn mạnh hình khối của sản phẩm.') },
    { id: 'prod_studio_geometric', name: 'Hình Khối 3D', thumbnail: 'https://images.unsplash.com/photo-1555596899-d634257b55bb?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'studio', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được trưng bày trên các bục hoặc khối hình học (tròn, vuông, tam giác) cùng màu hoặc tương phản, tạo bố cục kiến trúc và hiện đại.') },
    // Thiên nhiên
    { id: 'prod_nature_beach', name: 'Bãi Biển Nhiệt Đới', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm nằm trên bãi cát trắng mịn, phía sau là làn nước biển trong xanh và những con sóng nhỏ. Chụp vào giờ vàng để có ánh sáng ấm áp.') },
    { id: 'prod_nature_forest', name: 'Rừng Rậm Xanh Mát', thumbnail: 'https://images.unsplash.com/photo-1448375240586-dfd8f3793300?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'nature', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một gốc cây cổ thụ hoặc giữa thảm lá cây trong một khu rừng xanh tươi. Ánh sáng tự nhiên tạo ra những vệt nắng đẹp mắt.') },
    // Phong cách sống
    { id: 'prod_lifestyle_cafe', name: 'Cafe Chill', thumbnail: 'https://images.unsplash.com/photo-1461023058943-48dbf9479099?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm đặt trên bàn gỗ của một quán cà phê ấm cúng, bên cạnh một tách cappuccino và một cuốn sách.') },
    { id: 'prod_lifestyle_home', name: 'Nội Thất Hiện Đại', thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'lifestyle', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt một cách tự nhiên trong một ngôi nhà hiện đại, có thể trên bàn khách, kệ sách hoặc bàn trang điểm.') },
    // Bối cảnh Việt Nam
    { id: 'prod_vn_hoian', name: 'Phố Cổ Hội An', thumbnail: 'https://images.unsplash.com/photo-1524095731963-b4e38d933999?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm được đặt trên một chiếc bàn gỗ nhỏ, hậu cảnh là con phố Hội An về đêm lung linh với hàng trăm chiếc đèn lồng đủ màu sắc.') },
    { id: 'prod_vn_saigon_coffee', name: 'Cafe Phố Sài Gòn', thumbnail: 'https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=500&q=80', category: 'product', subCategory: 'vietnam', prompt: baseProductPrompt.replace('{description}', 'Sản phẩm trên bàn của một quán cà phê cóc vỉa hè đặc trưng của Sài Gòn, với phin cà phê và ly trà đá.') },
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
