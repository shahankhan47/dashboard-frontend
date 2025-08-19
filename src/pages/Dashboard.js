import { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import styles from "../theme/dashboard.module.css";
import { useData } from "../context/DataContext";
import MetricCard from "../components/MetricCard";

const Dashboard = () => {
  const {
    totalProjects,
    owners,
    activeUsers,
    conversationUsers,
    obsoleteProjects,
    usersWithNoProjects,
    loading,
    error,
  } = useData();

  const [selectedObsoleteProject, setSelectedObsoleteProject] = useState("");

  // Show centered spinner while loading (inside the same container/padding)
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
            <div style={{ color: "rgba(0,0,0,0.87)", fontWeight: 600, marginBottom: 8 }}>
              Error loading dashboard data
            </div>
            <div style={{ color: "rgb(107,114,128)" }}>
              Please try refreshing the page or check the server connection.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const deleteProject = async () => {
    if (!selectedObsoleteProject) return;
    try {
      await axios.post("http://localhost:8000/deleteProject", {
        id: selectedObsoleteProject,
      });
      alert(`Project ${selectedObsoleteProject} deleted successfully`);
      setSelectedObsoleteProject("");
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // Metrics
  const totalProjectsCount = totalProjects?.length ?? 0;
  const totalOwnersCount = owners?.length ?? 0;
  const activeUsersCount = Object.keys(activeUsers || {}).length;
  const conversationUsersCount = Object.keys(conversationUsers || {}).length;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Harmony Engine Dashboard</h1>

      {/* 4 metric cards */}
      <div className={styles.metricsGrid}>
        <MetricCard title="Total Projects" value={totalProjectsCount} />
        <MetricCard title="Total Owners" value={totalOwnersCount} />
        <MetricCard title="Users with Active Projects" value={activeUsersCount} />
        <MetricCard title="Users with Conversations" value={conversationUsersCount} />
      </div>

      {/* 2 cards row */}
      <div className={styles.twoColGrid}>
        {/* Users with No Projects */}
        <div className={styles.card}>
          <div className={styles.metricHeader}>
            Users with No Projects ({usersWithNoProjects?.length})
          </div>
          <div className={styles.listWrap}>
            {usersWithNoProjects?.length ? (
              <div className={styles.userList}>
                {usersWithNoProjects.map((user, idx) => (
                  <div key={`${user}-${idx}`} className={styles.userItem}>
                    {user}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.metricSubtext}>No users found 🎉</div>
            )}
          </div>
        </div>

        {/* Obsolete Projects */}
        <div className={styles.card}>
          <div className={styles.metricHeader}>Obsolete Projects</div>
          <div className={styles.fieldGroup}>
            <FormControl fullWidth size="small">
              <InputLabel id="obsolete-select-label">Select Project</InputLabel>
              <Select
                labelId="obsolete-select-label"
                value={selectedObsoleteProject}
                onChange={(e) => setSelectedObsoleteProject(e.target.value)}
                label="Select Project"
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e5e7eb",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#58a942",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#58a942",
                  },
                  "& .MuiOutlinedInput-input": { py: 1, px: 1.25 },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      mt: 0.5,
                      borderRadius: "8px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      maxHeight: 320,
                    },
                  },
                  MenuListProps: { dense: true, sx: { py: 0 } },
                }}
              >
                <MenuItem value="">-- Select Project --</MenuItem>
                {obsoleteProjects.map((pid, idx) => (
                  <MenuItem
                    key={`${pid?.project_id}-${idx}`}
                    value={pid?.project_id}
                    sx={{
                      py: 0.75,
                      px: 1.5,
                      minHeight: "auto",
                      "&:hover": {
                        backgroundColor: "#58a942",
                        color: "white",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#58a942",
                        color: "white",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#4c9239",
                      },
                    }}
                  >
                    {pid?.project_name} - {pid?.project_id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedObsoleteProject && (
              <Button
                variant="contained"
                color="error"
                onClick={deleteProject}
                sx={{ mt: 2, width: "fit-content", borderRadius: "6px" }}
              >
                Delete Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
