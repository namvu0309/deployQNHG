import React from "react";
import './endow.scss';
import banner from "@assets/client/images/endow-blog/banner.jpg";
import rightArrow from "../../../assets/client/images/endow-blog/rightarrow-icon.png";
import {endows} from "./data-endow";
import { Link } from "react-router-dom";
import Footer from "../../../components/client/include/footer/footer";
// import CartModal from "../cart/cartmodel";

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

                        <Link to={`/endow-page/detail/${endow.slug}`} className="thumb">
                        <img src={endow.image} alt={endow.title} />
                        </Link>

                       <div className="info-box">
                         <a href="" className="title-food">{endow.description}</a>
                         <div className="price-food">{endow.price}</div>
                         <div className="funcsBox">
                            <Link to={`/endow-page/detail/${endow.slug}`} className="add-to-card">
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
           <Footer/>
         </div>

    
  )
};

export default Endow;
