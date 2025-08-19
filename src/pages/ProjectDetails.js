import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styles from "../theme/dashboard.module.css";
import { CircularProgress } from "@mui/material";
import { getProjectDetails } from "../services/dashboard";

// Import components
import ProjectInfoCard from "../components/ProjectInfoCard";
import ProjectSummaryAccordion from "../components/ProjectSummaryAccordion";
import ProjectConversations from "../components/ProjectConversations";

const ProjectDetails = () => {
  const location = useLocation();
  const rowData = location.state;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calledRef = useRef(false);

  useEffect(() => {
    if (!rowData || calledRef.current) return;
    calledRef.current = true;

    const fetchDetails = async () => {
      try {
        const data = await getProjectDetails({
          owner: rowData.owner,
          email: rowData.email,
          name: rowData.name,
          role: rowData.role,
          project_id: rowData.project_id,
        });

        const combinedDetails = {
          owner: rowData.owner,
          email: rowData.email,
          name: rowData.name,
          role: rowData.role,
          project_id: rowData.project_id,
          dateCreated: rowData.dateCreated,
          ...data,
        };
        setDetails(combinedDetails);
      } catch (err) {
        console.error("Error fetching details:", err);

        if (err.response && err.response.status === 404) {
          // ✅ In case of 404, still show top info, but no summary/conversations
          const basicDetails = {
            owner: rowData.owner,
            email: rowData.email,
            name: rowData.name,
            role: rowData.role,
            project_id: rowData.project_id,
            dateCreated: rowData.dateCreated,
            summary: "",
            conversations: [],
          };
          setDetails(basicDetails);
        } else {
          setError("Failed to load details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [rowData]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div
          className={styles.card}
          style={{ textAlign: "center", padding: "2rem" }}
        >
          <CircularProgress size={48} sx={{ color: "#58a942" }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div style={{ fontWeight: 600, color: "rgba(0,0,0,0.87)" }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Check for missing sections
  const noSummary = !details?.summary;
  const noConversations =
    !details?.conversations || details.conversations.length === 0;
  const showEmptyState = noSummary && noConversations;

  return (
    <div className={styles.container}>
      {/* Page Title */}
      <h1 className={styles.heading}>
        Details for {rowData?.name || "Unknown"} by {rowData?.owner || "Unknown"}
      </h1>

      {/* Project Info */}
      <ProjectInfoCard details={details} />

      {/* ✅ Combined empty-state if both missing */}
      {showEmptyState ? (
        <div
          className={styles.card}
          style={{ marginTop: "1.5rem", textAlign: "center", padding: "2rem" }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "0.25rem",
            }}
          >
            Nothing here yet
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#6b7280",
              maxWidth: "420px",
              margin: "0 auto",
              lineHeight: "1.5",
            }}
          >
            This project is <strong>active</strong> but no summary or
            conversation has been generated yet. The user has not uploaded any
            codebase but only created the project.
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}
          {details?.summary ? (
            <ProjectSummaryAccordion summary={details.summary} />
          ) : (
            <div className={styles.card} style={{ marginTop: "1.5rem" }}>
              <p style={{ fontSize: "0.95rem", color: "#374151" }}>
                No summary has been generated yet.
              </p>
            </div>
          )}

          {/* Conversations */}
          {details?.conversations && details.conversations.length > 0 ? (
            <ProjectConversations conversations={details.conversations} />
          ) : (
            <div className={styles.card} style={{ marginTop: "1.5rem" }}>
              <p style={{ fontSize: "0.95rem", color: "#374151" }}>
                No conversation has been started yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
