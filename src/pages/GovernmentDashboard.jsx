import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, GraduationCap, TrendingUp, Target, ShieldCheck, ArrowUpRight, MapPin,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/ui/Card.jsx";
import KpiCard from "../components/cards/KpiCard.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import EmploymentTrendChart from "../components/charts/EmploymentTrendChart.jsx";
import ProgramComparisonChart from "../components/charts/ProgramComparisonChart.jsx";
import DemandSupplyChart from "../components/charts/DemandSupplyChart.jsx";
import {
  PLATFORM_KPIS, EMPLOYMENT_TREND, TOP_SKILL_GAPS, SKILL_DEMAND_SUPPLY, REGIONAL_OUTCOMES,
} from "../data/analytics.js";
import { PROGRAMS } from "../data/programs.js";
import { formatNumber } from "../utils/format.js";

const RANGE_OPTIONS = [
  { id: "6m", label: "6M", months: 6 },
  { id: "12m", label: "12M", months: 12 },
];

export default function GovernmentDashboard() {
  const [range, setRange] = useState("12m");
  const months = RANGE_OPTIONS.find((r) => r.id === range).months;
  const trendData = useMemo(() => EMPLOYMENT_TREND.slice(-months), [months]);

  const maxRegionTrainees = Math.max(...REGIONAL_OUTCOMES.map((r) => r.trainees));

  return (
    <DashboardLayout title="Government Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard label="Total Trainees" value={formatNumber(PLATFORM_KPIS.totalTrainees)} icon={Users} trend={PLATFORM_KPIS.totalTraineesTrend} accent />
          <KpiCard label="Training Completed" value={formatNumber(PLATFORM_KPIS.trainingCompleted)} icon={GraduationCap} trend={PLATFORM_KPIS.completedTrend} />
          <KpiCard label="Employment Rate" value={PLATFORM_KPIS.employmentRate} suffix="%" icon={TrendingUp} trend={PLATFORM_KPIS.employmentTrend} />
          <KpiCard label="Skill-Job Match" value={PLATFORM_KPIS.skillJobAlignment} suffix="%" icon={Target} trend={PLATFORM_KPIS.alignmentTrend} />
          <KpiCard label="6-Month Retention" value={PLATFORM_KPIS.retention6mo} suffix="%" icon={ShieldCheck} trend={PLATFORM_KPIS.retentionTrend} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
              <div>
                <h2 className="font-display font-semibold text-ink-900 dark:text-white">Employment Outcomes</h2>
                <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5">Monthly placements against applications, platform-wide</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-white/10 rounded-lg p-1">
                {RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setRange(opt.id)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      range === opt.id ? "bg-white dark:bg-ink-700 text-ink-900 dark:text-white shadow-card" : "text-slate-500 dark:text-white/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <EmploymentTrendChart data={trendData} />
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-ink-900 dark:text-white">Top Skill Gaps</h2>
              <Link to="/skill-gap-analysis" className="text-xs font-medium text-accent-700 dark:text-accent-300 hover:text-accent-600 flex items-center gap-1">
                Analyze <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {TOP_SKILL_GAPS.map((s) => (
                <div key={s.skill}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-ink-800 dark:text-white/80 font-medium">{s.skill}</span>
                    <span className="text-amber-600 font-mono tabular text-xs">−{s.gap} pts</span>
                  </div>
                  <div className="flex gap-1">
                    <ProgressBar value={s.demand} tone="ink" height="h-1.5" className="flex-1" />
                    <ProgressBar value={s.supply} tone="accent" height="h-1.5" className="flex-1" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-line dark:border-white/10 text-xs text-slate-500 dark:text-white/40">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-ink-700" /> Demand</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-500" /> Supply</span>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-display font-semibold text-ink-900 dark:text-white">Program Performance</h2>
            <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5 mb-2">Employment rate by skilling program</p>
            <ProgramComparisonChart programs={PROGRAMS} />
          </Card>

          <Card>
            <h2 className="font-display font-semibold text-ink-900 dark:text-white">Skill Demand vs Supply</h2>
            <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5 mb-2">Index (0–100) across the platform's most requested skills</p>
            <DemandSupplyChart data={SKILL_DEMAND_SUPPLY} />
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-semibold text-ink-900 dark:text-white">Regional Outcomes</h2>
              <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5">Trainee reach and employment rate by state</p>
            </div>
            <MapPin className="w-4.5 h-4.5 text-slate-400 dark:text-white/40" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {REGIONAL_OUTCOMES.map((r) => (
              <div key={r.region}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-ink-800 dark:text-white/80 font-medium">{r.region}</span>
                  <span className="text-slate-500 dark:text-white/40 text-xs">
                    <span className="font-mono tabular text-ink-800 dark:text-white/80">{formatNumber(r.trainees)}</span> trainees
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressBar value={(r.trainees / maxRegionTrainees) * 100} tone="ink" height="h-1.5" className="flex-1" />
                  <span className="text-xs font-mono tabular text-accent-700 dark:text-accent-300 w-9 text-right">{r.employmentRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}