import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white dark:bg-ink-800 border border-line dark:border-white/10 rounded-lg shadow-pop px-3 py-2 text-xs min-w-[160px]">
      <p className="font-medium text-ink-900 dark:text-white mb-1">{d.shortName}</p>
      <p className="text-slate-500 dark:text-white/50">Employment rate: <span className="font-mono tabular text-ink-800 dark:text-white/85">{d.employmentRate}%</span></p>
      <p className="text-slate-500 dark:text-white/50">Skill-job alignment: <span className="font-mono tabular text-ink-800 dark:text-white/85">{d.skillJobAlignment}%</span></p>
    </div>
  );
}

export default function ProgramComparisonChart({ programs, height = 300 }) {
  const data = programs.map((p) => ({
    shortName: p.shortName,
    employmentRate: Math.round((p.employed / p.completed) * 100),
    skillJobAlignment: p.skillJobAlignment,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }} barGap={6}>
        <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
        <XAxis
          dataKey="shortName"
          tick={{ fontSize: 11, fill: "var(--chart-axis)" }}
          axisLine={{ stroke: "var(--chart-grid)" }}
          tickLine={false}
          interval={0}
          angle={-12}
          textAnchor="end"
          height={48}
        />
        <YAxis tick={{ fontSize: 11, fill: "var(--chart-axis)" }} axisLine={false} tickLine={false} width={36} unit="%" />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--chart-cursor)" }} />
        <Bar dataKey="employmentRate" name="Employment rate" radius={[6, 6, 0, 0]} maxBarSize={34}>
          {data.map((_, i) => (
            <Cell key={i} fill="var(--color-accent-500)" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}