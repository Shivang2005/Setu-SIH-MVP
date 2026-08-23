import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Card from "../ui/Card.jsx";

export default function KpiCard({ label, value, suffix = "", trend, icon: Icon, accent = false }) {
  const isPositive = trend > 0;
  const isFlat = trend === 0 || trend === undefined;

  return (
    <Card className="flex flex-col gap-3 min-w-0">
      <div className="flex items-start justify-between">
        <span className="text-sm text-slate-500 dark:text-white/50">{label}</span>
        {Icon && (
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ? "bg-accent-50 dark:bg-accent-500/15 text-accent-600 dark:text-accent-300" : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/50"}`}>
            <Icon className="w-4 h-4" />
          </span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <span className="font-mono tabular text-3xl font-semibold text-ink-900 dark:text-white truncate">
          {value}
          {suffix}
        </span>
        {!isFlat && (
          <span
            className={`flex items-center text-xs font-medium mb-1 ${
              isPositive ? "text-success-600 dark:text-success-500" : "text-danger-500"
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </Card>
  );
}