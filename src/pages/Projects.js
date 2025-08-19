import { useData } from "../context/DataContext";
import ProjectsTable from "../components/ProjectsTable";
import styles from "../theme/dashboard.module.css";
import { CircularProgress } from "@mui/material";

const Projects = () => {
  const { allProjects, loading, error } = useData();

  // ✅ Same loader UI as Dashboard
  if (loading) {
    return (
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={64} sx={{ color: "#58a942" }} />
        </div>
      </div>
    );
  }

  // ✅ Same error UI as Dashboard
  if (error) {
    return (
      <div className={styles.container}>
        <div
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={styles.card}>
            <div
              style={{
                color: "rgba(0,0,0,0.87)",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Error loading projects
            </div>
            <div style={{ color: "rgb(107,114,128)" }}>
              Please try refreshing the page or check the server connection.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Projects</h1>
      <div style={{ marginTop: "1rem" }}>
        <ProjectsTable projects={allProjects?.projects ?? []} />
      </div>
    </div>
  );
};

export default Projects;
