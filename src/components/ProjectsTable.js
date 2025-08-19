import { v4 as uuidv4 } from "uuid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../theme/dashboard.module.css";

export default function ProjectsTable({ projects }) {
  const navigate = useNavigate();

  const rows = projects.map((p) => ({
    ...p,
    project_id: p.id,
    id: uuidv4(),
  }));

  const handleViewDetails = (row) => {
    navigate("/projectDetails", { state: row });
  };

  const columns = [
    { field: "owner", headerName: "Owner", flex: 1, sortable: true },
    { field: "email", headerName: "Email", flex: 1.5, sortable: true },
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    { field: "description", headerName: "Description", flex: 2, sortable: false },
    { field: "role", headerName: "Role", flex: 1, sortable: true },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const status = (params.value || "").toLowerCase();
        const statusColors = {
          "awaiting codebase": "#fbbf24",
          "error": "#ef4444",
          "active": "#22c55e",
          "inactive": "#6b7280",
        };
        const color = statusColors[status] || "#374151";
        return <span style={{ fontWeight: 600, color }}>{params.value}</span>;
      },
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      flex: 1,
      type: "date",
      valueGetter: (value) => new Date(value),
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const isInactive = ["inactive", "awaiting codebase", "error"].includes(
          params.row.status.toLowerCase()
        );
        if (isInactive) return null;

        return (
          <Button
            className={styles.actionButton}
            onClick={() => handleViewDetails(params.row)}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  return (
    <div className={styles.card} style={{ marginTop: "1rem" }}>
      <div className={styles.dataGridCard}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
