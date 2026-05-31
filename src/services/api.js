import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export const studentRegister = (data) => API.post("/student/register", data);
export const studentLogin = (data) => API.post("/student/login", data);
export const lecturerRegister = (data) => API.post("/lecturer/register", data);
export const lecturerLogin = (data) => API.post("/lecturer/login", data);
export const startSession = (data) => API.post("/session/start", data);
export const markAttendance = (data) => API.post("/attendance/mark", data);
export const getStudentAttendance = () => API.get("/student/attendance");
export const getSessionAttendance = (sessionId) => API.get(`/session/${sessionId}/attendance`);
export const getModuleSessions = (moduleId) => API.get(`/module/${moduleId}/sessions`);