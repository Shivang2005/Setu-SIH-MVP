import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-line rounded-lg shadow-pop px-3 py-2 text-xs min-w-[140px]">
      <p className="font-medium text-ink-900 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center justify-between gap-4 text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-mono tabular text-ink-800">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function DemandSupplyChart({ data, height = 340 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }} barGap={2} barCategoryGap={14}>
        <CartesianGrid stroke="var(--color-line)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--color-slate-500)" }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="skill"
          tick={{ fontSize: 12, fill: "var(--color-ink-800)" }}
          axisLine={false}
          tickLine={false}
          width={104}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-slate-50)" }} />
        <Legend
          wrapperStyle={{ fontSize: 12, color: "var(--color-slate-500)" }}
          iconType="circle"
          iconSize={8}
        />
        <Bar dataKey="demand" name="Employer demand" fill="var(--color-ink-700)" radius={[0, 4, 4, 0]} maxBarSize={10} />
        <Bar dataKey="supply" name="Trainee supply" fill="var(--color-accent-500)" radius={[0, 4, 4, 0]} maxBarSize={10} />
      </BarChart>
    </ResponsiveContainer>
  );
}
