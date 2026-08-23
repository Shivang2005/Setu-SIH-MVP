import { useState } from "react";
import { Sparkles, Users, GraduationCap, Briefcase, IndianRupee, Target, ShieldCheck } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/ui/Card.jsx";
import KpiCard from "../components/cards/KpiCard.jsx";
import OutcomeFunnel from "../components/charts/OutcomeFunnel.jsx";
import { PROGRAMS, getProgramById } from "../data/programs.js";
import { formatNumber, formatLPA } from "../utils/format.js";

export default function ProgramImpact() {
  const [programId, setProgramId] = useState("prog-aiml");
  const program = getProgramById(programId);

  const employmentRate = Math.round((program.employed / program.completed) * 100);

  const funnelStages = [
    { label: "Enrolled", value: program.enrolled, color: "var(--color-ink-700)" },
    { label: "Completed", value: program.completed, color: "var(--color-ink-500)" },
    { label: "Employed", value: program.employed, color: "var(--color-accent-500)" },
  ];

  return (
    <DashboardLayout title="Program Impact">
      <div className="space-y-6">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Skilling program</label>
              <select
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                className="border border-line rounded-xl px-3.5 py-2.5 text-sm bg-white outline-none focus:border-accent-500 min-w-[260px]"
              >
                {PROGRAMS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} · {p.year}</option>
                ))}
              </select>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Duration</p>
              <p className="font-medium text-ink-900">{program.durationWeeks} weeks</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Enrolled" value={formatNumber(program.enrolled)} icon={Users} />
          <KpiCard label="Completed" value={formatNumber(program.completed)} icon={GraduationCap} />
          <KpiCard label="Employed" value={formatNumber(program.employed)} icon={Briefcase} accent />
          <KpiCard label="Employment Rate" value={employmentRate} suffix="%" icon={Target} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard label="Average Salary" value={formatLPA(program.avgSalaryLPA)} icon={IndianRupee} />
          <KpiCard label="Skill-Job Alignment" value={program.skillJobAlignment} suffix="%" icon={Target} />
          <KpiCard label="6-Month Retention" value={program.retention6mo} suffix="%" icon={ShieldCheck} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-display font-semibold text-ink-900 mb-1">Enrollment → Completion → Employment</h2>
            <p className="text-sm text-slate-500 mb-5">Outcome funnel for the {program.year} cohort</p>
            <OutcomeFunnel stages={funnelStages} />
          </Card>

          <Card className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4.5 h-4.5 text-accent-600" />
              <h2 className="font-display font-semibold text-ink-900">Impact Summary</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">Generated from placement, alignment and retention signals</p>
            <blockquote className="text-sm text-ink-800 leading-relaxed bg-accent-50 border border-accent-100 rounded-xl p-4 flex-1">
              {program.impactSummary}
            </blockquote>
            <div className="mt-4">
              <p className="text-xs text-slate-400 mb-2">Skills covered by this program</p>
              <div className="flex flex-wrap gap-1.5">
                {program.skillsCovered.map((s) => (
                  <span key={s} className="text-xs bg-slate-100 text-slate-600 rounded-full px-2.5 py-1">{s}</span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="font-display font-semibold text-ink-900 mb-1">Where the program runs</h2>
          <p className="text-sm text-slate-500 mb-4">Primary training regions for this cohort</p>
          <div className="flex flex-wrap gap-2">
            {program.regions.map((r) => (
              <span key={r} className="text-sm bg-ink-900 text-white rounded-full px-3.5 py-1.5">{r}</span>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
