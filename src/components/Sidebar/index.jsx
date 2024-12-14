import { useEffect, useState } from "react";
import { House, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router";
import "./sidebar.css";

function Sidebar() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    let path = window.location.pathname;
    setActive(path);
  }, [active]);
  return (
    <div className="sidebar">
      <NavLink to="/" end>
        <div
          className={`sidebar-item ${active == "/" ? " active-sidebar" : ""}`}
          onClick={() => setActive("home")}
        >
          <House className="sidebar-svg" />
        </div>
      </NavLink>
      <div>
        <NavLink to="/dashboard" end>
          <div
            onClick={() => setActive("dashboard")}
            className={`sidebar-item ${
              active === "/dashboard" ? " active-sidebar" : ""
            }`}
          >
            <LayoutDashboard className="sidebar-svg" />
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
