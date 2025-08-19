import { useState } from "react";
import styles from "../theme/dashboard.module.css";
import logo from "../assets/logo.png";

const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === USERNAME && password === PASSWORD) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={`${styles.card} ${styles.loginCard}`}>
        {/* Logo */}
        <img src={logo} alt="Harmony Engine Logo" className={styles.logo} />

        {/* Title */}
        <h2 className={styles.loginTitle}>Harmony Engine Dashboard</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>

      {/* Popup Modal */}
      {error && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Invalid Credentials</h3>
            <button
              onClick={() => setError(false)}
              className={styles.modalButton}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
