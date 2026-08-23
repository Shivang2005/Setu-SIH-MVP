import {
  Landmark, GraduationCap, Briefcase, UserRound,
  LayoutDashboard, TrendingUp, Target, BarChart3,
} from "lucide-react";

export const ROLES = [
  {
    id: "government",
    label: "Government / Administrator",
    description: "Monitor programs, employment outcomes and policy-level insights.",
    icon: Landmark,
    landingRoute: "/government",
  },
  {
    id: "institute",
    label: "Training Institute",
    description: "Track trainee progress and program effectiveness.",
    icon: GraduationCap,
    landingRoute: "/government", // institute view reuses the program-effectiveness lens for this MVP
  },
  {
    id: "employer",
    label: "Employer",
    description: "Post requirements and discover relevant candidates.",
    icon: Briefcase,
    landingRoute: "/employer",
  },
  {
    id: "trainee",
    label: "Trainee",
    description: "Track skills, employment and career recommendations.",
    icon: UserRound,
    landingRoute: "/trainee",
  },
];

export const getRole = (id) => ROLES.find((r) => r.id === id);

// Sidebar navigation, scoped per role. Every path here resolves to a real
// route — nothing links to a page that doesn't exist.
export const NAV_BY_ROLE = {
  government: [
    { label: "Dashboard", to: "/government", icon: LayoutDashboard },
    { label: "Employment Outcomes", to: "/employment-outcomes", icon: TrendingUp },
    { label: "Skill Gap Analysis", to: "/skill-gap-analysis", icon: Target },
    { label: "Program Impact", to: "/program-impact", icon: BarChart3 },
  ],
  employer: [
    { label: "Dashboard", to: "/employer", icon: LayoutDashboard },
    { label: "Employment Outcomes", to: "/employment-outcomes", icon: TrendingUp },
  ],
  trainee: [
    { label: "Dashboard", to: "/trainee", icon: LayoutDashboard },
    { label: "Skill Gap Analysis", to: "/skill-gap-analysis", icon: Target },
  ],
};

export const ROLE_ACCENT = {
  government: "accent",
  institute: "accent",
  employer: "info",
  trainee: "amber",
};
