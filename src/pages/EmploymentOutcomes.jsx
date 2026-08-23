import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Modal from "../components/ui/Modal.jsx";
import TraineeDetailContent from "../components/cards/TraineeDetailContent.jsx";
import { TRAINEES } from "../data/trainees.js";
import { PROGRAMS, getProgramById } from "../data/programs.js";
import { getEmployerById, getJobById } from "../data/jobs.js";
import { formatLPA, formatDate, initials } from "../utils/format.js";

const STATUS_VARIANT = { Employed: "success", Seeking: "warning", "Not Placed": "danger" };
const STATUS_OPTIONS = ["All", "Employed", "Seeking", "Not Placed"];

export default function EmploymentOutcomes() {
  const [query, setQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return TRAINEES.filter((t) => {
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase());
      const matchesProgram = programFilter === "All" || t.programId === programFilter;
      const matchesStatus = statusFilter === "All" || t.employmentStatus === statusFilter;
      return matchesQuery && matchesProgram && matchesStatus;
    });
  }, [query, programFilter, statusFilter]);

  return (
    <DashboardLayout title="Employment Outcomes">
      <div className="space-y-4">
        <Card padded={false} className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 flex-1 min-w-[200px] text-slate-500">
              <Search className="w-4 h-4 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trainee by name…"
                className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="border border-line rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-accent-500"
            >
              <option value="All">All programs</option>
              {PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.shortName}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-line rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-accent-500"
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="text-xs text-slate-400 ml-auto">{filtered.length} of {TRAINEES.length} trainees</span>
          </div>
        </Card>

        <Card padded={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-line text-left text-xs text-slate-400 uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">Trainee</th>
                  <th className="px-5 py-3 font-medium">Program</th>
                  <th className="px-5 py-3 font-medium">Skills</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Job Role</th>
                  <th className="px-5 py-3 font-medium">Salary</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                  <th className="px-5 py-3 font-medium">Retention</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const program = getProgramById(t.programId);
                  const employer = t.employerId ? getEmployerById(t.employerId) : null;
                  const job = t.jobRoleId ? getJobById(t.jobRoleId) : null;
                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelected(t)}
                      className="border-b border-line last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-ink-700 text-white text-xs font-medium flex items-center justify-center shrink-0">
                            {initials(t.name)}
                          </span>
                          <span className="font-medium text-ink-900 whitespace-nowrap">{t.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{program?.shortName}</td>
                      <td className="px-5 py-3">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {t.skills.slice(0, 2).map((s) => <Badge key={s} variant="neutral">{s}</Badge>)}
                          {t.skills.length > 2 && <Badge variant="neutral">+{t.skills.length - 2}</Badge>}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={STATUS_VARIANT[t.employmentStatus] || "neutral"}>{t.employmentStatus}</Badge>
                      </td>
                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{employer?.name || "—"}</td>
                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{job?.title || "—"}</td>
                      <td className="px-5 py-3 font-mono tabular text-ink-800 whitespace-nowrap">{formatLPA(t.salaryLPA)}</td>
                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{formatDate(t.joiningDate)}</td>
                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{t.retentionMonths ? `${t.retentionMonths} mo` : "—"}</td>
                      <td className="px-5 py-3 text-slate-300"><ChevronRight className="w-4 h-4" /></td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-5 py-14 text-center text-slate-400">
                      No trainees match these filters. Try adjusting your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Trainee Profile">
        {selected && <TraineeDetailContent trainee={selected} matchJobId={selected.targetJobId} />}
      </Modal>
    </DashboardLayout>
  );
}
