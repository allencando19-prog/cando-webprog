import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DataGrid } from "@mui/x-data-grid";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

const T = {
  text: "#111827",
  muted: "#6b7280",
  surface: "#f8f9fb",
  border: "#e4e7ec",
  accent: "#5b8dee",
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#f59e0b",
  purple: "#a78bfa",
};

const Section = ({ title, subtitle, children }) => (
  <Box sx={{ mb: 4 }}>
    {(title || subtitle) && (
      <Box sx={{ mb: 2 }}>
        {title && (
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: T.text,
            }}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: T.muted,
              mt: 0.3,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    )}
    <Box
      sx={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: "14px",
        p: 3,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  </Box>
);

const StatCard = ({ label, value, change, changeLabel, accent = T.accent }) => (
  <Card
    elevation={0}
    sx={{
      flex: 1,
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: "12px",
      transition: "border-color 0.2s, box-shadow 0.2s",
      "&:hover": { borderColor: accent, boxShadow: `0 0 0 3px ${accent}18` },
    }}
  >
    <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.73rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: T.muted,
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1.9rem",
          fontWeight: 700,
          color: T.text,
          letterSpacing: "-1px",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      {changeLabel && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: change >= 0 ? T.green : T.red,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </Typography>
          <Typography
            sx={{
              fontSize: "0.73rem",
              color: T.muted,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {changeLabel}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const rows = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jon@example.com",
    role: "Admin",
    status: "Active",
    joined: "2024-01-12",
    age: 14,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cersei@example.com",
    role: "Editor",
    status: "Active",
    joined: "2024-02-03",
    age: 31,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaime@example.com",
    role: "Editor",
    status: "Inactive",
    joined: "2024-02-14",
    age: 31,
  },
  {
    id: 4,
    name: "Arya Stark",
    email: "arya@example.com",
    role: "Viewer",
    status: "Active",
    joined: "2024-03-05",
    age: 11,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "dany@example.com",
    role: "Admin",
    status: "Active",
    joined: "2024-03-18",
    age: 26,
  },
  {
    id: 6,
    name: "Melisandre",
    email: "mel@example.com",
    role: "Viewer",
    status: "Suspended",
    joined: "2024-04-01",
    age: 150,
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferrara@example.com",
    role: "Editor",
    status: "Active",
    joined: "2024-04-22",
    age: 44,
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossini@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "2024-05-10",
    age: 36,
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harvey@example.com",
    role: "Editor",
    status: "Active",
    joined: "2024-06-01",
    age: 65,
  },
];

const roleColors = {
  Admin: { bg: "#ede9fe", color: "#6d28d9" },
  Editor: { bg: "#dbeafe", color: "#1d4ed8" },
  Viewer: { bg: "#f1f5f9", color: "#475569" },
};

const statusColors = {
  Active: { bg: "#dcfce7", color: "#15803d" },
  Inactive: { bg: "#fef9c3", color: "#a16207" },
  Suspended: { bg: "#fee2e2", color: "#b91c1c" },
};

const BadgeCell =
  (colorMap) =>
  ({ value }) => {
    const { bg, color } = colorMap[value] || { bg: T.border, color: T.muted };
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            px: 1.2,
            py: 0.3,
            borderRadius: "6px",
            background: bg,
            color,
            fontSize: "0.75rem",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {value}
        </Box>
      </Box>
    );
  };

const columns = [
  { field: "id", headerName: "#", width: 60 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "age", headerName: "Age", width: 80, type: "number" },
  {
    field: "role",
    headerName: "Role",
    width: 120,
    renderCell: BadgeCell(roleColors),
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: BadgeCell(statusColors),
  },
  { field: "joined", headerName: "Joined", width: 130 },
];

const UsersPage = () => (
  <>
    {/* ── Header ── */}
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 800,
          fontSize: "1.6rem",
          color: T.text,
          letterSpacing: "-0.5px",
        }}
      >
        Users
      </Typography>
      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: T.muted,
          mt: 0.5,
        }}
      >
        Manage and monitor all registered users.
      </Typography>
    </Box>

    {/* ── KPI cards ── */}
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
      <StatCard
        label="Total Users"
        value={rows.length}
        change={5}
        changeLabel="vs last month"
        accent={T.accent}
      />
      <StatCard
        label="Active"
        value={rows.filter((r) => r.status === "Active").length}
        change={8}
        changeLabel="vs last month"
        accent={T.green}
      />
      <StatCard
        label="Inactive"
        value={rows.filter((r) => r.status === "Inactive").length}
        change={-2}
        changeLabel="vs last month"
        accent={T.yellow}
      />
      <StatCard
        label="Suspended"
        value={rows.filter((r) => r.status === "Suspended").length}
        change={0}
        changeLabel="no change"
        accent={T.red}
      />
    </Stack>

    {/* ── Charts ── */}
    <Section
      title="User Insights"
      subtitle="Role distribution and monthly signups"
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: rows.filter((r) => r.role === "Admin").length,
                  label: "Admin",
                  color: T.purple,
                },
                {
                  id: 1,
                  value: rows.filter((r) => r.role === "Editor").length,
                  label: "Editor",
                  color: T.accent,
                },
                {
                  id: 2,
                  value: rows.filter((r) => r.role === "Viewer").length,
                  label: "Viewer",
                  color: T.muted,
                },
              ],
              innerRadius: 45,
              outerRadius: 80,
            },
          ]}
          width={300}
          height={220}
        />
        <BarChart
          series={[
            {
              data: [1, 2, 1, 2, 1, 1, 1],
              label: "New Users",
              color: T.accent,
            },
          ]}
          height={240}
          xAxis={[
            {
              data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              scaleType: "band",
            },
          ]}
        />
      </Stack>
    </Section>

    {/* ── Users table ── */}
    <Section
      title="All Users"
      subtitle="Full list with roles and account status"
    >
      <Box sx={{ height: 460, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 7 } } }}
          pageSizeOptions={[7]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            border: "none",
            color: T.text,
            fontFamily: "'DM Sans', sans-serif",
            "& .MuiDataGrid-columnHeaders": {
              background: "#f1f3f7",
              borderBottom: `1px solid ${T.border}`,
              color: T.muted,
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-row:hover": { background: "rgba(91,141,238,0.05)" },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${T.border}`,
              fontSize: "0.875rem",
            },
            "& .MuiCheckbox-root": { color: T.muted },
            "& .MuiTablePagination-root": { color: T.muted },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${T.border}`,
            },
            "& .MuiDataGrid-selectedRowCount": { color: T.muted },
          }}
        />
      </Box>
    </Section>
  </>
);

export default UsersPage;
