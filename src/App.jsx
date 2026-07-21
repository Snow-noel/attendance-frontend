import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ModuleAttendance from "./pages/ModuleAttendance";
import RouterProtector from "./components/RouteProtector";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/reset/password" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/student/dashboard"
          element={
            <RouterProtector>
              <StudentDashboard />
            </RouterProtector>
          }
        />
        <Route
          path="/lecturer/dashboard"
          element={
            <RouterProtector>
              <LecturerDashboard />
            </RouterProtector>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <RouterProtector>
              <AdminDashboard />
            </RouterProtector>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/student/modules/:moduleId"
          element={
            <RouterProtector>
              <ModuleAttendance />
            </RouterProtector>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
