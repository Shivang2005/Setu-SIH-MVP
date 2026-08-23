import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2, Circle, Briefcase, BookOpen, Clock, ArrowRight, Building2, Target,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import MatchGauge from "../components/ui/MatchGauge.jsx";
import { getTraineeById } from "../data/trainees.js";
import { getProgramById } from "../data/programs.js";
import { JOB_ROLES, getJobById, getEmployerById } from "../data/jobs.js";
import { calculateSkillMatch, recommendCoursesFor } from "../utils/skillMatch.js";
import { formatLPA } from "../utils/format.js";

const CURRENT_TRAINEE_ID = "tr-01"; // demo persona shown when "Trainee" role is selected

export default function TraineeDashboard() {
  const trainee = getTraineeById(CURRENT_TRAINEE_ID);
  const program = getProgramById(trainee.programId);
  const employer = trainee.employerId ? getEmployerById(trainee.employerId) : null;
  const currentJob = trainee.jobRoleId ? getJobById(trainee.jobRoleId) : null;
  const targetJob = getJobById(trainee.targetJobId);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  const gap = useMemo(
    () => calculateSkillMatch(trainee.skills, targetJob.requiredSkills),
    [trainee, targetJob]
  );

  const recommendedJobs = useMemo(() => {
    return JOB_ROLES
      .map((job) => ({ job, match: calculateSkillMatch(trainee.skills, job.requiredSkills) }))
      .filter(({ job }) => job.id !== trainee.jobRoleId)
      .sort((a, b) => b.match.matchPercent - a.match.matchPercent)
      .slice(0, 3);
  }, [trainee]);

  const courses = recommendCoursesFor(gap.missing);

  const handleApply = (jobId) => {
    setAppliedJobIds((prev) => new Set(prev).add(jobId));
  };

  return (
    <DashboardLayout title={`Welcome, ${trainee.name.split(" ")[0]}`}>
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Training progress */}
          <Card>
            <p className="text-sm text-slate-500 dark:text-white/50">Training Progress</p>
            <p className="font-mono tabular text-3xl font-semibold text-ink-900 dark:text-white mt-1">{trainee.trainingProgress}%</p>
            <ProgressBar value={trainee.trainingProgress} className="mt-3" />
            <p className="text-xs text-slate-400 dark:text-white/40 mt-2">{program.name}</p>
          </Card>

          {/* Employment */}
          <Card>
            <p className="text-sm text-slate-500 dark:text-white/50 mb-2">Employment</p>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${trainee.employmentStatus === "Employed" ? "bg-success-500" : "bg-amber-500"}`} />
              <span className="font-medium text-ink-900 dark:text-white">{trainee.employmentStatus}</span>
            </div>
            {currentJob ? (
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50">
                <Building2 className="w-4 h-4" /> {currentJob.title} @ {employer?.name}
              </div>
            ) : (
              <p className="text-sm text-slate-400 dark:text-white/40">Not currently employed</p>
            )}
            {trainee.salaryLPA && <p className="text-xs text-slate-400 dark:text-white/40 mt-2">{formatLPA(trainee.salaryLPA)}</p>}
          </Card>

          {/* Skill match toward target job */}
          <Card className="flex items-center gap-4">
            <MatchGauge value={gap.matchPercent} size={84} strokeWidth={8} />
            <div>
              <p className="text-sm font-medium text-ink-900 dark:text-white">Target: {targetJob.title}</p>
              <p className="text-xs text-slate-500 dark:text-white/50 mt-1">{gap.matched.length} of {gap.total} skills matched</p>
              <div className="flex items-center gap-3 mt-2">
                <Link to="/skill-gap-analysis" className="text-xs font-medium text-accent-700 dark:text-accent-300 hover:text-accent-600 inline-flex items-center gap-1">
                  Full analysis <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => handleApply(targetJob.id)}
                  disabled={appliedJobIds.has(targetJob.id)}
                  className={`text-xs font-medium rounded-full px-2.5 py-1 transition-colors inline-flex items-center gap-1 ${
                    appliedJobIds.has(targetJob.id)
                      ? "bg-success-50 dark:bg-success-500/15 text-success-600 dark:text-success-400 cursor-default"
                      : "bg-ink-900 dark:bg-white text-white dark:text-ink-900 hover:bg-ink-800 dark:hover:bg-white/90"
                  }`}
                >
                  {appliedJobIds.has(targetJob.id) && <CheckCircle2 className="w-3 h-3" />}
                  {appliedJobIds.has(targetJob.id) ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skills checklist */}
          <Card>
            <h2 className="font-display font-semibold text-ink-900 dark:text-white mb-4">Skills</h2>
            <div className="space-y-2.5">
              {program.skillsCovered.map((s) => {
                const has = trainee.skills.includes(s);
                return (
                  <div key={s} className="flex items-center gap-2.5 text-sm">
                    {has ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-success-500 shrink-0" />
                    ) : (
                      <Circle className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    )}
                    <span className={has ? "text-ink-800 dark:text-white/80" : "text-slate-400 dark:text-white/40"}>{s}</span>
                  </div>
                );
              })}
            </div>

            {gap.missing.length > 0 && (
              <>
                <h3 className="font-display font-semibold text-ink-900 dark:text-white mt-6 mb-3 text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-500" /> Skill Gap for {targetJob.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {gap.missing.map((s) => <Badge key={s} variant="missing">{s}</Badge>)}
                </div>
              </>
            )}
          </Card>

          {/* Recommended jobs */}
          <Card>
            <h2 className="font-display font-semibold text-ink-900 dark:text-white mb-4">Recommended Jobs</h2>
            <div className="space-y-3">
              {recommendedJobs.map(({ job, match }) => {
                const applied = appliedJobIds.has(job.id);
                return (
                  <div key={job.id} className="flex items-center justify-between gap-3 border border-line dark:border-white/10 rounded-xl p-3.5 hover:border-accent-300 dark:hover:border-accent-400 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-slate-500 dark:text-white/50" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-ink-900 dark:text-white text-sm truncate">{job.title}</p>
                        <p className="text-xs text-slate-400 dark:text-white/40">{formatLPA(job.avgSalaryLPA)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono tabular text-sm font-semibold text-accent-600 dark:text-accent-300">{match.matchPercent}%</span>
                      <button
                        onClick={() => handleApply(job.id)}
                        disabled={applied}
                        className={`text-xs font-medium rounded-full px-3 py-1.5 transition-colors inline-flex items-center gap-1 ${
                          applied
                            ? "bg-success-50 dark:bg-success-500/15 text-success-600 dark:text-success-400 cursor-default"
                            : "bg-ink-900 dark:bg-white text-white dark:text-ink-900 hover:bg-ink-800 dark:hover:bg-white/90"
                        }`}
                      >
                        {applied && <CheckCircle2 className="w-3 h-3" />}
                        {applied ? "Applied" : "Apply"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recommended learning */}
        {courses.length > 0 && (
          <Card>
            <h2 className="font-display font-semibold text-ink-900 dark:text-white mb-1">Recommended Learning</h2>
            <p className="text-sm text-slate-500 dark:text-white/50 mb-4">To close your gap for {targetJob.title}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course, i) => (
                <div key={course.title} className="border border-line dark:border-white/10 rounded-xl p-4 hover:border-accent-300 dark:hover:border-accent-400 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="missing">{gap.missing[i]}</Badge>
                    <BookOpen className="w-4 h-4 text-slate-300 dark:text-white/30 shrink-0" />
                  </div>
                  <p className="font-medium text-ink-900 dark:text-white mt-3 text-sm">{course.title}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/40 mt-2">
                    <Clock className="w-3.5 h-3.5" /> {course.hours} hrs · {course.provider}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}