import React from "react";
import "./Footer.scss";
import logoImg from "../../../../assets/client/images/header/logo.jpg";
import dish1 from "../../../../assets/client/images/footer/dish1.jpg";
// import dish2 from "../../../../assets/client/images/footer/dish2.jpg";
// import dish3 from "../../../../assets/client/images/footer/dish3.jpg";
// import dish4 from "../../../../assets/client/images/footer/dish4.jpg";

const Footer = () => {
  return (
    <footer className="tudo-footer">
      <div className="tudo-footer__top">
        <div className="tudo-footer__overview">
          <img src={logoImg} alt="Quán Nhậu Tự Do" className="overview__logo" />
          <h2 className="overview__title">Quán Nhậu Tự Do</h2>
          <p className="overview__desc">
            Thưởng thức không gian ấm cúng, món nhậu phong phú cùng hương vị đậm đà tại Quán Nhậu Tự Do.
          </p>
          <div className="overview__rating">
            <span>⭐⭐⭐⭐⭐</span>
            <small>4.9/5 (2,847 đánh giá)</small>
          </div>
        </div>

        <div className="tudo-footer__specials">
          <h3 className="specials__heading">Chủ Quán</h3>
          <div className="specials__grid">
            {[dish1].map((src, idx) => (
              <div key={idx} className="specials__item">
                <img src={src} alt={`Món đặc trưng ${idx + 1}`} />
              </div>
            ))}
          </div>
          <button className="specials__btn">Xem Ai Giàu Hơn</button>
        </div>

        <div className="tudo-footer__reviews">
          <div className="reviews__card">
            <h3 className="reviews__title">Khách Hàng Nói Gì</h3>
            <div className="review">
              <p className="review__text">
                “Món ăn tuyệt vời, không gian ấm cúng. Đây là nhà hàng nhậu tốt nhất tôi từng đến!”
              </p>
              <span className="review__author">— Anh Minh</span>
            </div>
            <div className="review">
              <p className="review__text">
                “Dịch vụ chu đáo, đồ ăn ngon. Sẽ quay lại nhiều lần nữa!”
              </p>
              <span className="review__author">— Chị Linh</span>
            </div>
            <button className="reviews__more">Đọc Thêm Đánh Giá</button>
          </div>
        </div>
      </div>

      <div className="tudo-footer__nav">
        <div className="nav__section">
          <h4>Thực Đơn</h4>
          <ul>
            <li>Combo</li>
            <li>Món Mới</li>
            <li>Đồ Uống</li>
            <li>Rau Xanh</li>
            
          </ul>
        </div>
        <div className="nav__section">
          <h4>Dịch Vụ</h4>
          <ul>
            <li>Đặt Bàn</li>
            
          </ul>
        </div>
        <div className="nav__section">
          <h4>Về Chúng Tôi</h4>
          <ul>
            <li>Câu Chuyện</li>
            
          </ul>
        </div>
        <div className="nav__section">
          <h4>Hỗ Trợ</h4>
          <ul>
            <li>Liên Hệ</li>
            
          </ul>
        </div>
      </div>

      <div className="tudo-footer__bottom">
        <p>© 2024 Quán Nhậu Hoàng Gia</p>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fas fa-envelope"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;