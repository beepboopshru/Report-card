import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminRoute from "./routes/AdminRoute";
import TeacherRoute from "./routes/TeacherRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminKits from "./pages/AdminKits";
import EditRubric from "./pages/EditRubric";
import SeedPage from "./pages/SeedPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import ClassDetail from "./pages/ClassDetail";
import ClassCurriculum from "./pages/ClassCurriculum";
import ScoreSheet from "./pages/ScoreSheet";
import StudentReport from "./pages/StudentReport";
import ClassReport from "./pages/ClassReport";

export default function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<TeacherRoute />}>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/class/:classId" element={<ClassDetail />} />
        <Route path="/class/:classId/curriculum" element={<ClassCurriculum />} />
        <Route
          path="/class/:classId/students/:studentId/score/:kitId"
          element={<ScoreSheet />}
        />
        <Route
          path="/class/:classId/students/:studentId/report"
          element={<StudentReport />}
        />
        <Route path="/class/:classId/report" element={<ClassReport />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/kits" element={<AdminKits />} />
        <Route path="/admin/rubrics/:kitId" element={<EditRubric />} />
        <Route path="/admin/seed" element={<SeedPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
