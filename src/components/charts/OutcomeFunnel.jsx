export default function OutcomeFunnel({ stages }) {
  const max = stages[0]?.value || 1;

  return (
    <div className="space-y-3">
      {stages.map((stage, i) => {
        const widthPct = Math.max(8, (stage.value / max) * 100);
        const prevValue = i > 0 ? stages[i - 1].value : null;
        const dropOff = prevValue ? Math.round((stage.value / prevValue) * 100) : 100;

        return (
          <div key={stage.label}>
            <div className="flex items-baseline justify-between mb-1.5 text-sm">
              <span className="font-medium text-ink-800">{stage.label}</span>
              <span className="font-mono tabular text-ink-900">
                {stage.value.toLocaleString("en-IN")}
                {i > 0 && <span className="text-slate-400 ml-2 text-xs">({dropOff}% of prior stage)</span>}
              </span>
            </div>
            <div className="h-9 bg-slate-100 rounded-lg overflow-hidden">
              <div
                className="h-full rounded-lg flex items-center justify-end pr-3 transition-[width] duration-700 ease-out"
                style={{ width: `${widthPct}%`, backgroundColor: stage.color }}
              >
                <span className="text-white text-xs font-mono tabular font-medium">
                  {Math.round((stage.value / max) * 100)}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
