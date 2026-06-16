import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Register } from "./features/auth/pages/Register";
import { AuthProvider } from "./features/auth/auth.context";
import Home from "./features/interview/pages/Home";
import { Login } from "./features/auth/pages/Login";
import { InterviewProvider } from "./features/interview/interview.context";
import Interview from "./features/interview/pages/Interview";
import ProtectedRoute from "./features/auth/components/protected";

function App() {
  return (
    <div>
      <AuthProvider>
        <InterviewProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview/:interviewId"
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              }
            />
          </Routes>
        </InterviewProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
