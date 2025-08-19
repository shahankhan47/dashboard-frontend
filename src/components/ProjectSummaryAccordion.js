import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../theme/dashboard.module.css";

const ProjectSummaryAccordion = ({ summary }) => {
  return (
    <div className={styles.card} style={{ marginTop: "1.5rem" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>📂 File Summaries</h2>
      {summary
        .split("\n\n\n")
        .map((chunk, index) => {
          if (!chunk.trim()) return null;

          const fileName = chunk.match(/file name is (.*?),/i)?.[1]?.trim();
          const filePath = chunk.match(/file path is: (.*?),/i)?.[1]?.trim();
          const fileSummary = chunk.match(/filesummary is:([\s\S]*)/i)?.[1]?.trim();

          return (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>
                  {fileName || `File ${index + 1}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {filePath && (
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#6b7280",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {filePath}
                  </Typography>
                )}
                <Typography sx={{ fontSize: "0.95rem", color: "#374151" }}>
                  {fileSummary}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

export default ProjectSummaryAccordion;
