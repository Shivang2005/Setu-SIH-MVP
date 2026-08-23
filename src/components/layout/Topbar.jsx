import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { useRole } from "../../context/RoleContext.jsx";
import { getRole } from "../../data/roles.js";
import { initials } from "../../utils/format.js";

const DEMO_USER = {
  government: { name: "Anjali Rao", meta: "Ministry of Skill Development" },
  institute: { name: "Anjali Rao", meta: "Ministry of Skill Development" },
  employer: { name: "Vertex Data Works", meta: "Hiring Team" },
  trainee: { name: "Rahul Sharma", meta: "AI/ML Skilling Program" },
};

export default function Topbar({ title, onMenuClick }) {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const roleMeta = getRole(role) || getRole("government");
  const user = DEMO_USER[role] || DEMO_USER.government;

  const handleProfileClick = () => {
    setRole(null);
    navigate("/login");
  };

  return (
    <header className="h-16 shrink-0 border-b border-line bg-white/80 backdrop-blur sticky top-0 z-20 flex items-center gap-4 px-4 lg:px-6">
      <button className="lg:hidden text-ink-700" onClick={onMenuClick} aria-label="Open menu">
        <Menu className="w-5.5 h-5.5" />
      </button>

      <div className="min-w-0">
        <h1 className="font-display font-semibold text-lg text-ink-900 truncate">{title}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-64 text-slate-500">
          <Search className="w-4 h-4 shrink-0" />
          <input
            type="text"
            placeholder="Search trainees, programs, jobs…"
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-line rounded-xl shadow-pop p-2 text-sm">
              <p className="px-2 py-1.5 text-xs font-medium text-slate-400 uppercase tracking-wide">Recent</p>
              <div className="px-2 py-2 rounded-lg hover:bg-slate-50">
                <p className="text-ink-800">3 new trainees completed AI/ML certification</p>
                <p className="text-xs text-slate-400 mt-0.5">2 hours ago</p>
              </div>
              <div className="px-2 py-2 rounded-lg hover:bg-slate-50">
                <p className="text-ink-800">Cloud Computing skill gap widened to 47 pts</p>
                <p className="text-xs text-slate-400 mt-0.5">Yesterday</p>
              </div>
              <div className="px-2 py-2 rounded-lg hover:bg-slate-50">
                <p className="text-ink-800">Q3 Program Impact report is ready</p>
                <p className="text-xs text-slate-400 mt-0.5">2 days ago</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 pl-2 sm:border-l border-line hover:bg-slate-50 rounded-lg pr-2 py-1 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-ink-700 text-white text-xs font-medium flex items-center justify-center shrink-0">
            {initials(user.name)}
          </span>
          <div className="hidden sm:block leading-tight text-left">
            <p className="text-sm font-medium text-ink-900">{user.name}</p>
            <p className="text-xs text-slate-400">{roleMeta.label}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}