import { Outlet, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import HomeTester from "./tester/HomeTester";
import Profile from "./Profile";
import BoardTester from "./tester/BoardTester";
import Studies from "./tester/Studies";
import Sidebar from "./Sidebar";
import HomeUser from "./user/HomeUser"
import BoardUser from "./user/BoardUser";
import { FaBars } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";

const ProtectedRoutes = () => {
  const user = AuthService.getCurrentUser();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  if (user) {
    return (
      <div className={`app ${toggled ? 'toggled' : ''}`}>
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
        <main>
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
          <Routes>
            <Route path="/homeTester" element={<HomeTester />} />
            <Route path="/homeUser" element={<HomeUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/boardTester" element={<BoardTester />} />
            <Route path="/boardUser" element={<BoardUser />} />
            <Route path="/studies" element={<Studies />} />
          </Routes>
          <Footer />
        </main>
      </div>
    );
  } else {
    // Si el usuario no está autenticado, redirecciona a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

};

export default ProtectedRoutes;