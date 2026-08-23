import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Waypoints } from "lucide-react";
import { ROLES } from "../data/roles.js";
import { useRole } from "../context/RoleContext.jsx";
import Card from "../components/ui/Card.jsx";

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleSelect = (role) => {
    setRole(role.id);
    navigate(role.landingRoute);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <header className="h-16 flex items-center px-5 max-w-6xl mx-auto w-full">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </header>

      <div className="flex-1 flex items-center">
        <div className="max-w-4xl mx-auto px-5 py-10 w-full">
          <div className="text-center mb-12">
            <span className="w-12 h-12 rounded-xl bg-ink-900 flex items-center justify-center mx-auto mb-5">
              <Waypoints className="w-6 h-6 text-accent-300" />
            </span>
            <h1 className="font-display text-3xl font-bold text-ink-950">Continue as…</h1>
            <p className="text-slate-500 mt-2">Pick a persona to open its demo dashboard. No sign-in required for this MVP.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {ROLES.map((role) => {
              const Icon = role.icon;
              return (
                <button key={role.id} onClick={() => handleSelect(role)} className="text-left group">
                  <Card className="h-full flex items-start gap-4 hover:border-accent-300 hover:shadow-pop transition-all duration-300">
                    <span className="w-11 h-11 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5.5 h-5.5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-ink-900">{role.label}</h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{role.description}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-700 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        Continue <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
