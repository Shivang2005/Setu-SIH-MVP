import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import RequireRole from "./components/layout/RequireRole.jsx";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import RoleSelection from "./pages/RoleSelection.jsx";
import GovernmentDashboard from "./pages/GovernmentDashboard.jsx";
import InstituteDashboard from "./pages/InstituteDashboard.jsx";
import TraineeDashboard from "./pages/TraineeDashboard.jsx";
import EmployerDashboard from "./pages/EmployerDashboard.jsx";
import SkillGapAnalysis from "./pages/SkillGapAnalysis.jsx";
import EmploymentOutcomes from "./pages/EmploymentOutcomes.jsx";
import ProgramImpact from "./pages/ProgramImpact.jsx";
import ProgramAnalysis from "./pages/ProgramAnalysis.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/roles" element={<RoleSelection />} />

            <Route path="/government" element={<RequireRole><GovernmentDashboard /></RequireRole>} />
            <Route path="/institute" element={<RequireRole><InstituteDashboard /></RequireRole>} />
            <Route path="/trainee" element={<RequireRole><TraineeDashboard /></RequireRole>} />
            <Route path="/employer" element={<RequireRole><EmployerDashboard /></RequireRole>} />
            <Route path="/skill-gap-analysis" element={<RequireRole><SkillGapAnalysis /></RequireRole>} />
            <Route path="/employment-outcomes" element={<RequireRole><EmploymentOutcomes /></RequireRole>} />
            <Route path="/program-impact" element={<RequireRole><ProgramImpact /></RequireRole>} />
            <Route path="/program-analysis" element={<RequireRole><ProgramAnalysis /></RequireRole>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </ThemeProvider>
  );
}