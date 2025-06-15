// src/components/client/home/data-home.js
// src/pages/home/data-home.js (hoặc tương ứng)
import dish1 from '../../../assets/client/images/home/dish1.webp';
import dish2 from '../../../assets/client/images/home/dish2.webp';
import dish3 from '../../../assets/client/images/home/dish3.webp';
import dish4 from '../../../assets/client/images/home/dish4.webp';
import endow1 from "../../../assets/client/images/endow-blog/endow1.png";
import endow2 from "../../../assets/client/images/endow-blog/endow2.webp";
import introVisual from "../../../assets/client/images/home/intro-visual.webp";
import partyVisual from "../../../assets/client/images/home/intro-visual.webp";
import promo1 from "../../../assets/client/images/home/birthday.webp";
import promo2 from "../../../assets/client/images/home/hotpot.webp";
import promo3 from "../../../assets/client/images/home/member.webp";


export const dishes = [
  { id: 1, name: 'Măng trúc xào bò', price: '145,000', img: dish1 },
  { id: 2, name: "Gà H'Mong rang muối", price: '350,000', img: dish2 },
  { id: 3, name: 'Cá chẽm chiên giòn kèm xoài xanh', price: '239,000', img: dish3 },
  { id: 4, name: 'Dê xào hoa chuối', price: '169,000', img: dish4 },
];

export const endows = [
  {
    id: 1,
    slug: "tu-hao-viet-nam",
    description: "TỰ HÀO VIỆT NAM – MỘT DỰ ÁN ĐẶC BIỆT CỦA QUÁN NHẬU TỰ DO",
    image: endow1,
  },
  {
    id: 2,
    slug: "mien-phi-ship-cuoi-tuan",
    description: "MIỄN PHÍ SHIP CUỐI TUẦN - ĐẶT LÀ CÓ, KHÔNG LO PHÍ",
    image: endow2,
  },
  {
    id: 3,
    slug: "uu-dai-thanh-vien-moi",
    description: "ƯU ĐÃI THÀNH VIÊN MỚI - NHẬN NGAY VOUCHER 100K",
    image: endow1,
  },
  {
    id: 4,
    slug: "happy-hour-2025",
    description: "HAPPY HOUR - MUA 1 TẶNG 1 TỪ 17H ĐẾN 19H MỖI NGÀY",
    image: endow1,
  },
  {
    id: 5,
    slug: "thu-5-dac-biet",
    description: "THỨ 5 ĐẶC BIỆT - GIẢM 50% CÁC MÓN ĂN ĐẶC SẮC",
    image: endow1,
  },
  {
    id: 6,
    slug: "qua-tang-cho-ban-than",
    description: "QUÀ TẶNG CHO BẠN THÂN - TẶNG NƯỚC UỐNG MIỄN PHÍ",
    image: endow1,
  },
  {
    id: 7,
    slug: "di-3-tinh-tien-2",
    description: "ĐI 3 TÍNH TIỀN 2 - HỘI NHẬU KHÔNG LO GIÁ",
    image: endow1,
  },
  {
    id: 8,
    slug: "buffet-tai-ban",
    description: "BUFFET TẠI BÀN - CHỈ VỚI 199K",
    image: endow1,
  },
  {
    id: 9,
    slug: "khai-truong-uu-dai",
    description: "KHAI TRƯƠNG - ƯU ĐÃI LÊN ĐẾN 70%",
    image: endow1,
  }
];
// quán nhậu
export const introInfo = {
  title: "Quán Nhậu Đẳng Cấp Hà Nội",
  points: [
    "Ẩm thực vùng miền quá đa dạng",
    "Bia ngon, rượu say với bạn hiền",
    "Cảnh đẹp, quán vui quên lối về",
  ],
  image: introVisual,
};
// tiệc tùng
export const partyInfo = {
  title: "Dịch vụ tiệc tùng hết nấc",
  points: [
    "Loa, mic, video, hô là có",
    "Phòng Vip riêng tư luôn sẵn sàng",
    "Hỗ trợ nhiệt tình mọi yêu cầu",
  ],
  image: partyVisual,
};
// slider bài viết

export const promoSlides = [
  { id: 1, image: promo1, alt: "Sinh nhật cực chất" },
  { id: 2, image: promo2, alt: "Ship lẩu tận nhà" },
  { id: 3, image: promo3, alt: "Thành viên mới" },

];

