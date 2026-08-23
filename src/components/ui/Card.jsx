export default function Card({ children, className = "", padded = true, as: Tag = "div", ...props }) {
  return (
    <Tag
      className={`bg-white border border-line rounded-2xl shadow-card ${padded ? "p-5" : ""} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
