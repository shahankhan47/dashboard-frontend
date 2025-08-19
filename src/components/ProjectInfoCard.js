import { Typography, Grid } from "@mui/material";
import styles from "../theme/dashboard.module.css";

const fields = [
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },
  { label: "Created", key: "dateCreated"},
  { label: "Project ID", key: "project_id" },
];

const ProjectInfoCard = ({ details }) => {
  return (
    <div className={styles.card} style={{ marginTop: "1rem" }}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid
            container
            item
            xs={12}
            key={field.key}
            sx={{
              borderBottom: "1px solid #e5e7eb",
              padding: "0.5rem 0",
              "&:last-of-type": { borderBottom: "none" },
            }}
          >
            <Grid item xs={4}>
              <Typography
                sx={{ fontSize: "0.9rem", color: "#6b7280", fontWeight: 500 }}
              >
                {field.label}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                sx={{ fontSize: "0.95rem", color: "#111827", fontWeight: 600 }}
              >
                {field.label === "Created" ? new Date(details?.[field.key]).toLocaleString() : details?.[field.key] || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProjectInfoCard;
