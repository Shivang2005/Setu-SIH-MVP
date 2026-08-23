import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-ink-800 border border-line dark:border-white/10 rounded-lg shadow-pop px-3 py-2 text-xs">
      <p className="font-medium text-ink-900 dark:text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center gap-1.5 text-slate-500 dark:text-white/50">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-mono tabular text-ink-800 dark:text-white/85">{p.value.toLocaleString("en-IN")}</span>
        </p>
      ))}
    </div>
  );
}

export default function EmploymentTrendChart({ data, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="placementsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-500)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--color-accent-500)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="applicationsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-muted-fill)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--chart-muted-fill)" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--chart-axis)" }}
          axisLine={{ stroke: "var(--chart-grid)" }}
          tickLine={false}
          interval={1}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--chart-axis)" }}
          axisLine={false}
          tickLine={false}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="applications"
          name="Applications"
          stroke="var(--chart-muted-fill)"
          strokeWidth={1.5}
          fill="url(#applicationsFill)"
        />
        <Area
          type="monotone"
          dataKey="placements"
          name="Placements"
          stroke="var(--color-accent-500)"
          strokeWidth={2}
          fill="url(#placementsFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}