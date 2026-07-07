import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/reset/password" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
