import React, { useEffect, useState } from "react";
import "./NavbarCategory.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const NavbarCategory = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

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

  return (
    <div className="navbar-category-wrapper">
      <ul className="navbar-category">
        <li>
          <Link to="/menu-page" className={!currentCategory ? "active" : ""}>
            Tất cả
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/menu-page?category=${cat.id}`}
              className={currentCategory === String(cat.id) ? "active" : ""}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarCategory;
