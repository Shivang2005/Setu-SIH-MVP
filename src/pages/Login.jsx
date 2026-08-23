import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Waypoints, ShieldCheck } from "lucide-react";
import { ROLES } from "../data/roles.js";
import { useRole } from "../context/RoleContext.jsx";
import Card from "../components/ui/Card.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleLogin = (role) => {
    setRole(role.id);
    navigate(role.landingRoute);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <header className="h-16 flex items-center px-5 max-w-md mx-auto w-full">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </header>

      <div className="flex-1 flex items-center">
        <div className="max-w-md mx-auto px-5 py-10 w-full">
          <Card className="p-8">
            <div className="text-center mb-8">
              <span className="w-12 h-12 rounded-xl bg-ink-900 flex items-center justify-center mx-auto mb-5">
                <Waypoints className="w-6 h-6 text-accent-300" />
              </span>
              <h1 className="font-display text-2xl font-bold text-ink-950">Log in to Setu</h1>
              <p className="text-sm text-slate-500 mt-2">
                Choose how you'd like to continue. No password required for this MVP.
              </p>
            </div>

            <div className="space-y-2.5">
              {ROLES.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleLogin(role)}
                    className="w-full flex items-center gap-3.5 border border-line rounded-xl p-3.5 text-left hover:border-accent-300 hover:bg-accent-50/40 transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-lg bg-accent-50 text-accent-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ink-900 text-sm">{role.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{role.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-accent-600 transition-colors shrink-0" />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-8">
              <ShieldCheck className="w-3.5 h-3.5" /> Demo environment — mock data only
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}