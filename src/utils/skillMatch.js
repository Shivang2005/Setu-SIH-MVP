// Computes the overlap between a person's current skills and a target job's
// required skills. Percentages are always derived from the overlap, never
// hardcoded, so the numbers stay honest as the underlying mock data changes.
export function calculateSkillMatch(currentSkills = [], requiredSkills = []) {
  const current = new Set(currentSkills);
  const matched = requiredSkills.filter((s) => current.has(s));
  const missing = requiredSkills.filter((s) => !current.has(s));
  const matchPercent = requiredSkills.length
    ? Math.round((matched.length / requiredSkills.length) * 100)
    : 0;

  return { matched, missing, matchPercent, total: requiredSkills.length };
}

// Very small "recommendation" lookup — maps a missing skill to a mock course.
// In a real system this would be served by the AI/ML recommendation module
// shown in the architecture diagram; here it is a static, swappable table.
const COURSE_CATALOG = {
  TensorFlow: { title: "TensorFlow Fundamentals", hours: 18, provider: "Setu Learn" },
  AWS: { title: "AWS Cloud Practitioner", hours: 24, provider: "Setu Learn" },
  Azure: { title: "Microsoft Azure Fundamentals", hours: 20, provider: "Setu Learn" },
  "Power BI": { title: "Power BI Analytics", hours: 14, provider: "Setu Learn" },
  "Cloud Computing": { title: "Cloud Computing Essentials", hours: 22, provider: "Setu Learn" },
  Docker: { title: "Containers with Docker", hours: 12, provider: "Setu Learn" },
  "Deep Learning": { title: "Deep Learning Foundations", hours: 30, provider: "Setu Learn" },
  "Machine Learning": { title: "Applied Machine Learning", hours: 28, provider: "Setu Learn" },
  Python: { title: "Python for Data Roles", hours: 20, provider: "Setu Learn" },
  SQL: { title: "SQL for Analysts", hours: 10, provider: "Setu Learn" },
  React: { title: "React Application Development", hours: 20, provider: "Setu Learn" },
  "Node.js": { title: "Node.js Backend Development", hours: 18, provider: "Setu Learn" },
  JavaScript: { title: "Modern JavaScript", hours: 16, provider: "Setu Learn" },
  Cybersecurity: { title: "Cybersecurity Fundamentals", hours: 24, provider: "Setu Learn" },
  "Data Visualization": { title: "Data Storytelling & Visualization", hours: 12, provider: "Setu Learn" },
  Excel: { title: "Advanced Excel for Analytics", hours: 10, provider: "Setu Learn" },
  "Digital Marketing": { title: "Digital Marketing Bootcamp", hours: 16, provider: "Setu Learn" },
  SEO: { title: "SEO & Content Strategy", hours: 10, provider: "Setu Learn" },
  Java: { title: "Java Programming Essentials", hours: 22, provider: "Setu Learn" },
  Pandas: { title: "Data Wrangling with Pandas", hours: 8, provider: "Setu Learn" },
};

export function recommendCoursesFor(missingSkills = []) {
  return missingSkills.map(
    (skill) =>
      COURSE_CATALOG[skill] || { title: `${skill} Fundamentals`, hours: 16, provider: "Setu Learn" }
  );
}
