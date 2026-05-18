import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser, loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const initialForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  username: "",
  password: "",
  address: "",
  type: "editor",
  isActive: true,
};

const SignUpPage = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.username ||
      !form.address ||
      !form.contactNumber ||
      !form.age ||
      !form.gender
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await createUser(form);
      const { data } = await loginUser({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Signup failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-zinc-900 bg-white p-10 shadow-xl overflow-hidden">
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-blue-950 opacity-5" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500 opacity-10" />

        <div className="relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-500">
            Get Started
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Sign Up
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Create your account to get started.
          </p>
        </div>

        <div className="my-6 border-t-2 border-dashed border-zinc-200" />

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="text-sm font-medium text-zinc-700"
              >
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                type="text"
                placeholder="Juan"
                autoComplete="given-name"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="text-sm font-medium text-zinc-700"
              >
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Dela Cruz"
                autoComplete="family-name"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="signup-age"
                className="text-sm font-medium text-zinc-700"
              >
                Age
              </label>
              <input
                id="signup-age"
                name="age"
                value={form.age}
                onChange={handleChange}
                type="number"
                min="1"
                max="120"
                placeholder="25"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="signup-gender"
                className="text-sm font-medium text-zinc-700"
              >
                Gender
              </label>
              <select
                id="signup-gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-username"
              className="text-sm font-medium text-zinc-700"
            >
              Username
            </label>
            <input
              id="signup-username"
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="username"
              autoComplete="username"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="juan@email.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className={inputClasses}
            />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Use a secure password with letters, numbers, and symbols.
            </p>
          </div>

          <div>
            <label
              htmlFor="signup-address"
              className="text-sm font-medium text-zinc-700"
            >
              Address
            </label>
            <input
              id="signup-address"
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              placeholder="123 Main St"
              autoComplete="street-address"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="signup-contact"
              className="text-sm font-medium text-zinc-700"
            >
              Contact Number
            </label>
            <input
              id="signup-contact"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              type="tel"
              placeholder="09171234567"
              autoComplete="tel"
              className={inputClasses}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className={actionButtonClassName}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="relative z-10 mt-6 border-t-2 border-dashed border-zinc-200 pt-6 text-sm text-zinc-600">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-semibold text-blue-950 transition hover:text-blue-700"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
