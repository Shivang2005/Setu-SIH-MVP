import { useMemo, useState } from "react";
import { Briefcase, X, Plus, Users } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Modal from "../components/ui/Modal.jsx";
import TraineeDetailContent from "../components/cards/TraineeDetailContent.jsx";
import { JOB_ROLES, getJobById } from "../data/jobs.js";
import { TRAINEES } from "../data/trainees.js";
import { SKILLS } from "../data/skills.js";
import { getProgramById } from "../data/programs.js";
import { calculateSkillMatch } from "../utils/skillMatch.js";
import { initials } from "../utils/format.js";

export default function EmployerDashboard() {
  const [jobId, setJobId] = useState(JOB_ROLES[0].id);
  const baseJob = getJobById(jobId);
  const [requiredSkills, setRequiredSkills] = useState(baseJob.requiredSkills);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleJobChange = (id) => {
    setJobId(id);
    setRequiredSkills(getJobById(id).requiredSkills);
  };

  const toggleSkill = (skill) => {
    setRequiredSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const candidates = useMemo(() => {
    return TRAINEES
      .map((t) => ({ trainee: t, match: calculateSkillMatch(t.skills, requiredSkills) }))
      .filter((c) => c.match.matchPercent > 0)
      .sort((a, b) => b.match.matchPercent - a.match.matchPercent)
      .slice(0, 8);
  }, [requiredSkills]);

  return (
    <DashboardLayout title="Employer Dashboard">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-[380px_1fr] gap-6 items-start">
          {/* Post a job */}
          <Card className="lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4.5 h-4.5 text-ink-700 dark:text-white/70" />
              <h2 className="font-display font-semibold text-ink-900 dark:text-white">Post a Job</h2>
            </div>

            <label className="text-xs font-medium text-slate-500 dark:text-white/50 mb-1.5 block">Job title</label>
            <select
              value={jobId}
              onChange={(e) => handleJobChange(e.target.value)}
              className="w-full border border-line dark:border-white/15 rounded-xl px-3.5 py-2.5 text-sm bg-white dark:bg-ink-900 text-ink-900 dark:text-white outline-none focus:border-accent-500 mb-5"
            >
              {JOB_ROLES.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
            </select>

            <label className="text-xs font-medium text-slate-500 dark:text-white/50 mb-2 block">Required skills</label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {requiredSkills.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className="inline-flex items-center gap-1 bg-ink-900 dark:bg-white/10 text-white dark:text-white text-xs font-medium rounded-full pl-2.5 pr-1.5 py-1 hover:bg-ink-800 dark:hover:bg-white/20 transition-colors"
                >
                  {s} <X className="w-3 h-3" />
                </button>
              ))}
              {requiredSkills.length === 0 && (
                <span className="text-xs text-slate-400 dark:text-white/40">No skills selected — add some below.</span>
              )}
            </div>

            <label className="text-xs font-medium text-slate-500 dark:text-white/50 mb-2 block">Add a skill</label>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
              {SKILLS.filter((s) => !requiredSkills.includes(s)).map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className="inline-flex items-center gap-1 border border-line dark:border-white/15 text-slate-600 dark:text-white/60 text-xs font-medium rounded-full pl-2.5 pr-2 py-1 hover:border-accent-300 dark:hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
                >
                  <Plus className="w-3 h-3" /> {s}
                </button>
              ))}
            </div>
          </Card>

          {/* Candidate matches */}
          <Card>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-display font-semibold text-ink-900 dark:text-white">Candidate Matches</h2>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/40">
                <Users className="w-3.5 h-3.5" /> {candidates.length} candidates
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-white/50 mb-5">Ranked by skill match against your requirements</p>

            <div className="space-y-3">
              {candidates.map(({ trainee, match }) => {
                const program = getProgramById(trainee.programId);
                return (
                  <button
                    key={trainee.id}
                    onClick={() => setSelectedCandidate(trainee)}
                    className="w-full flex items-center gap-4 border border-line dark:border-white/10 rounded-xl p-4 hover:border-accent-300 dark:hover:border-accent-400 hover:shadow-card transition-all text-left"
                  >
                    <span className="w-11 h-11 rounded-full bg-ink-700 text-white flex items-center justify-center font-medium shrink-0">
                      {initials(trainee.name)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink-900 dark:text-white text-sm">{trainee.name}</p>
                      <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">{program?.shortName} · {trainee.employmentStatus}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {trainee.skills.slice(0, 3).map((s) => (
                          <Badge key={s} variant={requiredSkills.includes(s) ? "matched" : "neutral"}>{s}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono tabular text-lg font-semibold text-accent-600 dark:text-accent-300">{match.matchPercent}%</p>
                      <p className="text-xs text-slate-400 dark:text-white/40">match</p>
                    </div>
                  </button>
                );
              })}
              {candidates.length === 0 && (
                <div className="text-center py-14 text-slate-400 dark:text-white/40 text-sm">
                  No candidates match the selected skills yet — try adding a broader skill set.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={!!selectedCandidate} onClose={() => setSelectedCandidate(null)} title="Candidate Profile">
        {selectedCandidate && (
          <TraineeDetailContent
            trainee={selectedCandidate}
            matchJobId={jobId}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
}