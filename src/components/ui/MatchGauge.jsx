// The platform's recurring visual signature: a radial arc used everywhere a
// "how well does X align with Y" question is being answered — skill match,
// employment rate, retention. Consistent motif = consistent mental model.
export default function MatchGauge({
  value = 0,
  size = 132,
  strokeWidth = 10,
  label,
  sublabel,
  tone = "accent",
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference - (clamped / 100) * circumference;

  const strokeColor = {
    accent: "var(--color-accent-500)",
    amber: "var(--color-amber-500)",
    success: "var(--color-success-500)",
    danger: "var(--color-danger-500)",
  }[tone];

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-slate-100)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono tabular text-2xl font-semibold text-ink-900">{clamped}%</span>
        {label && <span className="text-[11px] text-slate-500 mt-0.5 text-center px-2 leading-tight">{label}</span>}
      </div>
      {sublabel && (
        <span className="absolute -bottom-6 text-xs text-slate-400 whitespace-nowrap">{sublabel}</span>
      )}
    </div>
  );
}
