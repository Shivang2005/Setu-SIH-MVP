import { useNavigate } from "react-router-dom";
import {
  Waypoints, ArrowRight, PlayCircle, TrendingUp, Target, BarChart3, LineChart,
  FileSearch, Sparkles, GitCompareArrows, Award, ArrowUpRight,
} from "lucide-react";
import { useRole } from "../context/RoleContext.jsx";
import { ROLES } from "../data/roles.js";
import { PLATFORM_KPIS } from "../data/analytics.js";
import FlowDiagram from "../components/ui/FlowDiagram.jsx";
import Card from "../components/ui/Card.jsx";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Employment Outcome Tracking",
    description: "Follow every trainee from enrollment to placement to retention, across programs, regions and cohorts.",
  },
  {
    icon: Target,
    title: "AI-Powered Skill Gap Analysis",
    description: "Compare a trainee's current skills against any target role and get a precise, explainable match score.",
  },
  {
    icon: BarChart3,
    title: "Skilling Program Impact",
    description: "See whether a program actually moved the needle — funnel, salary lift, alignment and retention in one view.",
  },
  {
    icon: LineChart,
    title: "Industry Skill Demand",
    description: "Track where employer demand is outpacing trainee supply, down to the individual skill.",
  },
];

const PIPELINE_STEPS = [
  { label: "Profile & Resume", icon: FileSearch },
  { label: "Skill Extraction", icon: Sparkles },
  { label: "Job Matching", icon: GitCompareArrows },
  { label: "Gap Detection", icon: Target },
  { label: "Outcome Impact", icon: Award },
];

export default function Landing() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleViewDemo = () => {
    setRole("government");
    navigate("/government");
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Top bar */}
      <header className="border-b border-line bg-white/70 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-ink-900 flex items-center justify-center">
              <Waypoints className="w-4.5 h-4.5 text-accent-300" />
            </span>
            <span className="font-display font-semibold tracking-tight text-ink-900">Setu</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-500">
            <a href="#features" className="hover:text-ink-900 transition-colors">Platform</a>
            <a href="#pipeline" className="hover:text-ink-900 transition-colors">How it works</a>
            <a href="#roles" className="hover:text-ink-900 transition-colors">For your role</a>
          </nav>
          <button
            onClick={() => navigate("/roles")}
            className="text-sm font-medium bg-ink-900 text-white px-4 py-2 rounded-lg hover:bg-ink-800 transition-colors"
          >
            Explore Platform
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-700 bg-accent-50 rounded-full px-3 py-1 mb-5">
            Smart India Hackathon · MVP Prototype
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-950 leading-[1.08] tracking-tight">
            Employment &amp; Skilling Outcome Intelligence Platform
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-xl leading-relaxed">
            Track employment outcomes. Identify skill gaps. Measure the impact of skilling initiatives —
            in one connected view for trainees, institutes, employers and policymakers.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/roles")}
              className="inline-flex items-center gap-2 bg-accent-500 text-white font-medium px-5 py-3 rounded-xl hover:bg-accent-600 transition-colors shadow-card"
            >
              Explore Platform <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleViewDemo}
              className="inline-flex items-center gap-2 text-ink-800 font-medium px-5 py-3 rounded-xl border border-line bg-white hover:bg-slate-50 transition-colors"
            >
              <PlayCircle className="w-4.5 h-4.5" /> View Demo
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <p className="font-mono tabular text-2xl font-semibold text-ink-900">{PLATFORM_KPIS.totalTrainees.toLocaleString("en-IN")}</p>
              <p className="text-xs text-slate-500 mt-1">Trainees tracked</p>
            </div>
            <div>
              <p className="font-mono tabular text-2xl font-semibold text-ink-900">{PLATFORM_KPIS.employmentRate}%</p>
              <p className="text-xs text-slate-500 mt-1">Employment rate</p>
            </div>
            <div>
              <p className="font-mono tabular text-2xl font-semibold text-ink-900">{PLATFORM_KPIS.retention6mo}%</p>
              <p className="text-xs text-slate-500 mt-1">6-month retention</p>
            </div>
          </div>
        </div>

        {/* Signature visual: live-feeling schematic of the platform's core loop */}
        <Card className="relative animate-fade-up p-6" style={{ animationDelay: "120ms" }}>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Skill Gap Analysis</span>
            <span className="flex items-center gap-1 text-xs text-accent-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" /> Live sample
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 shrink-0">
              <svg viewBox="0 0 100 100" className="-rotate-90 w-full h-full">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-slate-100)" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="var(--color-accent-500)" strokeWidth="10"
                  strokeLinecap="round" strokeDasharray="264" strokeDashoffset="87"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono tabular text-xl font-semibold text-ink-900">67%</div>
            </div>
            <div>
              <p className="font-medium text-ink-900">Rahul Sharma → Data Scientist</p>
              <p className="text-sm text-slate-500 mt-1">3 of 6 required skills matched</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-xs bg-amber-100 text-amber-600 rounded-full px-2 py-0.5">+ TensorFlow</span>
                <span className="text-xs bg-amber-100 text-amber-600 rounded-full px-2 py-0.5">+ AWS</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-line grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Skill-job alignment</p>
              <p className="font-mono tabular text-lg font-semibold text-ink-900 mt-0.5">{PLATFORM_KPIS.skillJobAlignment}%</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Cloud/AWS gap</p>
              <p className="font-mono tabular text-lg font-semibold text-amber-600 mt-0.5">Top gap</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Feature cards */}
      <section id="features" className="max-w-6xl mx-auto px-5 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="hover:shadow-pop transition-shadow duration-300">
              <span className="w-10 h-10 rounded-lg bg-ink-900 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-accent-300" />
              </span>
              <h3 className="font-display font-semibold text-ink-900">{title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pipeline / how it works */}
      <section id="pipeline" className="bg-ink-950 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="max-w-xl">
            <span className="text-xs font-medium text-accent-300 uppercase tracking-wide">How it works</span>
            <h2 className="font-display text-3xl font-semibold text-white mt-3">
              One pipeline, from resume to measurable outcome
            </h2>
            <p className="text-slate-400 mt-3 leading-relaxed">
              Every module in Setu — trainee lifecycle, skill extraction, matching, gap detection — feeds the
              same outcome loop, so a policymaker's dashboard and a trainee's recommendation come from the
              same underlying signal.
            </p>
          </div>
          <div className="mt-12 bg-white/[0.04] border border-white/10 rounded-2xl p-8 overflow-x-auto">
            <div className="min-w-[560px]">
              <FlowDiagram steps={PIPELINE_STEPS} active={5} />
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="text-xs font-medium text-accent-700 uppercase tracking-wide">For your role</span>
            <h2 className="font-display text-3xl font-semibold text-ink-950 mt-2">Built for every stakeholder</h2>
          </div>
          <button
            onClick={() => navigate("/roles")}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:text-accent-600"
          >
            See all demo dashboards <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map(({ id, label, description, icon: Icon, landingRoute }) => (
            <button
              key={id}
              onClick={() => {
                setRole(id);
                navigate(landingRoute);
              }}
              className="text-left group"
            >
              <Card className="h-full hover:border-accent-300 hover:shadow-pop transition-all duration-300">
                <Icon className="w-6 h-6 text-ink-700" />
                <h3 className="font-display font-semibold text-ink-900 mt-4">{label}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-700 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open dashboard <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Card>
            </button>
          ))}
        </div>
      </section>

      <footer className="border-t border-line py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <p>Setu — Employment &amp; Skilling Outcome Intelligence Platform</p>
          <p>Built for Smart India Hackathon · MVP prototype with mock data</p>
        </div>
      </footer>
    </div>
  );
}
