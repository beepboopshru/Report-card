import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminRoute from "./routes/AdminRoute";
import TeacherRoute from "./routes/TeacherRoute";

function Stub({ name }: { name: string }) {
  return <p>{name} (todo)</p>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<TeacherRoute />}>
        <Route path="/" element={<Stub name="Teacher dashboard" />} />
        <Route path="/class/:classId" element={<Stub name="Class detail" />} />
        <Route path="/class/:classId/curriculum" element={<Stub name="Class curriculum" />} />
        <Route path="/class/:classId/students/:studentId/score/:kitId" element={<Stub name="Score sheet" />} />
        <Route path="/class/:classId/students/:studentId/report" element={<Stub name="Student report" />} />
        <Route path="/class/:classId/report" element={<Stub name="Class report" />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Stub name="Admin dashboard" />} />
        <Route path="/admin/kits" element={<Stub name="Admin kits" />} />
        <Route path="/admin/rubrics/:kitId" element={<Stub name="Edit rubric" />} />
        <Route path="/admin/seed" element={<Stub name="Seed page" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
