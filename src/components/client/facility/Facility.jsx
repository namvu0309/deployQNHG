import React from "react";
import "./Facility.scss";
import { facilities } from "./data-facility";

const Facility = () => {
  const grouped = facilities.reduce((acc, cur) => {
    acc[cur.district] = acc[cur.district] || [];
    acc[cur.district].push(cur);
    return acc;
  }, {});

  return (
    <div className="facility-page">
      {Object.entries(grouped).map(([district, list]) => (
        <div key={district} className="district-group">
          <h3 className="district-title">{district}</h3>
          {list.map((f) => (
            <div className="facility-card" key={f.id}>
              <div className="facility-info">
                <h2>{f.address}</h2>
                <p className="desc">{f.description}</p>
                <div className="status-time">
                  <span className="status">{f.status}</span>
                  <span className="time">HOẠT ĐỘNG TỪ {f.time}</span>
                </div>
                <div className="meta">
                  <div>Sức chứa<br /><strong>{f.capacity}</strong></div>
                  <div>Diện tích<br /><strong>{f.area}</strong></div>
                  <div>Số tầng<br /><strong>{f.floor}</strong></div>
                </div>
                <div className="actions">
                  <button>📅 Đặt bàn ngay</button>
                  <button>📍 Xem bản đồ</button>
                  <button>👁 Xem chi tiết</button>
                </div>
                <div className="year">📀 {f.year}</div>
              </div>
              <div className="facility-image">
                <img src={f.image} alt={f.address} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Facility;
