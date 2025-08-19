import { Typography, Paper, Avatar } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../theme/dashboard.module.css";

const ProjectConversations = ({ conversations }) => {
  return (
    <div className={styles.card} style={{ marginTop: "1.5rem" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>💬 Conversations</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxHeight: "500px",
          overflowY: "auto",
          background: "#f9fafb",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {conversations.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: isUser ? "row-reverse" : "row",
                gap: "0.5rem",
                alignItems: "flex-start",
              }}
            >
              {/* Avatar */}
              <Avatar sx={{ bgcolor: isUser ? "#58a942" : "#6b7280" }}>
                {isUser ? "U" : "A"}
              </Avatar>

              {/* Bubble */}
              <div style={{ maxWidth: "70%" }}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: "0.75rem 1rem",
                    backgroundColor: isUser ? "#58a942" : "#ffffff",
                    color: isUser ? "#ffffff" : "#111827",
                    borderRadius: "12px",
                    wordBreak: "break-word",
                  }}
                >
                  {isUser ? (
                    <Typography>{msg.content}</Typography>
                  ) : (
                    // Render markdown for assistant
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: (props) => (
                          <Typography variant="h6" gutterBottom {...props} />
                        ),
                        h2: (props) => (
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                            gutterBottom
                            {...props}
                          />
                        ),
                        h3: (props) => (
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600 }}
                            gutterBottom
                            {...props}
                          />
                        ),
                        li: (props) => (
                          <li
                            style={{
                              marginLeft: "1.2rem",
                              lineHeight: "1.5rem",
                            }}
                            {...props}
                          />
                        ),
                        code: (props) => (
                          <code
                            style={{
                              background: "#f3f4f6",
                              padding: "0.15rem 0.35rem",
                              borderRadius: "4px",
                              fontSize: "0.85rem",
                              fontFamily: "monospace",
                            }}
                            {...props}
                          />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </Paper>

                {/* Timestamp */}
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    textAlign: isUser ? "right" : "left",
                    marginTop: "0.25rem",
                  }}
                >
                  {new Date(msg.created_at).toLocaleString()}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectConversations;
