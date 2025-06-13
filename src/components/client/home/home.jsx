import React from 'react';
import './home.scss';
import Slider from 'react-slick';
import { dishes } from './data-home';

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,      // ← show 4 cards on desktop
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,  // vẫn giữ 4 ở các desktop nhỏ hơn nếu muốn
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,  // tablet
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,  // mobile
        },
      },
    ],
  };

  return (
    <>
      {/* Section 1: tiêu đề */}
      <section className="home-section">
        <div className="home-content">
          <h1>HOÀNG GIA QUÁN <br />THẾ GIỚI CỦA TA</h1>
        </div>
      </section>

      {/* Section 2: Menu Món mới ra lò */}
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
    </>
  );
}
