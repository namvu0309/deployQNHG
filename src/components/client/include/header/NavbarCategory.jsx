import React, { useEffect, useRef, useState } from "react";
import "./NavbarCategory.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const NavbarCategory = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories/child/dish");
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi tải danh mục con:", error);
      }
    };
    fetchCategories();
  }, []);

  const currentCategory = new URLSearchParams(location.search).get("category");

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="navbar-category-wrapper">
      <div className="navbar-container">
        <div className="scroll-icon left" onClick={() => scroll("left")}>&lt;</div>
        <ul className="navbar-category" ref={scrollRef}>
          <li>
            <Link to="/menu-page" className={!currentCategory ? "active" : ""}>
              TẤT CẢ
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/menu-page?category=${cat.id}`}
                className={currentCategory === String(cat.id) ? "active" : ""}
              >
                {cat.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
        <div className="scroll-icon right" onClick={() => scroll("right")}>&gt;</div>
      </div>
    </div>
  );
};

export default NavbarCategory;
