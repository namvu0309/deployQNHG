import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logoutUser } from "@store/admin/actions";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser(() => {
      Swal.fire("Đăng xuất", "Bạn đã đăng xuất thành công!", "success").then(() => {
        navigate("/admin/login");
      });
    }));
  }, [dispatch, navigate]);

  return <div>Đang đăng xuất...</div>;
};

export default Logout;
