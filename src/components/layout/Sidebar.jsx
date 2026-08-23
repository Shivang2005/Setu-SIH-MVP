import { NavLink, useNavigate } from "react-router-dom";
import { Waypoints, LogOut, X } from "lucide-react";
import { NAV_BY_ROLE, getRole } from "../../data/roles.js";
import { useRole } from "../../context/RoleContext.jsx";

export default function Sidebar({ open, onClose }) {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const items = NAV_BY_ROLE[role] || NAV_BY_ROLE.government;
  const roleMeta = getRole(role) || getRole("government");

  const handleSwitchRole = () => {
    setRole(null);
    navigate("/login");
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-ink-950/40 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 shrink-0 bg-ink-900 text-white flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
              <Waypoints className="w-4.5 h-4.5 text-white" />
            </span>
            <span className="font-display font-semibold tracking-tight">Setu</span>
          </div>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={onClose} aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 pt-5 pb-2">
          <span className="text-[11px] uppercase tracking-wider text-white/40 font-medium">
            {roleMeta.label}
          </span>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {items.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent-500/15 text-accent-300"
                    : "text-white/65 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon className="w-4.5 h-4.5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleSwitchRole}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4.5 h-4.5" />
            Switch role
          </button>
        </div>
      </aside>
    </>
  );
}