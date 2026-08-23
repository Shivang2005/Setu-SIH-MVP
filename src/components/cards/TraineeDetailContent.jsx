import { Briefcase, GraduationCap, MapPin, Calendar, IndianRupee, ShieldCheck } from "lucide-react";
import Badge from "../ui/Badge.jsx";
import MatchGauge from "../ui/MatchGauge.jsx";
import { getProgramById } from "../../data/programs.js";
import { getEmployerById, getJobById } from "../../data/jobs.js";
import { calculateSkillMatch } from "../../utils/skillMatch.js";
import { formatLPA, formatDate, initials } from "../../utils/format.js";

const STATUS_VARIANT = { Employed: "success", Seeking: "warning", "Not Placed": "danger" };

export default function TraineeDetailContent({ trainee, matchJobId }) {
  const program = getProgramById(trainee.programId);
  const employer = trainee.employerId ? getEmployerById(trainee.employerId) : null;
  const currentJob = trainee.jobRoleId ? getJobById(trainee.jobRoleId) : null;
  const matchJob = matchJobId ? getJobById(matchJobId) : null;
  const match = matchJob ? calculateSkillMatch(trainee.skills, matchJob.requiredSkills) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="w-14 h-14 rounded-full bg-ink-700 text-white flex items-center justify-center font-display font-semibold text-lg shrink-0">
          {initials(trainee.name)}
        </span>
        <div>
          <p className="font-display font-semibold text-lg text-ink-900">{trainee.name}</p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-3.5 h-3.5" /> {trainee.state}
          </p>
        </div>
        <Badge variant={STATUS_VARIANT[trainee.employmentStatus] || "neutral"} className="ml-auto">
          {trainee.employmentStatus}
        </Badge>
      </div>

      {match && (
        <div className="flex items-center gap-5 bg-slate-50 rounded-xl p-4">
          <MatchGauge value={match.matchPercent} size={88} strokeWidth={8} />
          <div>
            <p className="text-sm font-medium text-ink-900">Match for {matchJob.title}</p>
            <p className="text-xs text-slate-500 mt-1">{match.matched.length} of {match.total} required skills matched</p>
            {match.missing.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {match.missing.map((s) => <Badge key={s} variant="missing">{s}</Badge>)}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-start gap-2.5">
          <GraduationCap className="w-4.5 h-4.5 text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Program</p>
            <p className="text-ink-800 font-medium">{program?.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{trainee.trainingProgress}% complete · {trainee.status}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Briefcase className="w-4.5 h-4.5 text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Employment</p>
            <p className="text-ink-800 font-medium">
              {currentJob ? `${currentJob.title} @ ${employer?.name}` : "Not currently employed"}
            </p>
          </div>
        </div>
        {trainee.salaryLPA && (
          <div className="flex items-start gap-2.5">
            <IndianRupee className="w-4.5 h-4.5 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Salary</p>
              <p className="text-ink-800 font-medium">{formatLPA(trainee.salaryLPA)}</p>
            </div>
          </div>
        )}
        {trainee.joiningDate && (
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4.5 h-4.5 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Joining date</p>
              <p className="text-ink-800 font-medium">{formatDate(trainee.joiningDate)}</p>
            </div>
          </div>
        )}
        {trainee.retentionMonths !== null && trainee.retentionMonths !== undefined && (
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4.5 h-4.5 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Retention</p>
              <p className="text-ink-800 font-medium">{trainee.retentionMonths} months</p>
            </div>
          </div>
        )}
      </div>

      <div>
        <p className="text-xs text-slate-400 mb-2">Skills</p>
        <div className="flex flex-wrap gap-1.5">
          {trainee.skills.map((s) => <Badge key={s} variant="accent">{s}</Badge>)}
        </div>
      </div>
    </div>
  );
}
