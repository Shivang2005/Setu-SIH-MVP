import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-ink-800 border border-line dark:border-white/10 rounded-lg shadow-pop px-3 py-2 text-xs min-w-[140px]">
      <p className="font-medium text-ink-900 dark:text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center justify-between gap-4 text-slate-500 dark:text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-mono tabular text-ink-800 dark:text-white/85">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function DemandSupplyChart({ data, height = 340 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }} barGap={2} barCategoryGap={14}>
        <CartesianGrid stroke="var(--chart-grid)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--chart-axis)" }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="skill"
          tick={{ fontSize: 12, fill: "var(--chart-axis-strong)" }}
          axisLine={false}
          tickLine={false}
          width={104}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--chart-cursor)" }} />
        <Legend
          wrapperStyle={{ fontSize: 12, color: "var(--chart-axis)" }}
          iconType="circle"
          iconSize={8}
        />
        <Bar dataKey="demand" name="Employer demand" fill="var(--chart-demand-fill)" radius={[0, 4, 4, 0]} maxBarSize={10} />
        <Bar dataKey="supply" name="Trainee supply" fill="var(--color-accent-500)" radius={[0, 4, 4, 0]} maxBarSize={10} />
      </BarChart>
    </ResponsiveContainer>
  );
}