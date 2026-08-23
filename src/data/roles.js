import {
  Landmark, GraduationCap, Briefcase, UserRound,
  LayoutDashboard, TrendingUp, Target, BarChart3, PieChart,
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
    landingRoute: "/institute",
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

export const NAV_BY_ROLE = {
  government: [
    { label: "Dashboard", to: "/government", icon: LayoutDashboard },
    { label: "Employment Outcomes", to: "/employment-outcomes", icon: TrendingUp },
    { label: "Skill Gap Analysis", to: "/skill-gap-analysis", icon: Target },
    { label: "Program Impact", to: "/program-impact", icon: BarChart3 },
    { label: "Program Analysis", to: "/program-analysis", icon: PieChart },
  ],
  institute: [
    { label: "Dashboard", to: "/institute", icon: LayoutDashboard },
    { label: "Program Impact", to: "/program-impact", icon: BarChart3 },
    { label: "Skill Gap Analysis", to: "/skill-gap-analysis", icon: Target },
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