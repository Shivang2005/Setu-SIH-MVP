import { useMemo } from "react";
import {
  PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, ZAxis,
  CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Legend,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import { PROGRAMS } from "../data/programs.js";
import { REGIONAL_OUTCOMES } from "../data/analytics.js";
import { formatNumber } from "../utils/format.js";

const ALIGNMENT_THRESHOLD = 65;
const EMPLOYMENT_THRESHOLD = 65;

const PALETTE = [
  "var(--color-accent-500)",
  "var(--color-ink-700)",
  "var(--color-amber-500)",
  "var(--color-info-500)",
  "var(--color-success-500)",
  "var(--color-slate-400)",
  "var(--color-danger-500)",
];

const QUADRANTS = {
  scaleUp: { label: "Scale Up", color: "var(--color-success-500)", badge: "success", note: "Strong alignment and placement — a candidate for expanded funding or enrollment." },
  improvePlacement: { label: "Improve Placement", color: "var(--color-info-500)", badge: "accent", note: "Curriculum matches demand, but placement is lagging — consider employer partnerships or job-readiness support." },
  monitorDemand: { label: "Monitor Demand", color: "var(--color-amber-500)", badge: "warning", note: "Placing trainees well despite a demand mismatch — watch for market saturation or update the curriculum." },
  reconsider: { label: "Reconsider Funding", color: "var(--color-danger-500)", badge: "danger", note: "Low alignment and low placement — the weakest case for continued investment as-is." },
};

function classify(alignment, employmentRate) {
  if (alignment >= ALIGNMENT_THRESHOLD && employmentRate >= EMPLOYMENT_THRESHOLD) return QUADRANTS.scaleUp;
  if (alignment >= ALIGNMENT_THRESHOLD && employmentRate < EMPLOYMENT_THRESHOLD) return QUADRANTS.improvePlacement;
  if (alignment < ALIGNMENT_THRESHOLD && employmentRate >= EMPLOYMENT_THRESHOLD) return QUADRANTS.monitorDemand;
  return QUADRANTS.reconsider;
}

function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white dark:bg-ink-800 border border-line dark:border-white/10 rounded-lg shadow-pop px-3 py-2 text-xs">
      <p className="font-medium text-ink-900 dark:text-white">{d.name}</p>
      <p className="text-slate-500 dark:text-white/50 mt-0.5">
        <span className="font-mono tabular text-ink-800 dark:text-white/85">{formatNumber(d.value)}</span> trainees
      </p>
    </div>
  );
}

function QuadrantTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white dark:bg-ink-800 border border-line dark:border-white/10 rounded-lg shadow-pop px-3.5 py-2.5 text-xs max-w-[220px]">
      <p className="font-medium text-ink-900 dark:text-white mb-1">{d.name}</p>
      <p className="text-slate-500 dark:text-white/50">Alignment: <span className="font-mono tabular text-ink-800 dark:text-white/85">{d.alignment}%</span></p>
      <p className="text-slate-500 dark:text-white/50">Employment rate: <span className="font-mono tabular text-ink-800 dark:text-white/85">{d.employmentRate}%</span></p>
      <p className="text-slate-500 dark:text-white/50">Completions: <span className="font-mono tabular text-ink-800 dark:text-white/85">{formatNumber(d.completed)}</span></p>
      <p className="mt-1.5 font-medium" style={{ color: d.category.color }}>{d.category.label}</p>
    </div>
  );
}

export default function ProgramAnalysis() {
  const programMix = useMemo(
    () => PROGRAMS.map((p, i) => ({ name: p.shortName, value: p.completed, fill: PALETTE[i % PALETTE.length] })),
    []
  );

  const regionalMix = useMemo(
    () => REGIONAL_OUTCOMES.map((r, i) => ({ name: r.region, value: r.trainees, fill: PALETTE[i % PALETTE.length] })),
    []
  );

  const quadrantData = useMemo(() => {
    return PROGRAMS.map((p) => {
      const employmentRate = Math.round((p.employed / p.completed) * 100);
      const alignment = p.skillJobAlignment;
      return {
        name: p.shortName,
        alignment,
        employmentRate,
        completed: p.completed,
        category: classify(alignment, employmentRate),
      };
    });
  }, []);

  const needsReview = useMemo(
    () =>
      quadrantData
        .filter((d) => d.category === QUADRANTS.reconsider || d.category === QUADRANTS.improvePlacement)
        .sort((a, b) => a.alignment + a.employmentRate - (b.alignment + b.employmentRate)),
    [quadrantData]
  );

  return (
    <DashboardLayout title="Program Analysis">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-display font-semibold text-ink-900 dark:text-white">Program Mix</h2>
            <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5 mb-2">Trainee completions by program</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={programMix} dataKey="value" nameKey="name" innerRadius={64} outerRadius={100} paddingAngle={2}>
                  {programMix.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "var(--chart-axis)" }} iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h2 className="font-display font-semibold text-ink-900 dark:text-white">Regional Reach</h2>
            <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5 mb-2">Trainee distribution by state</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={regionalMix} dataKey="value" nameKey="name" innerRadius={64} outerRadius={100} paddingAngle={2}>
                  {regionalMix.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "var(--chart-axis)" }} iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
            <div>
              <h2 className="font-display font-semibold text-ink-900 dark:text-white">Funding Decision Matrix</h2>
              <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5">
                Skill-job alignment vs. employment rate — bubble size is trainee completions
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              {Object.values(QUADRANTS).map((q) => (
                <span key={q.label} className="flex items-center gap-1.5 text-slate-500 dark:text-white/50">
                  <span className="w-2 h-2 rounded-full" style={{ background: q.color }} /> {q.label}
                </span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={360}>
            <ScatterChart margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="var(--chart-grid)" />
              <XAxis
                type="number"
                dataKey="alignment"
                name="Alignment"
                unit="%"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "var(--chart-axis)" }}
                axisLine={{ stroke: "var(--chart-grid)" }}
                tickLine={false}
                label={{ value: "Skill-Job Alignment", position: "insideBottom", offset: -4, fontSize: 11, fill: "var(--chart-axis)" }}
              />
              <YAxis
                type="number"
                dataKey="employmentRate"
                name="Employment Rate"
                unit="%"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "var(--chart-axis)" }}
                axisLine={false}
                tickLine={false}
                label={{ value: "Employment Rate", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--chart-axis)" }}
              />
              <ZAxis type="number" dataKey="completed" range={[120, 900]} />
              <ReferenceLine x={ALIGNMENT_THRESHOLD} stroke="var(--chart-axis)" strokeDasharray="4 4" />
              <ReferenceLine y={EMPLOYMENT_THRESHOLD} stroke="var(--chart-axis)" strokeDasharray="4 4" />
              <Tooltip content={<QuadrantTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "var(--chart-grid)" }} />
              <Scatter data={quadrantData} fillOpacity={0.85}>
                {quadrantData.map((d, i) => <Cell key={i} fill={d.category.color} />)}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />
            <h2 className="font-display font-semibold text-ink-900 dark:text-white">Programs Needing Review</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-white/50 mb-4">
            Weakest alignment-employment combination first — a starting point for funding conversations
          </p>
          {needsReview.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-white/40 py-6 text-center">
              Every program is performing above threshold on both metrics right now.
            </p>
          ) : (
            <div className="space-y-3">
              {needsReview.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between gap-4 border border-line dark:border-white/10 rounded-xl p-4 flex-wrap"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-ink-900 dark:text-white text-sm">{d.name}</p>
                      <Badge variant={d.category.badge}>{d.category.label}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/50 mt-1">{d.category.note}</p>
                  </div>
                  <div className="flex items-center gap-5 text-xs shrink-0">
                    <div className="text-right">
                      <p className="font-mono tabular text-ink-800 dark:text-white/85">{d.alignment}%</p>
                      <p className="text-slate-400 dark:text-white/40">alignment</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono tabular text-ink-800 dark:text-white/85">{d.employmentRate}%</p>
                      <p className="text-slate-400 dark:text-white/40">employed</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}