import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import DP from "../assets/Dp.jpg";

const Sidebar = ({ children }) => {
  
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
    },
    {
      path: "/users",
      name: "Users",
    },
    {
      path: "/interviewer",
      name: "Interviewer",
    },
    {
      path: "/applications",
      name: "Applications",
    },
    {
      path: "/createInterview",
      name: "Create Interview",
    },
  ];
  return (
    <div className="container-side">
      <div className="sidebar">
        <div className="top_section">
          <h1 className="logo">ADMIN</h1>
          <section className="profile">
            <img className="profileImage" src={DP} alt="profile" />
            <div className="profileInfo">
              <h4>Subrath Sapkota</h4>
              <span>
                <a href="#">profile</a>
              </span>
            </div>
          </section>
        </div>
        <hr />
        <br />
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) => `link ${isActive? "active": ''}`}
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main className="mainChildren h-[95vh]">{children}</main>
      <div className="logoutbtn"></div>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
