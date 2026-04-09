import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-950 border-t border-blue-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
          Cando, Will Allen G.
        </p>

        <p className="text-[11px] text-blue-400 tracking-wider">
          © 2026 WAGC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
