import React from "react";
import { useParams } from "react-router-dom";
import { branches } from "../branch/data-branch";
import "./Detail.scss";
import { FaPhoneAlt, FaUtensils, FaMapMarkerAlt, FaCalendarAlt, FaStar } from "react-icons/fa";

const BranchDetail = () => {
  const { slug } = useParams();
  const branch = branches.find((b) => b.slug === slug);

  if (!branch) return <div>Không tìm thấy chi nhánh</div>;

  return (
    <div className="branch-detail">
      <div className="breadcrumb">
        <a href="/co-so">CƠ SỞ</a> &gt; <a href="#">{branch.district}</a> &gt; <span>{branch.address.toUpperCase()}</span>
      </div>

      <div className="banner">
        <img src={branch.image} alt={branch.address} />
      </div>

      <div className="info">
        <h1>{branch.address}</h1>
        <p className="desc">{branch.description}</p>
        <span className="status">{branch.status}</span>

        <div className="meta">
          <div><span>Sức chứa</span><strong>{branch.capacity}</strong></div>
          <div><span>Diện tích</span><strong>{branch.area}</strong></div>
          <div><span>Số tầng</span><strong>{branch.floor}</strong></div>
          <div className="phone"><FaPhoneAlt /> *2005</div>
        </div>

        <div className="actions">
          <button><FaCalendarAlt /> Đặt bàn ngay</button>
          <button><FaUtensils /> Xem thực đơn</button>
          <button><FaMapMarkerAlt /> Xem bản đồ</button>
        </div>

        <div className="rating">
          {[...Array(5)].map((_, i) => <FaStar key={i} className="star" />)}
          <span>5/5</span>
        </div>
      </div>

      <section>
        <h2>Không gian rộng rãi</h2>
        <p>
          Quán Nhậu Tự Do {branch.address} là cơ sở thứ {branch.id} của chuỗi, sở hữu không gian lên tới {branch.area},
          sức chứa {branch.capacity}, phù hợp tổ chức tiệc mà không bí bách.
        </p>
      </section>

      <section>
        <h2>Sân vườn xanh mát</h2>
        <p>
          Kết hợp cây cối xanh mát, quán có không gian ngoài trời chill, lý tưởng để tụ tập bạn bè.
        </p>
        <img src={branch.image} alt="Sân vườn xanh mát" />
      </section>

      <section>
        <h2>Trong nhà – điều hòa mát lạnh</h2>
        <p>
          Khu vực trong nhà thông thoáng, thiết kế mở, có điều hòa cho trải nghiệm thoải mái mọi mùa.
        </p>
      </section>
    </div>
  );
};

export default BranchDetail;
