import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import StudentDashboard from "./pages/StudentDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;