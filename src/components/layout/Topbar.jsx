import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, Sun, Moon, LogOut, Check } from "lucide-react";
import { useRole } from "../../context/RoleContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { getRole, ROLES } from "../../data/roles.js";
import { initials } from "../../utils/format.js";

const DEMO_USER = {
  government: { name: "Anjali Rao", meta: "Ministry of Skill Development" },
  institute: { name: "Anjali Rao", meta: "Training Institute" },
  employer: { name: "Vertex Data Works", meta: "Hiring Team" },
  trainee: { name: "Rahul Sharma", meta: "AI/ML Skilling Program" },
};

export default function Topbar({ title, onMenuClick }) {
  const { role, setRole } = useRole();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const roleMeta = getRole(role) || getRole("government");
  const user = DEMO_USER[role] || DEMO_USER.government;

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitchTo = (targetRole) => {
    setRole(targetRole.id);
    setProfileOpen(false);
    navigate(targetRole.landingRoute);
  };

  const handleLogout = () => {
    setRole(null);
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <header className="h-16 shrink-0 border-b border-line bg-white/80 dark:bg-ink-900/80 backdrop-blur sticky top-0 z-20 flex items-center gap-4 px-4 lg:px-6">
      <button className="lg:hidden text-ink-700 dark:text-white/70" onClick={onMenuClick} aria-label="Open menu">
        <Menu className="w-5.5 h-5.5" />
      </button>

      <div className="min-w-0">
        <h1 className="font-display font-semibold text-lg text-ink-900 dark:text-white truncate">{title}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-white/10 rounded-lg px-3 py-2 w-64 text-slate-500 dark:text-white/50">
          <Search className="w-4 h-4 shrink-0" />
          <input
            type="text"
            placeholder="Search trainees, programs, jobs…"
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400 dark:placeholder:text-white/40 dark:text-white"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-ink-800 border border-line dark:border-white/10 rounded-xl shadow-pop p-2 text-sm">
              <p className="px-2 py-1.5 text-xs font-medium text-slate-400 uppercase tracking-wide">Recent</p>
              <div className="px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5">
                <p className="text-ink-800 dark:text-white/80">3 new trainees completed AI/ML certification</p>
                <p className="text-xs text-slate-400 mt-0.5">2 hours ago</p>
              </div>
              <div className="px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5">
                <p className="text-ink-800 dark:text-white/80">Cloud Computing skill gap widened to 47 pts</p>
                <p className="text-xs text-slate-400 mt-0.5">Yesterday</p>
              </div>
              <div className="px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5">
                <p className="text-ink-800 dark:text-white/80">Q3 Program Impact report is ready</p>
                <p className="text-xs text-slate-400 mt-0.5">2 days ago</p>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 pl-2 sm:border-l border-line dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg pr-2 py-1 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-ink-700 text-white text-xs font-medium flex items-center justify-center shrink-0">
              {initials(user.name)}
            </span>
            <div className="hidden sm:block leading-tight text-left">
              <p className="text-sm font-medium text-ink-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{roleMeta.label}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 hidden sm:block transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-ink-800 border border-line dark:border-white/10 rounded-xl shadow-pop p-2 text-sm z-30">
              <p className="px-2 py-1.5 text-xs font-medium text-slate-400 uppercase tracking-wide">Switch profile</p>
              {ROLES.map((r) => {
                const Icon = r.icon;
                const isActive = r.id === role;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSwitchTo(r)}
                    disabled={isActive}
                    className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-300"
                        : "text-ink-800 dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 truncate">{r.label}</span>
                    {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
              <div className="h-px bg-line dark:bg-white/10 my-2" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left text-slate-500 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}