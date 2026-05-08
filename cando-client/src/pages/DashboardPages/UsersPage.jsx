import { useState, useMemo } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../data/users.json?raw";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
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

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? "").trim(),
        lastName: String(user.lastName ?? "").trim(),
        age: String(user.age ?? "").trim(),
        gender: genders.includes(
          String(user.gender ?? "")
            .trim()
            .toLowerCase(),
        )
          ? String(user.gender ?? "")
              .trim()
              .toLowerCase()
          : "",
        contactNumber: String(user.contactNumber ?? "").trim(),
        email: String(user.email ?? "")
          .trim()
          .toLowerCase(),
        role: roles.includes(
          String(user.role ?? "")
            .trim()
            .toLowerCase(),
        )
          ? String(user.role ?? "")
              .trim()
              .toLowerCase()
          : "editor",
        username: String(user.username ?? "")
          .trim()
          .toLowerCase(),
        password: String(user.password ?? ""),
        address: String(user.address ?? "").trim(),
        isActive: typeof user.isActive === "boolean" ? user.isActive : true,
      })),
      error: "",
    };
  } catch {
    return {
      users: [],
      error: "Unable to read users from src/assets/users.json.",
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [filters, setFilters] = useState(blankFilters);

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
      if (filters.role && user.role !== filters.role) return false;
      if (filters.gender && user.gender !== filters.gender) return false;
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

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
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

  const validate = () => {
    const nextErrors = {};

    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    // Required fields
    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["role", "Role"],
      ["username", "Username"],
      ["password", "Password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    // Email format validation
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    // Duplicate email validation
    if (
      !nextErrors.email &&
      users.some((u) => u.id !== modal.id && u.email === email)
    ) {
      nextErrors.email = "Email address already exists.";
    }

    // Duplicate username validation
    if (
      !nextErrors.username &&
      users.some((u) => u.id !== modal.id && u.username === username)
    ) {
      nextErrors.username = "Username already exists.";
    }

    // Password must be at least 8 characters
    if (!nextErrors.password && form.password.trim().length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    // Contact number must be exactly 11 digits
    if (
      !nextErrors.contactNumber &&
      !/^\d{11}$/.test(form.contactNumber.trim())
    ) {
      nextErrors.contactNumber = "Contact number must be exactly 11 digits.";
    }

    // Age must contain numbers only
    if (!nextErrors.age && !/^\d+$/.test(form.age.trim())) {
      nextErrors.age = "Age must contain numbers only.";
    }

    // Username must not contain spaces
    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = "Username must not contain spaces.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((u) => (u.id === modal.id ? { ...u, ...nextUser } : u))
        : [
            ...prev,
            {
              id:
                prev.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0) +
                1,
              ...nextUser,
            },
          ],
    );

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)),
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
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
      headerName: "Full name",
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
      field: "role",
      headerName: "Role",
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role),
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
            onClick={() => toggleStatus(row.id)}
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

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {users.length ? (
          <Box
            sx={{ height: { xs: 460, sm: 520 }, width: "100%", minWidth: 0 }}
          >
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Paper>

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
                <TextField {...fieldProps("age", "Age")} />
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
                <TextField {...fieldProps("contactNumber", "Contact Number")} />
                <TextField
                  {...fieldProps("email", "Email Address", { type: "email" })}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("role", "Role", { select: true })}>
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
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
