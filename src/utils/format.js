export const formatNumber = (n) =>
  n === null || n === undefined ? "—" : n.toLocaleString("en-IN");

export const formatLPA = (n) =>
  n === null || n === undefined ? "—" : `₹${n.toFixed(1)} LPA`;

export const formatPercent = (n) =>
  n === null || n === undefined ? "—" : `${n}%`;

export const formatDate = (isoDate) => {
  if (!isoDate) return "—";
  return new Date(isoDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const initials = (name = "") =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
