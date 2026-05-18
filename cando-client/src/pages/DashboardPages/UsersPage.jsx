import { useState, useEffect, useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { fetchUsers, createUser, updateUser } from "../../services/UserService";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const blankFilters = {
  search: "",
  role: "",
  gender: "",
  status: "",
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [filters, setFilters] = useState(blankFilters);

  // Load users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setApiError("");
      const { data } = await fetchUsers();
      const list = Array.isArray(data) ? data : (data.users ?? []);
      setUsers(
        list
          .filter((user) => user._id)
          .map((user) => ({
            ...user,
            id: user._id,
          })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      setApiError("Unable to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("type");
    if (userType !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    loadUsers();
  }, []);

  // Filtering
  const filteredUsers = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return users.filter((user) => {
      if (q) {
        const match = [user.firstName, user.lastName, user.email, user.username]
          .join(" ")
          .toLowerCase()
          .includes(q);
        if (!match) return false;
      }
      if (filters.role && user.type !== filters.role) return false;
      if (filters.gender && user.gender?.toLowerCase() !== filters.gender)
        return false;
      if (filters.status === "active" && !user.isActive) return false;
      if (filters.status === "inactive" && user.isActive) return false;
      return true;
    });
  }, [users, filters]);

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => setFilters(blankFilters);

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  // Modal
  const openModal = (user) => {
    setModal({ open: true, id: user?._id ?? null });
    setForm(user ? { ...user, password: "" } : { ...blankForm });
    setErrors({});
    setShowPassword(false);
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
    setErrors({});
    setShowPassword(false);
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation
  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();
    const password = form.password;
    const age = String(form.age).trim();
    const contactNumber = String(form.contactNumber).trim();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["type", "Type"],
      ["username", "Username"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    // Only require password on Add
    if (!modal.id && !password) {
      nextErrors.password = "Password is required.";
    }

    if (!nextErrors.age && age) {
      if (!/^\d+$/.test(age)) {
        nextErrors.age = "Age must contain numbers only.";
      } else if (Number(age) < 1 || Number(age) > 120) {
        nextErrors.age = "Age must be between 1 and 120.";
      }
    }

    if (!nextErrors.contactNumber && contactNumber) {
      if (!/^\d+$/.test(contactNumber)) {
        nextErrors.contactNumber = "Contact number must contain only numbers.";
      } else if (contactNumber.length !== 11) {
        nextErrors.contactNumber =
          "Contact number must be exactly 11 digits long.";
      }
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (
      !nextErrors.email &&
      users.some((u) => u._id !== modal.id && u.email === email)
    ) {
      nextErrors.email = "Email address already exists.";
    }

    if (!nextErrors.username && username.includes(" ")) {
      nextErrors.username = "Username must not contain spaces.";
    }

    if (
      !nextErrors.username &&
      users.some((u) => u._id !== modal.id && u.username === username)
    ) {
      nextErrors.username = "Username already exists.";
    }

    if (!nextErrors.password && password && password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }

    return nextErrors;
  };

  // Save (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      if (modal.id) {
        const updatedUser = { ...form };
        if (!updatedUser.password) {
          delete updatedUser.password;
        }
        await updateUser(modal.id, updatedUser);
      } else {
        await createUser(form);
      }
      await loadUsers();
      closeModal();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Toggle Active
  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      await loadUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] ?? "",
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: "username", headerName: "Username", minWidth: 150 },
    { field: "age", headerName: "Age", width: 90 },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: "contactNumber", headerName: "Contact Number", minWidth: 160 },
    { field: "email", headerName: "Email", flex: 1.1, minWidth: 220 },
    {
      field: "type",
      headerName: "Type",
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.type),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.3 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? "warning" : "success"}
            onClick={() => handleToggleActive(row._id, row.isActive)}
          >
            {row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {/* Page Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add User
        </Button>
      </Box>

      {/* API Error */}
      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      {/* Search & Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 2,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
          borderRadius: 2,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ sm: "center" }}
          flexWrap="wrap"
          useFlexGap
        >
          <TextField
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name, email, or username..."
            size="small"
            sx={{ flex: 2, minWidth: 220 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      fontSize="small"
                      sx={{ color: "text.disabled" }}
                    />
                  </InputAdornment>
                ),
                endAdornment: filters.search ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, search: "" }))
                      }
                      edge="end"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />

          <TextField
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            select
            size="small"
            label="Role"
            sx={{ flex: 1, minWidth: 130 }}
          >
            <MenuItem value="">All Roles</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {labelize(r)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            select
            size="small"
            label="Gender"
            sx={{ flex: 1, minWidth: 130 }}
          >
            <MenuItem value="">All Genders</MenuItem>
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {labelize(g)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            select
            size="small"
            label="Status"
            sx={{ flex: 1, minWidth: 130 }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

          {hasActiveFilters && (
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={clearFilters}
              sx={{ whiteSpace: "nowrap", color: "text.secondary" }}
            >
              Clear
            </Button>
          )}
        </Stack>

        {hasActiveFilters && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1.5, display: "block" }}
          >
            Showing {filteredUsers.length} of {users.length} users
          </Typography>
        )}
      </Paper>

      {/* DataGrid */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {!loading && !users.length ? (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        ) : !loading && !filteredUsers.length ? (
          <Alert severity="info">
            No users match your search or filter criteria.
          </Alert>
        ) : (
          <Box
            sx={{ height: { xs: 460, sm: 520 }, width: "100%", minWidth: 0 }}
          >
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        )}
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={{ xs: 1, pt: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("age", "Age", { placeholder: "Numbers only" })}
                />
                <TextField
                  {...fieldProps("gender", "Gender", { select: true })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("contactNumber", "Contact Number", {
                    placeholder: "11 digits only (e.g., 09123456789)",
                  })}
                />
                <TextField
                  {...fieldProps("email", "Email Address", { type: "email" })}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("type", "Type", { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps("username", "Username")} />
              </Stack>
              <TextField
                {...fieldProps("password", "Password", {
                  type: showPassword ? "text" : "password",
                  placeholder: modal.id
                    ? "Leave blank to keep current password"
                    : "At least 8 characters",
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField
                {...fieldProps("address", "Address", {
                  multiline: true,
                  rows: 3,
                })}
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? "User status: Active"
                    : "User status: Inactive"
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Save Changes" : "Add User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
