import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedRoutesWithoutSidebar from "./components/ProtectedRoutesWithoutSidebar"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<ProtectedRoutes />} />
      <Route path="/user/*" element={<ProtectedRoutesWithoutSidebar />} />
    </Routes>
  );
}

export default App;