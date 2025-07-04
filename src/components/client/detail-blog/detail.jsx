import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { endows } from "../endow-blog/data-endow";
import "./detail.scss";

import arrowRight from "../../../assets/client/images/detail-blog/arrow-right.png";
import rightArrow from "../../../assets/client/images/detail-blog/rightarrow-icon.png";
import banner from "../../../assets/client/images/detail-blog/banner.jpg";
import tinhHoa from "../../../assets/client/images/detail-blog/tinhhoa.jpg";
import laushiptudo from "../../../assets/client/images/detail-blog/laushiptudo.jpg";
import anh1 from "../../../assets/client/images/detail-blog/anh1.jpg";
import { Link } from "react-router-dom";
import Footer from "../../../components/client/include/footer/footer";

const Detail = () => {
  const { slug } = useParams();
  const endow = endows.find((b) => b.slug === slug);
  const navigate = useNavigate();

  if (!endow) {
    return (
      <div className="not-found">
        <h2>Không tìm thấy nội dung ưu đãi</h2>
        <button onClick={() => navigate("/endow-page")}>Quay lại trang ưu đãi</button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="breadcrumb">
        <div>
          <span onClick={() => navigate(-1)} className="endow">
            Tin tức
            <img src={arrowRight} alt="arrow" style={{ marginRight: '8px' }} />
          </span>
          <span>Ưu đãi</span>
        </div>
      </div>

       <div className="container">
       
        <div className="main-content">
        
          <h1 className="title">
            Quán Nhậu Tự Do đồng hành cùng "Tinh Hoa Bắc Bộ" - Chắp cánh tình yêu đất nước cùng những trái tim nghị lực
          </h1>
          <img className="banner" src={banner} alt="Banner" />
          <p>
            Chương trình đặc biệt chào mừng 50 năm Giải phóng miền Nam, thống nhất đất nước.
          </p>
          <p>
            Sự kiện không chỉ là dịp để cộng đồng người khuyết tật - những trái tim nghị lực thể hiện lòng tự hào dân tộc, mà còn là không gian gặp gỡ.
          </p>
          <img className="image" src={tinhHoa} alt="Tinh Hoa Bắc Bộ" />
                    <p>
            <strong>Tinh hoa Bắc Bộ</strong> là điểm nhấn đặc biệt của chương trình, show thực cảnh <br />
            <em>"Tinh hoa Bắc Bộ"</em> sẽ mang đến cho người xem hành trình nghệ thuật độc đáo,<br />
            kết hợp giữa truyền thống và công nghệ hiện đại. Trình diễn trong không gian sân khấu thực địa rộng lớn,
          </p>

          {/* <img className="image" src={require("../assets/show.jpg")} alt="Show Tinh Hoa" /> */}

          <div className="hotline">
            <h4>Hotline của Hệ thống Quán Nhậu Tự Do là gì?</h4>
            <p>
              Bạn có thể liên hệ qua hotline <strong>1900 1986</strong> để đặt bàn và nhận hỗ trợ nhanh nhất!
              <br />
              Fanpage: <a href="https://www.facebook.com/QuanNhauHoangGia/" target="_blank" rel="noopener noreferrer">
                https://www.facebook.com/QuanNhauHoangGia/
              </a>
            </p>
            {/* <ul>
              <li><a href="#">Quán Nhậu Tự Do 18 Nguyễn Văn Huyên – Cầu Giấy</a></li>
              <li><a href="#">Quán Nhậu Tự Do 505 Minh Khai – Hai Bà Trưng</a></li>
              <li><a href="#">Quán Nhậu Tự Do 68 Bùi Huy Bích – Hai Bà Trưng</a></li>
              <li><a href="#">Quán Nhậu Tự Do 75 Yên Lãng – Đống Đa</a></li>
              <li><a href="#">Quán Nhậu Tự Do 22 Dịch Vọng – Cầu Giấy</a></li>
              <li><a href="#">Quán Nhậu Tự Do 12 Nguyễn Văn Tuyết – Đống Đa</a></li>
              <li><a href="#">Quán Nhậu Tự Do 67A Phó Đức Chính – Ba Đình</a></li>
            </ul> */}
          </div>

        </div>

        <div className="sidebar">
          <h3>Tin mới liên quan</h3>
          <ul>
            {endows.slice(0, 3).map((e) => (
              <li key={e.id}>
                <img src={e.image} alt={e.description} />
                <p>{e.description}</p>
              </li>
            ))}
          </ul>
          <img src={laushiptudo} alt="Feature Image" className="feature-image" />
          <img src={anh1} alt="Feature Image" className="feature-image" />
        </div>
      </div>

      <div className="menuBox">
        <h2 className="title-menu">Bài Viết Khác</h2>
        <ul className="list-food-menu dish">
          {endows.map((endow) => (
            <li key={endow.id}>
              <div className="food-menu-dish">
                <Link to={`/endow-page/detail/${endow.slug}`} className="thumb">
                  <img src={endow.image} alt={endow.description} />
                </Link>
                <div className="info-box">
                  <a href="#" className="title-food">{endow.description}</a>
                  <div className="price-food">{endow.price || "Liên hệ"}</div>
                  <div className="funcsBox">
                    <Link to={`/endow-page/detail/${endow.slug}`} className="add-to-card">
                      <img src={rightArrow} alt="" />
                      <span className="txt">Xem ngay</span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default Detail;
