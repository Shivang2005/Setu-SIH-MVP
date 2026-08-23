import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sparkles, FileSearch, GitCompareArrows, Target, Award, CheckCircle2, ArrowRight, BookOpen, Clock,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import MatchGauge from "../components/ui/MatchGauge.jsx";
import FlowDiagram from "../components/ui/FlowDiagram.jsx";
import { TRAINEES, getTraineeById } from "../data/trainees.js";
import { JOB_ROLES, getJobById } from "../data/jobs.js";
import { getProgramById } from "../data/programs.js";
import { calculateSkillMatch, recommendCoursesFor } from "../utils/skillMatch.js";
import { initials } from "../utils/format.js";

const PIPELINE_STEPS = [
  { label: "Profile & Resume", icon: FileSearch },
  { label: "Skill Extraction", icon: Sparkles },
  { label: "Job Matching", icon: GitCompareArrows },
  { label: "Gap Detection", icon: Target },
  { label: "Recommendations", icon: Award },
];

export default function SkillGapAnalysis() {
  const [params, setParams] = useSearchParams();
  const initialTrainee = params.get("trainee") || "tr-01";
  const [traineeId, setTraineeId] = useState(initialTrainee);
  const trainee = getTraineeById(traineeId) || TRAINEES[0];

  const [jobId, setJobId] = useState(trainee.targetJobId || JOB_ROLES[0].id);
  const [status, setStatus] = useState("idle"); // idle | analyzing | done
  const [activeStep, setActiveStep] = useState(-1);
  const [result, setResult] = useState(null);

  const job = getJobById(jobId);
  const program = getProgramById(trainee.programId);

  // Keep the job selector, results and URL in sync whenever the trainee changes.
  useEffect(() => {
    setJobId(trainee.targetJobId || JOB_ROLES[0].id);
    setStatus("idle");
    setResult(null);
    setActiveStep(-1);
    setParams({ trainee: traineeId }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traineeId]);

  const handleAnalyze = () => {
    setStatus("analyzing");
    setResult(null);
    setActiveStep(0);

    const stepDelay = 260;
    PIPELINE_STEPS.forEach((_, i) => {
      setTimeout(() => setActiveStep(i + 1), stepDelay * (i + 1));
    });

    setTimeout(() => {
      const match = calculateSkillMatch(trainee.skills, job.requiredSkills);
      setResult(match);
      setStatus("done");
    }, stepDelay * (PIPELINE_STEPS.length + 1));
  };

  return (
    <DashboardLayout title="Skill Gap Analysis">
      <div className="space-y-6">
        {/* Selectors */}
        <Card>
          <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Trainee</label>
              <select
                value={traineeId}
                onChange={(e) => setTraineeId(e.target.value)}
                className="w-full border border-line rounded-xl px-3.5 py-2.5 text-sm bg-white outline-none focus:border-accent-500"
              >
                {TRAINEES.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} — {getProgramById(t.programId)?.shortName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Target job</label>
              <select
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="w-full border border-line rounded-xl px-3.5 py-2.5 text-sm bg-white outline-none focus:border-accent-500"
              >
                {JOB_ROLES.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>
            </div>
            <Button onClick={handleAnalyze} disabled={status === "analyzing"} icon={Sparkles} className="md:w-44">
              {status === "analyzing" ? "Analyzing…" : "Analyze"}
            </Button>
          </div>
        </Card>

        {/* Trainee summary strip */}
        <Card className="flex flex-wrap items-center gap-5">
          <span className="w-14 h-14 rounded-full bg-ink-700 text-white flex items-center justify-center font-display font-semibold shrink-0">
            {initials(trainee.name)}
          </span>
          <div className="flex-1 min-w-[160px]">
            <p className="font-display font-semibold text-ink-900">{trainee.name}</p>
            <p className="text-sm text-slate-500">{program?.name} · {trainee.state}</p>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-xs text-slate-400">Training progress</p>
              <p className="font-mono tabular text-ink-900 font-medium mt-0.5">{trainee.trainingProgress}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Status</p>
              <p className="font-medium text-ink-900 mt-0.5">{trainee.employmentStatus}</p>
            </div>
          </div>
        </Card>

        {/* AI pipeline */}
        <Card className="overflow-x-auto">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-5">AI matching pipeline</p>
          <div className="min-w-[520px]">
            <FlowDiagram steps={PIPELINE_STEPS} active={activeStep} />
          </div>
        </Card>

        {/* Results */}
        {status === "idle" && (
          <Card className="text-center py-14">
            <Target className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Select a trainee and target job, then click <span className="font-medium text-ink-800">Analyze</span> to run the skill-gap match.</p>
          </Card>
        )}

        {status === "analyzing" && (
          <Card className="text-center py-14">
            <div className="w-8 h-8 mx-auto mb-3 border-2 border-accent-200 border-t-accent-500 rounded-full animate-spin" />
            <p className="text-slate-500">Analyzing skills…</p>
          </Card>
        )}

        {status === "done" && result && (
          <div className="grid lg:grid-cols-3 gap-6 animate-fade-up">
            {/* Match score */}
            <Card className="flex flex-col items-center justify-center text-center">
              <MatchGauge value={result.matchPercent} size={148} label="Skill Match" />
              <p className="text-sm text-slate-500 mt-6">
                <span className="font-mono tabular text-ink-900 font-medium">{result.matched.length}</span> of{" "}
                <span className="font-mono tabular text-ink-900 font-medium">{result.total}</span> required skills matched
              </p>
              <p className="text-xs text-slate-400 mt-1">for {job.title}</p>
            </Card>

            {/* Current vs required skills */}
            <Card className="lg:col-span-2">
              <h3 className="font-display font-semibold text-ink-900 mb-4">Current Skills</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {trainee.skills.map((s) => (
                  <Badge key={s} variant={job.requiredSkills.includes(s) ? "matched" : "neutral"}>{s}</Badge>
                ))}
              </div>

              <h3 className="font-display font-semibold text-ink-900 mb-4">Required for {job.title}</h3>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((s) => {
                  const isMatched = result.matched.includes(s);
                  return (
                    <Badge key={s} variant={isMatched ? "matched" : "missing"} icon={isMatched ? CheckCircle2 : undefined}>
                      {s}
                    </Badge>
                  );
                })}
              </div>
            </Card>

            {/* Missing skills + recommendations */}
            <Card className="lg:col-span-3">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display font-semibold text-ink-900">Missing Skills &amp; Recommended Learning</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {result.missing.length === 0
                      ? "No gaps — this trainee meets every required skill for this role."
                      : `Closing these ${result.missing.length} gaps would raise the match to 100%.`}
                  </p>
                </div>
              </div>

              {result.missing.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendCoursesFor(result.missing).map((course, i) => (
                    <div key={course.title} className="border border-line rounded-xl p-4 hover:border-accent-300 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="missing">{result.missing[i]}</Badge>
                        <BookOpen className="w-4 h-4 text-slate-300 shrink-0" />
                      </div>
                      <p className="font-medium text-ink-900 mt-3 text-sm">{course.title}</p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                        <Clock className="w-3.5 h-3.5" /> {course.hours} hrs · {course.provider}
                      </div>
                      <button className="flex items-center gap-1 text-xs font-medium text-accent-700 mt-3 hover:text-accent-600">
                        Start learning path <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
