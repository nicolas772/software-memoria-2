import React from "react";
import { Routes, Route } from "react-router-dom";
//import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedRoutesWithoutSidebar from "./components/ProtectedRoutesWithoutSidebar"
import Login2 from "./components/Login2";
import Register2 from "./components/Register2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styleLogin.css"
import "./App.css";


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login2 />} />
      <Route path="/register" element={<Register2 />} />
      <Route path="/*" element={<ProtectedRoutes />} />
      <Route path="/user/*" element={<ProtectedRoutesWithoutSidebar />} />
    </Routes>
  );
}

export default App;