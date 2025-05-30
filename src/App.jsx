import PropTypes from "prop-types";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import {
  authProtectedRoutes,
  publicRoutes,
} from "../src/routes/admin/index.jsx";

// Middleware
import Authmiddleware from "../src/routes/admin/route.jsx";

// Layouts
import VerticalLayout from "@components/admin/VerticalLayout/";
import NonAuthLayout from "@components/admin/NonAuthLayout";

// SCSS
import "@assets/admin/scss/theme.scss";

// Fake backend
import fakeBackend from "@helpers/admin/AuthType/fakeBackend";
fakeBackend();

const App = (props) => {
  // Sử dụng cố định VerticalLayout
  const Layout = VerticalLayout;

  // Tạo user giả cho localStorage (có thể bỏ nếu dùng auth thật)
  localStorage.setItem("authUser", JSON.stringify({ username: "quanglam" }));

  return (
    <React.Fragment>
      <Routes>
        {/* Route không yêu cầu đăng nhập */}
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {/* Route yêu cầu đăng nhập, sử dụng VerticalLayout */}
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => ({
  layout: state.Layout,
});

export default connect(mapStateToProps, null)(App);
