export default function Card({ children, className = "", padded = true, as: Tag = "div", ...props }) {
  return (
    <Tag
      className={`bg-white dark:bg-ink-800 border border-line dark:border-white/10 rounded-2xl shadow-card ${padded ? "p-5" : ""} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}