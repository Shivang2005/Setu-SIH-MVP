export default function ProgressBar({ value = 0, className = "", tone = "accent", track = "bg-slate-100 dark:bg-white/10", height = "h-2" }) {
  const toneClass = {
    accent: "bg-accent-500",
    success: "bg-success-500",
    amber: "bg-amber-500",
    ink: "bg-ink-700 dark:bg-white/60",
  }[tone];

  return (
    <div className={`w-full ${track} rounded-full ${height} overflow-hidden ${className}`}>
      <div
        className={`${toneClass} ${height} rounded-full transition-[width] duration-700 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}