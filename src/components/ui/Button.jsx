const VARIANTS = {
  primary: "bg-accent-500 text-white hover:bg-accent-600 shadow-card",
  dark: "bg-ink-900 text-white hover:bg-ink-800",
  outline: "border border-line bg-white text-ink-800 hover:bg-slate-50",
  ghost: "text-slate-500 hover:text-ink-900 hover:bg-slate-100",
};

export default function Button({
  children, variant = "primary", className = "", disabled = false, icon: Icon, iconRight, ...props
}) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium text-sm px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && !iconRight && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconRight && <Icon className="w-4 h-4" />}
    </button>
  );
}
