import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }
  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0D131D",
        }}
      >
        <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        <div
          style={{
            width: "56px",
            height: "56px",
            border: "5px solid #1f2937",
            borderTop: "5px solid #8b5cf6",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
