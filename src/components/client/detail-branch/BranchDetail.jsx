import React from "react";
import "./Detail.scss";
import img1 from "@assets/client/images/Branch/anh-badinh.jpg"; // Sửa lỗi chính tả "Brach" -> "Branch"

const BranchDetail = () => {
  return (
   <div className="branch-detail">
      <h1>67A Phó Đức Chính – “Chốn ăn chơi” mới của anh em quận Ba Đình</h1>

      <div className="banner">
        <img src={img1} alt="67A Phó Đức Chính" />
      </div>

      <section>
        <h2>Không gian rộng rãi</h2>
        <p>
          Quán Nhậu Tự Do Phó Đức Chính là cơ sở thứ 9 của chuỗi, sở hữu không gian lên tới 1000m²,
          sức chứa 400 khách, phù hợp tổ chức tiệc mà không bí bách.
        </p>
      </section>

      <section>
        <h2>Sân vườn xanh mát</h2>
        <p>
          Kết hợp cây cối xanh mát, quán có không gian ngoài trời chill, lý tưởng để tụ tập bạn bè.
        </p>
        <img src={img1} alt="Sân vườn xanh mát" />
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
