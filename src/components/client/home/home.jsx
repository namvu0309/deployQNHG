import React from 'react';
import './home.scss';
import Slider from 'react-slick';
import { dishes, endows } from './data-home';
import { Link } from 'react-router-dom';

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,      // 4 cards trên desktop
    slidesToScroll: 1,
    arrows: true,
    
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992,  settings: { slidesToShow: 2 } },
      { breakpoint: 576,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      {/* Section 1: tiêu đề */}
      <section className="home-section">
        <div className="home-content">
          <h1>HOÀNG GIA QUÁN<br />THẾ GIỚI CỦA TA</h1>
        </div>
      </section>

      {/* Section 2: Món mới ra lò */}
      <section className="new-menu-section">
        <h2 className="section-title">Món mới ra lò</h2>
        <div className="slider-wrapper">
          <Slider {...settings}>
            {dishes.map(d => (
              <div key={d.id} className="card-item small">
                <div className="card-image">
                  <img src={d.img} alt={d.name} />
                </div>
                <div className="card-info">
                  <h3>{d.name}</h3>
                  <p className="price">{d.price}</p>
                  <button className="btn-order">+ Đặt</button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="btn-wrap">
          <button className="btn-view-menu">Xem thực đơn</button>
        </div>
      </section>

      {/* Section 3: chữ chạy */}
      <section className="promotion-section">
        <div className="promotion-wrapper">
          <span className="promotion-text">
            ƯU ĐÃI HOÀNG GIA 🔖 ƯU ĐÃI HOÀNG GIA 🔖 ƯU ĐÃI HOÀNG GIA 🔖 ƯU ĐÃI HOÀNG GIA 🔖 ƯU ĐÃI HOÀNG GIA 🔖 ƯU ĐÃI HOÀNG GIA 🔖 ƯU ĐÃI HOÀNG GIA 🔖 ƯU ĐÃI HOÀNG GIA 🔖
          </span>
        </div>
      </section>

      {/* Section 4: Khuyến mãi & Tin tức */}
      <section className="promo-cards-section">
        {/* <h2 className="section-title">Ưu đãi &amp; Tin tức</h2> */}
        <div className="slider-wrapper promo">
          <Slider {...settings}>
            {endows.map(item => (
              <div key={item.id} className="card-item small">
                <div className="card-image">
                  <img src={item.image} alt={item.description} />
                </div>
                <div className="card-info">
                  <h3>{item.description}</h3>
                  <button className="btn-receive">Xem Ngay</button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="btn-wrap">
          <button className="btn-view-all">Xem tất cả</button>
        </div>
      </section>
    </>
  );
}
