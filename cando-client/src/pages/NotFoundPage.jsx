import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-6">
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-zinc-900 bg-white p-12 shadow-xl text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-blue-950 opacity-5" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500 opacity-10" />

        {/* Big 404 */}
        <p className="text-[100px] font-bold leading-none text-blue-950 opacity-10 select-none">
          404
        </p>

        {/* Content */}
        <div className="-mt-6 relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-500">
            Error
          </p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-500 max-w-sm mx-auto">
            The page you are looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 border-t-2 border-dashed border-zinc-200" />

        {/* Button */}
        <NavLink
          to="/"
          className="inline-block rounded-full bg-blue-950 px-8 py-3 text-[11px] font-semibold uppercase tracking-widest text-white hover:bg-blue-800 transition-colors duration-200 shadow-md"
        >
          Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
