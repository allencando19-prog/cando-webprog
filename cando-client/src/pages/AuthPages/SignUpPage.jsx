import { Link } from "react-router-dom";
import Button from "../../components/Button";

import logo from "../../assets/logowagc.png";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-zinc-900 bg-white p-10 shadow-xl overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-blue-950 opacity-5" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500 opacity-10" />

        {/* Header */}
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

        {/* Divider */}
        <div className="my-6 border-t-2 border-dashed border-zinc-200" />

        {/* Form */}
        <form className="relative z-10 space-y-5">
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
                type="text"
                placeholder="Dela Cruz"
                autoComplete="family-name"
                className={inputClasses}
              />
            </div>
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
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className={inputClasses}
            />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Use a secure password with letters, numbers, and symbols.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            className={actionButtonClassName}
          >
            Create Account
          </Button>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className={actionButtonClassName}
            >
              Sign Up with Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              className={actionButtonClassName}
            >
              Sign Up with Apple
            </Button>
          </div>
        </form>

        {/* Divider */}
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
