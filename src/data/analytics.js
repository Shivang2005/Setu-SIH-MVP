// Platform-wide aggregates. These represent the full platform scale (lakhs of
// records in production); the 24 trainee profiles in trainees.js are a
// browsable sample used for search, matching and detail views.
export const PLATFORM_KPIS = {
  totalTrainees: 12450,
  trainingCompleted: 8920,
  employmentRate: 63,
  skillJobAlignment: 71,
  retention6mo: 78,
  totalTraineesTrend: 8.4,
  completedTrend: 6.1,
  employmentTrend: 4.2,
  alignmentTrend: 2.8,
  retentionTrend: -1.3,
};

// Demand vs. supply, 0-100 index, for the skills most requested by employers.
export const SKILL_DEMAND_SUPPLY = [
  { skill: "Python", demand: 92, supply: 74 },
  { skill: "Cloud Computing", demand: 88, supply: 41 },
  { skill: "SQL", demand: 85, supply: 79 },
  { skill: "Power BI", demand: 76, supply: 38 },
  { skill: "AWS", demand: 81, supply: 36 },
  { skill: "Machine Learning", demand: 79, supply: 58 },
  { skill: "Cybersecurity", demand: 74, supply: 29 },
  { skill: "Data Visualization", demand: 68, supply: 52 },
  { skill: "TensorFlow", demand: 63, supply: 27 },
  { skill: "Digital Marketing", demand: 55, supply: 60 },
];

// Ranked purely by demand-supply gap; drives the "Top Skill Gaps" widgets.
export const TOP_SKILL_GAPS = [...SKILL_DEMAND_SUPPLY]
  .map((s) => ({ ...s, gap: s.demand - s.supply }))
  .sort((a, b) => b.gap - a.gap)
  .slice(0, 5);

// 12-month employment outcome trend across the whole platform.
export const EMPLOYMENT_TREND = [
  { month: "Sep '25", placements: 612, applications: 1180 },
  { month: "Oct '25", placements: 684, applications: 1240 },
  { month: "Nov '25", placements: 705, applications: 1290 },
  { month: "Dec '25", placements: 598, applications: 1110 },
  { month: "Jan '26", placements: 742, applications: 1350 },
  { month: "Feb '26", placements: 803, applications: 1420 },
  { month: "Mar '26", placements: 861, applications: 1495 },
  { month: "Apr '26", placements: 890, applications: 1530 },
  { month: "May '26", placements: 917, applications: 1560 },
  { month: "Jun '26", placements: 948, applications: 1610 },
  { month: "Jul '26", placements: 972, applications: 1640 },
  { month: "Aug '26", placements: 1005, applications: 1690 },
];

// Sector-wise share of placements, used for the regional/sector mix chart.
export const SECTOR_TRENDS = [
  { sector: "Technology", share: 38, growth: 12 },
  { sector: "Analytics", share: 22, growth: 7 },
  { sector: "Infrastructure & Cloud", share: 16, growth: 18 },
  { sector: "Security", share: 10, growth: 15 },
  { sector: "Marketing", share: 14, growth: -3 },
];

// State-wise reach, used on the government dashboard's regional panel.
export const REGIONAL_OUTCOMES = [
  { region: "Delhi NCR", trainees: 2840, employmentRate: 68 },
  { region: "Uttar Pradesh", trainees: 2415, employmentRate: 59 },
  { region: "Punjab", trainees: 1390, employmentRate: 64 },
  { region: "Haryana", trainees: 1205, employmentRate: 66 },
  { region: "Rajasthan", trainees: 1680, employmentRate: 57 },
  { region: "Maharashtra", trainees: 1520, employmentRate: 65 },
  { region: "Karnataka", trainees: 980, employmentRate: 71 },
  { region: "Telangana", trainees: 720, employmentRate: 69 },
  { region: "Bihar", trainees: 700, employmentRate: 48 },
];
