import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";
import { toast } from "react-toastify";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await loginUser({ email, password });
      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);

      navigate("/dashboard", {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-zinc-900 bg-white p-10 shadow-xl overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-blue-950 opacity-5" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500 opacity-10" />

        {/* Header */}
        <div className="relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-500">
            Welcome Back
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Log In
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Access your account here. If you don't have an account, you can
            create one for free.
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t-2 border-dashed border-zinc-200" />

        {/* Error message */}
        {error && (
          <p className="relative z-10 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Form */}
        <form className="relative z-10 space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="signin-email"
              className="text-sm font-medium text-zinc-700"
            >
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="Placeholder"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="signin-password"
              className="text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              placeholder="Placeholder"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClasses}
            />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              It must be a combination of minimum 8 letters, numbers, and
              symbols.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-zinc-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="font-medium text-zinc-700 transition hover:text-zinc-900"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            className={actionButtonClassName}
          >
            Log In
          </Button>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className={actionButtonClassName}
            >
              Log In with Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              className={actionButtonClassName}
            >
              Log In with Apple
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative z-10 mt-6 border-t-2 border-dashed border-zinc-200 pt-6 text-sm text-zinc-600">
          No account yet?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold text-blue-950 transition hover:text-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
