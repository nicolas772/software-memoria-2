import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomeTester from './components/HomeTester';
import Profile from './components/Profile';
import Studies from './components/tester/Studies';
import BoardTester from './components/tester/BoardTester';
import Login from "./components/Login";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <>
      { /* El Sidebar se mostrará solo si no estamos en las rutas /login y /register */}
      {window.location.pathname !== '/login' && window.location.pathname !== '/register' && (
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
              <Route path="/profile" element={<Profile />} />
              <Route path="/boardTester" element={<BoardTester />} />
              <Route path="/studies" element={<Studies />} />
            </Routes>
            <Footer />
          </main>
        </div>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;