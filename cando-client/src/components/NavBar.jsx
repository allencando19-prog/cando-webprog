import { NavLink } from "react-router-dom";
import logo from "../assets/logowagc.png";
const links = [
  {
    label: "Home",
    to: "/",
    activeClass: "bg-blue-600",
    inactiveClass: "bg-blue-500 hover:bg-blue-400",
  },
  {
    label: "About",
    to: "/about",
    activeClass: "bg-blue-600",
    inactiveClass: "bg-blue-500 hover:bg-blue-400",
  },
  {
    label: "Articles",
    to: "/articles",
    activeClass: "bg-blue-600",
    inactiveClass: "bg-blue-500 hover:bg-blue-400",
  },
];

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-blue-950/95 backdrop-blur-md border-b border-blue-900 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-auto bg-blue-500 rounded-2xl p-2 shadow-md border border-blue-400"
          />
        </NavLink>

        {/* Vessel container with separate pills inside */}
        <nav className="flex items-center gap-2 bg-blue-900/50 border-2 border-blue-700 rounded-full px-2 py-1.5 shadow-inner">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-full px-5 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 text-white",
                  isActive ? link.activeClass : link.inactiveClass,
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
