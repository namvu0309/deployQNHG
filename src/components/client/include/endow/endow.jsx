import React from "react";
import './endow.scss';
import banner from "./image/banner.jpg";
import rightArrow from "./image/rightarrow-icon.png";
import {endows} from "./data-endow";
import { Link } from "react-router-dom";

const Endow = () => {
  return (
      <div className="td--menu">
           <div className="menuList">
             <div className="widthCT">
                <img src={banner} alt="" style={{width: '1115px'}}/>
     
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
           </div>
         </div>

    
  )
};

export default Endow;
