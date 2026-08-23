# Setu — Employment & Skilling Outcome Intelligence Platform

A frontend-first MVP built for an internal Smart India Hackathon evaluation. Every number
is mock data (see `src/data/`), but the interactions — search, filtering, skill-gap
matching, candidate matching, program switching — are fully functional.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Suggested mentor demo flow

1. **Landing page** → click **View Demo** (jumps straight into the Government dashboard)
   or **Explore Platform** to see the full role picker.
2. **Government Dashboard** — KPI row, employment trend (toggle 6M/12M), top skill gaps,
   program performance, demand-vs-supply, regional outcomes.
3. **Skill Gap Analysis** — select **Rahul Sharma**, target job **Data Scientist**, click
   **Analyze**. Watch the AI pipeline animate, then see the match score, matched/missing
   skills, and recommended courses.
4. **Program Impact** — switch to the **AI/ML Skilling Program**, see the
   enrollment → completion → employment funnel and the generated impact summary.
5. **Employment Outcomes** — search/filter the trainee table, click a row for the full
   profile.
6. Switch role (sidebar → **Switch role**) to see the **Trainee** and **Employer**
   dashboards — the same underlying skill-match engine powers both.

## Project structure

```
src/
├── components/
│   ├── layout/     Sidebar, Topbar, DashboardLayout, RequireRole guard
│   ├── ui/         Card, Badge, Button, Modal, ProgressBar, MatchGauge, FlowDiagram
│   ├── charts/     Recharts wrappers + a custom funnel visualization
│   └── cards/      KpiCard, TraineeDetailContent
├── pages/          One file per route (see App.jsx)
├── data/           Mock datasets — skills, programs, jobs, trainees, analytics, roles
├── context/        RoleContext (active demo persona, persisted to localStorage)
└── utils/          Skill-match calculation, course recommendations, formatting
```

## Swapping in a real backend later

Every screen reads from `src/data/*.js` through small getter functions
(`getTraineeById`, `getJobById`, …) and one calculation utility
(`calculateSkillMatch` in `src/utils/skillMatch.js`). To connect a real API:

1. Replace the data-file exports with `fetch`/React Query calls returning the same shapes.
2. Replace `calculateSkillMatch` with a call to your matching/ML service — every call site
   already treats the result as `{ matched, missing, matchPercent, total }`, so no
   component code needs to change.
3. Swap `RoleContext`'s manual role switch for real auth once you have it.

No component was written against the mock data structure in a way that would need
rewriting — only the data layer changes.
