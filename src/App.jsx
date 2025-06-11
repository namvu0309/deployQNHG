import PropTypes from "prop-types";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

// Admin Routes
import {
  authProtectedRoutes,
  publicRoutes,
} from "../src/routes/admin/index.jsx";

// FE Routes
import { clientRoutes } from "../src/routes/client/index.jsx";

// Middleware
import Authmiddleware from "../src/routes/admin/route.jsx";

// Layouts
import VerticalLayout from "@components/admin/VerticalLayout/";
import NonAuthLayout from "@components/admin/NonAuthLayout";
import ClientLayout from "@components/client/include/ClientLayout"; // ✅ THÊM

// SCSS
import "@assets/admin/scss/theme.scss";

// Fake backend
import fakeBackend from "@helpers/admin/AuthType/fakeBackend";
fakeBackend();

const App = (props) => {
  const Layout = VerticalLayout;

  // Tạo user giả
  localStorage.setItem("authUser", JSON.stringify({ username: "quanglam" }));

  return (
    <React.Fragment>
      <Routes>
        {/* ✅ Public Admin Routes */}
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {/* ✅ Protected Admin Routes */}
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

        {/* ✅ Client Routes — Header + Footer tự động */}
        {clientRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<ClientLayout>{route.component}</ClientLayout>}
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
