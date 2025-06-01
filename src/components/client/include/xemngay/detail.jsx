import React from "react";
import { useNavigate } from "react-router-dom";
import './detail.scss';
import {endows} from "../uudai/data-endow";
import { Link } from 'react-router-dom';

import arowRight from "./image/arrow-right.png";
import rightArrow from "../uudai/image/rightarrow-icon.png";
import banner from "./image/banner.jpg";
import tinhHoa from "./image/tinhhoa.png"; 
// import tinhHoa2 from "./image/tinhhoa2.png"; 


const Detail = () => {

 const navigate = useNavigate();

  return (

  <div className="detail-page">
     <div className="breadcrumb">
              <div>
                    <span
                    onClick={() => navigate(-1)} 
                    className="endow"
                    >
                    Tin tức
                    <img src={arowRight} alt="arrow" style={{ marginRight: '8px' }} />
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
              Fanpage: <a href="https://www.facebook.com/QuanNhauTuDo/" target="_blank" rel="noopener noreferrer">
                https://www.facebook.com/QuanNhauTuDo/
              </a>
            </p>
            <ul>
              <li><a href="#">Quán Nhậu Tự Do 18 Nguyễn Văn Huyên – Cầu Giấy</a></li>
              <li><a href="#">Quán Nhậu Tự Do 505 Minh Khai – Hai Bà Trưng</a></li>
              <li><a href="#">Quán Nhậu Tự Do 68 Bùi Huy Bích – Hai Bà Trưng</a></li>
              <li><a href="#">Quán Nhậu Tự Do 75 Yên Lãng – Đống Đa</a></li>
              <li><a href="#">Quán Nhậu Tự Do 22 Dịch Vọng – Cầu Giấy</a></li>
              <li><a href="#">Quán Nhậu Tự Do 12 Nguyễn Văn Tuyết – Đống Đa</a></li>
              <li><a href="#">Quán Nhậu Tự Do 67A Phó Đức Chính – Ba Đình</a></li>
            </ul>
          </div>

        </div>

        <div className="sidebar">
          <h3>Tin mới liên</h3>
          <ul>
            <li>
              <img src={tinhHoa} alt="News 1" />
              <p>TỰ HÀO VIỆT NAM - MỘT BỮA ĂN MẸ NẤU TẠI QUÁN NHẬU TỰ DO</p>
            </li>
            <li>
              <img src={tinhHoa} alt="News 2" />
              <p>Giảm 30% TỔNG HÓA ĐƠN</p>
            </li>
            <li>
              <img src={tinhHoa} alt="News 3" />
              <p>SINH NHẬT CỰC CHẤT - TỰ DO LO TẤT</p>
            </li>
          </ul>
        </div>
      </div>
       <div className="menuBox">
                             <h2 className="title-menu">Món mới</h2>
                       
                             <ul className="list-food-menu dish">
                               {endows.map((endow) => (
                               <li
                                 key={endow.id}
                               >
                                 <div className="food-menu-dish">
            
                                    <Link to={`/endow-page/detail/${endow.id}`} className="thumb">
                                    <img src={endow.image} alt={endow.title} />
                                    </Link>
            
                                   <div className="info-box">
                                     <a href="" className="title-food">{endow.description}</a>
                                     <div className="price-food">{endow.price}</div>
                                     <div className="funcsBox">
                                        <Link to={`/endow-page/detail/${endow.id}`} className="add-to-card">
                                     <img src= {rightArrow} alt="" />
                                         <span className="txt">Xem ngay</span>
                                    </Link>
                                     </div>
                                   </div>
                                  
                                 </div>
                               </li>
                                              ))}
                               </ul>
                 
                             </div>
    </div>
  );
}

export default Detail;
