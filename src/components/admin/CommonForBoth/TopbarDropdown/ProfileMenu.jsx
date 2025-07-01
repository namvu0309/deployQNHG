import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { withTranslation } from "react-i18next";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../ui/withRouter";

// users
import user1 from "@assets/admin/images/users/avatar-1.jpg";

const ProfileMenu = (props) => {
  const [menu, setMenu] = useState(false);
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    const stored = localStorage.getItem("admin_user");
    if (stored) {
      const obj = JSON.parse(stored);
      setUsername(obj.email || obj.full_name || "Admin");
    }
  }, [props.success]);

  return (
      <React.Fragment>
        <Dropdown
            isOpen={menu}
            toggle={() => setMenu(!menu)}
            className="d-inline-block"
        >
          <DropdownToggle
              className="btn header-item "
              id="page-header-user-dropdown"
              tag="button"
          >
            <img
                className="rounded-circle header-profile-user"
                src={user1}
                alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ms-2 me-1">
            Xin chào, {username}
          </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem tag="a" href="/profile">
              <i className="bx bx-user font-size-16 align-middle me-1" />
              {props.t("Profile")}
            </DropdownItem>
            <DropdownItem tag="a" href="#">
              <span className="badge bg-success float-end">11</span>
              <i className="bx bx-wrench font-size-16 align-middle me-1" />
              {props.t("Settings")}
            </DropdownItem>
            <div className="dropdown-divider" />
            <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
              <span>{props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
    connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
