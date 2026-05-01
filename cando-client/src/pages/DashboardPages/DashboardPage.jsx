import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Gauge } from "@mui/x-charts/Gauge";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

/* ─── Reusable section container ─────────────────────────────────────── */
const Section = ({ title, subtitle, children }) => (
  <Box sx={{ mb: 4 }}>
    {(title || subtitle) && (
      <Box sx={{ mb: 2 }}>
        {title && (
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#1a1d23",
              letterSpacing: "-0.2px",
            }}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "#6b7280",
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
        background: "#f8f9fb",
        border: "1px solid #e4e7ec",
        borderRadius: "14px",
        p: 3,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  </Box>
);

/* ─── Stat card ───────────────────────────────────────────────────────── */
const StatCard = ({ label, value, accent = "#5b8dee" }) => (
  <Card
    elevation={0}
    sx={{
      flex: 1,
      background: "#f8f9fb",
      border: "1px solid #e4e7ec",
      borderRadius: "12px",
      transition: "border-color 0.2s, box-shadow 0.2s",
      "&:hover": { borderColor: accent, boxShadow: `0 0 0 3px ${accent}18` },
    }}
  >
    <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#6b7280",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "2rem",
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "-1px",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

/* ─── Page header ─────────────────────────────────────────────────────── */
const PageHeader = () => (
  <Box sx={{ mb: 4 }}>
    <Typography
      variant="h4"
      sx={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 800,
        fontSize: "1.6rem",
        color: "#111827",
        letterSpacing: "-0.5px",
        lineHeight: 1.2,
      }}
    >
      Good morning 👋
    </Typography>
    <Typography
      sx={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.875rem",
        color: "#6b7280",
        mt: 0.5,
      }}
    >
      Here's what's happening across your dashboard today.
    </Typography>
  </Box>
);

function DashboardPage() {
  return (
    <>
      <PageHeader />

      {/* ── Stat cards ── */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <StatCard label="Total Users" value={rows.length} />
        <StatCard
          label="Average Age"
          value={(
            rows.reduce((sum, row) => sum + (row.age || 0), 0) /
            rows.filter((row) => row.age !== null).length
          ).toFixed(1)}
          accent="#a78bfa"
        />
      </Stack>

      {/* ── Gauges ── */}
      <Section title="Performance Metrics" subtitle="Current period overview">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Gauge width={100} height={100} value={60} />
          <Gauge
            width={100}
            height={100}
            value={30}
            valueMin={10}
            valueMax={60}
          />
        </Stack>
      </Section>

      {/* ── Charts ── */}
      <Section
        title="Analytics"
        subtitle="Quarterly breakdown and distribution"
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: "Series 1" },
              { data: [51, 6, 49, 30], label: "Series 2" },
            ]}
            height={290}
            xAxis={[
              {
                data: ["Q1", "Q2", "Q3", "Q4"],
                scaleType: "band",
                label: "Quarters",
              },
            ]}
            title="Quarterly Sales"
          />
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Stack>
      </Section>

      {/* ── Users table ── */}
      <Section title="Users Overview" subtitle="All registered users">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: "none",
              color: "#111827",
              fontFamily: "'DM Sans', sans-serif",
              "& .MuiDataGrid-columnHeaders": {
                background: "#f1f3f7",
                borderBottom: "1px solid #e4e7ec",
                color: "#6b7280",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              },
              "& .MuiDataGrid-row:hover": {
                background: "rgba(91,141,238,0.06)",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #e4e7ec",
                fontSize: "0.875rem",
              },
              "& .MuiCheckbox-root": { color: "#6b7280" },
              "& .MuiTablePagination-root": { color: "#6b7280" },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #e4e7ec",
              },
              "& .MuiDataGrid-selectedRowCount": { color: "#6b7280" },
            }}
          />
        </Box>
      </Section>

      {/* ── Map ── */}
      <Section title="Location Map" subtitle="National University — Manila">
        <Box
          sx={{
            height: 500,
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <MapContainer
            center={[14.604215, 120.994314]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[14.604215, 120.994314]}>
              <Popup>
                National University-Manila <br />
                <p>551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila</p>
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Section>
    </>
  );
}

export default DashboardPage;
