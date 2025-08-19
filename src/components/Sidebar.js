import { NavLink, useNavigate } from "react-router-dom";
import styles from "../theme/sidebar.module.css";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();           // clear session
    navigate("/");        // redirect to login page
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src="logo192.png" alt="Logo" className={styles.logoImg} />
        <h2 className={styles.logo}>Admin</h2>
      </div>

      {/* Navigation menu */}
      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Projects
        </NavLink>
      </nav>

      {/* Logout button at bottom */}
      <div className={styles.logoutWrapper}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
