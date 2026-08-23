import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, GraduationCap, TrendingUp, BarChart3, Award, ArrowUpRight,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/ui/Card.jsx";
import KpiCard from "../components/cards/KpiCard.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import EmploymentTrendChart from "../components/charts/EmploymentTrendChart.jsx";
import ProgramComparisonChart from "../components/charts/ProgramComparisonChart.jsx";
import { PLATFORM_KPIS, EMPLOYMENT_TREND, TOP_SKILL_GAPS } from "../data/analytics.js";
import { PROGRAMS } from "../data/programs.js";
import { formatNumber } from "../utils/format.js";

const RANGE_OPTIONS = [
  { id: "6m", label: "6M", months: 6 },
  { id: "12m", label: "12M", months: 12 },
];

export default function InstituteDashboard() {
  const [range, setRange] = useState("6m");
  const months = RANGE_OPTIONS.find((r) => r.id === range).months;
  const trendData = useMemo(() => EMPLOYMENT_TREND.slice(-months), [months]);

  return (
    <DashboardLayout title="Training Institute Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard label="Enrolled Trainees" value={formatNumber(PLATFORM_KPIS.totalTrainees)} icon={Users} trend={PLATFORM_KPIS.totalTraineesTrend} accent />
          <KpiCard label="Programs Completed" value={formatNumber(PLATFORM_KPIS.trainingCompleted)} icon={GraduationCap} trend={PLATFORM_KPIS.completedTrend} />
          <KpiCard label="Placement Rate" value={PLATFORM_KPIS.employmentRate} suffix="%" icon={TrendingUp} trend={PLATFORM_KPIS.employmentTrend} />
          <KpiCard label="Programs Offered" value={PROGRAMS.length} icon={BarChart3} />
          <KpiCard label="6-Month Retention" value={PLATFORM_KPIS.retention6mo} suffix="%" icon={Award} trend={PLATFORM_KPIS.retentionTrend} />
        </div>

        {/* Full-width program focus — this is the institute's primary lens, unlike gov's split layout */}
        <Card>
          <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
            <div>
              <h2 className="font-display font-semibold text-ink-900 dark:text-white">Program Performance</h2>
              <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5">Completion and employment rate across every program you run</p>
            </div>
            <Link to="/program-impact" className="text-xs font-medium text-accent-700 dark:text-accent-300 hover:text-accent-600 flex items-center gap-1">
              Full breakdown <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ProgramComparisonChart programs={PROGRAMS} />
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
              <div>
                <h2 className="font-display font-semibold text-ink-900 dark:text-white">Trainee Outcomes</h2>
                <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5">Monthly placements against applications, across your programs</p>
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
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-display font-semibold text-ink-900 dark:text-white">Curriculum Gaps</h2>
              <Link to="/skill-gap-analysis" className="text-xs font-medium text-accent-700 dark:text-accent-300 hover:text-accent-600 flex items-center gap-1">
                Analyze <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-slate-500 dark:text-white/50 mb-3">Skills in demand your syllabus under-covers</p>
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
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}