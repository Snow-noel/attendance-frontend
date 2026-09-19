import axios from "axios";
// import { data } from "react-router-dom";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((config) => {
  let token;
  if (config.url.startsWith("/student")) {
    token = localStorage.getItem("studentToken");
  } else if (config.url.startsWith("/lecturer")) {
    token = localStorage.getItem("lecturerToken");
  }

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export const studentRegister = (data) => API.post("/student/register", data);
export const studentLogin = (data) => API.post("/student/login", data);
export const lecturerRegister = (data) => API.post("/lecturer/register", data);
export const lecturerLogin = (data) => API.post("/lecturer/login", data);
export const startSession = (data) => API.post("/lecturer/session/start", data);
export const markAttendance = (data) =>
  API.post("/student/attendance/mark", data);
export const getStudentModules = () => API.get("/student/modules");
export const getStudentModuleAttendance = (moduleId) =>
  API.get(`/student/attendance/${moduleId}`);
export const getSessionAttendance = (sessionId) =>
  API.get(`/lecturer/session/${sessionId}/attendance`);
export const getModuleSessions = (moduleId) =>
  API.get(`/lecturer/module/${moduleId}/sessions`);
export const getSchools = () => API.get("/schools");
export const getDepartments = (schoolId) => API.get(`/departments/${schoolId}`);
export const getPrograms = (departmentId) =>
  API.get(`/programs/${departmentId}`);
export const adminLogin = (data) => API.post("/admin/login", data);
export const createLecturer = (data) => API.post("/lecturer/create", data);
export const getAdminLecturers = () => API.get("/admin/lecturers");
export const getAdminStudents = () => API.get("/admin/students");
export const endSession = (sessionId) =>
  API.post(`/lecturer/session/${sessionId}/end`);
export const forgotPassword = (data) => API.post("/forgot-password", data);
export const resetPassword = (data) => API.post("/reset/password", data);
export const getLecturerModules = () => API.get("/lecturer/modules");
