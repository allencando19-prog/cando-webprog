import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const T = {
  text: "#111827",
  muted: "#6b7280",
  surface: "#f8f9fb",
  border: "#e4e7ec",
  accent: "#5b8dee",
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#f59e0b",
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
    report: "Q1 Sales Summary",
    category: "Sales",
    date: "2025-01-31",
    status: "Published",
    views: 142,
  },
  {
    id: 2,
    report: "User Growth Q1",
    category: "Users",
    date: "2025-02-10",
    status: "Published",
    views: 98,
  },
  {
    id: 3,
    report: "Marketing Spend",
    category: "Finance",
    date: "2025-02-28",
    status: "Draft",
    views: 0,
  },
  {
    id: 4,
    report: "Q2 Forecast",
    category: "Sales",
    date: "2025-03-15",
    status: "Review",
    views: 34,
  },
  {
    id: 5,
    report: "Support Tickets",
    category: "Ops",
    date: "2025-03-20",
    status: "Published",
    views: 77,
  },
  {
    id: 6,
    report: "Retention Analysis",
    category: "Users",
    date: "2025-03-28",
    status: "Draft",
    views: 0,
  },
  {
    id: 7,
    report: "Infrastructure Cost",
    category: "Finance",
    date: "2025-04-01",
    status: "Published",
    views: 55,
  },
];

const statusColors = {
  Published: { bg: "#dcfce7", color: "#15803d" },
  Draft: { bg: "#fef9c3", color: "#a16207" },
  Review: { bg: "#dbeafe", color: "#1d4ed8" },
};

const columns = [
  { field: "id", headerName: "#", width: 60 },
  { field: "report", headerName: "Report", width: 220 },
  { field: "category", headerName: "Category", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: ({ value }) => {
      const { bg, color } = statusColors[value] || {
        bg: T.border,
        color: T.muted,
      };
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
    },
  },
  { field: "views", headerName: "Views", width: 100, type: "number" },
];

const ReportsPage = () => (
  <>
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
        Reports
      </Typography>
      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: T.muted,
          mt: 0.5,
        }}
      >
        Overview of all generated reports and key metrics.
      </Typography>
    </Box>

    <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
      <StatCard
        label="Total Reports"
        value="7"
        change={12}
        changeLabel="vs last month"
        accent={T.accent}
      />
      <StatCard
        label="Published"
        value="4"
        change={8}
        changeLabel="vs last month"
        accent={T.green}
      />
      <StatCard
        label="Total Views"
        value="406"
        change={-3}
        changeLabel="vs last month"
        accent={T.yellow}
      />
      <StatCard
        label="Drafts Pending"
        value="2"
        change={0}
        changeLabel="no change"
        accent={T.red}
      />
    </Stack>

    <Section title="Report Activity" subtitle="Views per report this period">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <BarChart
          series={[
            {
              data: [142, 98, 0, 34, 77, 0, 55],
              label: "Views",
              color: T.accent,
            },
          ]}
          height={260}
          xAxis={[
            {
              data: [
                "Q1 Sales",
                "User Growth",
                "Mktg Spend",
                "Q2 Forecast",
                "Support",
                "Retention",
                "Infra Cost",
              ],
              scaleType: "band",
              tickLabelStyle: { fontSize: 11 },
            },
          ]}
        />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 3, label: "Sales", color: T.accent },
                { id: 1, value: 2, label: "Users", color: T.green },
                { id: 2, value: 2, label: "Finance", color: T.yellow },
                { id: 3, value: 1, label: "Ops", color: "#a78bfa" },
              ],
              innerRadius: 45,
              outerRadius: 80,
            },
          ]}
          width={300}
          height={220}
        />
      </Stack>
    </Section>

    <Section
      title="All Reports"
      subtitle="Full list with status and view counts"
    >
      <Box sx={{ height: 420, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
          pageSizeOptions={[6]}
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

export default ReportsPage;
