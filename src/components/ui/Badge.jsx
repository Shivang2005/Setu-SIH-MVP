const VARIANTS = {
  neutral: "bg-slate-100 text-slate-600",
  accent: "bg-accent-50 text-accent-700",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-amber-600",
  danger: "bg-danger-50 text-danger-500",
  info: "bg-info-50 text-info-500",
  matched: "bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100",
  missing: "bg-amber-100 text-amber-600 ring-1 ring-inset ring-amber-100",
};

export default function Badge({ children, variant = "neutral", className = "", icon: Icon }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${VARIANTS[variant]} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}
