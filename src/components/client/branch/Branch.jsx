import React from "react";
import "./Branch.scss";
import { branches } from "./data-branch";

const Branch = () => {
  const grouped = branches.reduce((acc, cur) => {
    acc[cur.district] = acc[cur.district] || [];
    acc[cur.district].push(cur);
    return acc;
  }, {});

  return (
    <div className="branch-page">
      {Object.entries(grouped).map(([district, list]) => (
        <div key={district} className="district-group">
          <h3 className="district-title">{district}</h3>
          {list.map((b) => (
            <div className="branch-card" key={b.id}>
              <div className="branch-info">
                <h2>{b.address}</h2>
                <p className="desc">{b.description}</p>
                <div className="status-time">
                  <span className="status">{b.status}</span>
                  <span className="time">HOẠT ĐỘNG TỪ {b.time}</span>
                </div>
                <div className="meta">
                  <div>Sức chứa<br /><strong>{b.capacity}</strong></div>
                  <div>Diện tích<br /><strong>{b.area}</strong></div>
                  <div>Số tầng<br /><strong>{b.floor}</strong></div>
                </div>
                <div className="actions">
                  <button>📅 Đặt bàn ngay</button>
                  <button>📍 Xem bản đồ</button>
                  <button>👁 Xem chi tiết</button>
                </div>
                <div className="year">📀 {b.year}</div>
              </div>
              <div className="branch-image">
                <img src={b.image} alt={b.address} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Branch;
