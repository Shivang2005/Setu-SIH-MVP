export default function FlowDiagram({ steps, active = -1, compact = false }) {
  return (
    <div className={`flex items-stretch ${compact ? "gap-0" : "gap-0"}`}>
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isLast = i === steps.length - 1;
        const isActive = active === i;
        const isDone = active > i;

        return (
          <div key={step.label} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className={`rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                  compact ? "w-10 h-10" : "w-14 h-14"
                } ${
                  isActive
                    ? "bg-accent-500 border-accent-500 text-white"
                    : isDone
                    ? "bg-accent-50 border-accent-100 text-accent-600"
                    : "bg-white border-line text-slate-400"
                }`}
              >
                <Icon className={compact ? "w-4.5 h-4.5" : "w-6 h-6"} />
              </div>
              <span
                className={`text-[11px] font-medium text-center leading-tight max-w-[84px] ${
                  isActive ? "text-ink-900" : "text-slate-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <svg className="flex-1 h-[2px] mx-1 mb-5 min-w-[16px]" preserveAspectRatio="none">
                <line
                  x1="0" y1="1" x2="100%" y2="1"
                  stroke={isDone ? "var(--color-accent-500)" : "var(--color-line)"}
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  className={isDone ? "animate-dash-flow" : ""}
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
