import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import AdminRoute from "./routes/AdminRoute";
import TeacherRoute from "./routes/TeacherRoute";
import StudentRoute from "./routes/StudentRoute";
import AdminDashboard from "./pages/AdminDashboard";
import LmsCourses from "./pages/LmsCourses";
import StudentLms from "./pages/StudentLms";
import AdminKits from "./pages/AdminKits";
import AdminGrades from "./pages/AdminGrades";
import EditRubric from "./pages/EditRubric";
import SeedPage from "./pages/SeedPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import ReportsIndex from "./pages/ReportsIndex";
import ClassDetail from "./pages/ClassDetail";
import ClassCurriculum from "./pages/ClassCurriculum";
import ScoreSheet from "./pages/ScoreSheet";
import KitScoreSheet from "./pages/KitScoreSheet";
import StudentReport from "./pages/StudentReport";
import ClassReport from "./pages/ClassReport";

export default function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />

      <Route element={<TeacherRoute />}>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/reports" element={<ReportsIndex />} />
        <Route path="/courses" element={<LmsCourses />} />
        <Route path="/class/:classId" element={<ClassDetail />} />
        <Route path="/class/:classId/curriculum" element={<ClassCurriculum />} />
        <Route
          path="/class/:classId/students/:studentId/score/:kitId"
          element={<ScoreSheet />}
        />
        <Route
          path="/class/:classId/kit/:kitId/score"
          element={<KitScoreSheet />}
        />
        <Route
          path="/class/:classId/students/:studentId/report"
          element={<StudentReport />}
        />
        <Route path="/class/:classId/report" element={<ClassReport />} />
      </Route>

      <Route element={<StudentRoute />}>
        <Route path="/lms" element={<StudentLms />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/classes" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/lms" element={<Navigate to="/courses" replace />} />
        <Route path="/admin/logins" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/kits" element={<AdminKits />} />
        <Route path="/admin/grades" element={<AdminGrades />} />
        <Route path="/admin/rubrics/:kitId" element={<EditRubric />} />
        <Route path="/admin/seed" element={<SeedPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
